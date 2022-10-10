# Username Integration

Nano.to Usernames can be registered in-app from other apps. Common use case is offering a Nano 'search and pay' feature in websites, and even in-game currency.

## Base URL

**NEW:**

```
https://api.nano.to/:USERNAME/lease
```

**OLD:**

```
https://name.nano.to/:USERNAME
```

**NodeJS:**

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/fosse72/lease').then((res) => {
	console.log(res.data)
})
```

```js
{
  id: 'CHECKOUT_ID',
  address: 'NANO_TO_ADDRESS_TO_PAY',
  browser: 'http://nano.to/pay_CHECKOUT_ID',
  check_url: 'https://api.nano.to/check/CHECKOUT_ID',
  lease: 'USERNAME',
  available: true,
  history: 10,
  plans: [
    {
      value: '0.105112',
      title: '2 Days',
      value_raw: '105112000000000000000000000000'
    },
    {
      value: '6.07744',
      title: '1 Month',
      discount: 0,
      value_raw: '6077440000000000000000000000000'
    },
    {
      value: '10.04892',
      title: '1 Year',
      discount: 0,
      value_raw: '10048920000000000000000000000000'
    },
    {
      value: '20.03362',
      title: '2 Years',
      discount: 0,
      value_raw: '20033620000000000000000000000000'
    },
    {
      value: '100.09184',
      title: '10 Years',
      value_raw: '100091840000000000000000000000000'
    }
  ]
}
```

**Name is alreaddy taken, or not available:**

```
{ 
	available: false, 
	renew_url: 'https://api.nano.to/USERNAME/renew' 
}
```

## Send Funds & Check Payment

Once you've sent funds, do a GET request on the ```check_url``` in the response, to confirm payment.

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/check/CHECKOUT_ID').then((res) => {
	console.log(res.data)
})
```

```js
{ 
	"id": "CHECKOUT_ID",
	"completed": true, 
	"hash": "BLOCK_HASH"
}
```

## Available @ /Known API

```js
// npm install axios

const axios = require('axios')

axios.get('https://nano.to/known.json').then((res) => {
	console.log(res.data)
})
```

> Github takes up to 5 minutes to update dataset. Use ```https://api.nano.to/known.json``` for cache-less dataset. 

```js
[
	{
		"name": "USERNAME",
		"address": "YOUR_ADDRESS",
		"created": "April 1, 2022",
		"expires": "April 1, 2024",
		"created_unix": 1648793880,
		"expires_unix": 1711952280
	},
	// {..}
]
```

## Questions or Comments 

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9) 