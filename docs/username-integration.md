# Username Integration

Nano.to Usernames can be registered in-app from other applications. This makes it easy to integrate into other projects. Common use case are offering a crypto 'search and pay' feature in websites, and even in-game currency with Nano.

## Base URL

**NEW:**
```
https://name.nano.to/:username
```
**OLD:**
```
https://name.nano.to/:username
```

```js
// npm install axios

const axios = require('axios')

axios.get('https://name.nano.to/fosse2').then((res) => {
	console.log(res.data)
})
```

```js
{
	"available": true,
	"username": "fosse2",
	"premium": false,
	"checkout": "https://api.nano.to/checkout/[HOSTED_CHECKOUT_ID]",
	"plans": [
		{
			"name": "1 Day",
			"amount": "0.4153219",
			"address": "[NANO.TO ADDRESS]",
			"rate": 2.41,
			"price": 1,
			"value": "2.41",
			"amount_raw": "[RAW_AMOUNT]",
			"href": "nano:[NANO.TO ADDRESS]?amount=[RAW_AMOUNT]",
			"qrcode": "[QRCODE_URI]",
			"expires": "April 11, 2022 10:02 PM",
			"expires_unix": 1649714537,
			"id": "[CHECKOUT_ID]",
			"check_url": "https://api.nano.to/[NANO.TO ADDRESS]/history/0.4153219?check=[CHECKOUT_ID]"
		},
		// {...}
	]
}
```

There's a lot to unpack. Essentially, use ```checkout``` if don't want to provide your own UI. Use ```plans``` to provide your own 'Dropdown' select UI. Every object inside ```plans``` is a unique Checkout. Each object brings a ```check_url``` which you can GET to check if payment went through.

> We recommended you provide a 'Loading' UI, while the person waits. Check the ```check_url``` immediately, and then every 5 seconds, if first time is not successful. In most cases the payment is confirmed immediately.

**Name is alreaddy taken, or not available:**

```
{
	"available": false,
	"status": "leased"
}
```

## Send Funds & Lease Username

If you're reading these docs, we assume you have your own means of programmatically sending funds to the provided address. Once you've done that use the ```check_url``` in the response to check if the payment was successful or not.

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/[NANO.TO ADDRESS]/history/0.4153219?check=[CHECKOUT_ID]').then((res) => {
	console.log(res.data)
})
```

```js
{ 
	"id": "6dd1f4o",
	"completed": true, 
	"hash": "[BLOCK_HASH]",
	"success_url": "https://api.nano.to/hash/[BLOCK_HASH]"
}
```

## Available @ /Known API

After a successful purchase, your Username will be immediately available throughout Nano.to.

```js
// npm install axios

const axios = require('axios')

axios.get('https://name.nano.to/known.json').then((res) => {
	console.log(res.data)
})
```

```js
[
	{
		"name": "fosse2",
		"address": "[YOUR_ADDRESS]",
		"created": "April 1, 2022",
		"expires": "April 1, 2024",
		"created_unix": 1648793880,
		"expires_unix": 1711952280
	},
	// {..}
]
```

## Questions or Comments? 

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)