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
        explorer: 'https://nanobrowse.com',
        buttonText: false,
        loadedName: false,
        bigPictureSearch: '',
        big_picture_mode: false,
        copy,
        confetti: true,
        known: '../../known.json',
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
        strings: {},
        updatable: [{
                label: 'title',
                value: '',
                max: 99,
                placeholder: ''
            },
            {
                label: 'address',
                value: '',
                max: 99,
                placeholder: ''
            },
            {
                label: 'github',
                value: '',
                max: 99,
                placeholder: ''
            }, {
                label: 'twitter',
                value: '',
                max: 99,
                placeholder: ''
            }, {
                label: 'mastodon',
                value: '',
                max: 99,
                placeholder: ''
            },
            {
                label: 'location',
                value: '',
                max: 99,
                placeholder: ''
            },
            {
                label: 'website',
                value: '',
                max: 99,
                placeholder: ''
            }, {
                label: 'for_sale',
                value: '',
                type: 'number',
                max: 99,
                placeholder: 'Number'
            }, {
                label: 'goal_ui',
                value: '',
                max: 99,
                placeholder: '10:Monthly Hosting'
            }, {
                label: 'rep_address',
                value: '',
                max: 99,
                placeholder: ''
            }, {
                label: 'donation_address',
                value: '',
                max: 99,
                placeholder: ''
            }, {
                label: 'metadata',
                value: '',
                max: 99,
                placeholder: ''
            }, 
            // {
            //     label: 'nostr_public_key',
            //     value: '',
            //     max: 99,
            //     placeholder: ''
            // },
        ]
    },
    watch: {
        customAmount() {
            this.checkout.amount = this.customAmount
            this.showQR()
            this.$forceUpdate()
        },
        currency() {},
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
        var bigPictureMode = query.bigscreen || query.bigPicture || query.big || query.full || query.fullscreen || query.bpm || query.b || query.f || query.play || query.nanopoly
        if (bigPictureMode) {
            this.big_picture_mode = true
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
            if (!Object.keys(this.strings).includes(this.lang)) {
                this.lang = 'en'
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
        }
        window.onmessage = function(e) {
            if (e.data == 'close') {
                self.frame = false
                self.frame_full = false
            }
        };
    },
    computed: {
        mobile() {
            return window.width < 769
        },
        bigPictureCards() {
            var show_collection = window.location.pathname !== '/'
            var collection = this.usernames.filter(a => {
                return a.name.toLowerCase().includes(this.bigPictureSearch.replace('@', '').toLowerCase()) || a.address === this.bigPictureSearch
            })
            return collection.sort((a, b) => a.created_unix - b.created_unix).sort((a, b) => b.image ? 1 : -1)
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
        addRandomAmount(plans, random) {
            if (plans.includes(',')) {
                var query = this.queryToObject()
                return plans.split(',').map(a => {
                    var value = a.trim().split(':')[1]
                    // var random = query.random || query.r
                    if (random !== "false" && random !== false) {
                        if (Number(value) < 1) value = `${String(value).includes('.') ? String(value) + '0' + this.getRandomArbitrary(10, 1000) : String(value) + '.00' + this.getRandomArbitrary(1000, 10000) }`
                        if (Number(value) >= 1) value = `${String(value).includes('.') ? String(value) + '000' + this.getRandomArbitrary(1000, 10000) : String(value) + '.000' + this.getRandomArbitrary(1000, 10000) }`
                    }
                    return {
                        title: a.trim().split(':')[0],
                        value
                    }
                })
            }
            if (typeof plans === 'string' && Number(plans)) {
                return `${String(plans).includes('.') ? String(plans) + '00' + this.getRandomArbitrary(1000, 10000) : String(plans) + '.00' + this.getRandomArbitrary(1000, 10000) }`
            }
        },
        do_update_name(res, name) {
            res.data.changes = {}
            this.updatable.map(a => a.label).map(a => {
                var chosen = this.usernames.find(a => a.name.toLowerCase() === name.toLowerCase().replace('@', '').replace(':', ''))
                if (a === 'title') res.data.changes[a] = chosen[a]
                else res.data.changes[a] = res.data[a] ? res.data[a] : chosen[a]
            })
            res.data.cancel = true
            this.checkout = res.data
            setTimeout(() => {
                this.showQR()
                this.$forceUpdate()
            }, 100)
        },
        mastodonLink(link) {
            if (!link.includes('xno.social') && !link.includes('://')) link = `xno.social/${link.replace('http://', '').replace('https://', '')}`
            return link.replace('http://', '').replace('https://', '')
        },
        cancel_search() {
            if (this.prompt) {
                this.prompt = false;
                this.search = true;
            }
            var query = this.queryToObject()
            if (query.nocache) this.reset()
        },
        validExternalImage(url) {
            if (!url || typeof url !== 'string') return false
            if (url.startsWith('https://nano.to/dist/hosted/')) return true
            if (url.startsWith('https://video.twimg.com/')) return true
            if (url.startsWith('https://xno.nano.org/images/')) return true
            if (url.startsWith('https://pbs.twimg.com/media/')) return true
            if (url.startsWith('https://blog.nano.to/images/')) return true
            return false
        },
        bigPictureCheckout(name) {
            if (this.bigPictureSearch.includes('nano_')) {
                return
            }
            if (Number(name.for_sale)) {
                return axios.post('https://api.nano.to', {
                    action: 'purchase_name',
                    name: name.name
                }).then((res) => {
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
            return yearDiff;
        },
        update_name(prompt) {
            if (window.name !== 'nault') {
                var ok = window.confirm('Only address owner can update lease. Press OK to continue.')
                if (!ok) return
            }
            return axios.post('https://rpc.nano.to', {
                action: 'update_name',
                name: prompt.name
            }).then((res) => {
                this.do_update_name(res, prompt.name)
            })
        },
        renew() {
            if (window.name !== 'nault') {
                var ok = window.confirm('Only address owner can extend lease. Press OK to continue.')
                if (!ok) return
            }
            axios.post(`https://rpc.nano.to`, {
                action: "get_name",
                username: this.prompt.name
            }).then((res) => {
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
            if (diff && diff >= 10) {
                var prepend = `Name is registered for 10 years or longer`
                if (prompt.github && prompt.twitter) return window.alert(`${prepend} and self-verified as @${prompt.github.replace('https://github.com/', '')} on Github and @${prompt.twitter.replace('https://twitter.com/', '')} on Twitter.`)
                if (prompt.github) return window.alert(`${prepend} and self-verified as @${prompt.github.replace('https://github.com/', '')} on Github.`)
                if (prompt.twitter) return window.alert(`${prepend} and self-verified as @${prompt.twitter.replace('https://twitter.com/', '')} on Twitter.`)
                if (prompt.discord) return window.alert(`${prepend} and self-verified as @${prompt.discord.replace('https://discord.com/', '')} on Discord.`)
                return window.alert(prepend + '.')
            }
            if (prompt.github && prompt.twitter) {
                return window.alert(`Verified as @${prompt.github.replace('https://github.com/', '').replace('@', '')} on Github and @${prompt.twitter.replace('https://twitter.com/', '').replace('@', '')} on Twitter.`)
            }
            if (prompt.twitter) {
                return window.alert(`Verified as @${prompt.twitter.replace('https://twitter.com/', '').replace('@', '')} on Twitter.`)
            }
            if (prompt.github) {
                return window.alert(`Verified as @${prompt.github.replace('https://github.com/', '').replace('@', '')} on Github.`)
            }
            if (prompt.mastodon) {
                return window.alert(`Verified as @${prompt.mastodon.split('https://')[1].replace('@', '')} on Mastodon.`)
            }
            return 
        },
        kFormatter(num, digits) {
            num = Number(num)
            const lookup = [{
                value: 1,
                symbol: ""
            }, {
                value: 1e3,
                symbol: "K"
            }, {
                value: 1e6,
                symbol: "M"
            }, {
                value: 1e9,
                symbol: "G"
            }, {
                value: 1e12,
                symbol: "T"
            }, {
                value: 1e15,
                symbol: "P"
            }, {
                value: 1e18,
                symbol: "E"
            }];
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
            axios.post(`https://rpc.nano.to`, {
                action: "get_name",
                username
            }).then((res) => {
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
                if (res.data.update_name) return this.do_update_name(res, res.data.update_name)
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
                if (res.data.block) return this.show_success(res.data.block, 'Checkout Complete')
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
                this.notify(e.message ? 'Error 27:' + e.message : 'Error 27', 'error', 10000)
            })
        },
        async json_checkout(checkout) {
            var query = this.queryToObject()
            var res = {
                data: checkout
            }
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
            var name = decodeURIComponent(path).replace('@', '').replace(':', '')
            item = item || this.usernames.find(a => a.name.toLowerCase() === name) || {}
            if (item && path.includes(':')) return window.location.href = window.location.origin + '/' + path.replace(':', '')
            if (name === 'DESIRED_USERNAME') return alert('Reading the docs? Try searching for desired name instead.')
            if (item && Number(item.for_sale)) return this.bigPictureCheckout(item)
            var checkout = path.includes('pay_') || path.includes('inv_') || path.includes('invoice_') || path.includes('id_')
            if (path && checkout) return this.invoice()
            if ((path && !path.includes('nano_')) && !this.usernames.find(a => a.name.toLowerCase() === name)) {
                if (path.includes('/')) return window.location.href = '/'
                this.string = path
                alert('Name not registered.')
                return 
            }
            var query = this.queryToObject()
            var amount = query.p || query.price || query.amount || item.amount || item.price || false
            if (item && item.name) {

                if (!cache && query.nocache || item.website_button_only) return this.doSuggestion({
                    title: item.title,
                    calendly: item.calendly,
                    discord: item.discord,
                    twitter: item.twitter,
                    for_sale: item.for_sale,
                    location: item.location,
                    mastodon: item.mastodon,
                    metadata: item.metadata,
                    image: item.image,
                    github: item.github,
                    website: item.website,
                    website_button_only: item.website_button_only,
                    website_button_required: item.website_button_required,
                    exchange_hot_wallet: item.exchange_hot_wallet,
                    name: item.name,
                    address: item.address,
                    created: item.created,
                    expires: item.expires,
                    created_unix: item.created_unix,
                    expires_unix: item.expires_unix,
                    expired: item.expired,
                    goal: item.goal_ui
                })

                var goal
                var _goal = query.goal || item.goal_ui || item.goal
                var custom = false
                var plans = item.plans || query.plans
                var success_url = query.success || query.success_url || query.redirect || `${this.explorer}/block/{{block}}`
                var success_button = 'View Block'
                var vanity = item.vanity || query.vanity
                var donation = item.donate || query.custom
                var highlight = query.backdrop || query.border || query.backgrounds || query.highlight
                var random = query.random || query.r

                // configure plans in metdata
                if (item && item.metadata && item.metadata.includes('plans=')) {
                    plans = item.metadata.split('&').find(a => a.includes('plans=')).replace('?', '').replace('plans=', '').split('%20').join(' ').trim()
                }

                // configure title in metdata
                if (item && item.metadata && item.metadata.includes('title=')) {
                    item.title = item.metadata.split('&').find(a => a.includes('title=')).replace('?', '').replace('title=', '').split('&nbsp;').join(' ').split('%20').join(' ').trim()
                }

                // configure buttonText in metdata
                if (item && item.metadata && item.metadata.includes('button=')) {
                    item.button = item.metadata.split('&').find(a => a.includes('button=')).replace('?', '').replace('button=', '').split('&nbsp;').join(' ').split('%20').join(' ').trim()
                }

                // configure success_url in metdata
                if (item && item.metadata && item.metadata.includes('success=')) {
                    success_url = item.metadata.split('&').find(a => a.includes('success=')).replace('?', '').replace('success=', '').trim()
                }

                // configure custom in metdata
                if (item && item.metadata && item.metadata.includes('custom=')) {
                    custom = item.metadata.split('&').find(a => a.includes('custom=')).replace('?', '').replace('custom=', '').trim()
                }

                // configure random in metdata
                if (item && item.metadata && item.metadata.includes('random=')) {
                    random = item.metadata.split('&').find(a => a.includes('random=')).replace('?', '').replace('random=', '').trim()
                    if (random === "false" || random === "0") random = false
                }

                // configure _goal in metdata
                if (item && item.metadata && item.metadata.includes('goal=')) {
                    _goal = item.metadata.split('&').find(a => a.includes('goal=')).replace('?', '').replace('goal=', '').trim()
                }

                if (!amount && !plans || donation) custom = true
                if (!amount && !plans) plans = `Tip:0.133,Small:5,Medium:10,Large:25,Gigantic:100`

                if (plans && typeof plans === 'string') {
                    plans = this.addRandomAmount(plans, random)
                }

                if (amount && query.currency || query.c) {
                    amount = (amount / this.rate).toFixed(2)
                }
                
                if (amount && random) {
                    amount = this.addRandomAmount(amount, random)
                }

                if (_goal) {
                    var account_info = await this.balance(query.address || query.to || item.address)
                    var baseline = _goal.split(':')[2]
                    var balance = Number(account_info.balance).toFixed(2)
                    if (baseline) {
                        balance = Number(Number(balance) - Number(baseline)).toFixed(2)
                        if (Number(balance) < 0) balance = 0
                    }
                    var title = _goal ? _goal.split(':')[1] : false
                    var total = _goal ? _goal.split(':')[0] : false
                    // support reverse title and total
                    if (Number(title)) {
                        title = _goal ? _goal.split(':')[0] : false
                        total = _goal ? _goal.split(':')[1] : false
                    }
                    goal = {
                        title,
                        total,
                        balance,
                        pending: account_info.pending
                    }
                }
                if (item && (item.lowercase_title || item.lowercase)) {
                    item.name = item.name.toLowerCase()
                }
                if (item && !(item.lowercase_title || item.lowercase)) {
                    item.name = this.capitalizeFirstLetter(item.name)
                }
                this.checkout = {
                    title: query.title || item.name,
                    // title: query.title || item.title || item.name, // safari is trash
                    currency: query.currency || query.c || 'NANO',
                    message: query.body || query.message || query.text || query.copy,
                    fullscreen: item.cancel ? false : true,
                    image: item.image || query.image || query.img || query.i || '',
                    address: query.address || query.to || item.address,
                    history_count: query.history || query.history_count,
                    description: item.description || item.title || query.description || query.body || query.message,
                    metadata: item.metadata || false,
                    calendly: item.calendly,
                    discord: item.discord,
                    twitter: item.twitter,
                    for_sale: item.for_sale,
                    location: item.location,
                    mastodon: item.mastodon,
                    github: item.github,
                    notify: item.notify,
                    exchange_hot_wallet: item.exchange_hot_wallet,
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
                        vanity: query.vanity ? query.vanity.split(':')[0].replace('$', '#') : '',
                        active: query.active ? query.active.split(':')[0].replace('$', '#') : '',
                        text: query.color ? query.color.split(':')[0].replace('$', '#') : '',
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
                var success_url = query.success || query.success_url || query.redirect
                var random = query.random || query.r
                if (!amount && !plans) plans = `Tip:0.133,Small:5,Medium:10,Large:25,Gigantic:100`
                if (plans) plans = this.addRandomAmount(plans, random)
                // duplicate code
                // if ((!plans || !plans.length) && (query.random || query.r || item.random)) {
                //     amount = (!String(amount).includes('.') ? amount + '.00' : amount + '0') + this.getRandomArbitrary(10000, 100000)
                // }
                if (query.goal) {
                    var account_info = await this.balance(query.address || query.to || path)
                    goal = {
                        title: query.goal ? query.goal.split(':')[1] : '',
                        total: query.goal ? query.goal.split(':')[0] : '',
                        balance: Number(account_info.balance).toFixed(2)
                    }
                }
                if (amount && query.currency || query.c) {
                    amount = (amount / this.rate).toFixed(2)
                }
                if (amount && random) {
                    amount = this.addRandomAmount(amount, random)
                }
                this.checkout = {
                    title: query.title,
                    custom: !amount || donation ? true : false,
                    note: query.note || query.memo || query.title,
                    notify: query.notify,
                    currency: query.currency || query.c || 'NANO',
                    message: query.body || query.message || query.text || query.copy,
                    fullscreen: !checkout.cancel,
                    image: query.image || query.img || query.i || '',
                    address: query.address || query.to || path,
                    history_count: query.history || query.history_count,
                    amount,
                    plans,
                    goal,
                    title: query.name || query.title || 'Pay Nano',
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
            return Math.floor(Math.random() * (max - min) + min)
        },
        cancel() {
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
            redirect = redirect.split('{{account}}').join(this.success.block.account).split('{{amount}}').join(this.convert(this.success.block.amount, 'RAW', 'NANO')).split('{{amount_raw}}').join(this.success.block.amount).split('{{hash}}').join(this.success.block.hash).split('{{block}}').join(this.success.block.hash)
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
                        return {
                            hash: key,
                            account: res.data.blocks[key].source,
                            amount: res.data.blocks[key].amount
                        }
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
            axios.post(this.checkout.checkout || this.checkout.check_url || this.checkout.check, {
                changes: this.checkout.changes
            }).then((res) => {
                if (res.data.error) {
                    this.buttonText = false
                    return this.notify(res.data.message)
                }
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
                    this.buttonText = false
                }
                if (res.data.redirect && !res.data.button) {
                    setTimeout(() => {
                        window.location.href = res.data.redirect
                    }, res.data.redirect_delay || 3000)
                    return
                }
            })
        },
        show_success(block, message) {
            var query = this.queryToObject()
            redirect = query.redirect || query.success || this.checkout.success_url
            this.success = {
                block,
                confetti: true,
                title: this.checkout.goal ? this.checkout.goal.title : 'Success',
                message: message || (this.checkout.goal ? (this.strings[this.lang] ? this.strings[this.lang].donated : this.strings['en'].donated) : (this.strings[this.lang] ? this.strings[this.lang].payment_send : this.strings['en'].payment_send)),
                redirect: this.checkout.goal ? false : redirect,
            }
            if (this.checkout.goal) {
                setTimeout(async () => {
                    var account_info = await this.balance(this.checkout.address)
                    this.checkout.goal = {
                        title: this.checkout.goal.title,
                        total: this.checkout.goal.total,
                        balance: Number(account_info.balance).toFixed(2),
                        pending: account_info.pending
                    }
                    this.notify('Donated')
                    this.success = false
                    this.buttonText = false
                }, this.checkout.redirect_delay || 4000)
                return
            }
            if (redirect) {
                var success_url = redirect.split('{{account}}').join(block.account).split('{{amount}}').join(this.convert(this.checkout.amount, 'RAW', 'NANO')).split('{{amount_raw}}').join(block.amount).split('{{hash}}').join(block.hash).split('{{block}}').join(block.hash)
                setTimeout(() => {
                    if (success_url === 'calendly') {
                        this.frame = `https://calendly.com/${this.checkout.known.calendly.replace('https://calendly.com/', '')}?embed_domain=nano.to&embed_type=PopupText`
                        this.success = false
                        this.checkout = false
                        return
                    }
                    window.location.href = success_url
                }, this.checkout.redirect_delay || 3000)
                return
            }
            return
        },
        check() {
            this.buttonText = this.strings[this.lang] ? this.strings[this.lang].checking : this.strings['en'].checking
            if (this.checkout.checkout || this.checkout.check_url || this.checkout.check) {
                return this.check_url()
            }
            try {
                return this.pending().then((_pending) => {
                    var in_pending = _pending.find(a => a.amount === this.convert(this.checkout.amount, 'NANO', 'RAW'))
                    if (in_pending) return this.show_success(in_pending)
                    if (!in_pending) {
                        this.history().then((_history) => {
                            var in_history = _history.find(a => a.amount === this.convert(this.checkout.amount, 'NANO', 'RAW'))
                            if (in_history) return this.show_success(in_history)
                            if (!in_history) {
                                this.notify('Payment not found', 'warn')
                                this.buttonText = false
                            }
                        })
                    }
                })
            } catch (e) {
                this.notify(e.message ? e.message : 'Error Occured')
            }
        },
        queryToObject(string) {
            var pairs = (string || window.location.search).substring(1).split("&"),
                obj = {},
                pair,
                i;
            for (i in pairs) {
                if (pairs[i] === "") continue;
                pair = pairs[i].split("=");
                obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
            }
            return obj;
        },
        notify(text, type, timeout) {
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
            return axios.post('https://rpc.nano.to', {
                action: 'fiat_price',
                currency
            }).then((res) => {
                this.rate = res.data.price
                if (cb) cb(res.data)
            })
        },
        load(cb) {
            var query = this.queryToObject()
            return axios.get('/strings.json').then((string) => {
                this.strings = string.data
                if (query.nocache) this.known = 'https://api.nano.to/known.json'
                return axios.get(this.known).then((res) => {
                    this.usernames = res.data
                    if (cb) cb(res.data)
                })
            })
        },
        validUsername(name) {
            const regex = /^[\p{L}\p{N}][\p{L}\p{N}._-]*$/gmu;
            return (
                (name.length > 0 && name.length < 25) && !name.includes('.') && regex.test(name) && !(this.usernames && this.usernames.find(a => a.github === name)))
        },
        invalidUsername(name) {
            return !(this.validUsername(name))
        },
        isMatch(item, string) {
            if (item.name.toLowerCase().includes(string.toLowerCase()) || (item.github && item.github.toLowerCase().includes(string.toLowerCase()))) return true
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
                        exchange_hot_wallet: username[username.length - 1].exchange_hot_wallet,
                        metadata: username[username.length - 1].metadata,
                        image: username[username.length - 1].image,
                        twitter: username[username.length - 1].twitter,
                        location: username[username.length - 1].location,
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
                        name: `NanoBrowse (${string.slice(0, 12)})`,
                        url: `${this.explorer}/account/${string}`
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
                    name: `Block (${string.slice(0, 12)}..)`,
                    url: `${this.explorer}/block/${string}`
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
                return axios.post('https://api.nano.to', {
                    action: 'purchase_name',
                    name: button.purchase_name
                }).then((res) => {
                    res.data.cancel = true
                    this.json_checkout(res.data, null, true)
                })
            }
            var query = this.queryToObject()
            var bigPictureMode = query.bigscreen || query.bigPicture || query.big || query.full || query.fullscreen || query.bpm || query.b || query.f
            if (button.website) {
                var body = {}
                if (button.website_button_required) {
                    body.required = window.prompt(button.website_button_required)
                }
                return axios.post(button.website, body).then((res) => {
                    if (!res.data.json && !res.data.id) {
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
            this.big_picture_mode = false
            this.checkout = false
            this.frame = false
            this.customAmount = ''
            this.status = 'blue'
            this.color = 'blue'
            this.buttonText = false
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
                exchange_hot_wallet: suggestion.exchange_hot_wallet,
                website: suggestion.website,
                twitter: suggestion.twitter,
                for_sale: suggestion.for_sale,
                location: suggestion.location,
                mastodon: suggestion.mastodon,
                metadata: suggestion.metadata,
                image: suggestion.image,
                discord: suggestion.discord,
                calendly: suggestion.calendly,
                nostr: suggestion.nostr,
                goal: suggestion.goal_ui,
                description: suggestion.description,
                expired: suggestion.expired || this.expired(suggestion.expires_unix),
                yearDiff: suggestion.yearDiff || this.getYearDifference(suggestion.created_unix, suggestion.expires_unix),
                // yearDiff: this.getYearDifference(suggestion.created_unix, suggestion.expires_unix),
                back: true,
                amount: false
            }
            var buttons = []
            if (!suggestion.website_button_only) {
                buttons.unshift({
                    label: window.name === 'nault' ? 'Open Nault' : (this.strings[this.lang] ? this.strings[this.lang].open : this.strings['en'].open),
                    // label: this.strings[this.lang] ? this.strings[this.lang].open : this.strings['en'].open,
                    link: "external",
                    // url: `nano:${suggestion.address}`
                    deep: `nano:${suggestion.address}`
                })
                if (Number(suggestion.for_sale)) {
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
                if (Number(suggestion.calendly_rate)) {
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
                exchange_hot_wallet: suggestion.exchange_hot_wallet,
                website: suggestion.website,
                for_sale: suggestion.for_sale,
                goal_ui: suggestion.goal_ui,
                donation_address: suggestion.donation_address,
                metadata: suggestion.metadata,
                image: suggestion.image,
                twitter: suggestion.twitter,
                location: suggestion.location,
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
<span style="color: rgb(255 56 62);">${suggestion.address.slice(0, 12)}</span>${suggestion.address.slice(12, 59)}<span style="color: rgb(255 56 62);">${suggestion.address.slice(59, 99)}</span>
</p>`
            }
            self.prompt = _prompt
            history.pushState({}, null, '/' + suggestion.name + (query.nocache ? '?nocache=true' : ''));
            self.$forceUpdate()
            self.size = '180%'
        },
    }
})