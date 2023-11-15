const axios = require('axios');
const fs = require('fs');

var my_nano_ninja_backup = [{
    "alias": "『Node Geass』",
    "rep_address": "nano_1ba7uuq9kt68jzzw51a5kt577xtzaq37cnj8otqbhhnkgjyhwu91wtsjacez",
}, {
    "alias": "Art Node",
    "rep_address": "nano_1artnod3zc5e4rrra73ii4698t7pfiqt4c445efd499psaxyjae5bhm9susp",
}, {
    "alias": "TipNano ⛲",
    "rep_address": "nano_1tipnanogsu7q59pnie3qfc4w378wm43fg4ksqc8wmnnfnizrq1xrpt5geho",
}, {
    "alias": "scoin.cool",
    "rep_address": "nano_3o5oeefdnrha7x7styp1tnmefen7fnrooy4jgnfb1otws54yf7uqfuxmojoy",
}, {
    "alias": "validierung.cc 🇩🇪",
    "rep_address": "nano_15gfawgrsc6tkkm5p1gy749tkibchu73st1ojs3knz6rd3ejfcgt7rj5cmx9",
}, {
    "alias": "Nanswap",
    "rep_address": "nano_1banexkcfuieufzxksfrxqf6xy8e57ry1zdtq9yn7jntzhpwu4pg4hajojmq",
}, {
    "alias": "VINO Community Rep",
    "rep_address": "nano_1sw898hgeexgrsq8x16wdadwdrs3obn418z6x98parb5tymz879mu89qndju",
}, {
    "alias": "TRUSTABLE - NN2",
    "rep_address": "nano_19qo4gtzpoyqf6zzezbcuazcsxtqtdin5qbtk8jkoz4fdmq4ssagn3u1odhz",
}, {
    "alias": "paypur's node",
    "rep_address": "nano_15zntj4a8r6bkihei788ciy1jgc5wnskan1gpgn8e8jku3r4qhr7rwifitir",
}, {
    "alias": "NanoWallet Bot",
    "rep_address": "nano_16k5pimotz9zehjk795wa4qcx54mtusk8hc5mdsjgy57gnhbj3hj6zaib4ic",
}, {
    "alias": "jserv 🇹🇼🐧",
    "rep_address": "nano_1bko7zpcow7w6e11az8tnxdnyszgkt61miwuo9i9pom3czdzxqknpiuc7tdb",
}, {
    "alias": null,
    "rep_address": "nano_16u1uufyoig8777y6r8iqjtrw8sg8maqrm36zzcm95jmbd9i9aj5i8abr8u5",
}, {
    "alias": null,
    "rep_address": "nano_1ac8snzjkwniynpe3nsshf34iwe46rpjo3tjqtdntktjhqsp5sdndqworgwe",
}, {
    "alias": "mimenode-old",
    "rep_address": "nano_139tfuxmn4xne7kac8gy46rzg3tj8dcahyjjrexk9pc8udh3i1cjxs1h5rme",
}, {
    "alias": "NanoSG - DeckardCain 🇸🇬",
    "rep_address": "nano_14mp1ua4oi45rxosft3d8qe4g6a1u1srma59jg85ax6s8zuwhi4yzgdnqhz3",
}, {
    "alias": "Drowzee's Nano Node",
    "rep_address": "nano_3ciiorjr88nd9xdperhj6u4bmxqxgkariohi1inuqad4b8urr9bgpirgbmqy",
}, {
    "alias": "Nanorlando City Node",
    "rep_address": "nano_3zx7rus19yr5qi5zmkawnzo5ehxr7i73xqghhondhfrzftgstgk4gxbubwfq",
}, {
    "alias": "xnofor.life",
    "rep_address": "nano_1xj15k5naemt7rno1udawcazo5esjsuajosziopeayk93o8t71hwecfsux4p",
}, {
    "alias": "FynCom",
    "rep_address": "nano_3robocazheuxet5ju1gtif4cefkhfbupkykc97hfanof859ie9ajpdfhy3ez",
}, {
    "alias": "nanocafe.cc",
    "rep_address": "nano_1cafe95a81ko3mq3oin4wnubsbw9z3w3tw5a95u47897wxy96r1zj9hxu1wb",
}, {
    "alias": "XNOPay - Node 1",
    "rep_address": "nano_1xnopay1bfmyx5eit8ut4gg1j488kt8bjukijerbn37jh3wdm81y6mxjg8qj",
}, {
    "alias": "UrbaNano [NL]",
    "rep_address": "nano_1m1afmq54gum53md3dm3o9arctwn8buwqk8kynxszh468qmm3kn7sawmgihz",
}, {
    "alias": "CRPay",
    "rep_address": "nano_1crpaybw8jip7fm98fzfxnjajb55ty76oyzmpfwe9s66u4aod37tm3kxba8q",
}, {
    "alias": "CryptoVision Nano Node",
    "rep_address": "nano_3bsnis6ha3m9cepuaywskn9jykdggxcu8mxsp76yc3oinrt3n7gi77xiggtm",
}, {
    "alias": "Brainroot Nano Node [DE]",
    "rep_address": "nano_385dyw65hwqtp7pm5igh9ekmaai7qg61tp4mcdine7su3jt69uypa7o9umm8",
}, {
    "alias": "NANO ITALIA",
    "rep_address": "nano_1wcxcjbwnnsdpee3d9i365e8bcj1uuyoqg9he5zjpt3r57dnjqe3gdc184ck",
}, {
    "alias": "ScandiNode 🌐 Green, fast & capable! ",
    "rep_address": "nano_318uu1tsbios3kp4dts5b6zy1y49uyb88jajfjyxwmozht8unaxeb43keork",
}, {
    "alias": "nanowallets.guide",
    "rep_address": "nano_1zuksmn4e8tjw1ch8m8fbrwy5459bx8645o9euj699rs13qy6ysjhrewioey",
}, {
    "alias": "My Nano Ninja",
    "rep_address": "nano_1ninja7rh37ehfp9utkor5ixmxyg8kme8fnzc4zty145ibch8kf5jwpnzr3r",
}, {
    "alias": "Nano Foundation #6",
    "rep_address": "nano_1awsn43we17c1oshdru4azeqjz9wii41dy8npubm4rg11so7dx3jtqgoeahy",
}, {
    "alias": "NanoBank",
    "rep_address": "nano_1ec5optppmndqsb3rxu1qa4hpo39957s7mfqycpbd547jga4768o6xz8gfie",
}, {
    "alias": "Nonna",
    "rep_address": "nano_1just1zdsnke856mu5pmed1qdkzk6adh3d13iiqr3so66sr8pbcnh15bdjda",
}, {
    "alias": "NanoQuake",
    "rep_address": "nano_1kd4h9nqaxengni43xy9775gcag8ptw8ddjifnm77qes1efuoqikoqy5sjq3",
}, {
    "alias": "Nalli | [Fast 💨 - Dedicated 💻 - Green 🍀]",
    "rep_address": "nano_3zapp5z141qpjipsb1jnjdmk49jwqy58i6u6wnyrh6x7woajeyme85shxewt",
}, {
    "alias": "NanoCrawler / meltingice",
    "rep_address": "nano_1x7biz69cem95oo7gxkrw6kzhfywq4x5dupw4z1bdzkb74dk9kpxwzjbdhhs",
}, {
    "alias": "Kedrin",
    "rep_address": "nano_15nt4cis8ac184q9mj7bedww9ay9zh5jk5k7sj9ypmz44twjcpz3cn6oijir",
}, {
    "alias": "1NANO Community",
    "rep_address": "nano_16d45ow3tsj1y3z9n4satwzxgj6qiue1ggxbwbrj3b33qr58bzchkpsffpx4",
}, {
    "alias": "NANO Voting 🌍",
    "rep_address": "nano_3uaydiszyup5zwdt93dahp7mri1cwa5ncg9t4657yyn3o4i1pe8sfjbimbas",
}, {
    "alias": "Nano Charts 📊",
    "rep_address": "nano_3chartsi6ja8ay1qq9xg3xegqnbg1qx76nouw6jedyb8wx3r4wu94rxap7hg",
}, {
    "alias": "Natrium",
    "rep_address": "nano_1natrium1o3z5519ifou7xii8crpxpk8y65qmkih8e8bpsjri651oza8imdd",
}, {
    "alias": "NANO TipBot",
    "rep_address": "nano_3o7uzba8b9e1wqu5ziwpruteyrs3scyqr761x7ke6w1xctohxfh5du75qgaj",
}, {
    "alias": "1. High Performance Server 🚀 - DE",
    "rep_address": "nano_18shbirtzhmkf7166h39nowj9c9zrpufeg75bkbyoobqwf1iu3srfm9eo3pz",
}, {
    "alias": "mimenode",
    "rep_address": "nano_1mime3jd7dbnshd6zw1gjqax5zit31h6y1x6pczfuz7au33ftacjib5cc1ez",
}, {
    "alias": "Puddy",
    "rep_address": "nano_3abuqtbaotp9myn6ihb6mg96hf7jnapuddydf6ytgd174t4phg86nnq4cmxj",
}, {
    "alias": "⋰·⋰FastFeeless.com⋰·⋰",
    "rep_address": "nano_3afmp9hx6pp6fdcjq96f9qnoeh1kiqpqyzp7c18byaipf48t3cpzmfnhc1b7",
}, {
    "alias": "Redeemfor.me 🛍️🛒 —  Luckynano.com 🎰💰",
    "rep_address": "nano_1oenixj4qtpfcembga9kqwggkb87wooicfy5df8nhdywrjrrqxk7or4gz15b",
}, {
    "alias": "nano.strnmn.me 🌿",
    "rep_address": "nano_3strnmn7h9b7oghxa6h9ckrpf5r454fsobpicixps6xwiwc5q4hat7wjbpqz",
}, {
    "alias": "Nano Node London",
    "rep_address": "nano_18bpu81x4oyqsjjsyaeb7ek4rag1bw8gerhaiumookzc4t5prrm4d7zg56ww",
}, {
    "alias": "Yakamoz Node - nano.trade",
    "rep_address": "nano_3pg8khw8gs94c1qeq9741n99ubrut8sj3n9kpntim1rm35h4wdzirofazmwt",
}, {
    "alias": "warai",
    "rep_address": "nano_33ad5app7jeo6jfe9ure6zsj8yg7knt6c1zrr5yg79ktfzk5ouhmpn6p5d7p",
}, {
    "alias": "❤️❤️ Nanolove ❤️❤️",
    "rep_address": "nano_34amtofxstsfyqcgphp8piij9u33widykq9wbz6ysjpxhbgmqu8btu1eexer",
}, {
    "alias": "humble_nano_finland 🇫🇮",
    "rep_address": "nano_3n7ky76t4g57o9skjawm8pprooz1bminkbeegsyt694xn6d31c6s744fjzzz",
}, {
    "alias": "Nano Foundation #8",
    "rep_address": "nano_1hza3f7wiiqa7ig3jczyxj5yo86yegcmqk3criaz838j91sxcckpfhbhhra1",
}, {
    "alias": "Moonstruck.dev 🌙",
    "rep_address": "nano_1ota8bpwwawmc8ksdz4ezzrb3afbdeipk1n7rbeguhm4muy1r649uzw5moon",
}, {
    "alias": "NanoTicker",
    "rep_address": "nano_1iuz18n4g4wfp9gf7p1s8qkygxw7wx9qfjq6a9aq68uyrdnningdcjontgar",
}, {
    "alias": "gr0vity",
    "rep_address": "nano_3msc38fyn67pgio16dj586pdrceahtn75qgnx7fy19wscixrc8dbb3abhbw6",
}, {
    "alias": "My1s Nano Node",
    "rep_address": "nano_1my1snode8rwccjxkckjirj65zdxo6g5nhh16fh6sn7hwewxooyyesdsmii3",
}, {
    "alias": null,
    "rep_address": "nano_3oxhohaxp9ceobppkhp7wahauxd4zgyz4fhxfniyp4mb9opq4upfnaccswo7",
}, {
    "alias": "PixelStix",
    "rep_address": "nano_1u7anedrbmqx4gr8x44r6k4egg9nhi75yb1qsz63e5ykhz3mx3r3jw463r3t",
}, {
    "alias": "FEES? OMEGALUL",
    "rep_address": "nano_1nk9zdf1otddxhxfqimjdkmbtq17yzf3z6giz1as7x1huyug8er1ukeqpqpe",
}, {
    "alias": "Huobi Representative",
    "rep_address": "nano_1bj5cf9hkgkcspmn15day8cyn3hyaciufbba4rqmbnkmbdpjdmo9pwyatjoi",
}, {
    "alias": "Nanick",
    "rep_address": "nano_3ekb6tp8ixtkibimyygepgkwckzhds9basxd5zfue4efjnxaan77gsnanick",
}, {
    "alias": "Nano Foundation #2",
    "rep_address": "nano_1stofnrxuz3cai7ze75o174bpm7scwj9jn3nxsn8ntzg784jf1gzn1jjdkou",
}, {
    "alias": "Nano Germany 🇩🇪",
    "rep_address": "nano_34zuxqdsucurhjrmpc4aixzbgaa4wjzz6bn5ryn56emc9tmd3pnxjoxfzyb6",
}, {
    "alias": "AnarkNode V23",
    "rep_address": "nano_3kc8wwut3u8g1kwa6x4drkzu346bdbyqzsn14tmabrpeobn8igksfqkzajbb",
}, {
    "alias": "Nano Foundation #5",
    "rep_address": "nano_3hd4ezdgsp15iemx7h81in7xz5tpxi43b6b41zn3qmwiuypankocw3awes5k",
}, {
    "alias": "nanoble",
    "rep_address": "nano_16d3mdshcfqayyx8rd9ioimjiicrma743qpd86ohfs9kdzgejmnba1zifo8m",
}, {
    "alias": "TRUSTABLE - NN1",
    "rep_address": "nano_1b9wguhh39at8qtm93oghd6r4f4ubk7zmqc9oi5ape6yyz4s1gamuwn3jjit",
}, {
    "alias": "NanoIsByUs",
    "rep_address": "nano_3o5dcp6kjish9xuu51akx1d8bp4pytk4diput3s8dkt7cktnmcg96aoi1cbw",
}, {
    "alias": "Nano Foundation #4",
    "rep_address": "nano_3dmtrrws3pocycmbqwawk6xs7446qxa36fcncush4s1pejk16ksbmakis78m",
}, {
    "alias": "Madora",
    "rep_address": "nano_3g6ue89jij6bxaz3hodne1c7gzgw77xawpdz4p38siu145u3u17c46or4jeu",
}, {
    "alias": "Flying Amigos 🇮🇳",
    "rep_address": "nano_1xckpezrhg56nuokqh6t1stjca67h37jmrp9qnejjkfgimx1msm9ehuaieuq",
}, {
    "alias": "Upstart Hosting",
    "rep_address": "nano_1ebq356ex7n5efth49o1p31r4fmuuoara5tmwduarg7b9jphyxsatr3ja6g8",
}, {
    "alias": "nano-no.de 🌍🚀🌑",
    "rep_address": "nano_1fe17w13stn8rqos3nxmupoez9sne4pc4njmr1fbz9nci6obnng6jatton5q",
}, {
    "alias": "Nanovert",
    "rep_address": "nano_375pi67f4i4ag5rudoziza86z715bepsmp1r6ri4domt7ct6tk67mjsxtebm",
}, {
    "alias": "Kraken",
    "rep_address": "nano_37imps4zk1dfahkqweqa91xpysacb7scqxf3jqhktepeofcxqnpx531b3mnt",
}, {
    "alias": "nanotps.com",
    "rep_address": "nano_3mhrc9czyfzzok7xeoeaknq6w5ok9horo7d4a99m8tbtbyogg8apz491pkzt",
}, {
    "alias": "WeNano",
    "rep_address": "nano_1wenanoqm7xbypou7x3nue1isaeddamjdnc3z99tekjbfezdbq8fmb659o7t",
}, {
    "alias": "Atomic Wallet",
    "rep_address": "nano_35btiz1mgfwp95c3ckazmzbp5gepduxtijuijd9xebeau8u1gsbea41smjca",
}, {
    "alias": "NANO Skynode 🏔️",
    "rep_address": "nano_3u7d5iohy14swyhxhgfm9iq4xa9yibhcgnyj697uwhicp14dhx4woik5e9ek",
}, {
    "alias": "Flowhub",
    "rep_address": "nano_3f1owhubic8wa8rfmj5x6w9ore9btbtju5eampghs3y9ere6q6u96jraoo5s",
}, {
    "alias": "Noli Me Tangere",
    "rep_address": "nano_1isgusmnf1xe45iyjtfxw4qiai36zxdituu7gpni1trtj5ojyujobq13bjah",
}, {
    "alias": "nano.lol",
    "rep_address": "nano_31xitw55kb3ko8yaz3439hqaqpibxa9shx76suaa3no786do3hjuz8dy6izw",
}, {
    "alias": "ARaiNode",
    "rep_address": "nano_3kqdiqmqiojr1aqqj51aq8bzz5jtwnkmhb38qwf3ppngo8uhhzkdkn7up7rp",
}, {
    "alias": "PowerNode",
    "rep_address": "nano_3power3gwb43rs7u9ky3rsjp6fojftejceexfkf845sfczyue4q3r1hfpr3o",
}, {
    "alias": "Nano Foundation #7",
    "rep_address": "nano_1anrzcuwe64rwxzcco8dkhpyxpi8kd7zsjc1oeimpc3ppca4mrjtwnqposrs",
}, {
    "alias": "Nano Foundation #1",
    "rep_address": "nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4",
}, {
    "alias": "NanoBrasil 🇧🇷",
    "rep_address": "nano_1j78msn5omp8jrjge8txwxm4x3smusa1cojg7nuk8fdzoux41fqeeogg5aa1",
}, {
    "alias": "Binance",
    "rep_address": "nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k",
}, {
    "alias": "KuCoin",
    "rep_address": "nano_1niabkx3gbxit5j5yyqcpas71dkffggbr6zpd3heui8rpoocm5xqbdwq44oh",
}, {
    "alias": "Ӿ Makonode 🦈",
    "rep_address": "nano_37ortkby6k68z8tkk8g63ndbp8wjbmofhn56oyxb4rm6s3x51pkpiwcnpgmq",
}, {
    "alias": "PlayNANO Representative",
    "rep_address": "nano_3pnanopr3d5g7o45zh3nmdkqpaqxhhp3mw14nzr41smjz8xsrfyhtf9xac77",
}, {
    "alias": "NanoLooker",
    "rep_address": "nano_1ookerz3adg5rxc4zwwoshim5yyyihf6dpogjihwwq6ksjpq7ea4fuam5mmc",
}, {
    "alias": " 🔐 IronClad 🔐 ➡ Reliable node built to last",
    "rep_address": "nano_11pb5aa6uirs9hoqsg4swnzyehoiqowj94kdpthwkhwufmtd6a11xx35iron",
}, {
    "alias": "Buckeye Nano Node",
    "rep_address": "nano_3i3dqy5xs98ewtk9ejfpxfwbsscejc6njz9hk5ia1446gdkxpxkjeeia719n",
}, {
    "alias": "Kappture",
    "rep_address": "nano_3ktybzzy14zxgb6osbhcc155pwk7osbmf5gbh5fo73bsfu9wuiz54t1uozi1",
}, {
    "alias": "RsNano.com - Nano Rust Port",
    "rep_address": "nano_1tk8h3yzkibbsti8upkfa69wqafz6mzfzgu8bu5edaay9k7hidqdunpr4tb6",
}, {
    "alias": "NiF's Node - nano.nifni.net",
    "rep_address": "nano_1fnx59bqpx11s1yn7i5hba3ot5no4ypy971zbkp5wtium3yyafpwhhwkq8fc",
}, {
    "alias": "Wirex",
    "rep_address": "nano_3ngt59dc7hbsjd1dum1bw9wbb87mbtuj4qkwcruididsb5rhgdt9zb4w7kb9",
}, {
    "alias": "SupeNode",
    "rep_address": "nano_396sch48s3jmzq1bk31pxxpz64rn7joj38emj4ueypkb9p9mzrym34obze6c",
}, {
    "alias": "NanOslo 🐯",
    "rep_address": "nano_1jtx5p8141zjtukz4msp1x93st7nh475f74odj8673qqm96xczmtcnanos1o",
}]

async function getRepresentatives() {
  try {
    // Step 1: Get representatives from rpc.nano.to
    const rpcNanoToUrl = 'https://rpc.nano.to';
    const representativesResponse = await axios.post(rpcNanoToUrl, {
      action: 'representatives'
    });

    const reps = representativesResponse.data.representatives;
    // const reps = representativesResponse.data.slice(0,5);

    // if (reps && reps) {}

    if (!reps) console.error('Error:', representativesResponse.data);

    // console.log( reps )
    const known = (await axios.post(rpcNanoToUrl, { action: 'known' })).data;

    // Step 2: Loop through each representative and get weight
    const repWeights = [];
    for (var address of reps.slice(0, 50)) {
      const weightResponse = await axios.post(rpcNanoToUrl, {
        action: 'account_weight',
        account: address
      });

      const weight = weightResponse.data.weight_nano;
      
      // Step 3: Calculate representative weight based on total supply
      const totalSupply = 133248289; // Replace with actual total supply
      const repWeight = (weight / totalSupply) * 100;

      var username = known.find(a => a.address === address || a.rep_address === address)
      var nano_ninja_backup = my_nano_ninja_backup.find(a => a.rep_address === address)

      repWeights.push({
        "alias": username ? username.name : (nano_ninja_backup ? nano_ninja_backup.alias : ''),
        "rep_address": address,
        "donation_address": null,
        "weight": repWeight,
        "delegators": null,
        "uptime": 100, // tbd
        "synced": 100, // tbd
        "website": "",
        "latitude": "",
        "longitude": ""
      });
    }

    // Step 4: Write the result to a JSON file
    const filename = 'reps.json';
    fs.writeFile(filename, JSON.stringify(repWeights, null, 2), (err) => {
      if (err) throw err;
      console.log(`Data has been written to ${filename}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }

}

// Run the function
getRepresentatives();