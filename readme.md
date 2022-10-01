![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">Nano Name Service</h1>
<h3 align="center">Hosted on Github</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<p align="center">
  <img src="https://github.com/fwd/nano/raw/master/dist/images/banner.png" alt="Nano.to" />
</p>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Quick Links

- **Nano.to Usernames (Github)**
  - [Register Username](#register-username)
  - [Renew Username](#username-renewal)
  - [Username Dataset](#username-dataset)

- **Nano.to Checkout (Github)**
  - [Non-Custodial Checkout](#non-custodial-checkout-pages)
  - [Customize Checkout Color](#customize-checkout)
  - [Checkout Funding Meter](#checkout-funding-ui)
  - [Checkout Backend API](#checkout-via-post)

- **Api.Nano.To**
  - [Live Fiat Price API](#price-api)

- **PoW.Nano.To**
  - [Proof of Work API](#pow-api)
  - [Get PoW API Key](https://pow.nano.to)

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Non-Custodial Checkout Pages

Nano.to is not just a Username service. It's also a highly customizable hosted Checkout page. This works by checking the ```pending``` and ```history``` of any given Nano address. Works with any Address or Username.

**Any Address (Free):**
```python
https://nano.to/:ADDRESS
```

**Nano.to Username:**
```python
https://nano.to/@Development
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Single Panel Checkout

```python
https://nano.to/@Keeri?amount=50&random=true
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/single-ui.png" alt="Single Panel UI" />

### Double Panel Checkout

```python
https://nano.to/@Moon?plans=Tip:0.133,Small:1,Medium:10,Large:20
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/double-ui.png" alt="Single Panel UI" />

## Customize Checkout Color

```python
https://nano.to/@Keeri
?background=$0057b7:$ffd700
&color=$FFF:$000
&highlight=white
&vanity=$0057b7
&qrcode=white:$0057b7
&logo=https://nano.to/dist/logo/cyber.png
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/slava-ui.png" alt="Single Panel UI" />

### Available Options

- **amount** (number) : Single panel with price. No plans.
- **goal** (string) : Show a funding UI with Goal & Received.
- **plans** (string) : Plans separated by commas. Ex. Tip:30,Small:5
- **image** (image/url) : Display Image. Image URL.
- **random** (boolean) : Add random decimal to amount. Ex + 0.00XXXX
- **color** (string) : Text color. Ex red:blue
- **background** (string) : Background color. Ex white:gray
- **highlight** (string) : Box backgrounds value. Ex blue:red
- **qrcode** (string) : QR Code colors. Ex white:black
- **logo** (image/url) : Replace QR Code logo. Image URL.
- **cancel** (string) : Redirect URL when pressed 'Cancel'
- **success** (string) : Redirect URL on success.

**In-Development:**
- **currency** (string) : ISO Currency Symbol. Ex JPY

### Checkout Funding UI

```python
https://nano.to/@Basedlemahieu?goal=100
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/funding.png" alt="Single Panel UI" />

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Checkout  via POST

**Nano.to Checkout UI** is hosted on Github, and can be used without a backend. When you need to use sensitive data use this api. 

```js
const http = require('axios')

http.post('https://api.nano.to', {
  address: '@keeri',
  background: '#0057b7,#ffd700',
  webhook_url: 'https://example.com/secret/endpoint',
  success_url: 'https://example.com/success?hash={{hash}}',
  metadata: { userId: 'joe-mama', password: "Slava Ukraini" },
}).then((res) => {
  console.log( res.data )
})
```

**Response**

```json
{
  "id": "f745ffa3",
  "browser": "https://nano.to/id_f745ffa3",
  "json": "https://api.nano.to/checkout/f745ffa3",
  "check": "https://api.nano.to/checkout/f745ffa3/check"
}
```

### POST Only Options

- **webhook_url** (number) : URL to receive succesful payment metadata.
- **metadata** (number) : Object with any kind of JSON data.

> You can perform GET requests on ```check``` URL to check for payment, or redirect user to ```browser``` URL to have users use included Checkout UI. 
 
**POST Body:**

```json
{
  "id": ":CHECKOUT_ID",
  "block": {
    "hash": ":PAYMENT_HASH",
    "account": ":SENDER_ADDRESS",
    "amount": "10991300000000000000000000000",
    "amount_nano": "0.0109913"
  },
  "plan": {
    "title": "Default",
    "value": "0.0109913",
    "value_raw": "10991300000000000000000000000"
  },
  "metadata": {
    "userId": "joe-mama",
    "password": "Slava Ukraini"
  },
  "checkout": "https://api.nano.to/checkout/:CHECKOUT_ID"
}
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Register Username

To register a Username, visit https://nano.to and search for your desired Username. 

- Letters, numbers, and up to 30 characters.
- Multiple Uernames w/ same Address is allowed.
- Nano.to Faucet pays ~ 0.001 Nano, [every 24 hours](/faucet). 

## Username Renewal 

Add time to your lease by visting:

```
https://nano.to/:USERNAME/renew
```

> Only original address may add time. If you need to change Username address, contact: [support@nano.to](mailto:support@nano.to)

## Username Grace Period

Usernames have **10 day** after expiration where only the original address may renew.

## Username Dataset

We actively encourage other developers to add [Nano.to Usernames](/username-advanced) to their apps. This makes your Nano address "findable by Username" on a growing list of applications & games. 

```pthon
https://nano.to/known.json
```

> If privacy is your thing, don't get a Username for a particular address, and avoid the publicity.


![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### PoW API

Standalone, GPU powered proof of work API for the Nano blockchain. Easily scale any Nano application.

**GET Request:**

```python
https://pow.nano.to/:HASH
```

**or POST request:**

```javascript
axios.post('https://pow.nano.to', { 
    hash: 'HASH'
}).then((res) => {
    // console.log(res.data)
})
```

> Nano.to PoW API is a drop-in replacement for dPoW.

**Response:**

```json
{
    "difficulty": "fffffffbc3b93c36",
    "multiplier": "1.888817235874546",
    "work": "157ad78255c73cae",
    "frontier": "277FD6365DF608D601F18F464926B600B15F6CD705A90E2239F55E9F86E7B38F",
    "remaining": 4,
    "cached": false,
    "duration": "0.201s",
    "server": "Nano.to/GPU-4"
}
```

### Rate Limit

- 5 Free / Minute (\~0.3s Response Time)
- 10 Free / Minute (with [Free API Key](https://pow.nano.to?new=true))
- Unlimited PoW @ 0.01 NANO each.

More Info: https://pow.nano.to

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Price API

```pthon
https://api.nano.to/price
```

```json
{
  "price": 5.3012,
  "symbol": "XNO",
  "currency": "USD"
}
```

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Support

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

## Contributing

Give a ⭐️ if this project helped you!

Contributions, issues and feature requests are welcome at [issues page](https://github.com/fwd/nano-to/issues).

## License

**Limited Commercial Use:**

- ✅ Personal & Open Source
- ✅ Commercial use where Nano.to Usernames and/or Checkout is **NOT** the end-product.
- ❌ Commercial use where Nano.to Usernames and/or Checkout **IS** the end-product.

Contact [@nano2dev](mailto:support@nano.to) for Usage/Licensing questions.

## Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-to.svg)](https://github.com/fwd/nano-to)
