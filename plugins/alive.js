import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
  let caption = `
╭────────────────────
│👋 مرحب كبير , ${conn.getName(m.sender)}!
│🤖 ارغو بخير ♥️ يبدو متصل أون لاين الآن 
يمكنك إستخدامه عبر كتابة menu.
╰────────────────────
*─[ BY 𝐒𝐔𝐋𝐓𝐀𝐍-𝕷 🩵 ¦ 誇り ]*🌟✨
`.trim()
  m.reply(caption)
}
handler.help = ['alive']
handler.tags = ['infobot']
handler.command = /^(alive)$/i


export default handler
