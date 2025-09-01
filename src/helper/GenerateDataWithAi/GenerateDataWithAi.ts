import axios from "axios";

export const GenerateDataWithAi = async (command: string): Promise<string> => {
  try {
    const prompt = `Please work only on the command, no other instructions needed.
    Example:
    command: what is your name?
    response: My name is ChatGPT
    
    command = ${command}
    `;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("AI Response:", response);

    // Ensure valid response structure
    if (response.data?.candidates?.length > 0) {
      const cleanText =
        response.data.candidates[0]?.content?.parts?.[0]?.text?.trim();

      if (cleanText) {
        return cleanText;
      } else {
        throw new Error("No valid content received.");
      }
    } else {
      throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error("Failed to generate content with AI.");
  }
};
