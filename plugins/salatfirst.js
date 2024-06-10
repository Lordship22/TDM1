export async function before(m) {
    this.autosholat = this.autosholat ? this.autosholat : {};
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? this.user.jid : m.sender;
    let name = await this.getName(who);
    let id = m.chat;
    if (id in this.autosholat) {
        return false;
    }
    let jadwalSholat = {
        الفجر: "04:10",
        الضحى: "06:10",
        الظهر: "12:20",
        العصر: "15:39",
        المغرب: "19:03",
        العشاء: "20:33"
    };
    const date = new Date(new Date().toLocaleString("en-US", {
      timeZone:"Asia/Makkah"
    }));
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeNow = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    for (const [sholat, waktu] of Object.entries(jadwalSholat)) {
        if (timeNow === waktu) {
            let caption = `تدمير هنا  *${name}*,\nحان موعد صلاة *${sholat}* هيا توضأ بسرعة وقوم لصلاتك♥لا تنسنا من الدعاء هاه.\n\n*${waktu}*\n_هذا توقيت الصلاة في مكة المكرمه_`;
            this.autosholat[id] = [
                this.reply(m.chat, caption, null),
                setTimeout(() => {
                    delete this.autosholat[id];
                }, 57000)
            ];
        }
    }
}
