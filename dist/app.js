window.copy = function(text) {
  var self = this
  navigator.clipboard.writeText(text).then(function() {
    nano.notify('Copied to clipboard.')
  }, function() {
    document.execCommand("copy");
  })
}

var nano = new Vue({
    el: '#app',
    data: {
      loadedName: false,
      bigPictureSearch: '',
      big_picture_mode: false,
      copy,
      confetti: true,
      known: 'known.json',
      doc_title: 'Nano.to - Nano Name Service',
      title: 'Nano.to',
      convert: NanocurrencyWeb.tools.convert,
      lang: '',
      size: window.width > 768 ? 100 : 250,
      error: false,
      status: '',
      user: false,
      loading: true,
      background: false,
      customAmount: '',
      rate: false,
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
      frame: false,
      frame_full: false,
      suggestions: [],
      buttons: [],
      strings: {
        'en': { 
          note: 'Verify the recipient address, and only send NANO (XNO) to this address.',
          intro: 'Search Blockchain',
          guide: 'To complete, send:',
          button: 'Confirm',
          tap: 'Tap to open Wallet',
          custom: 'Custom Amount:',
          search: 'Search',
          send: 'Send Payment',
          open: 'Open Wallet',
          available: 'Name Available',
          success: 'Success',
          redirecting: 'Redirecting..',
          created: 'Created:',
          expires: 'Expires:',
          github: 'Github:',
          discord: 'Discord:',
          twitter: 'Twitter:',
          nostr: 'Nostr:',
          renew: 'Renew',
          cancel: 'Cancel',
          purchase: 'Purchase',
          website: 'Website'
        },
        'uk': { 
          note: 'Перевірте адресу одержувача і надсилайте тільки NANO (XNO) на цю адресу.',
          intro: 'Пошук Blockchain',
          guide: 'Для завершення надішліть:',
          button: 'Перевірити стан',
          tap: 'Торкніться, щоб відкрити Wallet',
          custom: 'Введіть суму:',
          search: 'Пошук',
          send: 'Оплата',
          open: 'Wallet',
          available: 'Ім\'я доступне',
          success: 'Успіх',
          redirecting: 'Перенаправлення..',
          created: 'Створено:',
          expires: 'Термін дії:',
          renew: 'Поновити',
          cancel: 'Скасувати'
        },
        // RU can view UK version
        'ru': { 
          note: 'Перевірте адресу одержувача і надсилайте тільки NANO (XNO) на цю адресу.',
          intro: 'Пошук Blockchain',
          guide: 'Для завершення надішліть:',
          button: 'Перевірити стан',
          tap: 'Торкніться, щоб відкрити Wallet',
          custom: 'Введіть суму:',
          search: 'Пошук',
          send: 'Оплата',
          open: 'Wallet',
          available: 'Ім\'я доступне',
          success: 'Успіх',
          redirecting: 'Перенаправлення..',
          created: 'Створено:',
          expires: 'Термін дії:',
          renew: 'Поновити',
          cancel: 'Скасувати'
        },
        'pt': { 
          note: 'Verifique o endereço do destinatário e envie apenas NANO (XNO) para este endereço.',
          intro: 'Pesquisar na Blockchain',
          guide: 'Para concluir, envie:',
          button: 'Verifique o Pagamento',
          tap: 'Clique para abrir a Carteira',
          custom: 'Digite o valor:',
          search: 'Pesquisar',
          send: 'Enviar Pagamento',
          open: 'Abrir Carteira',
          available: 'Nome disponível',
          success: 'Pronto!',
          redirecting: 'Redirecionando..',
          created: 'Criado em:',
          expires: 'Válido até:',
          renew: 'Renovar',
          cancel: 'Cancelar'
        },
        'es': { 
          note: 'Verifique la direccion y solo mande NANO ($XNO) a esta direccion digital.',
          intro: 'Cadena Nano',
          guide: 'Para completar, envie:',
          button: 'Confirmar',
          tap: 'Tap para abrir Natrium',
          custom: 'Monto:',
          search: 'Buscar',
          send: 'Envia Pago',
          open: 'Abrir Wallet',
          available: 'Nombre Disponible',
          success: 'Done.',
          redirecting: 'Un segundo..',
          created: 'Creado:',
          expires: 'Vence:',
          renew: 'Renovar',
          cancel: 'Cancelar'
        },
        'de': { 
          note: 'Überprüfe die Empfängeradresse. Sende NANO (XNO) nur an diese Adresse.',
          intro: 'Blockchain durchsuchen',
          guide: 'Sende zum Abschluss:',
          button: 'Zahlung überprüfen',
          tap: 'Tippe hier, um das Wallet zu öffnen',
          custom: 'Betrag eingeben:',
          search: 'Suchen',
          send: 'Zahlung ausführen',
          open: 'Wallet öffnen',
          available: 'Verfügbar',
          success: 'Aktion erfolgreich',
          redirecting: 'Weiterleitung..',
          created: 'Erstellt am:',
          expires: 'Läuft ab am:',
          renew: 'Erneuern',
          cancel: 'Stornieren'
        },
        'ja': {
          note: '支払い先のアドレスが正しいことを確認し、NANO (XNO) 以外を送金しないでください。',
          intro: 'ブロックチェーンを検索',
          guide: '支払う金額：',
          button: '支払いを確認',
          tap: 'タップしてウォレットを開く',
          custom: '金額を入力してください:',
          search: '検索',
          send: '送金',
          open: 'ウォレット',
          available: '利用可能',
          success: '成功',
          redirecting: 'リダイレクト中..',
          created: '作成日:',
          expires: '有効期限:',
          renew: '更新する',
          cancel: 'キャンセル'
        },
        'ko': { 
          note: '받는 사람 주소를 확인하고 이 주소로 NANO(XNO)만 보내세요.',
          intro: '블록체인 검색',
          guide: '완료하려면 다음을 보내십시오:',
          button: '결제 확인',
          tap: '월렛을 열려면 탭하세요',
          custom: '금액을 입력하세요:',
          search: '찾다',
          send: '송금',
          open: '지갑 열기',
          available: '사용 가능한 사용자 이름',
          success: '성공',
          redirecting: '리디렉션 중..',
          created: '만들어진:',
          expires: '만료:',
          renew: '고쳐 쓰다',
          cancel: '취소'
        },
        'pl': { 
          note: 'Zweryfikuj adres odbiorcy i prześlij NANO (XNO) tylko na ten adres.',
          intro: 'Przeszukaj Blockchain',
          guide: 'Aby ukończyć, wyślij:',
          button: 'Sprawdź Płatność',
          tap: 'Kliknij aby otworzyć Portfel',
          custom: 'Wpisz ilość:',
          search: 'Szukaj',
          send: 'Wyślij Płatność',
          open: 'Otwórz Portfel',
          available: 'Dostępne',
          success: 'Sukces',
          redirecting: 'Przekierowywanie..',
          created: 'Utworzony:',
          expires: 'Wygasa:',
          renew: 'Odnów',
          cancel: 'Anuluj'
        }
      },
      updatable: [
        {
          label: 'title',
          value: '',
          max: 99,
          placeholder: ''
        },
        // 'name',
        {
          label: 'address',
          value: '',
          max: 99,
          placeholder: ''
        },
        // 'title',
        {
          label: 'github',
          value: '',
          max: 99,
          placeholder: ''
        },
        {
          label: 'twitter',
          value: '',
          max: 99,
          placeholder: ''
        },
        {
          label: 'mastodon',
          value: '',
          max: 99,
          placeholder: ''
        },
        // 'calendly',
        {
          label: 'location',
          value: '',
          max: 99,
          placeholder: ''
        },
        // 'freelance',
        {
          label: 'website',
          value: '',
          max: 99,
          placeholder: ''
        },
        {
          label: 'for_sale',
          value: '',
          type: 'number',
          max: 99,
          placeholder: 'Number'
        },
        {
          label: 'goal_ui',
          value: '',
          max: 99,
          placeholder: '10:Monthly Hosting'
        },
        {
          label: 'rep_address',
          value: '',
          max: 99,
          placeholder: ''
        },
        {
          label: 'donation_address',
          value: '',
          max: 99,
          placeholder: ''
        },
        {
          label: 'metadata',
          value: '',
          max: 99,
          placeholder: ''
        },
      ]
    },
    watch: {
      customAmount() {
        this.checkout.amount = this.customAmount
        this.showQR()
        this.$forceUpdate()
      },
      currency() {
      },
      string() {
        this.query()
      },
      admin() {
        this.background = !this.background
      }
    },
    mounted() {

      var query = this.queryToObject()

      if (window.name === 'nault') document.documentElement.className += ' nault'

      this.lang = window.navigator.language.split('-')[0]

      var self = this

      if (navigator.standalone || (screen.height - document.documentElement.clientHeight < 40)) {
        if (document.body) document.body.classList.add('fullscreen');
      }

      this.loading = true

      var bigPictureMode = query.bigscreen || query.bigPicture || query.big || query.full || query.fullscreen || query.bpm || query.b || query.f

      if (bigPictureMode) {
        this.big_picture_mode = true
        // return 
      }

      this.load((data) => {

        var sub_path = window.location.pathname !== '/'

        if (sub_path) this.loadedName = true
        
        if (bigPictureMode && sub_path) {
          this.bigPictureSearch = (window.location.pathname.replace('/', '').replace('@', ''))
        }

        if (!bigPictureMode && sub_path) {
          this._checkout(null, data)
        }

        setTimeout(() => {
          this.loading = false
        }, 100)

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
              self.size = '100%'
          }
         if (evt.keyCode == '38') {
              self.size = '100%'
          }
          else if (evt.keyCode == '40') {
                self.size = '170%'
          }
      }

      window.onmessage = function(e) {
          if (e.data == 'close') {
            self.frame = false
            self.frame_full = false
          }
      };

    },
    computed: {
      bigPictureCards() {
        var show_collection = window.location.pathname !== '/'
        var collection = this.usernames.filter(a => {
          return a.name.toLowerCase().includes(this.bigPictureSearch.replace('@', '').toLowerCase()) || a.address === this.bigPictureSearch
        })
        return collection
        // .reverse()
        .sort((a, b) => a.created_unix - b.created_unix)
        .sort((a, b) => b.image ? 1 : -1)
        // .reverse()
        // return this.usernames.sort((a, b) => a.image == b.image).reverse()
      },
      localhost() {
        return window.location.hostname === 'localhost'
      },
      naultMode() {
        var query = this.queryToObject()
        return window.name === 'nault' || query.iframe
      },
      currencyComputed() {
        var query = this.queryToObject()
        var flag = query.currency || query.c
        if (this.checkout && this.checkout === 'NANO') return 'USD'
        return query && flag ? flag.toUpperCase() : 'USD'
      },
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

      bigPictureCheckout(name) {
        // this.checkout = false
        if (this.bigPictureSearch.includes('nano_')) {
          // name.tite = 'asd'
          // this._checkout(name)
          return
        }
        if (name.for_sale) {
          return axios.post('https://api.nano.to', { action: 'purchase_name', name: name.name }).then((res) => {
            // console.log(res.data)
            res.data.cancel = true
            this.json_checkout(res.data, null, true)
          })
        } else {
          name.back = true
          name.cancel = true
          this._checkout(name)
        }
      },

      getYearDifference(timestamp1, timestamp2) {
        // Convert Unix timestamps to milliseconds
        var date1 = new Date(timestamp1 * 1000);
        var date2 = new Date(timestamp2 * 1000);

        // Calculate the difference in years
        var yearDiff = date2.getFullYear() - date1.getFullYear();

        // Adjust the difference if the second date hasn't reached the same month and day as the first date
        if (date2.getMonth() < date1.getMonth() || (date2.getMonth() === date1.getMonth() && date2.getDate() < date1.getDate())) {
          yearDiff--;
        }

        // console.log("yearDiff", yearDiff)

        return yearDiff;
      },

      update_name(prompt) {
        if (window.name !== 'nault') {
        }

          // this.checkout = {
          //   title: 'Update Name',
          //   update_name: '@' + prompt.name,
          //   updatable,
          //   amount: 0.0383902,

        return axios.post('https://rpc.nano.to', { action: 'update_name', name: prompt.name }).then((res) => {
          // this.usernames = res.data
          // if (cb) cb(res.data)
          // console.log(res.data)
          res.data.changes = {}
          this.updatable.map(a => a.label).map(a => {
            var chosen = this.usernames.find(a => a.name === prompt.name)
            // console.log(a, res.data[a], prompt[a])
            if (a === 'title') res.data.changes[a] = chosen[a]
            else res.data.changes[a] = res.data[a] ? res.data[a] : chosen[a]
          })
          res.data.cancel = true
          this.checkout = res.data
          setTimeout(() => {
            // this.checkout.amount = this.checkout.plans[2].value
            this.showQR()
            this.$forceUpdate()
          }, 100)
        })
      },

      renew() {
        if (window.name !== 'nault') {
          var ok = window.confirm('Only the Owner may extend lease. Press OK to continue.')
          if (!ok) return
        }
        axios.post(`https://rpc.nano.to`, { action: "get_name", username: this.prompt.name }).then((res) => {
          if (res.data.error) return alert(res.data.message)
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

      deepLink(string) {
        if (window.name === 'nault') {
          var check_url = this.checkout.checkout || this.checkout.check_url || this.checkout.check
          if (string && string.includes('?') && check_url) {
            string += '&callback=' + check_url
          } else {
            string += '?callback=' + check_url
          }
          parent.postMessage(string, window.location.hostname === 'localhost' ? 'http://localhost:4200' : 'https://nault.pro');
          return
        }
        window.open(string, '_blank');
      },
      plan_title(string) {
        if (string && string.includes('POW Credits')) {
          string = `${this.kFormatter(string.replace('POW Credits', '').split(',').join(''))} POW Credits`
        }
        return string
      },
      whois(prompt, diff) {
        if ( diff && diff >= 10 ) {
          var prepend = `Name is registered for 10 years or longer`
          if (prompt.github) return window.alert(`${prepend} and verified as @${prompt.github} on Github.`)
          if (prompt.twitter) return window.alert(`${prepend} and verified as @${prompt.twitter} on Twitter.`)
          if (prompt.discord) return window.alert(`${prepend} and verified as @${prompt.discord} on Discord.`)
          return window.alert(prepend + '.')
        }
        var string = `Verified as @${prompt.github} on Github.` 
        if (
          !prompt.github && 
          prompt.mastodon 
          ) {
          return window.alert(`Verified as @${prompt.mastodon.split('https://')[1]} on Mastodon.`)
        }
        if (
          !prompt.github && 
          prompt.twitter 
          ) {
          return window.alert(`Verified as @${prompt.twitter} on Twitter.`)
        }
        if (
          prompt.github && 
          prompt.discord && 
          prompt.twitter && 
          (prompt.github === prompt.twitter && prompt.github === prompt.discord )
          ) {
          return window.alert(`Verified as @${prompt.github} on Github, Twitter and Discord.`)
        }
        if (
          prompt.github && 
          prompt.twitter && 
          (prompt.github === prompt.twitter )
          ) {
          return window.alert(`Verified as @${prompt.github} on Github and Twitter.`)
        }
        return window.alert(string)
      },
      kFormatter(num, digits) {
        num = Number(num)
        const lookup = [
          { value: 1, symbol: "" },
          { value: 1e3, symbol: "K" },
          { value: 1e6, symbol: "M" },
          { value: 1e9, symbol: "G" },
          { value: 1e12, symbol: "T" },
          { value: 1e15, symbol: "P" },
          { value: 1e18, symbol: "E" }
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function(item) {
          return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
      },
      nFormatter(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      },
      lease(username) {
        axios.post(`https://rpc.nano.to`, { action: "get_name", username }).then((res) => {
          if (res.data.error) return alert(res.data.message)
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
          if (path) history.pushState({}, null, `/${path}`);
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

      async json_checkout(checkout) {
        var query = this.queryToObject()
          var res = { data: checkout }
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
          res.data.cancel_url = window.location.origin
          res.data.success_url = window.location.origin
          this.checkout = res.data
          // document.title = `${res.data.title ? res.data.title : '#' + path.split('_')[1] + ' - Nano Checkout' }`
          if (res.data.favicon) document.querySelector("link[rel*='icon']").href = res.data.favicon;
          setTimeout(() => {
            this.showQR()
          }, 100)
      },

      async _checkout(item, data, cache) {

        await this.getRate()
        
        var path = window.location.pathname.replace('/', '').toLowerCase().replace('@', '')

        var name = decodeURIComponent(path).replace('@', '')

        item = item || this.usernames.find(a => a.name.toLowerCase() === name) || {}
        
        if ( name === 'DESIRED_USERNAME' ) return alert('Reading the docs? Try searching for desired name instead.')

        var checkout = path.includes('pay_') || path.includes('inv_') || path.includes('invoice_') || path.includes('id_') 
        
        if (path && checkout) {
          return this.invoice()
        }

        if ( (path && !path.includes('nano_')) && !this.usernames.find(a => a.name.toLowerCase() === name) ) return alert('Name not registered.')
        
        var query = this.queryToObject()

        var amount = query.p || query.price || query.amount || item.amount || item.price || false 

        // var goal = false

        if (item && item.name) {
        
          if (!cache && query.nocache || item.website_button_only) return this.doSuggestion({ 
            title: item.title, 
            calendly: item.calendly, 
            discord: item.discord, 
            twitter: item.twitter, 
            mastodon: item.mastodon, 
            github: item.github, 
            website: item.website, 
            website_button_only: item.website_button_only, 
            website_button_required: item.website_button_required, 
            name: item.name, 
            address: item.address, 
            created: item.created, 
            expires: item.expires, 
            created_unix: item.created_unix, 
            expires_unix: item.expires_unix, 
            expired: item.expired,
            goal: item.goal_ui,
            image: item.image,
          })
          
          var custom = false
          var plans = item.plans || query.plans
          var vanity = item.vanity || query.vanity
          var donation = item.donate || query.custom
          var highlight = query.backdrop || query.border || query.backgrounds || query.highlight
          
          if (!amount && !plans || donation) custom = true

          if (!amount && !plans) plans = `Tip:0.1330${this.getRandomArbitrary2(100, 1000)},Small:5,Medium:10,Large:25,Gigantic:100`
          
          var success_url = query.success || query.success_url || query.redirect || `https://nanolooker.com/block/{{block}}`
          var success_button = 'View Block'

          if (plans && typeof plans === 'string') {
            plans = plans.split(',').map(a => {
              var value = a.trim().split(':')[1]
              if (query.random || query.r) value = `${String(value).includes('.') ? String(value) + '00' + this.getRandomArbitrary2(1000, 10000) : String(value) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
              return { title: a.trim().split(':')[0], value } 
            })
          }

          // if (item.goal_ui) {
          //   plans = plans.map(a => {
          //     if (a.title !== 'Tip') a.value = `${String(a.value).includes('.') ? String(a.value) + '00' + this.getRandomArbitrary2(1000, 10000) : String(a.value) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
          //     return a
          //   })
          // }

          if (item.goal_ui) {
            plans = plans.map(a => {
              if (a.title !== 'Tip') a.value = `${String(a.value).includes('.') ? String(a.value) + '00' + this.getRandomArbitrary2(1000, 10000) : String(a.value) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
              return a
            })
          }

          if (amount && query.currency || query.c) {
            amount = (amount / this.rate).toFixed(2)
          }

          if (amount && query.random || query.r) {
            amount = `${String(amount).includes('.') ? String(amount) + '00' + this.getRandomArbitrary2(1000, 10000) : String(amount) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
          }

          var goal
          var _goal = item.goal_ui || item.goal  || query.goal

          if (_goal) {

            var account_info = await this.balance(query.address || query.to || item.address)

            goal = { 
              title: _goal ? _goal.split(':')[1] : '',
              title: _goal ? _goal.split(':')[1] : '',
              total: _goal ? _goal.split(':')[0] : '',
              balance: Number(account_info.balance).toFixed(2),
              pending: account_info.pending
            }

          }

          if (item && (item.lowercase_title || item.lowercase)) {
            item.name = item.name.toLowerCase()
          }

          if (item && !(item.lowercase_title || item.lowercase)) {
            item.name = this.capitalizeFirstLetter(item.name)
          }

   

          // this.checkout = {
          //   title: 'Update Name',
          //   update_name: '@' + prompt.name,
          //   updatable,
          //   amount: 0.0383902,
          //   buttonText: 'Save Changes',
          //   instruction: 'To complete, send yourself',
          //   // plans,
          //   currency: query.currency || query.c || 'NANO',
          //   message: query.body || query.message || query.text || query.copy,
          //   fullscreen: item.expires ? true : false,
          //   image: item.image || query.image || query.img || query.i || '',
          //   address: query.address || query.to || item.address,
          //   history_count: query.history || query.history_count,
          //   description: query.description || query.body || query.message,
          //   calendly: item.calendly,
          //   discord: item.discord,
          //   twitter: item.twitter,
          //   mastodon: item.mastodon,
          //   github: item.github, 
          //   website: item.website, 
          //   // buttonText: item.button || query.button,
          //   note: item.note || query.note,
          //   expired: item.expired || this.expired(item.expires_unix),
          //   goal,
          //   custom,
          //   // amount,
          //   yearDiff: item.yearDiff || this.getYearDifference(item.created_unix, item.expires_unix),
          //   color: {
          //     vanity:  query.vanity ? query.vanity.split(':')[0].replace('$', '#') : '',
          //     text:  query.color ? query.color.split(':')[0].replace('$', '#') : '',
          //     primary: query.color ? query.color.split(':')[0].replace('$', '#') : '',
          //     highlight_background: highlight && highlight.split(':')[0] ? highlight.split(':')[0].replace('$', '#') : '',
          //     highlight_color: highlight && highlight.split(':')[1] ? highlight.split(':')[1].replace('$', '#') : '',
          //     highlight_address: highlight && highlight.split(':')[2] ? highlight.split(':')[2].replace('$', '#') : '',
          //     left: query.left || query.background && query.background.split(':')[0] ? query.background.split(':')[0].replace('$', '#') : '#FFF', 
          //     right: query.right || query.background && query.background.split(':')[1] ? query.background.split(':')[1].replace('$', '#') : '#009dff', 
          //     qrcode: {
          //       logo: query.logo ? query.logo : '',
          //       light: query.qrcode && query.qrcode.split(':')[0] ? query.qrcode.split(':')[0].replace('$', '#') : '',
          //       dark: query.qrcode && query.qrcode.split(':')[1] ? query.qrcode.split(':')[1].replace('$', '#') : '',
          //     },
          //     address: {
          //       hightlight: query.color,
          //     }
          //   },
          //   success_url, 
          //   success_button, 
          //   cancel: query.cancel || query.cancel_url,
          //   known: item 
          // }

          this.checkout = {
            title: query.title || item.name,
            currency: query.currency || query.c || 'NANO',
            message: query.body || query.message || query.text || query.copy,
            fullscreen: item.cancel ? false : true,
            image: item.image || query.image || query.img || query.i || '',
            address: query.address || query.to || item.address,
            history_count: query.history || query.history_count,
            description: query.description || query.body || query.message,
            calendly: item.calendly,
            discord: item.discord,
            twitter: item.twitter,
            mastodon: item.mastodon,
            github: item.github, 
            website: item.website, 
            buttonText: item.button || query.button,
            note: item.note || query.note,
            expired: item.expired || this.expired(item.expires_unix),
            goal,
            custom,
            amount,
            plans,
            yearDiff: item.yearDiff || this.getYearDifference(item.created_unix, item.expires_unix),
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
            back: item.cancel,
            cancel: item.cancel,
            known: item 
          }

          setTimeout(() => {
            if (this.checkout && this.checkout.plans && this.checkout.plans[0]) {
              var selected = query.selected && this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()) ? this.checkout.plans.find(a => a.title.toLowerCase() === query.selected.toLowerCase()).value : this.checkout.plans[0].value
              this.checkout.amount = selected
            }
            this.showQR()
          }, 100)
          
          document.title = `${this.capitalizeFirstLetter(item.name)} - Nano Checkout`

        }
        
        var query = this.queryToObject()

        if (path && path.includes('nano_')) {

          var donation = query.custom

          if (!NanocurrencyWeb.tools.validateAddress(path)) return alert('Invalid Address')
          
          var plans = query.p

          var success_url = query.success || query.success_url || query.redirect || query.r

          if (!amount && !plans) plans = `Tip:0.1330${this.getRandomArbitrary2(100, 1000)},Small:5,Medium:10,Large:25,Gigantic:100`

          if (plans) {
            plans = plans.split(',').map(a => {
              var value = a.trim().split(':')[1]
              if (this.currency !== 'NANO') value = (Number(value) / this.rate).toFixed(2)
              return { title: a.trim().split(':')[0], value } 
            })
          }

          if ((!plans || !plans.length) && (query.random || query.r || item.random)) {
            amount = (!String(amount).includes('.') ? amount + '.00' : amount + '0') + this.getRandomArbitrary2(10000, 100000)
          }

          if (query.goal) {

            var account_info = await this.balance(query.address || query.to || path)

            goal = { 
              title: query.goal ? query.goal.split(':')[1] : '',
              total: query.goal ? query.goal.split(':')[0] : '',
              balance: Number(account_info.balance).toFixed(2)
            }

          }

          if (query.goal) {
            plans = plans.map(a => {
              if (a.title !== 'Tip') a.value = `${String(a.value).includes('.') ? String(a.value) + '00' + this.getRandomArbitrary2(1000, 10000) : String(a.value) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
              return a
            })
          }

          if (amount && query.currency || query.c) {
            amount = (amount / this.rate).toFixed(2)
          }

          if (amount && query.random || query.r) {
            amount = `${String(amount).includes('.') ? String(amount) + '00' + this.getRandomArbitrary2(1000, 10000) : String(amount) + '.00' + this.getRandomArbitrary2(1000, 10000) }`
          }

          this.checkout = {
            title: query.title,
            custom: !amount || donation ? true : false,
            note: query.note,
            currency: query.currency || query.c || 'NANO',
            message: query.body || query.message || query.text || query.copy,
            fullscreen: !checkout.cancel,
            image: query.image || query.img || query.i || '',
            address: query.address || query.to || path,
            history_count: query.history || query.history_count,
            amount,
            plans,
            goal,
            title: query.name || query.title || 'Nano Pay',
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
        // console.log( "this.checkout.cancel_url", this.checkout.cancel_url )
        if (this.checkout.cancel_url && this.checkout.cancel_url !== window.location.origin) {
          return window.location.href = this.checkout.cancel_url
        }
        this.checkout = false
      },
      planValue(plan) {
        if (this.currency === 'USD') {
          var amount = Math.floor(this.rate * plan.value)
          return `$${amount}`
        }
        if (String(plan.value) == '0.133') return plan.value + ' Nano'
        return `${plan.value && Number(plan.value) < 1 ? Number(plan.value).toFixed(1) : Math.floor(plan.value)} Nano`
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
          var endpoint = 'https://rpc.nano.to'
          axios.post(endpoint, { 
            action: 'account_info', 
            account: address,
            pending: true
          }).then((res) => {
            resolve({ 
              pending: res.data.receivable_nano, 
              balance: res.data.receivable_nano && Number(res.data.receivable_nano) ? (Number(res.data.balance_nano) + Number(res.data.receivable_nano)) : res.data.balance_nano, 
              balance_raw: res.data.balance 
            })
          })
        })
      },
      pending() {
         return new Promise((resolve) => {
          var endpoint = 'https://rpc.nano.to'
          axios.post(endpoint, { 
            action: 'receivable', 
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
          var endpoint = 'https://rpc.nano.to'
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
          axios.post(this.checkout.checkout || this.checkout.check_url || this.checkout.check, { changes: this.checkout.changes }).then((res) => {
            if (res.data.error) return this.notify(res.data.message)
            if (res.data.message) {
              this.checkout.fullscreen = true
              this.success = {
                confetti: res.data.confetti || false,
                title: res.data.title || false,
                message: res.data.message || false,
                redirect_msg: res.data.redirect_msg || false,
                button: res.data.button || false,
                redirect: res.data.redirect || false,
              }
            }
            if (this.checkout.update_name || this.checkout.purchase_name) {
              // setTimeout(() => {
                this.success = false
                this.checkout = false
                // this.prompt = 
                Object.keys(res.data.username).map(a => {
                  this.prompt[a] = res.data.username[a]
                })
                this.dev_mode = true
                this.$forceUpdate()
                // window.location.href = res.data.redirect
              // }, 500)
              return
              // return dev_mode = true
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
        var query = this.queryToObject()
        redirect = query.r || query.redirect || query.success || this.checkout.success_url || false
        this.success = {
          block,
          confetti: true,
          title: this.checkout.goal ? this.checkout.goal.title  : 'Success',
          message: this.checkout.goal ? `Contributed` : 'Payment received',
          redirect: this.checkout.goal ? false : redirect,
        }
        if (redirect) {
          var success_url = this.checkout.success_url
          .split('{{account}}').join(block.account)
          .split('{{amount}}').join(this.convert(this.checkout.amount, 'RAW', 'NANO'))
          .split('{{amount_raw}}').join(block.amount)
          .split('{{hash}}').join(block.hash)
          .split('{{block}}').join(block.hash)
          setTimeout(() => {
            if (success_url === 'calendly') {
              this.frame = `https://calendly.com/${this.checkout.known.calendly.replace('https://calendly.com/', '')}?embed_domain=nano.to&embed_type=PopupText`
              this.success = false
              this.checkout = false
              return
            }
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
        var currency = query.currency || query.c
            currency = currency ? currency.toLowerCase() : 'usd'
        return axios.post('https://rpc.nano.to', { action: 'fiat_price', currency }).then((res) => {
        this.rate = res.data.price
          if (cb) cb(res.data)
        })
      },
      load(cb) {
        var query = this.queryToObject()
        if (query.nocache) this.known = 'https://api.nano.to/known.json'
        return axios.get(this.known).then((res) => {
          this.usernames = res.data
          if (cb) cb(res.data)
        })
      },
      validUsername(name) {
        const regex = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/gmu;
        return ( 
          (name.length > 0 && name.length < 25) && 
          !name.includes('.') && 
          regex.test(name) && 
          !(this.usernames && this.usernames.find(a => a.github === name))
        )
      },
      invalidUsername(name) {
        return !(this.validUsername(name))
      },
      isMatch(item, string) {
        if (
          item.name.toLowerCase().includes(string.toLowerCase()) ||
          (item.github && item.github.toLowerCase().includes(string.toLowerCase()))
          ) return true
        return false
      },
      timestamp(timestamp) {
        return (new Date(timestamp * 1000)).getTime()
      },
      expired(timestamp) {
        var today = (new Date).getTime()
        return this.timestamp(timestamp) === today || today > this.timestamp(timestamp)
      },
      query() {
        var string = this.string ? this.string : this.string
        if (!string) return
        var item = this.usernames.find(a => this.isMatch(a, string))
        if ((string.includes('nano_') || string.includes('xrb_')) && NanocurrencyWeb.tools.validateAddress(string)) {
          var username = this.usernames.filter(a => a.address === string)
          var suggestions = []
          if (username && username[username.length - 1]) {
            suggestions.push({
              name: username[username.length - 1].name,
              github: username[username.length - 1].github,
              // website: username[username.length - 1].website,
              twitter: username[username.length - 1].twitter,
              mastodon: username[username.length - 1].mastodon,
              discord: username[username.length - 1].discord,
              calendly: username[username.length - 1].calendly,
              nostr: username[username.length - 1].nostr,
              website: username[username.length - 1].website,
              website_button_only: username[username.length - 1].website_button_only,
              website_button_required: username[username.length - 1].website_button_required,
              expired: this.expired(username[username.length - 1].expires_unix),
              created_unix: username[username.length - 1].created_unix,
              expires_unix: username[username.length - 1].expires_unix,

              title: username[username.length - 1].title,
              location: username[username.length - 1].location,
              for_sale: username[username.length - 1].for_sale,
              goal_ui: username[username.length - 1].goal_ui,
              donation_address: username[username.length - 1].donation_address,
              metadata: username[username.length - 1].metadata,
              
              yearDiff: this.getYearDifference(username[username.length - 1].created_unix, username[username.length - 1].expires_unix),
              checkout: {
                back: true,
                cancel: true,
                name: username[username.length - 1].name,
                address: username[username.length - 1].address,
                goal_ui: username[username.length - 1].goal_ui,
                image: username[username.length - 1].image,
                // expired: this.expired(username[username.length - 1].expires_unix),
              }
            })
            suggestions.push({
              name: `Nanolooker (${string.slice(0, 12)})`,
              url: `https://nanolooker.com/account/${string}`
            })
          }
          this.suggestions = suggestions.map(a => {
            a.expired = this.expired(a.expires_unix)
            return a
          })
          return
        }
        if (!string.includes('nano_') && string.length >= 60) {
          return this.suggestions = [{
              name: `Hash (${string.slice(0, 12)})`,
              url: `https://nanolooker.com/block/${string}`
            }]
        }
        this.suggestions = this.usernames.filter(a => a.name.toLowerCase().includes(string.toLowerCase()) || (a.github && a.github.toLowerCase().includes(string.toLowerCase()))).reverse()
        this.suggestions = this.suggestions.map(a => {
          a.yearDiff = this.getYearDifference(a.created_unix, a.expires_unix)
          a.expired = this.expired(a.expires_unix)
          return a
        })
        this.suggestions = this.suggestions.sort((a, b) => a.name.length - b.name.length);
        if (!this.suggestions.length && !string.includes('nano_') && this.invalidUsername(string)) {
          return this.suggestions = []
        }
        if ((!item || item.name.toLowerCase() !== string.toLowerCase()) && !this.invalidUsername(string) && !this.suggestions.find(a => a.name.toLowerCase() === string.toLowerCase())) {
          if (this.suggestions.length > 5) {
            this.suggestions.unshift({
              name: `${string} (${this.strings[this.lang] ? this.strings[this.lang].available : this.strings['en'].available})`,
              lease: string,
              opacity: 1,
              color: 'cyan',
              available: true,
              checkout: {
                cancel: true,
                title: '@' + string
              }
            })
          } else {
            this.suggestions.push({
              name: `${string} (${this.strings[this.lang] ? this.strings[this.lang].available : this.strings['en'].available})`,
              lease: string,
              opacity: 1,
              color: 'cyan',
              available: true,
              checkout: {
                cancel: true,
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
      showQR(string) {
        setTimeout(() => {
          document.getElementById("qrcode").innerHTML = "";
        }, 50)
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

        downloadKey(key) {
this.download('nano_rpc_key.txt', `====================================
NANO NODE API KEY
====================================
${key}
====================================
KEEP SECRET. NOT FOR PUBLIC VIEW.
====================================
`)
        },

      download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      },

      async doButton(button) {
        if (button.purchase_name) {
          return axios.post('https://api.nano.to', { action: 'purchase_name', name: button.purchase_name }).then((res) => {
            // console.log(res.data)
            res.data.cancel = true
            this.json_checkout(res.data, null, true)
          })
        }
        if (button.purchase_rpc) {
          // var body = {}
          return axios.post('https://rpc.nano.to/new_key', { email: window.prompt("Email Address:") }).then((res) => {
            if (res.data.message) return alert(res.data.message)
            this.downloadKey(res.data.key)
            // if (!res.data.json && !res.data.id) {
            //   // console.log(button)
            //   return
            // }
            // if (res.data.json) {
            //   return axios.get(res.data.json).then((checkout) => {
            //     if (checkout.data.message) return alert(checkout.data.message)
            //     this.json_checkout(checkout.data, null, true)
            //   })
            // }
            // this.json_checkout(res.data, null, true)
          })
          return 
        }
        if (button.website) {
          var body = {}
          if (button.website_button_required) {
            body.required = window.prompt(button.website_button_required)
          }
          return axios.post(button.website, body).then((res) => {
            if (!res.data.json && !res.data.id) {
              // console.log(button)
              return
            }
            if (res.data.json) {
              return axios.get(res.data.json).then((checkout) => {
                if (checkout.data.message) return alert(checkout.data.message)
                this.json_checkout(checkout.data, null, true)
              })
            }
            this.json_checkout(res.data, null, true)
          })
          return 
        }
        if (button.checkout) {
          this._checkout(button.checkout, null, true)
          return 
        }
        if (button.deep) {
          this.deepLink(button.deep)
          return
        }
        if (button.link === "iframe") {
          this.frame_full = button.full
          this.frame = button.url
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
        this.frame = false
        this.customAmount = ''
        this.status = 'blue'
        this.color = 'blue'
        this.suggestions = []
        history.pushState({}, null, '/');
        document.title = this.doc_title
        this.size = '100%'
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
          github: suggestion.github,
          website: suggestion.website,
          twitter: suggestion.twitter,
          mastodon: suggestion.mastodon,
          discord: suggestion.discord,
          calendly: suggestion.calendly,
          nostr: suggestion.nostr,
          goal: suggestion.goal_ui,
          image: suggestion.image,
          description: suggestion.description,
          expired: suggestion.expired || this.expired(suggestion.expires_unix),
          yearDiff: suggestion.yearDiff || this.getYearDifference(suggestion.created_unix, suggestion.expires_unix),
          // yearDiff: this.getYearDifference(suggestion.created_unix, suggestion.expires_unix),
          back: true,
          amount: false
        }
        var buttons = [
          
        ]
        if (!suggestion.website_button_only) {
          buttons.unshift({
            label: window.name === 'nault' ? 'Open Nault' : (this.strings[this.lang] ? this.strings[this.lang].open : this.strings['en'].open),
            // label: this.strings[this.lang] ? this.strings[this.lang].open : this.strings['en'].open,
            link: "external",
            // url: `nano:${suggestion.address}`
            deep: `nano:${suggestion.address}`
          })
          
          if (suggestion.for_sale) {

            checkout.plans = false
            checkout.amount = suggestion.for_sale
            checkout.instructions = `Purchase Nano.to/${suggestion.name}`

            buttons.unshift({
              label: this.strings[this.lang] ? this.strings[this.lang].purchase : this.strings['en'].purchase,
              // link: "external",
              purchase_name: suggestion.name,
            })

          } else {
            buttons.unshift({
              label: checkout.goal ? 'Donate' : (this.strings[this.lang] ? this.strings[this.lang].send : this.strings['en'].send),
              // link: "external",
              checkout,
            })
          }

        } else {
          buttons.unshift({
            label: suggestion.website_button_only,
            website: suggestion.website,
            website_button_only: suggestion.website_button_only,
            website_button_required: suggestion.website_button_required
          })
          buttons.unshift({
            label: 'NEW KEY',
            purchase_rpc: true
            // website: suggestion.website,
            // website_button_only: suggestion.website_button_only,
            // website_button_required: suggestion.website_button_required
          })
        }
        if (suggestion.calendly) {
          var checkout = {
            label: 'Book Meeting',
            link: "iframe"
          }
          if ( Number(suggestion.calendly_rate) ) {
            checkout.checkout = {
              name: suggestion.name,
              address: suggestion.address,
              price: suggestion.calendly_rate,
              random: true,
              redirect: 'calendly',
              title: 'To Book Meeting, Send',
              button: "Book Meeting",
              back: false
            }
          } else {
            checkout.url = 'https://calendly.com/' + suggestion.calendly.replace('https://calendly.com/', '')
          }

          buttons.push(checkout)
        }
        if (suggestion.store_url) {
          buttons.push({
            link: "iframe",
            full: true,
            label: suggestion.store_name || 'My Shop',
            url: suggestion.store_url
          })
        }
        var _prompt = {
          name: `${suggestion.name}`,
          title: suggestion.title,
          address: suggestion.address,
          qrcode: `nano:${suggestion.address}`,
          created: suggestion.created,
          expires: suggestion.expires,
          expired: suggestion.expired || this.expired(suggestion.expires_unix),
          github: suggestion.github,
          website: suggestion.website,
          location: suggestion.location,
          for_sale: suggestion.for_sale,
          goal_ui: suggestion.goal_ui,
          donation_address: suggestion.donation_address,
          metadata: suggestion.metadata,
          // metadata: suggestion.metadata,
          twitter: suggestion.twitter,
          mastodon: suggestion.mastodon,
          discord: suggestion.discord,
          calendly: suggestion.calendly,
          expires_unix: suggestion.expires_unix,
          created_unix: suggestion.created_unix,
          yearDiff: this.getYearDifference(suggestion.created_unix, suggestion.expires_unix),
          buttons
        }
        if (!suggestion.website_button_only) {
          _prompt.body = `
<p onclick="window.copy('${suggestion.address}')" style="font-size: 28px;text-transform: lowercase;word-break: break-word;max-width: 420px;font-family: 'Cyber';text-align: center;width: 100%;display: inline-block;margin-top: 0px;margin-bottom: 0px;text-shadow: rgb(49 49 49 / 0%) 2px 2px 0px;letter-spacing: 3px;">
<span style="color: rgb(255 56 62);">${suggestion.address.slice(0, 12)}</span>${suggestion.address.slice(12, 58)}<span style="color: rgb(255 56 62);">${suggestion.address.slice(59, 99)}</span>
</p>`
        }
        self.prompt = _prompt
        history.pushState({}, null, '/' + suggestion.name + (query.nocache ? '?nocache=true' : ''));
        self.$forceUpdate()
        self.size = window.width > 768 ? '210%' : '160%' 
      },
    }
})