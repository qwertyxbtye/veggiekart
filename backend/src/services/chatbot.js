// controllers/chatbot.controller.js
const axios = require('axios');

async function handleGetVegetables(req, res) {
  const { dish } = req.body;

  if (!dish) return res.status(400).json({ msg: "dish name is required" });

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: 'nvidia/nemotron-3-ultra-550b-a55b:free', // pick any free model from OpenRouter's list
        messages: [
          {
            role: "system",
            content: "You are a helpful cooking assistant for a vegetable grocery app called VeggiKart. Given a dish name, respond ONLY with a JSON object in this exact format: {\"vegetables\": [\"item1\", \"item2\"], \"note\": \"short friendly note\"}. List only vegetables (not spices, oils, or non-veg items) needed for the dish. Keep the note under 20 words. Return ONLY the JSON, no markdown formatting, no backticks."
          },
          {
            role: "user",
            content: dish
          }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        }
      }
    );

    const responseText = response.data.choices[0].message.content;
    const cleaned = responseText.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    res.status(200).json({ msg: "vegetables fetched", ...parsed });
  } catch (error) {
    console.log(error?.response?.data || error);
    res.status(500).json({ msg: "couldn't process that dish", error: error.message });
  }
}

module.exports = { handleGetVegetables };