import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const { prompt, imageParts } = await request.json();
  
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const result = await model.generateContent([prompt, ...imageParts]);
    const text = result.response.text();

    return new Response(JSON.stringify({ text }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Gemini error:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}