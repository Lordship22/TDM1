let handler = async (m, { conn, text, participants, isAdmin, isOwner }) => {
    let users = participants.map(u => u.id).filter(v => v !== conn.user.jid)
    m.reply(`*🛑┇الــمـنـشــن الــجـمــاعــي┇🛑*

😞┇انا ك فلاح تعوب ارجو عدم 

*ارغو نشاط وحيوية :⇣*\n${text ? `${text}\n` : ''}\n╮━═══•⎔•.🪻.•⎔•═══━╭\n` + users.map(v => '│♪🐚 هرطقه @' + v.replace(/@.+/, '')).join`\n` + '\n╯━═══•⎔•.🪻.•⎔•═══━╰ \n ⬣━『¹𝐓𝐃𝐌-𝐁𝐎𝐭¹♥️¦ 誇り』━⬣', null, {
        mentions: users
    })
}

handler.help = ['tagall']
handler.tags = ['group']
handler.command = ['منشن']
handler.admin = true
handler.group = true

export default handler
