# QURAN-Discord-bot
A simple Discord bot built with JavaScript that sends a random ayah from the Quran to a channel every 20 minutes. Useful for Islamic servers to share spiritual reminders regularl


- Sends a random ayah from the Quran every 20 minutes
- Easy to deploy and customize
- Built with Node.js and Discord.js

## 🔧 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quran-ayah-discord-bot.git
cd quran-ayah-discord-bot



1. Install Node.js and npm
---



2. Initialize the Project
Open a terminal in your project folder and run:

npm init -y
---



3. Create a .env File
In the root of your project folder, create a file named .env, and add the following:

TOKEN=your_token_here
CHANNEL_ID=your_channel_id_here

 Replace your_token_here with your actual Discord bot token, and your_channel_id_here with the ID of the channel where the bot should send messages.
---




4. Install Dependencies
Run the following commands:

npm install discord.js
npm install node-fetch
npm install express
---

 5. Run the Bot
Make sure your main file (e.g., index.js) is ready, then run:

node index.js
