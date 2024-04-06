let handler = async (m, { participants }) => {
    // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    global.db.data.chats[m.chat].isBanned = true
    m.reply(' تم حظرك من استعمال البوت يا هرطوق لانك تخالف سياسة استعماله ♥ يمكنك سؤال احد المشرفين عن السبب   \n 😄!')
    // } else m.reply('Ada nomor host disini...')
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^حظر|ban$/i

handler.owner = true

export default handler
