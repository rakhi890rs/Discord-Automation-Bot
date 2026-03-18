require("dotenv").config();
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,   //know ur server
        GatewayIntentBits.GuildMessages,  //know when someone message
        GatewayIntentBits.MessageContent    // see the actual text
    ]
});

client.once("ready", () => {
    console.log("Bot is ready ");
});

client.on("messageCreate", (message) => {
    console.log(`Message received: ${message.content}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);