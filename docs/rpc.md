# Nano.to RPC API

This API gives you access to a public Nano node., without having to host one yourself. 

## Basic Usage


```js
axios.post('https://rpc.nano.to', { 
    action: "telemetry"
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

- 60 / Per Minute (1 / Second)
- Unlimited [Prepaid RPC](https://pow.nano.to) @ Ӿ 0.001/PoW

## Errors Happen

- **Error 4XX**: Your fault.
- **Error 5XX**: Our fault.

**Code 400: Bad Request:**

```js
{ 
    "error": 400,  
    "message": "Bad action provided.",
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

**Code 500: No Node available:**

```js
{
    "error": 500, 
    "message": "No Node available. Try again in a few seconds."
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
