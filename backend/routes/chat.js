const express = require("express");
const OpenAI = require("openai");
const router = express.Router();
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const activeThreads = {};
const assistants = {
    1: "asst_ShN49wK6CP2r82qSDl2kxJuX", // Akane's Assistant
    2: "asst_987654321", // Eliot's Assistant
    3: "asst_112233445", // Emily's Assistant
    4: "asst_556677889", // Joe's Assistant
};

router.post("/", async (req, res) => {
    const { sessionId, message, contactId } = req.body;

    if (!message || !contactId) {
        return res.status(400).json({ error: "Message and Contact ID are required" });
    }

    try {
        let threadId = activeThreads[sessionId];
        if (!threadId) {
            const thread = await openai.beta.threads.create();
            threadId = thread.id;
            activeThreads[sessionId] = threadId;
        }

        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: message,
        });

        const assistantId = assistants[contactId] || assistants[3]; // Default to Emily's Assistant

        const run = await openai.beta.threads.runs.createAndPoll(threadId, {
            assistant_id: assistantId,
        });

        if (run.status === "completed") {
            const messages = await openai.beta.threads.messages.list(threadId);
            const assistantMessages = messages.data
                .filter((msg) => msg.role === "assistant")
                .map((msg) => msg.content[0].text.value);

            res.json({ response: assistantMessages[0] });
        } else {
            res.status(500).json({ error: "Assistant failed to generate a response." });
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to communicate with Assistant", details: error.message });
    }
});

module.exports = router;
