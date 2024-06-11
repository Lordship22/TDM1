let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`
    conn.reply(m.chat, `
╮───⊷ *الرصـــيد* ⊶
▢ *📌الإسم* : _@${who.split('@')[0]}_
▢ *💎الماس* : _${user.diamond}_
▢ *🪙الذهب* : _${user.gold}_
▢ *🪨صخره* : _${user.rock}_
▢ *❓️قريبا* : _${user.emerald}_
▢ *⚜️اللقب* : _${user.role}_
▢ *⚕️الصحه* : _${user.health}_
▢ *🪵الخشب* : _${user.wood}_
▢ *🥤الجرعات* : _${user.potion}_
▢ *🔩حديد* : _${user.iron}_
▢ *💮البيلي* : _${user.money}_
▢ *🛡️المجد/خبرة* : _${user.exp}_
╯──────────────⊶

*‼️ ملاحظه :* 
*يمكنك شراء 💎 الماس باستخدام الأوامر*
❏ *${usedPrefix}شراء* <. . .>
❏ *${usedPrefix}اشتر-الكل*`, m, { mentions: [who] })
}
handler.help = ['balance']
handler.tags = ['econ']
handler.command = ['bal', 'البنك', 'diamond', 'balance'] 

export default handler
