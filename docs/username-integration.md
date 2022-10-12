# Username Registration API
 
You can register Usernames from inside your apps. Use case is offering Nano 'search and pay' in wallets, websites, and even in-game. 

## Base URL

```
https://api.nano.to/:USERNAME/lease
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
  address: 'NANO_ADDRESS_TO_PAY',
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
      value_raw: '6077440000000000000000000000000'
    },
    {
      value: '10.04892',
      title: '1 Year',
      value_raw: '10048920000000000000000000000000'
    },
    {
      value: '20.03362',
      title: '2 Years',
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

```js
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
  id: 'CHECKOUT_ID',
  success: true,
  block: 'E94A1F4613801A21AC7BF2B9EBD783D3...',
  json: 'https://api.nano.to/checkout/CHECKOUT_ID',
  username: {
    name: 'USERNAME',
    status: 'active',
    address: 'YOUR_ADDRESS',
    created: 'October 12, 2022',
    expires: 'October 14, 2022',
    created_unix: 1665600244,
    expires_unix: 1665773040
  }
}
```

## Dataset APIs

```
https://nano.to/known.json
```

```js
// npm install axios

const axios = require('axios')

axios.get('https://nano.to/known.json').then((res) => {
  console.log(res.data)
})
```

> Note: Github may take up to 5 minutes to update dataset.

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
  // { .. }
]
```

## Username Renewals

Renewals are just as easy. Lease can be extended at any time, but only the original address can pay for it.  

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/USERNAME/renew').then((res) => {
    console.log(res.data)
})
```

```json
{
    "id": "CHECKOUT_ID",
    "address": "NANO_ADDRESS_TO_PAY",
    "browser": "http://nano.to/pay_21071d51",
    "check_url": "https://api.nano.to/check/CHECKOUT_ID",
    "lease": "USERNAME",
    "plans": [
        {
            "value": "0.107145",
            "title": "2 Days",
            "value_raw": "107145000000000000000000000000"
        },
        // { .. }
    ],
}
```

## Weekend Discount

Every weekend, certain plans cost 50% less. Nano.to API automatically updates pricing. No code changes required on your behalf.

## Referral Payments

Earn up to 20% from any Username sale done through your app. Coming soon ™ 

## Questions or Comments 

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9)
