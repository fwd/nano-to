# Nano.to dPoW

Easily scale any Nano application.

Standalone, GPU powered proof of work API for the Nano blockchain.

## Basic Usage

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

**Response (JSON):**
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

## Rate Limit

- 10 PoW / Per Minute.
- Unlimited [Prepaid PoW](https://pow.nano.to) @ Ӿ 0.01/PoW

## Free API Key

API keys offer more stable API response, and 10 Free PoW / Minute instead of 5. 

Visit: https://pow.nano.to - and click 'Free API Key' in top right. 

**Usage:**
```
https://pow.nano.to/:HASH?key=API_KEY
```

**or POST request:**
```javascript
axios.post('https://pow.nano.to', { 
    hash: 'HASH',
    key: 'API_KEY'
}).then((res) => {
    // console.log(res.data)
})
```

## CURL Example

```
curl https://pow.nano.to/:HASH | jq '.work'
```

## Difficulty

Proof of work is  ```fffffff800000000``` (or higher). Good for any Nano block.

> Providing your own ```difficulty``` is not supported. 

## Errors Happen

**Precache** work by requesting it, and storing it, before you need it.

- **Error 4XX**: Your fault.
- **Error 5XX**: Our fault.

**Code 400: Bad Request:**

```js
{ 
    "error": 400,  
    "message": "Missing Hash.",
    "docs": 'https://docs.nano.to/pow'
}
```

**Code 429: Exhausted Credits (No API Key):**

```js
{
    "error": 429,
    "message": "Too many requests. Please Wait."
}
```

**Code 500: No GPU available:**

```js
{
    "error": 500, 
    "message": "No GPU available. Try again in a few seconds."
}
```

**Code 501: Service Unavailable:**

```js
{
    "error": 501, 
    "message": "Service not available. Try again in a few minutes."
}
```

## Questions or Comments

- Email: support@nano.to
- Twitter: [@nano2dev](https://twitter.com/nano2dev)
- @nano2dev on [Nano's Discord](https://discord.com/invite/RNAE2R9) 
