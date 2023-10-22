const express = require('express');
const { TextServiceClient } = require('@google-ai/generativelanguage');
const { GoogleAuth } = require('google-auth-library');

const app = express();

app.use(express.json()); // for parsing application/json

app.post('/generateText', async (req, res) => {
    const MODEL_NAME = "models/text-bison-001"
    const API_KEY = "AIzaSyAzE_rw-kax277_WZPtWixyauZqsoL2bqQ" // Your Google API Key

    const client = new TextServiceClient({
       authClient: new GoogleAuth().fromAPIKey(API_KEY),
    });

    // your input and other parameters from the request body
    const { input, temperature, candidateCount, top_k, top_p, max_output_tokens, safety_settings, stop_sequences } = req.body;

    const promptString = "Here is a passage: ${input} Choose 12 key terms from the passage and give a comprehensive and detailed explanation of them in the context of the passage. Choose key terms that people might need more information on, rather than well-known terms. If there is jargon, terminology, or people’s names, be sure to include them in the key terms and explain thoroughly. List the key terms in a bulleted list, each term occupying one bullet. Choose a minimum of 12 key terms. You have to cite your source for a bullet point in that bullet point, and nowhere else. Do this in the style of someone who is knowledgeable in many topics and likes citing their sources immediately. Make sure to use trustworthy sources and give your sources as links. The key term selected, the explanation for said key term, and the source for it should live in the same bullet point.  So, it should be in the form: - Key Term=Explanation for the key term, source";
  // continue your prompt

    try {
       const result = await client.generateText({
          model: MODEL_NAME,
          temperature: temperature,
          candidateCount: candidateCount,
          top_k: top_k,
          top_p: top_p,
            max_output_tokens: max_output_tokens,
          stop_sequences: stop_sequences,
          safety_settings: safety_settings,
          prompt: {
                text: promptString,
          },
       });

       res.json(result);
    } catch (error) {
       res.status(500).json({ error: error.toString() });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port ${port})");
