### The Features 

```
----------------------------------------------------------------------------------------------------------------
                 The Feature Name                         :                          Event Name                    
----------------------------------------------------------------------------------------------------------------

▸ Member Joined (Inviter)                                 :                        (guildMemberAdd)
▸ Member Leaved Server                                    :                        (guildMemberRemove)
▸ Member Joined Voice Channel                             :                        (voiceStateUpdate)
▸ Member Leaved Voice Channel                             :                        (voiceStateUpdate)
▸ Member Start Streaming in Voice Channel                 :                        (voiceStateUpdate)
▸ Member Stopped Streaming in Voice Channel               :                        (voiceStateUpdate)
▸ Member Switched from Voice Channel to Voice Channel     :                        (voiceStateUpdate)
▸ Member has been Muted                                   :                        (voiceStateUpdate)
▸ Member has been Unmuted                                 :                        (voiceStateUpdate)
▸ Member has been Deafen                                  :                        (voiceStateUpdate)
▸ Member has been Undeafen                                :                        (voiceStateUpdate)  
▸ Channel Create                                          :                        (channelCreate)
▸ Channel Delete                                          :                        (channelDelete)
▸ Channel Name & Topic Update                             :                        (channelUpdate)
▸ Message Update                                          :                        (messageUpdate)
▸ Message Delete                                          :                        (messageDelete)
▸ AFK Channel & Timeout Update                            :                        (guildUpdate)
▸ Banner & Name & Avatar Server Update                    :                        (guildUpdate)
▸ Role Create                                             :                        (roleCreate)
▸ Role Update                                             :                        (roleUpdate)
▸ Role Delete                                             :                        (roleDelete)
▸ Member Boosted the Server                               :                        (guildUpdate)
▸ Member Removed the Server Boost                         :                        (guildUpdate)
▸ Member has been Banned from the Server                  :                        (guildBanAdd)
▸ Member Nickname Update                                  :                        (guildMemberUpdate)
▸ Member Role Add                                         :                        (guildMemberUpdate)
▸ Member Role Removed                                     :                        (guildMemberUpdate)
▸ Member Add Reaction to Message                          :                        (messageReactionAdd)
▸ Member Removed Reaction from Message                    :                        (messageReactionRemove)
```

### Config

```js
module.exports = {
    Token: process.env.Token,
    ChannelID: ''
}
```
