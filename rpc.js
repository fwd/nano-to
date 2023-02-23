// Browser RPC Client
// https://twitter.com/Nano2Dev
;(async () => {

	if (window.nano === undefined) window.nano = { debug: false }

	var rpc = {

	       endpoint: 'https://rpc.nano.to',

		   post(endpoint, data) {
		   		// ye' olde XMLHttpRequest
				return new Promise((resolve) => {
				    var xhr = new XMLHttpRequest();
				    xhr.open("POST", endpoint, true);
				    xhr.setRequestHeader('Content-Type', 'application/json');
				    xhr.setRequestHeader('Nano-App', 'Browser-RPC-Client');
				    xhr.send(JSON.stringify(data));
				    xhr.onload = function() {
				      resolve(JSON.parse(this.responseText))
				    }
				})
			},

	       pending(address, count) {
	         return new Promise((resolve) => {
	          count = count && Number(count) > 100 ? 100 : (count || 100)
	          this.post(this.endpoint, { 
	            action: 'pending', 
	            account: address,
	            count: count,
	            json_block: true,
	            source: true,
	          }).then((res) => {
	          	console.log( )
	            var blocks = []
	            if (res.blocks !== "") {
	                Object.keys(res.blocks).map(hash => {
	                    blocks.push({ 
	                        hash, 
	                        account: res.blocks[hash].source, 
	                        amount_raw: res.blocks[hash].amount,
	                        amount: NanocurrencyWeb.tools.convert(res.blocks[hash].amount, 'RAW', 'NANO'),
	                    })
	                })
	            }
	            resolve(blocks)
	          })
	        })
	       },

	       history(address, count) {
	        return new Promise((resolve) => {
	          this.post(this.endpoint, { 
	            action: 'account_history', 
	            account: address,
	            count: Number(count) ? Number(count) : 100,
	            raw: true
	          }).then((res) => {
	            if (!Array.isArray(res.history)) return []
	            resolve(res.history.map(a => {
	                a.amount_raw = a.amount
	                a.amount = NanocurrencyWeb.tools.convert(a.amount, 'RAW', 'NANO')
	                return a
	            }))
	          })
	        })
	       },

	       block(amount, dataset) {
	       		var block = dataset.find(a => a.amount_raw === NanocurrencyWeb.tools.convert(amount, 'NANO', 'RAW') )
	            return block ? block : false
	       },

	       check(address, amount, history_limit) {
	        try {
	          return this.pending(address).then(async (pending) => {
	            var success = false
	            var block = false
	            if (Array.isArray(pending)) block = this.block(amount, pending)
	            if (!block) {
	                var _history = await this.history(address, history_limit || 10) 
	                if (Array.isArray(_history)) block = this.block(amount, _history)
	            }
	            return block
	          })
	        } catch(e) {
	          report(e.message ? e.message : 'Error Occured')
	        }

	   },

	}

    window.nano.rpc = async (options) => {
    	try {
    		return (await rpc.post(options.endpoint && options.endpoint.includes('http') ? options.endpoint : rpc.endpoint, options)).data
    	} catch(e) { return e }
    }

})();
