let handler = async (m, {conn, usedPrefix}) => {
	
    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let user = global.db.data.users[who]
    let username = conn.getName(who)
    //let { wealth } = global.db.data.users[who]
    if (!(who in global.db.data.users)) throw `✳️ المستخدم غير مسجل في قاعدة بياناتي`

    var wealth = 'مسكين عالحديده😭'
     if (`${user.money}`           <= 3000){
            wealth = 'مسكين عالحديده😭'
      } else if (`${user.money}`   <= 60000){
            wealth = 'مطفر😢'
        } else if (`${user.money}` <= 350000){
            wealth = 'متوسط💸'
        } else if (`${user.money}` <= 8500000){
            wealth = 'مقروش💸💰'
        } else if (`${user.money}` <= 1500000){
            wealth = 'مليونير🤑'
        } else if (`${user.money}` <= 3000000){
            wealth = 'مليونير-متعدد🤑'
        } else if (`${user.money}` <= 10000000){
            wealth = 'ملياردير🤑🤑'
        }    
    
    conn.reply(m.chat, `🏦 *Bank | ${username}*

*▢💮 بيلي* : ${user.money}
*اجمالي الثروة:* ${wealth}

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
▢ *🛡️المــجــــد/خبرة* : _${user.exp}_
╯───────────⊶

*‼️ ملاحظه :* 
*يمكنك شراء 💎 الماس باستخدام الأوامر*
❏ *${usedPrefix}شراء* <. . .>
❏ *${usedPrefix}اشتر-الكل*

`, m, { mentions: [who] })  //${user.chicken}
}
handler.help = ['bank']
handler.tags = ['economy']
handler.command = ['bank', 'vault','بنك','البنك'] 

export default handler
