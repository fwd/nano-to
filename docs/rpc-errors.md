## Common RPC Errors

**'Gap source block'**

<p>When trying to make a "receive" type state block, the corresponding send-block hash was not found on this node. This can also happen due to the ambiguity of the "link" field: 
when you try to send funds but you made a mistake while calulating the balance, the node thinks that you want to receive from a nonexistent block.<br>If the block is supposed to exist, try restarting the node to get it back in sync. </p>  

**'Gap previous'**

<p>The node does not find the block hash you set in the "previous" field. Make sure that you put the current "frontier" in there. Query <code>account_info</code> to get the current frontier.</p>  

**'Error generating block'**

<code>"error": "error generating block"</code> is a rather generic error and therefore has multiple potential meanings. It can occur on these three commands: 
<code>account_representative_set</code> 
<code>receive</code> 
<code>send</code>. 
<br> I don't know all scenarios how to provoke that error, but I isolated these: <br>1) when you try to send funds with a ID field and leave its string empty <br>2) if you try to manually receive a pending block while the node tries to create an automatic receive block at the same time. <br>May also occur on other occasions
<p></p>


**'Account not found in wallet'**   
<p> <!-- normally means that the account is not found in the local wallet. Probably a typo in the wallet ID. --> Use <code> ./rai_node --wallet_list</code> to see which wallet IDs your node knows, and RPC <code>account_list</code> to see the accounts of the specified wallet. </p>


**'Private key or local wallet and account required'**
<p>will occur while using "block_create" when anything is wrong with your accounts in the "representative" or "account" parameter, for example a typo. Will also occur if the wallet ID does not exist or when the account is not in this wallet. Alternatively to using a wallet ID and account, you can also specify the "key" parameter which takes a private key (not a seed).</p>


**'Account not found'**
<p>When using <code>account_info</code> or <code>send</code>: Most likely means that the ledger doesn't have an entry for that account since it never broadcasted a block, i.e. it means that the account has either no funds at all, or pending funds only. 
Interestingly enough, <code>account_balance</code> will not give this error but show 0 balances instead, if the account hasn't ever received anything at all, and will also show pending balance in case the account has pending incoming blocks. 
<br>
If funds are stuck as "pending", the blocks may be below the <code>receive_minimum</code> threshold set in the config.json (keep in mind that this entry is in RAW format, so the default of <code>1000000000000000000000000</code> means one millionth NANO). Or it's stuck as pending due to a malfunction in the collection routine (you can try to use the <code>receive</code> command in that case).  
<br>If you're sure that you sent funds to the account but neither <code>account_info</code> nor <code>pending</code> shows a result, your node may be out of sync. Compare <code>block_count</code> with one of the block explorers. A high percentage of "unchecked" blocks also indicates synchronisation delays, whereas a smaller number of "unchecked" blocks is normal (it mostly contains blocks that don't have a predecessor). 
<br>
In earlier versions, this error was also thrown when the wallet was locked, for example when using <code>send</code>.</p> 
 
 
 
**'Unable to parse json'**
<p><code>"error": "Unable to parse JSON"</code> probably means that the syntax is not correct, for example missing a mandatory argument or using wrong quote characters (e.g. " instead of "). When using the <code>process</code> command, make sure that the actual block data is contained within a single line.</p> 
 
	
**'Connection refused'**
<p><code>"curl: (7) Failed to connect to ::1 port 7072: Connection refused"</code> means that the port is not accessible. For example, if the daemon is not running, or the remote host is not whitelisted in config.json</p> 
 
**'Unreceivable'**
<p>Most likely means, the source has already been received. Maybe also be related to: Source block doesn't exist; or trying to make an open bock when only state blocks are allowed since network upgrade (might be covered by other errors - not sure about these)</p> 
 
**'Fork'**
<p>The node already knows another block with the same "previous". This violates the immutability of the chain continuity. One of the reasons something like this could happen are race conditions when you use the same seed on multiple devices, or an outdated cache within your own app.  <!-- Previous block already has a successor that references it --></p> 
  
**'Old Block'**
<p>The node already knows this block. You probably don't need to do anything. If you feel like other nodes have not received this block yet, use the "republish" command.  </p> 
  
**'command not found'**
<p><code>"error": "Unknown command"</code> means that your "action" does not exist. Causes: 1) Typo 2) Deprecated 3) Introduced in a later node version</p> 
 
	 
**'command not found'**
<p><code>"curl: command not found"</code> appears when you mistyped the </p> 
	 
	
**'bad destination account'**
<p><code>"error": "Bad destination account"</code> means that the recipient is malformed (too short or too long) or has a typo in it (checksum incorrect, illegal letter, ...) </p> 

	
**'Invalid amount number'**
<p><code>"error": "Invalid amount number"</code> normally means that you didn't use a integer number between 0 and 340282366920938463463374607431768211455 (2<sup>128</sup>). It needs to be in RAW (1 NANO is 1000000000000000000000000000000 RAW). This needs to be in integer form. Decimals and floats are not accepted. If you ever feel like you sent more than the recipient got, you may have forgotten the 10^30 multiplication factor from NANO to RAW. Keep in mind that by default, amounts smaller than 1 millionth NANO are not being pocketed (you can adjust the threshold in config.json).</p> 

**'bad source'**
<p><code>"error": "bad source"</code> means that the sending account is malformed. Causes: Typos, wrong checksum, wrong prefix, wrong length, ...</p> 

**'Bad wallet number'**
<p><code>"error": "Bad wallet number"</code> means that your string is not a 64-character HEX string, i.e. it's too long or too short or contains non-hex-characters.</p> 

**'This block cannot follow the previous block'**
<p><code>"error": "This block cannot follow the previous block"</code> pops up because you want to broadcast a deprecated block type after the forced network upgrade to the 'state' blocks type. Use state blocks instead. </p> 


**'Wallet not found'**
<p><code> "error": "Wallet not found"</code> can have multiple causes. First of all, keep in mind that the node will never let you choose the wallet ID, 
it always is randomly assignes as it serves some kind of extra protection when it comes to wallet access - it's almost like an API token, except that it's also used to locally assign data, 
and you should do further considerations when it comes to API security. <br>Possible solutions are:



<br>a) Restart your daemon after creating a wallet with CLI 

(not necessary for wallets created through RPC). 

<br>b) You probably mistook the Wallet ID for the seed. They serve different purposes. 

<br>c) You forgot the wallet ID? Use the CLI command <code>/opt/rai/bin/rai_node --wallet_list</code> 
to see which wallets that particular node's database contains. By default, you can't retrieve Wallet IDs with an RPC command for security reasons. 

</p> 

<h2>Other node errors explained</h2> 
    
**'cannot assign requested address'**
<p><code>Error response from daemon: driver failed programming external connectivity on endpoint unruffled_hypatia (46223d00f7bd24cdc3229890c7b2f53eb3945fd7e24d0cea38283a07edd5f826): Error starting userland proxy: listen tcp [::1]:7076: bind: cannot assign requested address.</code> probably means that you have not enabled the IPv6 stack, which is mandatory. <br> You can test this with <code>ping6 ::1</code>. If IPv6 is activated, it will show "64 bytes from ::1: icmp_seq=3 ttl=64 time=0.036 ms", otherwise "connect: Cannot assign requested address".</p>

<p><code>bind: cannot assign requested address.</code> will also occur if the RPC address your config.json is set wrong. This setting will not accept specific remote IPs. It has to be a special mask or a loopback address. For example, "::0" or "::1". See my RPC guide for details. </p>

<p>If <code>confirmation_info</code> shows a tally below the quorum_delta of confirmation_quorum, there's no need to worry because the node stopped counting votes because a successive block reached the confirmation threshold already. </p>

##  Common Mistakes

<ul>
<li>Not waiting for full node synchronisation. A SSD drive is mandatory, and synchronisation should take less than 1 day. If you're in a hurry, you can download a prebuilt database from a trusted source. 
Trying to send funds before the node is in sync could fail - In future versions however, the node will prioritize the synchronisation of local wallets. 
</li>
<li>Trying to retrieve wallet IDs and seeds via RPC (only works via CLI at the moment, for security reasons)</li>
<li>Having the IPv6 stack disabled (node will not work even though it communicates on IPv4 mostly). Test it with <code class="copy">test -f /proc/net/if_inet6 &amp;&amp; echo "IPv6 supported" || echo "IPv6 not supported"</code></li>  <br> Even though a lot of the node uses IPv6 notation, it is mostly possible to connect on the other IP stack. I only had trouble with a PHP script that was not able to CURL via IPv4, so I had to set <code class="copy">CURLOPT_IPRESOLVE</code> to <code class="copy">CURL_VERSION_IPV6</code> <!-- <p>When the IPv6 stack is completely disabled, you may not be able to use the node at all. It's fine to have a ipv4-only ISP though.  </p> -->
<li>Mistaking a seed for a wallet ID (wallet ID is a random parameter to access the correct seed storage without having to mention the seed. The wallet ID is not related to the cryptographic system. The ID is only used when communicating to the node)</li>
<li>Mistaking a seed for a private key  (Read the key guide for details)</li>
<li>Mistaking a public key for a address (addresses are Base32-encoded and have a nano_ prefix and a checksum at the end; pubkeys are plain Base16)</li>
<!-- <li>Mistaking an address for a seed</li> -->
<li>Not setting firewall &amp; whitelists correctly when trying to connect via RPC remotely (You need to set the remote host IP in the config in order to be able to connect to the node. By default, the RPC interface is accessible to localhost only. In some rare cases like php-curl, I experienced denial of access even on localhost. This may happen if the app is routing through the public IP) </li>
<li>Exposing RPC ports to the public (setting the remote host IP in the config.json to ::ffff:0.0.0.0 will expose the RPC to everyone if you don't take further measures in your firewall.)   </li>
 
<li>Relying on RPC Callback (Callback is prone to drop blocks. Have some fallback option. Increase UNIX file handler limits. Callback will only be triggered after vote quorum is met - set it high enough so you are safe from double-spend attacks (forks), but set it low enough so you still rach the quorum - 1 or 2 big representatives could go offline, and another 10% of voting weight is wasted permanently)  </li>
<li>Wrong IP/loopback format. <code>::1</code> or <code>localhost</code> is localhost, <!-- <code>ffff:82.124.73.51</code> is a specific IPv4 address, --> <code>::ffff:0.0.0.0</code> or <code>::0</code> is exposed host, which lets world wide peers connect from both ipv4 type as well as ivp6 type (except when using a the docker container who will still cage this). The node config does not really accept much else beside these subnet masks (erroring in either "address is required and must be an IP address" or "Error while running node (Cannot assign requested address)", but if you use Docker, there's an easy solution to that: you can replace the localhost port mapping limitation <code>-p [::1]:7076:7076</code> with a public IP. The other solution probably is to use iptables (i'm not experienced in that), or make a filtering web proxy for RPC actions (i posted one on my RPC gude page).  </li>
<li>Using wrong URL format for callback (Don't include the "http://" string - see my callback page for details)</li>
<li>Forgetting to restore all previously used accounts after importing a seed (In some cases, the wallet will try to do this automatically)</li>
<li>Having enable_control set incorrectly in config.json (wrong option will either risk unauthorized access, or prevent you from doing what you want to achieve. Read the "intrusive RPC commands" guide for details)</li>
<li>Not restarting the node after using wallet-altering CLI commands (should be fixed by V18)</li>
<li>Lack of redundancy, backups, and failsafe mechanisms</li>
<li>Refunding to exchange wallets (Consider blacklisting known exchange wallets for withdrawals and refunds)</li>
<li>Using wrong units (1 NANO = 10^30 raw)</li>
<li>Causing integer overflows by not using a Bigint library (nano balances use up to 39 digits for integers)</li>
<li>Using the wrong endianness for network serialization (some endianness changed with the introduction of state blocks)</li>
<li>Trying to pass decimals/floats to <span style="text-decoration: line-through">the Qt wallet</span> or RPC (it will accept integers only - 1 NANO is 10^30 base units). Qt limitation is resolved in recent versions</li>
<li>Sending amounts below the minimum_receive threshold in config.json and wondering why funds are not pocketed (only affects the creation of "receive" blocks, not the node functionality)</li>
<li>Using incorrect json syntax (json-strings only, and sometimes it's necessary to have them in a single line when trying to process blocks)</li>
<li>If your representative is shown as offline, check if <code>"enable_voting": "true",</code> is in the config file</li>
<li>Don't worry if <code>signature_checker_threads</code> is set to 0, because it will automatically add 1 internally. </li>
<!-- <li>Not preventing the crediting of double deposits </li> -->
<li>When you run your daemon twice without closing the first instance, you may get a "Error while running node (bind: Address already in use)"</li> 
<li>When your node doesn't communicate with the network, it may not be able to resolve the DNS record, or the protocol version is outdated. Nodes will not be able to peer after falling 3 generations behind (about half a year).</li> 
<li>Trying to access GPU from a docker container. Use native binaries instead.</li> 
<!-- <li>If the json format in config.json is incorrect, you will get a "Error deserializing config"</li> Also for wrong IP format, but it adds a desc then-->
<!-- <li>"Empty reply from server" and ""</li>  -->
<li>to be continued...</li> 
</ul>
  