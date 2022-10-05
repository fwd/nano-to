## Nano.to Checkout Page

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
- **plans** (string) : Plans separated by commas. Ex. Tip:30,Small:5
- **selected** (string) : Title of Plan to select by default.
- **goal** (string) : Show a funding meter based off balance.
- **image** (image/url) : Display Image. Image URL.
- **random** (boolean) : Add random decimal to amount. Ex + 0.00XXXX
- **color** (string) : Text color. Ex red:blue
- **background** (string) : Background color. Ex white:gray
- **highlight** (string) : Box backgrounds value. Ex blue:red
- **qrcode** (string) : Replace QR Code color. Ex white:black
- **logo** (image/url) : Replace QR Code logo. Image URL.
- **cancel** (string) : Redirect URL when pressed 'Cancel'
- **redirect** (string) : Redirect URL on success.

**In-Development:**
- **currency** (string) : ISO Currency Symbol. Ex JPY

### Checkout Funding UI

```python
https://nano.to/@Basedlemahieu?goal=100:Funding Goal
```

<img src="https://github.com/fwd/nano/raw/master/dist/images/funding.png" alt="Single Panel UI" />

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Checkout via POST

**Nano.to Checkout UI** is hosted on Github, and can be used without a backend. When you need to provide senstive information such as ```webhook_url``` and ```metadata```, thats were this API comes in handy.

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

**POST Only Options**

- **webhook_url** (string) : URL to receive succesful payment metadata.
- **metadata** (object) : Object with any kind of JSON data.


**Response**

```json
{
  "id": "f745ffa3",
  "browser": "https://nano.to/id_f745ffa3",
  "json": "https://api.nano.to/checkout/f745ffa3",
  "check": "https://api.nano.to/checkout/f745ffa3/check"
}
```

> Perform a GET request on ```check``` URL to check for payment, or redirect user to ```browser```.
 
**Webhook Body:**

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

## Support

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9) 

![line](https://github.com/fwd/n2/raw/master/.github/line.png)