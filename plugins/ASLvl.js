import { canLevelUp, xpRange } from '../lib/levelling.js'
import { levelup } from '../lib/canvas.js'

let handler = async (m, { conn }) => {
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        throw `
*╮───⊷ المستوي*
▢ الاسم : *${name}*
▢ المستوي : *${user.level}*
▢ الخبرة : *${user.exp - min}/${xp}*
▢ اللقب الحالي : _*${user.role}*_
*╯──────────⊷*

انت تحتاج الي *${max - user.exp}* *XP* 
لرفع مستواك ي وحش 🤩 هل يود؟
`.trim()
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
        let teks = `🎊 عاااااااااااااش  ${conn.getName(m.sender)}    المستوي:`
        let str = `
*╮──⊷ المستوى ⊶*
▢ المستوي السابق : *${before}*
▢ المستوي الحالي : *${user.level}*
▢ اللقب الجديد : _*${user.role}*_
*╯───────────⊶*

*_كلما تفاعلت معي كلما ارتفع مستوا خاصتك_*
`.trim()
        try {
            const img = await levelup(teks, user.level)
            conn.sendFile(m.chat, img, 'levelup.jpg', str, m)
        } catch (e) {
            m.reply(str)
        }
    }
}

handler.help = ['levelup']
handler.tags = ['xp']

handler.command = ['لفل', 'lvl', 'levelup', 'مستواي', 'مستوا'] 

export default handler
