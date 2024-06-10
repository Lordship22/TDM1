//import db from '../lib/database.js'
import { canLevelUp } from '../lib/levelling.js'

export async function before(m, { conn }) {
    let user = global.db.data.users[m.sender]
    if (!user.autolevelup)
        return !0
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier))
        user.level++
    user.role = global.rpg.role(user.level).name
    if (before !== user.level) {
        m.reply(`
*▢ بوركت اقسم🔥 المستوي الجديد*

*╮──⊷ _🎊 عاااااش_ ⊶*
▢ المستوي السابق : _*${before}*_
▢ المستوي الحالي : _*${user.level}*_
▢ اللقب الجديد : _*${user.role}*_
*╯──────────────⊶*

*_كلما تفاعلت معي كلما ارتفع مستوا خاصتك🫡_*
 
 _لتعطيل الميزه_
_*/off autolevelup*_
	`.trim())
    }
}
