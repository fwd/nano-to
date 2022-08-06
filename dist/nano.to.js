new Vue({
    el: '#app',
    data: {
      convert: NanocurrencyWeb.tools.convert,
      error: false,
      status: '',
      tab: 'docs',
      user: false,
      loading: true,
      background: false,
      title: 'Nano.to',
      rate: false,
      params: {},
      prompt: false,
      search: true,
      string: '',
      // currency: 'NANO',
      color: 'blue',
      usernames: [],
      notification: false,
      checkout: false,
      suggestions: [],
      colors: [],
      buttons: [{
        text: `[]`,
        link: `https://nano.to/${1}`,
        target: '_blank'
      }, {
        text: `[view account]`,
        link: `https://nano.to/${1}/about`,
        target: '_self'
      }, ],
      status: true,
    },
    computed: {
      amount() {
        var query = this.queryToObject()
        if (query.random || query.r) {
          var str = `${this.getRandomArbitrary(1, 9).toFixed(0)}${this.getRandomArbitrary(1, 9).toFixed(0)}${this.getRandomArbitrary(1, 9).toFixed(0)}${this.getRandomArbitrary(1, 9).toFixed(0)}`
          // return str
          return (Number(this.checkout.amount) + Number(`0.00${str}`)).toFixed(6)
        }
        return this.checkout.amount
      },
      value() {
        var val = this.checkout && this.checkout.amount ? this.checkout.amount : 0
        if (this.checkout.currency === 'USD') return (this.checkout.currency || '$ ') + val
        if (!this.checkout.currency || this.checkout.currency === 'NANO') return (this.checkout.currency || 'Ӿ ') + val
      }
    },
    watch: {
      string() {
        // if (true) {}
        this.query()
        // this.showQR()
      },
      admin() {
        this.background = !this.background
      }
    },
    mounted() {

      // this.params = this.queryToObject()

      if (navigator.standalone || (screen.height - document.documentElement.clientHeight < 40)) {
        if (document.body) document.body.classList.add('fullscreen');
      }

      this.load((data) => {
        if (window.location.pathname !== '/') {
          this.getRate()
          this._checkout(null, data)
        }
        setTimeout(() => {
          this.loading = false
        }, 105)
      })
    },
    methods: {
      _checkout(item, data) {
        var item = item || data.find(a => a.name.toLowerCase() === window.location.pathname.replace('/', '').toLowerCase())
        if (item) {
          var query = this.queryToObject()
          var plans = query.p
          var amount = query.price || query.amount || query.n || query.x || query.cost || false
          if (!amount && !plans) plans = `Tip:${this.getRandomArbitrary(0.1, 0.9).toFixed(2)},Small:5,Medium:10,Large:25`
          var success = query.success ||query.success_url
          if (plans) {
            plans = plans.split(',').map(a => {
              return { title: a.trim().split(':')[0], value: a.trim().split(':')[1] } 
            })
          }
          this.checkout = {
            currency: query.currency || query.c,
            message: query.body || query.message || query.text || query.copy,
            fullscreen: true,
            image: query.image || query.img || query.i || '',
            address: query.address || query.to || item.address,
            amount,
            plans,
            title: query.name || query.title || ('@' + item.name),
            color: {
              right: query.rightBackground || '#009dff', 
              address: {
                hightlight: query.hightlight,
              }
            },
            success, 
            cancel: query.cancel || query.cancel_url || query.c, 
          }
          setTimeout(() => {
            this.showQR()
            if (this.checkout && this.checkout.plans && this.checkout.plans[0]) {
              this.checkout.amount = this.checkout.plans[0].value
            }
          }, 100)
        }
      },
      getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min
      },
      cancel() {
        if (this.checkout.cancel && this.checkout.cancel.includes('.')) return window.location.href = this.checkout.cancel
        this.checkout = false
      },
      planValue(plan) {
        if (this.checkout.currency === 'USD') {
          var value = Math.floor(this.rate * plan.value)
          return `$${value}`
        }
        return `${plan.value} NANO`
      },
      clickPlan(plan) {
        // if (!plan.value) return
        // if (this.checkout.currency !== 'USD') {
          // var value = plan.value
        this.checkout.amount = Number(plan.value)
        // }
        document.getElementById("qrcode").innerHTML = "";
        this.showQR()
        // console.log("plan.value", )
        // console.log("this.checkout.amount", )
        this.$forceUpdate()
      },
      toggleCurrency() {
        var currency = this.queryToObject().currency
        this.$forceUpdate()
      },
      redirect(block, url) {
        window.location.href = url || this.checkout.success ? this.checkout.success.replace('{{hash}}', block.hash).replace('{{ hash }}', block.hash).replace('{{HASH}}', block.hash).replace('{{ HASH }}', block.hash).replace(':hash', block.hash) : '/'
      },
      success(block) {
        this.status = 'good'
        this.notify('Success')
        if (this.checkout.post_url) {
          axios.post(this.checkout.post_url, { block: block }).then((res) => {
            resolve( this.redirect(block, res.data.redirect_url) )
          })
          return 
        }
        if (this.checkout.success) this.redirect(block)
       },
       pending() {
         return new Promise((resolve) => {
          var endpoint = 'https://nanolooker.com/api/rpc'
          axios.post(endpoint, { 
            action: 'pending', 
            account: this.checkout.address,
            count: "25",
            json_block: true,
            source: true,
          }).then((res) => {
            resolve(res.data.blocks == "" ? [] : res.data.blocks)
          })
        })
       },
       history() {
        return new Promise((resolve) => {
          var endpoint = 'https://nanolooker.com/api/rpc'
          axios.post(endpoint, { 
            action: 'account_history', 
            account: this.checkout.address,
            count: "25",
            raw: true
          }).then((res) => {
            resolve(res.data)
            // console.log(res)
          })
        })
       },
       check() {
        try {
          return this.pending().then((pending) => {
            var in_pending = pending.find(a => this.convert(a.amount, 'NANO', 'RAW') === this.checkout.amount)
            if (in_pending) return this.success(in_pending)
            if (!in_pending) {
              this.history().then((history) => {
                var in_history = history.history.find(a => this.convert(a.amount, 'NANO', 'RAW') === this.checkout.amount)
                if (in_history) return this.success(in_history)
                if (!in_history) {
                  this.status = 'warn'
                  this.notify('Payment not found')
                }
              })
            }
            // console.log( in_pending )
          })
        } catch(e) {
          this.notify(e.message ? e.message : 'Error Occured')
        }
       },
       queryToObject(string) {
        var pairs = (string || window.location.search).substring(1).split("&"),
          obj = {},
          pair,
          i;
        for ( i in pairs ) {
          if ( pairs[i] === "" ) continue;
          pair = pairs[i].split("=");
          obj[ decodeURIComponent( pair[0] ) ] = decodeURIComponent( pair[1] );
        }
        return obj;
      },
      notify(text) {
        this.notification = text
        setTimeout(() => {
          this.status = ''
          this.notification = false
        }, 2000)
      },
      capitalizeFirstLetter(string) {
        if (!string.charAt(0)) return
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      getRate(cb) {
        var query = this.queryToObject()
        var currency = query.currency ? query.currency.toLowerCase() : 'usd'
        return axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=nano&vs_currencies=${currency}`).then((res) => {
          if (res.data.nano && res.data.nano[currency]) this.rate = res.data.nano[currency]
          if (cb) cb(res.data)
        })
      },
      load(cb) {
        return axios.get('https://raw.githubusercontent.com/fwd/nano/master/known.json').then((res) => {
          this.usernames = res.data
          if (cb) cb(res.data)
        })
      },
      invalidUsername(name) {
        return !name || name.length > 60 || name.includes('_') || name.includes('nano_') || name.includes('xrb_') || !(/^\w+$/.test(name)) || name.includes('%5C')
      },
      isMatch(item, string) {
        // console.log(item, string)
        // if (item.address.toLowerCase() == string.toLowerCase()) return true
        if (item.name.toLowerCase().includes(string.toLowerCase())) return true
        return false
        // return item.name.toLowerCase().includes(string.toLowerCase())
      },
      query() {
        var string = this.string ? this.string.toLowerCase() : this.string
        if (!string) return
        if (string.includes('nano_') || string.includes('xrb_')) {
          return this.suggestions = [{
            name: `Nanolooker (${string.slice(0, 12)})`,
            url: `https://nanolooker.com/account/${string}`
          }]
        }
        if (!string.includes('nano_') && this.invalidUsername(string)) {
          return this.suggestions = [{
            name: 'Invalid Search',
            error: true
          }]
        }
        var item = this.usernames.find(a => this.isMatch(a, string))
        if (!item && !this.invalidUsername(string)) {
          return this.suggestions = [{
            name: 'Username Available',
            url: `https://nano.to/${string}/username`
          }]
        }
        if (!item) return this.suggestions = [{
          name: 'Invalid Search',
          error: true
        }]
        this.suggestions = this.usernames.filter(a => a.name.toLowerCase().includes(string.toLowerCase())).reverse()
      },
      async shareText(text) {
        var self = this
        // alert("yoo")
        try {
          await navigator.share({
            // title: 'MDN',
            text
            // url: 'https://developer.mozilla.org'
          })
          window.alert('API Key copied to clipboard.')
          // resultPara.textContent = 'MDN shared successfully'
        } catch (err) {
          window.alert('Could not copy.')
          // resultPara.textContent = 'Error: ' + err
          // self.$notify('Error sharing.')
        }
      },
      copy(text) {
        var self = this
        navigator.clipboard.writeText(text).then(function() {
          self.notify('Copied to clipboard.')
        }, function() {
          document.execCommand("copy");
        })
      },
      showQR(string) {
        setTimeout(() => {
          var options = {
            text: string || `nano:${this.checkout.address}${this.checkout.amount ? '?amount=' + this.convert(this.amount, 'NANO', 'RAW') : ''}`,
            width: 300,
            height: 280,
            logo: "dist/images/logo.png",
            // logoBackgroundColor: 'red'
          }
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.dark) options.colorDark = this.checkout.color.qrcode.dark
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.light) options.colorLight = this.checkout.color.qrcode.light
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.logo) options.logoBackgroundColor = this.checkout.color.qrcode.logo
          new QRCode(document.getElementById("qrcode"), options);
        }, 100)
        this.$forceUpdate()
      },
      doButton(button) {
        if (button.checkout) {
          this._checkout(button.checkout, null)
          // this.checkout = button.checkout
          // this.showQR()
          return 
        }
        if (button.link === "qrcode") {
          this.prompt.showQR = true
          this.$forceUpdate()
        }
        if (button.link === "external") {
          window.open(button.url || button.checkout, '_blank').focus();
        }
      },
      reset() {
        this.title = 'Nano.to'
        this.string = ''
        this.search = true
        this.suggestions = []
      },
      doSuggestion(suggestion) {
        if (suggestion.error) return this.reset()
        if (!suggestion.address && suggestion.url) return window.open(suggestion.url, '_blank');
        var self = this
        self.search = false
        var checkout = {
          name: suggestion.name,
          address: suggestion.address,
          amount: false,
        }
        self.prompt = {
          title: `${suggestion.name}`,
          qrcode: `nano:${suggestion.address}`,
          body: `
<p style="font-size: 26px; text-transform: lowercase; word-break: break-word; max-width: 430px; text-align: center; width: 100%; display: inline-block; margin-top: 0px; margin-bottom: 0px; text-shadow: rgb(49, 49, 49) 2px 2px 0px;">
<span style="color: rgb(253, 0, 7);">${suggestion.address.slice(0, 12)}</span>${suggestion.address.slice(12, 58)}<span style="color: rgb(253, 0, 7);">${suggestion.address.slice(59, 99)}</span>
</p>`,
          buttons: [{
            label: `Send Payment`,
            link: "external",
            checkout: checkout,
            // url: `https://nano.to/${suggestion.address}?title=@${suggestion.name}&cancel=https://nano.to/${suggestion.name}/about`
          }, {
            label: 'Open Natrium',
            link: "external",
            url: `nano:${suggestion.address}`
          }, ]
        }
        history.pushState({}, null, '/' + suggestion.name);
        self.$forceUpdate()
      },
      stringToColour(str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var colour = '#';
        for (var i = 0; i < 3; i++) {
          var value = (hash >> (i * 8)) & 0xFF;
          colour += ('00' + value.toString(16)).substr(-2);
        }
        return colour;
      },
    }
})