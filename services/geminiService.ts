
import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const recipeSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      recipeName: { type: Type.STRING, description: "Name of the recipe" },
      description: { type: Type.STRING, description: "A brief, enticing description of the dish." },
      difficulty: { type: Type.STRING, description: "Difficulty level, one of: 'Easy', 'Medium', 'Hard'" },
      prepTime: { type: Type.STRING, description: "Estimated preparation and cook time (e.g., '45 mins')" },
      calories: { type: Type.NUMBER, description: "Estimated calorie count per serving" },
      ingredients: {
        type: Type.ARRAY,
        description: "List of all ingredients required for the recipe.",
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "Name of the ingredient" },
            quantity: { type: Type.STRING, description: "Amount of the ingredient needed (e.g., '2 cups', '1 tbsp')" },
            inFridge: { type: Type.BOOLEAN, description: "Set to true if this ingredient was identified in the user's fridge photo, otherwise false." }
          },
          required: ['name', 'quantity', 'inFridge']
        }
      },
      steps: {
        type: Type.ARRAY,
        description: "Step-by-step cooking instructions.",
        items: {
          type: Type.STRING
        }
      }
    },
    required: ['recipeName', 'description', 'difficulty', 'prepTime', 'calories', 'ingredients', 'steps']
  }
};


function fileToGenerativePart(base64: string, mimeType: string) {
    return {
        inlineData: {
            data: base64.split(',')[1],
            mimeType
        },
    };
}


export const analyzeFridgeAndSuggestRecipes = async (imageDataUrl: string, dietaryPreferences: string[]): Promise<Recipe[]> => {
    const imageParts = [fileToGenerativePart(imageDataUrl, "image/jpeg")];

    const dietaryPrompt = dietaryPreferences.length > 0 ? `Please ensure all recipes are suitable for the following dietary needs: ${dietaryPreferences.join(', ')}.` : '';

    const prompt = `Analyze the ingredients in this image of a refrigerator. Based ONLY on the visible ingredients, suggest a few recipes. For each recipe, list ALL ingredients required, and accurately mark which ones are visible in the fridge ('inFridge: true') and which are not ('inFridge: false'). ${dietaryPrompt} Provide the output in the specified JSON format. If you cannot identify enough ingredients to form a recipe, return an empty array.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [...imageParts, { text: prompt }] },
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });

        const jsonText = response.text.trim();
        const recipes = JSON.parse(jsonText);
        return recipes as Recipe[];

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate recipes from the image.");
    }
};
