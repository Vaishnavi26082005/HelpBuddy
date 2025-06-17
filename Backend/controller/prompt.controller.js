import dotenv from "dotenv";
import { Prompt } from "../model/prompt.model.js";

dotenv.config();

export const sendPrompt = async (req, res) => {
  const { content } = req.body;
  const userId=req.userId;


  if (!content || content.trim() === "")
    return res.status(400).json({ errors: "Prompt content is required" });

  try {
    // Save the user prompt to DB
    await Prompt.create({
      role: "user",
      content,
      userId:userId
    });

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://your-site-url.com", // Optional
        "X-Title": "YourSiteName",                   // Optional
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1-0528:free",
        messages: [{ role: "user", content }]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);
      return res.status(500).json({ error: "Failed to get response from OpenRouter" });
    }

    const aiContent = data.choices?.[0]?.message?.content;

    // Save the AI response to DB
    await Prompt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });

  } catch (error) {
    console.error("Error in prompt:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
};
