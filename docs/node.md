# How to Setup a Nano Node

Installing and operating a Nano Node is easy with Docker.

## Before we start

Operating System: Ubuntu 18+
 
Minimum Recommended Specs: 

- 4 vCPU
- 8GB RAM
- 160GB SSD
- 1TB Data
- ON 24/7

>We assume you know how to "Spin up" a cloud server. If not, read this [article](https://docs.digitalocean.com/products/droplets/how-to/create/) first. 

<a href="https://m.do.co/c/f139acf4ddcb" target="_blank">

> Free $100 in DigitalOcean Credits (3 months of Node hosting), with this Nano.to referral link.

</a>

## 1. Prepare Server

SSH into the newly created Ubuntu server and prepare for install.

```
sudo apt-get -y update
sudo apt-get -y upgrade
```

Make sure you have these basic tools:

```
sudo apt-get -y install curl p7zip-full
```

## 2. Install [Docker](https://docs.docker.com/engine/install/ubuntu/)


Add Docker’s official GPG key:

```
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
```

Set up official repository:

```
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Install Docker:

```
sudo apt-get -y install docker-ce docker-ce-cli containerd.io
```

## 3. Install [Docker Composer](https://docs.docker.com/compose/install/)

Download Official release:

```
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Make it executable:

```
sudo chmod +x /usr/local/bin/docker-compose
```

Make it global:

```
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

## 4. Install [Nano Node Docker](https://github.com/lephleg/nano-node-docker)

Clone the Github:

```
cd ~ && git clone https://github.com/lephleg/nano-node-docker.git
```

Move into the directory:

```
cd nano-node-docker
```

Run setup with flags:

```
sudo ./setup.sh -f -s -t V23.1
```

<table>
    <tr>
        <th width="20px">Flag</th>
        <th width="180px">Argument</th>
        <th>Description</th>
    </tr>
    <tr>
        <td><b>-t</b></td>
        <td>Docker image tag</td>
        <td>Indicates the explicit tag for the <a href="https://hub.docker.com/r/nanocurrency/nano/tags" target="_blank">nanocurrency Docker image</a>. Required.</td>
    </tr>
    <tr>
        <td><b>-d</b></td>
        <td>your domain name</td>
        <td>Sets the domain name to be used. Required for SSL-enabled setups.</td>
    </tr>
    <tr>
        <td><b>-e</b></td>
        <td>your email address</td>
        <td>Sets your email for Let's Encrypt certificate notifications. Optional for SSL-enabled setups.</td>
    </tr>
    <tr>
        <td><b>-f</b></td>
        <td>-</td>
        <td>Enables fast-syncing by fetching the latest ledger and placing it into <i>/root/Nano/</i> inside <b>nano-node</b>
            container.</td>
    </tr>
    <tr>
        <td><b>-q</b></td>
        <td>-</td>
        <td>Quiet mode. Hides any output.</td>
    </tr>
    <tr>
        <td><b>-s</b></td>
        <td>-</td>
        <td>Prints the unecrypted seed of the node wallet during the setup (<b>WARNING:</b> in most cases you may want to avoid this
            for security purposes).</td>
    </tr>
</table>

**Optional: Setup SSL (Let's Encrypt)**

> Adding SSL is usually the most difficult step. If you encounter issues, see [Nano Node Docker](https://github.com/lephleg/nano-node-docker) on Github. 

For development and local use, HTTP is just fine. [Cloudflare](https://www.cloudflare.com/) is also a quick solution.

Setup SSL by passing the ```-d``` and ```-e``` flags.

```
sudo ./setup.sh -t V23.1 -d mydomain.com -e myemail@example.com
```


## 5. Congratulations 🎉

![](../assets/screenshot.png)

If you followed the previous steps correctly, you should have a fully functional Nano Node running. 

## Next Steps

You have two choices. 

- **A)** Leave it alone as a [Voting Representative](https://docs.nano.org/running-a-node/overview/), and don't touch it further.

- **B)** Build entire Applications on top of the Node. See below.

> Tip: Multiple Nodes, for different things are common.

## Build with Nano

There's more to a Nano Node, than just being a Rep. 

A Nano Node is a fully functional "Accountant". 

Think about that for a second. 

When you're coding and your Users need a 'balance'. **Just use the Blockchain**. Assign each User a custodial address from your Node. They can easily deposit by paying it, and you can "charge" the account on-demand. 

To "talk" with your "Accountant", use standard HTTP. We can use ```curl``` to test.

```
curl -g -d '{ "action": "telemetry" }' '[::1]:7076'
```

> Using ```curl``` we sent a **POST** request to our local network **[::1]** on port **7076**, where the Node is running thanks to Docker.

- Full list of RPC commands @ [Official RPC Docs](https://docs.nano.org/commands/rpc-protocol). 

## Move Nano via RPC

Before you can actually create custodial addresses and move Nano, you need to enable the [Wallet RPC](https://docs.nano.org/commands/rpc-protocol/#wallet-rpcs). It's disabled by default for security.

Edit the following file:

```
nano ~/nano-node-docker/nano-node/Nano/config-rpc.toml
```

Change ```enable_control``` to ```true```:

```
enable_control = true
```

Press ```CRLT + X``` to exit, then **'Y'** to save the file. 

- Full list of Wallet RPC commands @ [Official Wallet RPC Docs](https://docs.nano.org/commands/rpc-protocol)

## Upgrade Node

Because we used Docker to set it up, upgrading and downgrading is easy.

Navigate to original install path:

```
cd ~/nano-node-docker 
```

Run setup again, with desired version.

```
sudo ./setup.sh -t V23
```

Done!

- [List of all Node Versions](https://hub.docker.com/r/nanocurrency/nano/tags)

## Debugging

Errors will happen. We keep a [List of Possible RPC Errors](/rpc-errors). Have no fear. We have your back.

## Support

Stuck on something? Join the [Official Discord](https://discord.com/invite/RNAE2R9) for community support.

## Credits

* **[Nanocurrency](https://github.com/nanocurrency/nano-node)**
* **[Docker Official Docs](https://docs.docker.com/engine/install/ubuntu/)**
* **[Docker Composer Official Docs](https://docs.docker.com/compose/install/)**
* **[NANO Node Docker](https://github.com/lephleg/nano-node-docker)**
* **[NANO Node Monitor](https://github.com/NanoTools/nanoNodeMonitor)**
* **[jwilder/nginx-proxy](https://github.com/jwilder/nginx-proxy)**
* **[JrCs/docker-letsencrypt-nginx-proxy-companion](https://github.com/JrCs/docker-letsencrypt-nginx-proxy-companion)**
* **[v2tec/watchtower](https://github.com/v2tec/watchtower)**
