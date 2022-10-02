new Vue({
    el: '#app',
    data: {
      confetti: true,
      known: 'known.json',
      doc_title: 'Nano.to - Nano Username & Checkout UI',
      title: 'Nano.to',
      convert: NanocurrencyWeb.tools.convert,
      error: false,
      status: '',
      point_of_sale: false,
      user: false,
      loading: true,
      background: false,
      customAmount: '',
      rate: false,
      params: {},
      success: false,
      prompt: false,
      search: true,
      string: '',
      color: '',
      usernames: [],
      currency: 'NANO',
      notification: false,
      dev_mode: false,
      checkout: false,
      suggestions: [],
      buttons: [],
    },
    watch: {
      customAmount() {
        this.checkout.amount = this.customAmount
        this.showQR()
        this.$forceUpdate()
      },
      currency() {
        this._checkout()
      },
      string() {
        this.query()
      },
      admin() {
        this.background = !this.background
      }
    },
    mounted() {

      var self = this

      var query = this.queryToObject()

      if (query.nocache) this.known = 'https://api.nano.to/known'

      if (navigator.standalone || (screen.height - document.documentElement.clientHeight < 40)) {
        if (document.body) document.body.classList.add('fullscreen');
      }

      this.load((data) => {
        if (window.location.pathname !== '/') {
          this._checkout(null, data)
        }
        setTimeout(() => {
          this.loading = false
        }, 105)
      })

      document.onkeydown = function(evt) {
          evt = evt || window.event;
          var isEscape = false;
          if ("key" in evt) {
              isEscape = (evt.key === "Escape" || evt.key === "Esc");
          } else {
              isEscape = (evt.keyCode === 27);
          }
          if (isEscape) {
              self.reset()
          }
      }

    },
    computed: {
      value() {
        if (this.currency === 'NANO') return Number(this.checkout.amount * this.rate).toFixed(2)
        if (this.currency != 'NANO') return Math.floor(this.checkout.amount)
      },
      total() {
        return String(this.checkout.amount).includes('.') ? Number(this.checkout.amount).toFixed(3) : this.checkout.amount
        return this.checkout.amount
      }
    },
    methods: {
      lease(name) {
        axios.get(`https://api.nano.to/${name}/lease`).then((res) => {
          res.data.back = true
          this.checkout = res.data
          setTimeout(() => {
            this.checkout.amount = this.checkout.plans[2].value
            this.showQR()
            this.$forceUpdate()
          }, 100)
        }).catch(e => {
          this.notify(e.message ? e.message : 'Error 27', 'error', 10000)
        })
      },
      invoice() {
        var query = this.queryToObject()
        var path = window.location.pathname.replace('/', '').toLowerCase().replace('@', '')
        var configured = query.check_url || query.check || query.c || query.url || query.api || false
        if (configured) configured = configured.replace(':path', path).replace(':id', path)
        var endpoint = configured || `https://api.nano.to/checkout/${path}`
        axios.get(endpoint).then(async (res) => {
          if (res.data.error) return this.notify(res.data.message)
          if (res.data.plans && res.data.plans.length) {
            var selected = res.data.selected && res.data.plans.find(a => a.title.toLowerCase() === res.data.selected.toLowerCase()) ? res.data.plans.find(a => a.title.toLowerCase() === res.data.selected.toLowerCase()).value : res.data.plans[0].value
            res.data.amount = selected
          }
          if (res.data.goal) {
            var account_info = await this.balance(query.address || query.to || item.address)
            res.data.goal = {
              title: res.data.goal ? res.data.goal.split(':')[1] : '',
              total: res.data.goal ? res.data.goal.split(':')[0] : '',
              balance: Number(account_info.balance).toFixed(2)
            }
          }
          this.checkout = res.data
          history.pushState({}, null, `/${path}`);
          document.title = `${res.data.title ? res.data.title : '#' + path.split('_')[1] + ' - Nano Checkout' }`
          if (res.data.favicon) document.querySelector("link[rel*='icon']").href = res.data.favicon;
          setTimeout(() => {
            if (this.checkout && this.checkout.plans && this.checkout.plans[0]) {
              var selected = query.selected && this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()) ? this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()).value : this.checkout.plans[0].value
              this.checkout.amount = selected
            }
            this.showQR()
          }, 100)
          if (res.data.error) {
            return this.notify(`Error 26: Expired Checkout.`, 'error', 10000)
          }
        }).catch(e => {
          this.reset()
          this.notify(e.message ? e.message : 'Error 27', 'error', 10000)
        })
      },

      async _checkout(item, data, cache) {

        this.getRate()
        
        var path = window.location.pathname.replace('/', '').toLowerCase().replace('@', '')
        var item = item || this.usernames.find(a => a.name.toLowerCase() === path) || {}
        var checkout = path.includes('pay_') || path.includes('inv_') || path.includes('invoice_') || path.includes('id_') 
        
        if (path && checkout) {
          return this.invoice()
        }
        
        var query = this.queryToObject()

        var amount = query.price || query.amount || query.n || query.x || query.cost || query.p || false 

        var goal = false

        if (item && item.name) {
        
          if (!cache && query.nocache) return this.doSuggestion({ name: item.name, address: item.address })
          
          var custom = false
          var plans = item.plans || query.plans
          var vanity = item.vanity || query.vanity
          var donation = item.donate || query.custom
          var highlight = query.button || query.backdrop || query.border || query.backgrounds || query.highlight
          
          if (!plans || donation) custom = true

          if (!amount && !plans) plans = `Tip:${this.getRandomArbitrary(0.001, 0.9).toFixed(3)},Small:5,Medium:10,Large:25`
          
          var success_url = query.success || query.success_url || query.redirect || `https://nanolooker.com/block/{{block}}`
          var success_button = 'View Block'

          if (plans && typeof plans === 'string') {
            plans = plans.split(',').map(a => {
              var value = a.trim().split(':')[1]
              if (query.random || query.r) value = `${String(value).includes('.') ? String(value) + '00' + this.getRandomArbitrary2(1000, 10000) : String(value) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
              return { title: a.trim().split(':')[0], value } 
            })
          }

          if (query.goal) {

            var account_info = await this.balance(query.address || query.to || item.address)

            goal = { 
              title: query.goal ? query.goal.split(':')[1] : '',
              total: query.goal ? query.goal.split(':')[0] : '',
              balance: Number(account_info.balance).toFixed(2)
            }

          }

          this.checkout = {
            title: item.title || query.name || query.title || (item.name ? ('@' + this.capitalizeFirstLetter(item.name)) : 'Pay with NANO'),
            currency: query.currency || query.c || 'NANO',
            message: query.body || query.message || query.text || query.copy,
            fullscreen: item.back ? false : true,
            image: query.image || query.img || query.i || '',
            address: query.address || query.to || item.address,
            history_count: query.history || query.history_count,
            goal,
            custom,
            amount,
            plans,
            color: {
              vanity:  query.vanity ? query.vanity.split(':')[0].replace('$', '#') : '',
              text:  query.color ? query.color.split(':')[0].replace('$', '#') : '',
              primary: query.color ? query.color.split(':')[0].replace('$', '#') : '',
              highlight_background: highlight && highlight.split(':')[0] ? highlight.split(':')[0].replace('$', '#') : '',
              highlight_color: highlight && highlight.split(':')[1] ? highlight.split(':')[1].replace('$', '#') : '',
              highlight_address: highlight && highlight.split(':')[2] ? highlight.split(':')[2].replace('$', '#') : '',
              left: query.left || query.background && query.background.split(':')[0] ? query.background.split(':')[0].replace('$', '#') : '#FFF', 
              right: query.right || query.background && query.background.split(':')[1] ? query.background.split(':')[1].replace('$', '#') : '#009dff', 
              qrcode: {
                logo: query.logo ? query.logo : '',
                light: query.qrcode && query.qrcode.split(':')[0] ? query.qrcode.split(':')[0].replace('$', '#') : '',
                dark: query.qrcode && query.qrcode.split(':')[1] ? query.qrcode.split(':')[1].replace('$', '#') : '',
              },
              address: {
                hightlight: query.color,
              }
            },
            success_url, 
            success_button, 
            cancel: query.cancel || query.cancel_url || query.c, 
          }

          setTimeout(() => {
            if (this.checkout && this.checkout.plans && this.checkout.plans[0]) {
              var selected = query.selected && this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()) ? this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()).value : this.checkout.plans[0].value
              this.checkout.amount = selected
            }
            this.showQR()
          }, 100)
          
          document.title = `@${this.capitalizeFirstLetter(item.name)} - Nano Checkout`

        }
        
        var query = this.queryToObject()

        if (path && path.includes('nano_')) {

          var donation = query.custom

          if (!NanocurrencyWeb.tools.validateAddress(path)) return alert('Invalid Address')
          
          var plans = query.p

          var success_url = query.success || query.success_url || query.redirect || query.r

          if (!amount && !plans) plans = `Tip:${this.getRandomArbitrary(0.1, 0.9).toFixed(2)},Small:5,Medium:10,Large:25`

          if (plans) {
            plans = plans.split(',').map(a => {
              var value = a.trim().split(':')[1]
              if (this.currency !== 'NANO') value = (Number(value) / this.rate).toFixed(2)
              return { title: a.trim().split(':')[0], value } 
            })
          }

          if (query.goal) {

            var account_info = await this.balance(query.address || query.to || path)

            goal = { 
              title: query.goal ? query.goal.split(':')[1] : '',
              total: query.goal ? query.goal.split(':')[0] : '',
              balance: Number(account_info.balance).toFixed(2)
            }

          }

          this.checkout = {
            custom: !amount || donation ? true : false,
            currency: query.currency || query.c || 'NANO',
            message: query.body || query.message || query.text || query.copy,
            fullscreen: true,
            image: query.image || query.img || query.i || '',
            address: query.address || query.to || path,
            history_count: query.history || query.history_count,
            amount,
            plans,
            goal,
            title: query.name || query.title || 'Pay with NANO',
            color: {
              right: query.rightBackground || '#009dff', 
              address: {
                hightlight: query.hightlight,
              }
            },
            success_url, 
            success_button, 
            cancel: query.cancel || query.cancel_url || query.c, 
          }
          setTimeout(() => {
            if (this.checkout && this.checkout.plans && this.checkout.plans[0]) {
              var selected = query.selected && this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()) ? this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()).value : this.checkout.plans[0].value
              this.checkout.amount = selected
            }
            this.showQR()
          }, 100)
          document.title = `Pay ${path.slice(0, 12)} - Nano Checkout`
        }

      },

      getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min
      },
      getRandomArbitrary2(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      cancel() {
        if (this.checkout.cancel_url) {
          return window.location.href = this.checkout.cancel_url
        }
        this.checkout = false
      },
      planValue(plan) {
        if (this.currency === 'USD') {
          var amount = Math.floor(this.rate * plan.value)
          return `$${amount}`
        }
        if (String(plan.value) == '0.133') return plan.value + ' NANO'
        return `${plan.value && Number(plan.value) < 1 ? Number(plan.value).toFixed(1) : Math.floor(plan.value)} NANO`
      },
      clickPlan(plan) {
        this.checkout.amount = plan.value
        this.showQR()
        this.$forceUpdate()
      },
      toggleCurrency() {
        var currency = this.queryToObject().currency
        this.$forceUpdate()
      },
      // used in index.html
      redirect() {
        var redirect = this.checkout.redirect || this.checkout.success_url || this.success.redirect
            redirect = redirect
          .split('{{account}}').join(this.success.block.account)
          .split('{{amount}}').join(this.convert(this.success.block.amount, 'RAW', 'NANO'))
          .split('{{amount_raw}}').join(this.success.block.amount)
          .split('{{hash}}').join(this.success.block.hash)
          .split('{{block}}').join(this.success.block.hash)
        window.location.href = redirect 
      },
      balance(address) {
         return new Promise((resolve) => {
          var endpoint = 'https://nanolooker.com/api/rpc'
          axios.post(endpoint, { 
            action: 'account_info', 
            account: address,
          }).then((res) => {
            resolve({ balance: this.convert(res.data.balance, 'RAW', 'NANO'), balance_raw: res.data.balance })
          })
        })
      },
      pending() {
         return new Promise((resolve) => {
          var endpoint = 'https://nanolooker.com/api/rpc'
          axios.post(endpoint, { 
            action: 'pending', 
            account: this.checkout.address,
            count: "50",
            json_block: true,
            source: true,
          }).then((res) => {
            resolve(res.data.blocks == "" ? [] : Object.keys(res.data.blocks).map(key => {
              return { hash: key, account: res.data.blocks[key].source, amount: res.data.blocks[key].amount }
            }))
          })
        })
       },
       history() {
        return new Promise((resolve) => {
          var endpoint = 'https://nanolooker.com/api/rpc'
          axios.post(endpoint, { 
            action: 'account_history', 
            account: this.checkout.address,
            count: this.checkout.history_count || "50",
            raw: true
          }).then((res) => {
            resolve(res.data.history)
          })
        })
       },
      check_url() {
          axios.get(this.checkout.checkout || this.checkout.check_url || this.checkout.check).then((res) => {
            if (res.data.error) return this.notify(res.data.message)
            if (res.data.message) {
              this.checkout.fullscreen = true
              this.success = {
                confetti: res.data.confetti || false,
                title: res.data.title || false,
                message: res.data.message || false,
                // confirm: res.data.confirm || false,
                redirect_msg: res.data.redirect_msg || false,
                button: res.data.button || false,
                redirect: res.data.redirect || false,
              }
            }
            if (res.data.redirect && !res.data.button) {
              setTimeout(() => {
                window.location.href = res.data.redirect
              }, res.data.redirect_delay || 3000)
              return
            }
          })
      },
      show_success(block) {
        this.success = {
          block,
          confetti: true,
          title: 'Complete',
          message: 'Payment was sent successfully.',
          // confirm: true,
          button: this.checkout.fullscreen ? this.checkout.success_button : false,
          redirect: this.checkout.fullscreen ? this.checkout.success_url : false,
        }
        if (this.checkout.fullscreen && this.checkout.success_url && !this.checkout.success_button) {
          var success_url = this.checkout.success_url
          .split('{{account}}').join(block.account)
          .split('{{amount}}').join(this.convert(this.checkout.amount, 'RAW', 'NANO'))
          .split('{{amount_raw}}').join(block.amount)
          .split('{{hash}}').join(block.hash)
          .split('{{block}}').join(block.hash)
          setTimeout(() => {
            window.location.href = success_url
          }, this.checkout.redirect_delay || 3000)
          return
        }
        return 
      },
      check() {
        if (this.checkout.checkout || this.checkout.check_url || this.checkout.check) return this.check_url()
        try {
          return this.pending().then((_pending) => {
            var in_pending = _pending.find(a => a.amount === this.convert(this.checkout.amount, 'NANO', 'RAW') )
            if (in_pending) return this.show_success(in_pending)
            if (!in_pending) {
              this.history().then((_history) => {
                var in_history = _history.find(a => a.amount === this.convert(this.checkout.amount, 'NANO', 'RAW') )
                if (in_history) return this.show_success(in_history)
                if (!in_history) {
                  this.notify('Payment not found', 'warn')
                }
              })
            }
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
      notify(text, type, timeout){
        this.notification = text
        if (type) this.status = type
        setTimeout(() => {
          this.status = 'blue'
          this.notification = false
        }, timeout || 3000)
      },
      capitalizeFirstLetter(string) {
        if (!string || !string.charAt(0)) return
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
        return axios.get(this.known).then((res) => {
          this.usernames = res.data
          if (cb) cb(res.data)
        })
      },
      invalidUsername(name) {
        return !name || name.length > 60 || name.includes('_') || name.includes('nano_') || name.includes('xrb_') || !(/^\w+$/.test(name)) || name.includes('%5C')
      },
      isMatch(item, string) {
        if (item.name.toLowerCase().includes(string.toLowerCase())) return true
        return false
      },
      query() {
        var string = this.string ? this.string.toLowerCase() : this.string
        if (!string) return
        var item = this.usernames.find(a => this.isMatch(a, string))
        if ((string.includes('nano_') || string.includes('xrb_')) && NanocurrencyWeb.tools.validateAddress(string)) {
          var username = this.usernames.filter(a => a.address === string)
          var suggestions = []
          if (username && username[username.length - 1]) {
            suggestions.push({
              name: username[username.length - 1].name,
              checkout: {
                back: true,
                name: username[username.length - 1].name,
                address: username[username.length - 1].address
              }
            })
            suggestions.push({
              name: `Nanolooker (${string.slice(0, 12)})`,
              url: `https://nanolooker.com/account/${string}`
            })
          }
          this.suggestions = suggestions
          return
        }
        if (!string.includes('nano_') && string.length >= 60) {
          return this.suggestions = [{
              name: `Hash (${string.slice(0, 12)})`,
              url: `https://nanolooker.com/block/${string}`
            }]
        }
        if (!string.includes('nano_') && this.invalidUsername(string)) {
          return this.suggestions = [{
            name: 'Invalid Search',
            error: true
          }]
        }
        this.suggestions = this.usernames.filter(a => a.name.toLowerCase().includes(string.toLowerCase())).reverse()
        if ((!item || item.name.toLowerCase() !== string.toLowerCase()) && !this.invalidUsername(string) && !this.suggestions.find(a => a.name.toLowerCase() === string.toLowerCase())) {
          if (this.suggestions.length > 5) {
            this.suggestions.unshift({
              name: `${string} (Username Available)`,
              lease: string,
              color: '#cf94ff',
              checkout: {
                title: '@' + string
              }
            })
          } else {
            this.suggestions.push({
              name: `${string} (Username Available)`,
              lease: string,
              color: '#cf94ff',
              checkout: {
                title: '@' + string
              }
            })
          }
        }
      },
      async shareText(text) {
        var self = this
        try {
          await navigator.share({
            text
          })
          window.alert('API Key copied to clipboard.')
        } catch (err) {
          window.alert('Could not copy.')
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
        document.getElementById("qrcode").innerHTML = "";
        setTimeout(() => {
          var options = {
            text: string || `nano:${this.checkout.address}${this.checkout.amount ? '?amount=' + this.convert(this.checkout.amount, 'NANO', 'RAW') : ''}`,
            width: 300,
            height: 280,
            logo: "dist/images/logo.png",
          }
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.dark) options.colorDark = this.checkout.color.qrcode.dark
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.light) options.colorLight = this.checkout.color.qrcode.light
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.logo) options.logo = this.checkout.color.qrcode.logo
          if (this.checkout && this.checkout.color && this.checkout.color.qrcode && this.checkout.color.qrcode.transparent) options.backgroundImageAlpha = this.checkout.color.qrcode.transparent
          new QRCode(document.getElementById("qrcode"), options);
          this.$forceUpdate()
        }, 100)
      },
      doButton(button) {
        if (button.checkout) {
          this._checkout(button.checkout, null, true)
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
        this.dev_mode = false
        this.checkout = false
        this.customAmount = ''
        this.status = 'blue'
        this.color = 'blue'
        this.suggestions = []
        history.pushState({}, null, '/');
        document.title = this.doc_title
      },
      doSuggestion(suggestion) {
        var query = this.queryToObject()
        if (suggestion.alert) return this.notify(suggestion.alert)
        if (suggestion.lease) return this.lease(suggestion.lease)
        if (suggestion.url) return window.open(suggestion.url, '_blank');
        if (suggestion.checkout) return this._checkout(suggestion.checkout, null)
        if (!suggestion.address) return
        if (suggestion.error) return this.reset()
        var self = this
        self.search = false
        var checkout = {
          currency: 'NANO',
          name: suggestion.name,
          address: suggestion.address,
          amount: false,
          back: true,
          // fullscreen: true
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
          }, {
            label: 'Open Natrium',
            link: "external",
            url: `nano:${suggestion.address}`
          }, ]
        }
        history.pushState({}, null, '/' + suggestion.name + (query.nocache ? '?nocache=true' : ''));
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
