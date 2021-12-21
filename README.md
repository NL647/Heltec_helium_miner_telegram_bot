# Heltec_helium_miner_telegram_bot
A telegram bot for heltec helium miner to get information about miner.

## Installation
- Create a bot on telegram and get the Bot token
- Edit the ".env" file with your information

- Node v14.18.1
- Tested on ubuntu 18.04


```bash
# Install'
npm install 
```
```bash
#Rename example.env to .env and add your information'
cp example.env .env 
```


```bash
#Run Bot
npm start
```

## Commands on Telegram app

```bash
# Display the  menu'
/menu

# Get miner information'
/info

#Get 10 last Lora logs
/lora_logs

#Start bluetooth pairing
/bluetooth

# Restart the device'
/restart_device

# Restart the miner process
/restart_miner

# Help
/help
```


<img src="assets/image1.jpeg" width="250"/>



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
