new Vue({
    el: '#app',
    data: {
      convert: NanocurrencyWeb.tools.convert,
      error: false,
      tab: 'docs',
      user: false,
      loading: true,
      background: false,
      title: 'Nano.to',
      prompt: false,
      search: true,
      string: '',
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
      // NanocurrencyWeb.tools.convert(checkout.amount, 'NANO', 'RAW')
      // tools.convert('1', 'NANO', 'RAW')
      // console.log( this.convert(1, 'NANO', 'RAW') )
      if (navigator.standalone || (screen.height - document.documentElement.clientHeight < 40)) {
        if (document.body) document.body.classList.add('fullscreen');
      }
      this.load((data) => {
       
        if (window.location.pathname !== '/') {
          var item = data.find(a => a.name.toLowerCase() === window.location.pathname.replace('/', '').toLowerCase())
          if (item) {
            this.checkout = {
              title: '@' + item.name,
              address: item.address,
              fullscreen: true,
              amount: false,
            }
            this.showQR()
          }
        }

        setTimeout(() => {
          this.loading = false
        }, 105)

      })
      // console.log(  )
    },
    methods: {
      notify(text) {
        this.notification = text
        setTimeout(() => {
          this.notification = false
        }, 3000)
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
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
      query() {
        var string = this.string ? this.string.toLowerCase() : this.string
        if (!string) return
        if (string.includes('nano_') || string.includes('xrb_')) {
          return this.suggestions = [{
            name: `Nanolooker (${string.slice(0, 12)})`,
            url: `https://nanolooker.com/account/${string}`
          }]
        }
        if (this.invalidUsername(string)) {
          return this.suggestions = [{
            name: 'Invalid Search',
            error: true
          }]
        }
        var item = this.usernames.find(a => a.name.toLowerCase().includes(string.toLowerCase()))
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
        this.suggestions = this.usernames.filter(a => a.name.toLowerCase().includes(string.toLowerCase()))
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
          new QRCode(document.getElementById("qrcode"), {
            text: string || `nano:${this.checkout.address}${this.checkout.amount ? '?amount=' + convert(this.checkout.amount, 'NANO', 'RAW') : ''}`,
            width: 300,
            height: 280,
            logo: "dist/images/logo.png"
          });
        }, 100)
        this.$forceUpdate()
      },
      doButton(button) {
        if (button.checkout) {
          return this.checkout = button.checkout
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
        if (suggestion.checkout) {
          this.title = 'Username'
          this.search = false
          this.prompt = {
            title: `@${suggestion.name}`,
            body: 'Username Available',
            buttons: [{
              label: 'Lease Username',
              link: "external",
              url: `https://nano.to/${suggestion.name}/username`
            }],
            more: 'https://docs.nano.to/username-api'
          }
          return
        }
        self.search = false
        var checkout = {
          title: '@' + suggestion.name,
          address: suggestion.address,
          amount: false,
          // plans: [
          //   { title: 'Tip', value: 5 }
          // ]
        }
        self.prompt = {
          title: `@${suggestion.name}`,
          qrcode: `nano:${suggestion.address}`,
          body: `
<p style="font-size: 26px; text-transform: lowercase; word-break: break-word; max-width: 430px; text-align: center; width: 100%; display: inline-block; margin-top: 0px; margin-bottom: 0px; text-shadow: rgb(49, 49, 49) 2px 2px 0px;">
<span style="color: rgb(253, 0, 7);">${suggestion.address.slice(0, 12)}</span>${suggestion.address.slice(12, 58)}<span style="color: rgb(253, 0, 7);">${suggestion.address.slice(59, 99)}</span>
</p>`,
          buttons: [{
            label: `Send Payment`,
            link: "external",
            checkout: checkout
            // url: `https://nano.to/${suggestion.address}?title=@${suggestion.name}&cancel=https://nano.to/${suggestion.name}/about`
          }, {
            label: 'Open Natrium',
            link: "external",
            url: `nano:${suggestion.address}`
          }, ]
        }
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