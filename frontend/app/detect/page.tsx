"use client";

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function Detect() {
    const [files, setFiles] = useState([]);
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(',')[1]);
        reader.onerror = error => reject(error);
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        const imageParts = await Promise.all(
          files.map(async (file) => ({
            inlineData: {
              data: await convertToBase64(file),
              mimeType: file.type
            }
          }))
        );
  
        const response = await fetch('/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: "Is The given Image a Fake Indian Rupee Note or a Orginal One? If the Given image is not a rupee note, please tell me to upload a rupee note image",
            imageParts
          }),
        });
  
        const data = await response.json();
        setResponse(data.text);
      } catch (error) {
        console.error('Error:', error);
        setResponse('An error occurred while processing your request');
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-black text-white p-4">
        <h1 className="text-2xl font-bold">Fake Note Detector</h1>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8">Detect Fake Notes</h2>
        <div className="mb-6">
          <label htmlFor="image-upload" className="block mb-2 font-semibold">
            Upload Currency Note Image
          </label>
          <form onSubmit={handleSubmit}>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="block w-full text-sm mb-4 text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-black file:text-white
              hover:file:bg-gray-800"
          />
       
        <button
         type="submit" 
         disabled={isLoading || files.length === 0}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
           {isLoading ? 'Detecting...' : 'Detect'}
        </button>
        </form>
        {response && (
        <div className="response-container">
          <h2>Generated Response:</h2>
          <p className="response-text">{response}</p>
        </div>
      )}
        </div>
        <div className="mt-8">
          <Link href="/" className="text-black hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}

