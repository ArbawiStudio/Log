const { Client, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Embed } = require('discord.js')
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent', 'GuildEmojisAndStickers', 'GuildMembers', 'GuildBans', 'GuildVoiceStates', 'GuildPresences', 'GuildMessageReactions'] })
const Config = { ChannelID: '1028255616533278751' }
const { inviteTracker } = require('discord-inviter')
const Invite = new inviteTracker(client)

client.on('messageDelete', async Message => {
    const Channel = Message.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setColor('#2f3136')
           .setTitle('Message Deleted')
           .setDescription(`Message has been Deleted by ${Message.author} at ${Message.channel}`)
           .addFields({ name: 'The Message', value: `\`\`\`${Message.content || 'Not Found the Message'}\`\`\``, inline: false })
           .setFooter({ text: Message.guild.name, iconURL: Message.guild.iconURL() })
           .setTimestamp()
       ] 
    })
}).on('messageUpdate', async(OldMessage, NewMessage) => {
    const Channel = OldMessage.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setColor('#2f3136')
           .setTitle('Message Updated')
           .setDescription(`Message has been Updated in ${OldMessage.channel} by ${OldMessage.author}`)
           .addFields({ name: 'Old Message', value: `\`\`\`${OldMessage.content}\`\`\``, inline: true })
           .addFields({ name: 'New Message', value: `\`\`\`${NewMessage.content}\`\`\``, inline: true })
           .setFooter({ text: OldMessage.guild.name, iconURL: OldMessage.guild.iconURL() })
           .setTimestamp()
    ], components: [
        new ActionRowBuilder()
           .addComponents(new ButtonBuilder() .setStyle(ButtonStyle.Link) .setLabel('Message URL') .setURL(NewMessage.url))
    ]})
}).on('channelCreate', async Channel => {
    const Log = Channel.guild.channels.cache.get(Config.ChannelID)
    if(!Log) return;
    Channel.guild.fetchAuditLogs().then((TOBZi) => {
        const ID = TOBZi.entries.first().executor.id;
        const Member = `<@${ID}>`;
        var Type;
        if(Channel.type === ChannelType.GuildCategory) {
            Type = 'Category';
        } else if(Channel.type === ChannelType.GuildText) {
            Type = 'Text Channel';
        } else if(Channel.type === ChannelType.GuildVoice) {
            Type = 'Voice Channel';
        } else if(Channel.type === ChannelType.GuildStageVoice) {
            Type = 'Stage Channel';
        } else if(Channel.type === ChannelType.GuildAnnouncement) {
            Type = 'Announcement Channel';
        } else if(Channel.type === ChannelType.PrivateThread) {
            Type = 'Private Thread Channel';
        } else if(Channel.type === ChannelType.PublicThread) {
            Type = 'Public Thread Channel';
        }

        Log.send({ embeds: [
            new EmbedBuilder()
               .setColor('#2f3136')
               .setTitle('Channel Created')
               .setDescription(`${Type} has been Created by ${Member} at <t:${parseInt(Channel.createdAt / 1000)}:R>`)
               .setFooter({ text: Channel.guild.name, iconURL: Channel.guild.iconURL() })
               .setTimestamp()
        ],
        components: [
            new ActionRowBuilder()
               .addComponents(
                  new ButtonBuilder() 
                    .setStyle(ButtonStyle.Link)
                    .setLabel('Channel Link')
                    .setURL(Channel.url)
                    .setDisabled(false))
        ]})
    }) 
}).on('channelDelete', async Channel => {
    const Log = Channel.guild.channels.cache.get(Config.ChannelID)
    if(!Log) return;
    Channel.guild.fetchAuditLogs().then((TOBZi) => {
        const ID = TOBZi.entries.first().executor.id;
        const Avatar = TOBZi.entries.first().executor.displayAvatarURL();
        const Member = `<@${ID}>`;
        var Type;
        if(Channel.type === ChannelType.GuildCategory) {
            Type = 'Category';
        } else if(Channel.type === ChannelType.GuildText) {
            Type = 'Text Channel';
        } else if(Channel.type === ChannelType.GuildVoice) {
            Type = 'Voice Channel';
        } else if(Channel.type === ChannelType.GuildStageVoice) {
            Type = 'Stage Channel';
        } else if(Channel.type === ChannelType.GuildAnnouncement) {
            Type = 'Announcement Channel';
        } else if(Channel.type === ChannelType.PrivateThread) {
            Type = 'Private Thread Channel';
        } else if(Channel.type === ChannelType.PublicThread) {
            Type = 'Public Thread Channel';
        }

        Log.send({ embeds: [
            new EmbedBuilder()
               .setColor('#2f3136')
               .setTitle('Channel Deleted')
               .setDescription(`${Type} Channel has been Deleted by ${Member}`)
               .setFooter({ text: Channel.guild.name, iconURL: Channel.guild.iconURL() })
               .setTimestamp()
        ]})
    }) 
}).on('channelUpdate', async(OldChannel, NewChannel) => {
    const Channel = OldChannel.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    var Type;
    if(Channel.type === ChannelType.GuildCategory) {
        Type = 'Category';
    } else if(Channel.type === ChannelType.GuildText) {
        Type = 'Text Channel';
    } else if(Channel.type === ChannelType.GuildVoice) {
        Type = 'Voice Channel';
    } else if(Channel.type === ChannelType.GuildStageVoice) {
        Type = 'Stage Channel';
    } else if(Channel.type === ChannelType.GuildAnnouncement) {
        Type = 'Announcement Channel';
    } else if(Channel.type === ChannelType.PrivateThread) {
        Type = 'Private Thread Channel';
    } else if(Channel.type === ChannelType.PublicThread) {
        Type = 'Public Thread Channel';
    }

    OldChannel.guild.fetchAuditLogs().then((Log) => {
        const ID = TOBZi.entries.first().executor.id;
        const Member = `<@${ID}>`;

        if(OldChannel.name !== NewChannel.name) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setTitle('Channel Name Update')
                   .setDescription(`${Member} has been Updated Channel Name of ${NewChannel}`)
            ]})
        } else if(OldChannel.topic !== NewChannel.topic) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setTitle('Channel Topic Update')
                   .setDescription(`${Member} has been Updated Channel Topic of ${NewChannel}`)
            ]})
        }
    })
}).on('ready', async() => {
    console.log(require('chalk').green.bold(`${client.user.username}`) + require('chalk').red.bold(' is Online!'))
}).on('voiceStateUpdate', async(OldVoice, NewVoice) => {
    const Channel = OldVoice.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;

    OldVoice.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Member = `<@${ID}>`;

        if(!OldVoice.channel && NewVoice.channel) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`**${OldVoice.member.user.username}** has been Joined ${NewVoice.channel}`)
            ]})
        }
    
        if(OldVoice.channel && !NewVoice.channel) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`**${OldVoice.member.user.username}** has been Leaved ${NewVoice.channel}`)
            ]})
        }
    
        if(OldVoice.channel && NewVoice.channel && OldVoice.channel.id !== NewVoice.channel.id) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`**${OldVoice.member.user.username}** has been Switched from ${OldVoice.channel} to ${NewVoice.channel}`)
            ]})
        }
    
        if(!OldVoice.streaming && NewVoice.streaming) {
            Channel.send({ embeds: [
                new EmbedBuilder() 
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`**${OldVoice.member.user.username}** has been Started Streaming in ${OldVoice.channel}`)
            ]})
        }
    
        if(OldVoice.serverMute === true && NewVoice.serverMute === false) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`${Member} has been Unmuted ${OldVoice.member.user}`)
            ]})
        }

        if(OldVoice.serverMute === false && NewVoice.serverMute === true) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`${Member} has been Muted ${OldVoice.member.user}`)
            ]})
        }

        if(OldVoice.serverDeaf === true && NewVoice.serverDeaf === false) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`${Member} has been Undeafen ${OldVoice.member.user}`)
            ]})
        }

        if(OldVoice.serverDeaf === false && NewVoice.serverDeaf === true) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldVoice.member.user.tag, iconURL: OldVoice.member.user.displayAvatarURL() })
                   .setDescription(`${Member} has been Deafen ${OldVoice.member.user}`)
            ]})
        }
    })
}).on('guildBanAdd', async Member => {
    const Channel = Member.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;

    Member.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Author = `<@${ID}>`;
        Channel.send({ embeds: [
            new EmbedBuilder()
               .setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL() })
               .setThumbnail(Member.user.displayAvatarURL())
               .setDescription(`:airplane_departure: ${Member} has been Banned from the Server by ${Author}`)
        ]})
    })
}).on('guildBanRemove', async Member => {
    const Channel = Member.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;

    Member.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Author = `<@${ID}>`;
        Channel.send({ embeds: [
            new EmbedBuilder()
               .setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL() })
               .setThumbnail(Member.user.displayAvatarURL())
               .setDescription(`:airplane_arriving: ${Author} has been Removed the Banned from ${Member}`)
        ]})
    })
}).on('roleCreate', async Role => {
    const Channel = Role.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Role.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Member = `<@${ID}>`;
        Channel.send({ embeds: [
            new EmbedBuilder()
               .setAuthor({ name: Role.guild.name, iconURL: Role.guild.iconURL() })
               .setDescription(`${Member} has been Created ${Role}`)
        ]})
    })
}).on('roleDelete', async Role => {
    const Channel = Role.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Role.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Member = `<@${ID}>`;
        Channel.send({ embeds: [
            new EmbedBuilder()
               .setAuthor({ name: Role.guild.name, iconURL: Role.guild.iconURL() })
               .setDescription(`${Member} has been Deleted ${Role}`)
        ]})
    })
}).on('roleUpdate', async(OldRole, NewRole) => {
    // Code  
}).on('guildMemberUpdate', async(OldMember, NewMember) => {
    const Channel = OldMember.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    OldMember.guild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Author = `<@${ID}>`;

        if(OldMember.roles.cache.size < NewMember.roles.cache.size) {
            const Role = NewMember.roles.cache.filter((R) => !OldMember.roles.cache.has(R.id)).first()
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldMember.guild.name, iconURL: OldMember.guild.iconURL() })
                   .setDescription(`${Author} has been Added ${Role} to ${NewMember.user}`)
            ]})
        } else if(OldMember.roles.cache.size > NewMember.roles.cache.size) {
            const Role = NewMember.roles.cache.filter((R) => !OldMember.roles.cache.has(R.id)).first()
            Channel.send({ embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: OldMember.guild.name, iconURL: OldMember.guild.iconURL() })
                  .setDescription(`${Author} has been Removed ${Role} from ${NewMember.user}`)
            ]})
        } else if(OldMember.nickname !== NewMember.nickname) {
            if(OldMember.nickname === null) {
                var OldNickname = 'Not Found';
            } else {
                var OldNickname = OldMember.nickname;
            }

            if(NewMember.nickname === null) {
                var NewNickname = 'Not Found';
            } else {
                var NewNickname = NewMember.nickname;
            }

            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: OldMember.guild.name, iconURL: OldMember.guild.iconURL() })
                   .setDescription(`${OldMember} has been Changed Nickname`)
                   .addFields({ name: 'Old Nickname', value: `\`\`\`${OldNickname}\`\`\``, inline: true })
                   .addFields({ name: 'New Nickname', value: `\`\`\`${NewNickname}\`\`\``, inline: true })
            ]})
        }
    })
}).on('messageReactionAdd', async Reaction => {
    const Channel = Reaction.client.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setAuthor({ name: Reaction.message.author.tag, iconURL: Reaction.message.author.displayAvatarURL() })
           .setDescription(`${Reaction.message.author} has been Added Reaction ${Reaction.emoji} in Message`)
    ], components: [
        new ActionRowBuilder()
           .addComponents(new ButtonBuilder() .setStyle(ButtonStyle.Link) .setLabel('Message URL'))
    ]})
}).on('messageReactionRemove', async Reaction => {
    const Channel = Reaction.client.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setAuthor({ name: Reaction.message.author.tag, iconURL: Reaction.message.author.displayAvatarURL() })
           .setDescription(`${Reaction.message.author} has been Removed Reaction ${Reaction.emoji} from Message`)
    ], components: [
        new ActionRowBuilder()
           .addComponents(new ButtonBuilder() .setStyle(ButtonStyle.Link) .setLabel('Message URL'))
    ]})
}).on('guildUpdate', async(OldGuild, NewGuild) => {
    const Channel = OldGuild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    OldGuild.fetchAuditLogs().then((Log) => {
        const ID = Log.entries.first().executor.id;
        const Tag = Log.entries.first().executor.tag;
        const Avatar = Log.entries.first().executor.displayAvatarURL();
        const Author = `<@${ID}>`;

        if(OldGuild.banner !== NewGuild.banner) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                  .setAuthor({ name: Tag, iconURL: Avatar })
                  .setDescription(`${Author} has been Changed New Banner for the Server`)
                  .setImage(NewGuild.bannerURL())
            ]})
        } else if(OldGuild.name !== NewGuild.name) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: Tag, iconURL: Avatar })
                   .setDescription(`${Author} has been Changed New Name for the Server`)
            ]})
        } else if(OldGuild.afkChannel !== NewGuild.afkChannel) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: Tag, iconURL: Avatar })
                   .setDescription(`${Author} has been Changed AFK Channel`)
                   .addFields({ name: 'Old AFK', value: `${OldGuild.afkChannel || 'No AFK Channel'}`, inline: true })
                   .addFields({ name: 'New AFK', value: `${NewGuild.afkChannel}`, inline: true })
            ]})
        } else if(OldGuild.afkTimeout !== NewGuild.afkTimeout) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: Tag, iconURL: Avatar })
                   .setDescription(`${Author} has been Changed New Timeout for AFK`)
                   .addFields({ name: `Old AFK Timeout`, value: `\`\`\`${OldGuild.afkTimeout || 'No Timeout'}\`\`\``, inline: true  })
                   .addFields({ name: 'New AFK Timeout', value: `\`\`\`${NewGuild.afkTimeout}\`\`\``, inline: true })
            ]})
        } else if(OldGuild.icon !== NewGuild.icon) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                   .setAuthor({ name: Tag, iconURL: Avatar })
                   .setDescription(`${Author} has been Changed Guild Avatar`)
                   .addFields({ name: 'Old Avatar', value: `[Old Avatar](${OldGuild.iconURL({ size: 4096 })})` })
                   .addFields({ name: 'New Avatar', value: `[New Avatar](${NewGuild.iconURL({ size: 4096 })})` })
            ]})
        } else if(OldGuild.premiumSubscriptionCount < NewGuild.premiumSubscriptionCount) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: Tag, iconURL: Avatar })
                    .setDescription(`${Author} has been Boosted the Server\nLevel: **${NewGuild.premiumTier}** | Boosts Count: **${NewGuild.premiumSubscriptionCount}**`)
            ]})
        } else if(OldGuild.premiumSubscriptionCount > NewGuild.premiumSubscriptionCount) {
            Channel.send({ embeds: [
                new EmbedBuilder()
                    .setAuthor({ name: Tag, iconURL: Avatar })
                    .setDescription(`${Author} has been Removed Boost from the Server\nLevel: **${NewGuild.premiumTier}** | Boosts Count: **${NewGuild.premiumSubscriptionCount}**`)
            ]})
        }
    })
}).on('guildMemberRemove', async Member => {
    const Channel = Member.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    if(Member.user.bot) return Channel.send({ embeds: [
        new EmbedBuilder()
           .setDescription(`${Member} | Oauth2 has been Kicked or Banned from the Server`)
    ]})
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setAuthor({ name: Member.user.tag, iconURL: Member.user.displayAvatarURL() })
           .setDescription(`${Member} has been Left.`)
    ]})
})

Invite.on('guildMemberAdd', async (Member, Inviter, Invite, Error) => {
    if(Error) console.error(Error)
    const Channel = Member.guild.channels.cache.get(Config.ChannelID)
    if(!Channel) return;
    if(Member.user.bot) return Channel.send({ embeds: [
        new EmbedBuilder()
           .setDescription(`${Member} | Oauth2 has been Invited by ${Inviter} (ID: ${Inviter.id})`)
    ]})
    Channel.send({ embeds: [
        new EmbedBuilder()
           .setTitle('Member Joined')
           .setDescription(`Member Joined the Server by ${Inviter}`)
           .setFields({ name: 'Joined Discord At', value: `<t:${parseInt(Member.createdAt / 1000)}:f>`, inline: true })
    ]})
})

client.login('OTEwMjQ2MTU0ODc1MzI2NTU1.GLxJGm.Wbr8NkzesUQKvF8NlbWiILsA0vkmk8-j-AFFFY')