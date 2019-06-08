const e = require("../config.js").emotes;

module.exports = class {
    constructor(...args) {
		this.language = {

		PREFIX_INFO: (prefix) => `${prefix.length > 0 ? `${e.info} | My prefix on this server is \`${prefix}\` !` : `${e.info} | No prefix. Simply type the command without prefix !`}`,		
		NO_DESCRIPTION_PROVIDED: "No description defined",
		NO_USAGE_PROVIDED: "No defined use",
		NO_EXAMPLES_PROVIDED: "No example defined",	

		ERROR_PERMISSIONS_TITLE: `${e.error} Insufficient permissions`,
		ERROR_PERMISSIONS_CONTENT: (lvl, rlvl) => `This command requires the permission level \`${rlvl}\` and you only have the level \`${lvl}\` !`,		
		ERROR_COMMAND_GUILDONLY: `${e.error} | This command is unavailable in private messages!`,		

		PING_DESCRIPTION: "Just answer pong",
		PING_USAGE: (prefix) => `${prefix}ping`,
		PING_EXAMPLES: (prefix) => `${prefix}ping`,
		PING_PONG: "Pong !",	

		INVITE_DESCRIPTION: "Gives the invitation to add the bot on a server",
		INVITE_USAGE: (prefix) => `${prefix}invite`,
		INVITE_EXAMPLES: (prefix) => `${prefix}invite`,
		INVITE_FIELD: "Invitation",
		INVITE: "[Click-here](https://discordapp.com/oauth2/authorize?client_id=390231727554953216&scope=bot&permissions=66321471) to invite the bot to your discord server.",
		
		AVATAR_DESCRIPTION: "Gives the avatar of the requested user",
		AVATAR_USAGE: (prefix) => `${prefix}avatar (@user)`,
		AVATAR_EXAMPLES: (prefix) => `${prefix}avatar @Denver`,
		AVATAR_TITLE: "Avatar of"


        };
    }
    /**
	 * The method to get language strings
	 * @param {string} term The string or function to look up
	 * @param {...*} args Any arguments to pass to the lookup
	 * @returns {string|Function}
	 */
	get(term, ...args) {
		const value = this.language[term];
		switch (typeof value) {
			case "function": return value(...args);
			default: return value;
		}
	}
}