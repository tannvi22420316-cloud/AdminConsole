const express = require("express");

const router = express.Router();

router.post("/ask", async (req, res) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  console.log("Gemini route hit");
  console.log("API Key loaded:", !!API_KEY); 

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing API key" });
  }

  try {
    const prompt = req.body.prompt || "Hello";
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
      }
    );

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      return res.status(response.status).json({ error: `API request failed: ${response.statusText}`, details: errorText });
    }

    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      const text = await response.text();
      console.error("Failed to parse JSON:", parseError.message, "Response text:", text);
      return res.status(500).json({ error: "Invalid JSON response from API", details: text });
    }

    res.json(data);
  } catch (err) {
    console.error("Fetch Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;