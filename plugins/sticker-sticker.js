import fetch from 'node-fetch'
import { addExif } from '../lib/sticker.js'
import { sticker } from '../lib/sticker.js'
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker } from 'wa-sticker-formatter'
let handler = async (m, { conn, args, usedPrefix, command }) => {
let stiker = false
try {
let [packname, ...author] = args.join` `.split`|`
author = (author || []).join`|`
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || q.mediaType || ''
if (/webp/g.test(mime)) {
let img = await q.download?.()
stiker = await addExif(img, packname || global.packname, author || global.author)
} else if (/image/g.test(mime)) {
let img = await q.download?.()
stiker = await createSticker(img, false, packname || global.packname, author || global.author)
} else if (/video/g.test(mime)) {
let img = await q.download?.()
stiker = await mp4ToWebp(img, { pack: packname || global.packname, author: author || global.author })
} else if (args[0] && isUrl(args[0])) {
stiker = await createSticker(false, args[0], '', author, 20)
} else throw `*يجب ان ترسل صورة او فيديو او GIF ${usedPrefix + command}*`
} catch {
try {
stiker = await sticker(img, false, global.packname, global.author)
if (!stiker) {
if (/webp/g.test(mime)) out = await webp2png(img)
else if (/image/g.test(mime)) out = await uploadImage(img)
else if (/video/g.test(mime)) out = await uploadFile(img)
if (typeof out !== 'string') out = await uploadImage(img)
stiker = await sticker(false, out, global.packname, global.author)
} else if (args[0]) {
if (isUrl(args[0])) stiker = await sticker(false, args[0], global.packname, global.author)
else return m.reply('*[❗𝐈𝐍𝐅𝐎❗] 𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝚄𝚁𝙻 / 𝙻𝙸𝙽𝙺 𝙽𝙾 𝙴𝚂 𝚅𝙰𝙻𝙸𝙳𝙰, 𝙻𝙰 𝚃𝙴𝚁𝙼𝙸𝙽𝙰𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙴𝙽𝙻𝙰𝙲𝙴 / 𝚄𝚁𝙻 / 𝙻𝙸𝙽𝙺 𝙳𝙴𝙱𝙴 𝚂𝙴𝚁 .𝚓𝚙𝚐, 𝙴𝙹𝙴𝙼𝙿𝙻𝙾: #s https://telegra.ph/file/0dc687c61410765e98de2.jpg*')
}} catch {  
stiker = '*يجب ارسال صوره او فيديو لصنعة ملصق منها👀⌛!!*'	
}} finally {
m.reply(stiker)}}
handler.help = ['sfull']
handler.tags = ['sticker']
handler.command = /^ملصق(tic?ker)?(gif)?(ملصق)?$/i
export default handler
const isUrl = (text) => text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
async function createSticker(img, url, packName, authorName, quality) {
let stickerMetadata = { type: 'full', pack: packName, author: authorName, quality }
return (new Sticker(img ? img : url, stickerMetadata)).toBuffer()}
async function mp4ToWebp(file, stickerMetadata) {
if (stickerMetadata) {
if (!stickerMetadata.pack) stickerMetadata.pack = '‎'
if (!stickerMetadata.author) stickerMetadata.author = '‎'
if (!stickerMetadata.crop) stickerMetadata.crop = false
} else if (!stickerMetadata) { stickerMetadata = { pack: '‎', author: '‎', crop: false }}
