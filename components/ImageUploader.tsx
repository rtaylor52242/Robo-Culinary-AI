import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (imageDataUrl: string) => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 mb-4">
          Robo Culinary AI
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          What's for dinner tonight? Snap a photo of your fridge, and let AI be your sous-chef!
        </p>
      </div>

      <form
        id="form-file-upload"
        className={`relative w-full max-w-lg h-64 border-4 border-dashed rounded-xl flex flex-col justify-center items-center transition-colors duration-300 ${dragActive ? 'border-green-400 bg-gray-700' : 'border-gray-500 hover:border-green-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isLoading}
        />
        <label htmlFor="input-file-upload" className={`h-full w-full flex flex-col justify-center items-center cursor-pointer ${isLoading ? 'cursor-not-allowed' : ''}`}>
          <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <p className="text-gray-300">
            <span className="font-semibold">Drag & drop</span> a photo of your fridge here
          </p>
          <p className="text-sm text-gray-400">or</p>
          <button
            type="button"
            onClick={onButtonClick}
            disabled={isLoading}
            className="mt-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-500"
          >
            Browse Files
          </button>
        </label>
      </form>
    </div>
  );
};

export default ImageUploader;