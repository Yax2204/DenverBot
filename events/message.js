const Discord = require("discord.js");

module.exports = class {

    constructor (client) {
        this.client = client;
    }

    async run (message) {

        if(message.guild && !message.member){
            await message.guild.members.fetch(message.author.id);
        }

        let client = this.client;
        message.config = client.config;

        // Gets settings
        let settings = await client.functions.getSettings(client, message.channel);
        message.settings = settings;

        // Gets language
        let language = new(require(`../languages/${settings.language}.js`));
        message.language = language;

        // Gets message level
        let permLevel = await client.getLevel(message);
        message.permLevel = permLevel;

        // Check if the bot was mentionned
        if(message.content === `<@${client.user.id}>`){
            return message.channel.send(language.get("PREFIX_INFO", settings.prefix));
        }

        let prefix = await client.functions.getPrefix(message);
        if(!prefix){
            return;
        }
        
        let args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase();
        let cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
        if(!cmd){
            return;
        }

        if(cmd.guildOnly && message.guild){
            return message.channel.send(language.get("ERROR_COMMAND_GUILDONLY"));
        }

        if(permLevel < client.levelCache[cmd.conf.permLevel]) {
            return client.errors.perm(client.config.permLevels.find((l) => l.level === permLevel).name, client.levelCache[cmd.conf.permLevel], message);
        }

        cmd.run(message, args);

    }

};