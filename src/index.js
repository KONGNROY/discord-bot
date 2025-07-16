require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldState, newState) => {
    // Check if the channel is empty
    if (oldState.channel && oldState.channel.members.size === 0) {
        // Send HTTP request to n8n
        axios.post(process.env.N8N_URL, {
            // Add any data you want to send
            message: 'Voice channel ended',
        })
        .then(response => {
            console.log('Webhook triggered successfully:', response.data);
        })
        .catch(error => {
            console.error('Error triggering webhook:', error);
        });
    }
});

client.login(process.env.BOT_TOKEN);
