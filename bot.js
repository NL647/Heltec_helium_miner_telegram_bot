require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
const fetch = require("node-fetch")
const bot = new Telegraf(process.env.BOT_TOKEN)


let user = process.env.USERNAME
let pass = process.env.PASSWORD
//let url = 'http://192.168.1.57/apply.php'
let url = process.env.BOT_URL


bot.command('menu', (ctx) =>

  ctx.reply('Menu Command', Markup
    .keyboard([
        '/help',
        '/info',
         '/restart_device',
          '/restart_miner',
          '/bluetooth'
          ])
    .resize()
  )
)


bot.command("help", (ctx) => {
    console.log(ctx.from);
    bot.telegram.sendMessage(
        ctx.chat.id,
        
        `<b><u>Help</u></b> ❔:

        <b>ℹ️ Send /info  to get your miner info.</b>
        <b> Send /menu to display the menu.</b>
        <b>↪️ Send  restart_device  to restart the miner.</b>
        <b>↪️ Send /restart_miner to restart miner process.</b>
        <b>↪️ Send /bluetooth to start bluetooth pairing.`,

         {parse_mode: 'HTML'}
    );
});

bot.command('info', async(ctx) => {


    

    async function fetchMinerDataJSON() {
        const response = await fetch(url, {

            headers: {
                'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`, 'binary').toString('base64')
            }

        });

        const minerData = await response.json();
        console.log(minerData)
        return minerData;
    }

    fetchMinerDataJSON().then(minerData => {
        minerData; // fetched minerData
        ctx.telegram.sendMessage(ctx.message.chat.id,
            `📡   [<b><u> ${minerData.name} </u></b>]

        ---------------     
        🔌 <b>Relayed:</b> <code>${minerData.nettype}</code>  
        🔳 <b>Block:</b> <code>${minerData.block}</code>
        🔳 <b>Latest Block:</b> <code>${minerData.latest_block}</code>
        ---------------
        ⚙️ <b>Firmware:</b> <code>${minerData.firmware}</code>
        ⚙️ <b>Latest:</b> <code>${minerData.latest_firmware}</code>
        ---------------
        ⛏️ <b>Miner:</b> <code>${minerData.miner}</code>
        ⛏️ <b>Latest:</b> <code>${minerData.latest_miner}</code>
        ---------------
        💽 <b>Disk used:</b> <code>${minerData.disk_G}</code> GB
        💽 <b>% Disk used:</b> <code>${minerData.disk_p}</code> %
        ---------------
        💻 <b>Memory used:</b> <code>${minerData.mem}</code> GB
        💻 <b>% Memory used:</b> <code>${minerData.mem_p}</code> %
        🌡️ <b>Temperature:</b> <code>${minerData.temperature}</code> °C
        
        
        

                `, {parse_mode: 'HTML'},) 
    });

});

//ℹ️ <b>Update_miner ?:</b> <code>${minerData.updating_miner}</code>

bot.command("restart_device", async(ctx) => {

    (async() => {

        const rawResponse = await fetch('http://192.168.1.57/apply.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`, 'binary').toString('base64')
            },
            body: JSON.stringify({ "apply": "reboot" })
        });
        //const content = await rawResponse.json();

        //console.log(content);
    })();

    bot.telegram.sendMessage(
        ctx.chat.id,
        "Restarting The Device...."
    );

});

bot.command("restart_miner", async(ctx) => {

    (async() => {

        const rawResponse = await fetch('http://192.168.1.57/apply.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`, 'binary').toString('base64')
            },
            body: JSON.stringify({ "apply": "restartminer" })
        });
        //const content = await rawResponse.json();

        //console.log(content);
    })();

    bot.telegram.sendMessage(
        ctx.chat.id,
        "Restarting Miner Process...."
    );

});

bot.command("bluetooth", async(ctx) => {

    (async() => {

        const rawResponse = await fetch('http://192.168.1.57/apply.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${user}:${pass}`, 'binary').toString('base64')
            },
            body: JSON.stringify({ "apply": "ble" })
        });
        //const content = await rawResponse.json();

        //console.log(content);
    })();

    bot.telegram.sendMessage(
        ctx.chat.id,
        "Starting Bluetooth Pairing...."
    );

});

bot.launch();



