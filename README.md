# iKamand App

> The iKamand II is a smart BBQ controller that gives you full control of your Kamado Joe all from your smart device. The device attaches to the bottom vent of your kamado and controls the airflow in your grill with the iKamand app. From the app, you can start, stop, monitor and change your cook with ease. Grill or smoke using your own temperature and cook time, or choose from a variety of recipes included with the app. When an iKamand recipe is chosen, the cook time and temperature is automatically loaded to cook your food perfectly. The app also features constantly updated content, such as videos, tutorials and posts that will keep your kamado grillmastery at its peak. The iKamand starts up quickly and operates quietly. The device is also designed to hold up to four (4) temperature probes and to be weather resistant. All metal components are made of stainless steel. This model fits Kamado Joe Classic grills.

Although this seems fairly awesome, the makers - Kamado Joe/Desora - have discontinued the iKamand app and the Kamado Joe users have been left with a paper weight. Thanks to some great research though it was discovered that iKamand has an API that can be called directly to control it's functions.

This project is a web app that exposes the capabilities of iKamand to heat the Kamado Joe to a predefined temperature and has 2 main functions:
* Serve a single page application to control iKamand
* Forward HTTP requests to iKamand (needed because of CORS restrictions)

# Requirements

* A server to run the app (e.g. laptop, RaspberryPi)
  * [NodeJS](https://nodejs.org/en) installed (version `v10.24.1`)
* An iKamand already connected to your network
* The IP of the iKamand

# Deployment

To start, download this repo and run:

```sh
npm install
npm install -g pm2
pm2 start index.js --name "ikamand" -- -i <ip of your ikamand>
```

To stop run:

```sh
pm2 stop ikamand
```

To see the logs run:

```sh
pm2 logs ikamand
```

# Usage

* Access the web app on the server at `http://<serverip>:3000`
* The first chart displays the current/target pit temperature
* The second chart displays the current/target food temperature (chart will be hidden if probe data is not available)
* Click the `status` to turn on/off
* Click the `target pit temp` to adjust it
* Click the `target food temp` to adjust it

# Contributing

Sure - thank you for your help. Please open a PR and I'll look at it as soon as possible.

# Help Wanted

Yes, please:
* Improvements on styling and responsive behavior
* Support for the grill mode (fan at `100%` for some amount of time)

# Support

I'm happy to help - please open a issue and I'll look into it.

# Donations

I don't think this is something worth donating for and nothing is expected. If you want to show your appreciation however I am thankful for any `$1` you can afford through [http://paypal.me/marcobjorge](PayPal).

# Setup iKamand WiFi

A simple cURL command can be used to setup WiFi.

```sh
echo -ne "SSID> "
read ssid

echo -ne "PASS> "
read pass

curl 'http://192.168.10.1/cgi-bin/netset' \
  -H 'Accept: */*' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-raw "ssid=$(echo -ne $ssid | base64 | jq "@uri" -jRr)&pass=$(echo -ne $pass | base64 | jq "@uri" -jRr)&user=" \
  --compressed \
  --insecure
```

# Relevant/Related Projects

* [slinkymanbyday/ikamand](https://github.com/slinkymanbyday/ikamand) - Python package for communicating with the iKamand. Allows local interaction with the iKamand temperature controller.
* [ludekvodicka/ikamand](https://github.com/ludekvodicka/ikamand) - This app is a replacement for the iKamand application.
* [MichalBelobrad/ikamand-http](https://github.com/MichalBelobrad/ikamand-http/) - This utility can be used to monitor state and start/stop cooking sessions on ikamand devices.

