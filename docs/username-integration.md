# In-App Username API
 
Offer Nano 'search and pay' in your apps. Receive 20% from Username purchases.

## Base URL

```
https://api.nano.to/:USERNAME/lease
```

**NodeJS Example:**

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/fosse72/lease').then((res) => {
    console.log(res.data)
})
```

**Available:**

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

**Unavailable:**

```js
{ 
  available: false
}
```

## Send Funds & Check Payment URL

Once you've sent funds for desired plan, do a GET request on the ```check_url``` in the response, to confirm payment. 

```js
// npm install axios

const axios = require('axios')

axios.get('https://api.nano.to/check/CHECKOUT_ID').then((res) => {
    console.log(res.data)
})
```

**Success:**

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

**Payment Not Found:**

```js
{ 
   error: 404, 
   message: 'Payment not found.'
}
```

## Dataset API

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


**Response:**

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

> Note: It may take up to 5 minutes for dataset to updated globally, when Usernames are purchased.

## Username Renewals

Renewals are just as easy. Lease can be extended at any time, but only by original address.

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
        }
    ]
}
```

## Weekend Discount

Every weekend, certain plans cost 50% less. Nano.to API automatically updates pricing. No code changes required on your behalf.

## Referral Payments

Coming soon. Earn up to 20% from any Username sale done through your app. 

## Referral Beta, Questions or Comments 

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9)
