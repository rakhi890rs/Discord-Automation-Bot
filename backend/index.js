require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");
const { GoogleGenAI } = require("@google/genai");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});


async function generateContent(prompt) {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    return response.text;
}


client.once("ready", () => {
    console.log("Bot is ready");
});


client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    try {
        const userMessage = message.content;

        const reply = await generateContent(userMessage);

        await message.reply(reply);

    } catch (error) {
        console.error(error);
        message.reply("Something went wrong ");
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);