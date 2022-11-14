# store

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

```
store
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-applypatch
│  │  ├─ post-checkout
│  │  ├─ post-commit
│  │  ├─ post-merge
│  │  ├─ post-receive
│  │  ├─ post-rewrite
│  │  ├─ post-update
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-auto-gc
│  │  ├─ pre-commit
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate
│  │  ├─ update
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 01
│  │  │  └─ 433bca2ac76590c48fabfee8d69d7b223f48bb
│  │  ├─ 15
│  │  │  └─ 6c904a604003355ecd6ddf1ce260d481c7acca
│  │  ├─ 3e
│  │  │  └─ 5a13962197105f2078d2a224cc57dfa09b4893
│  │  ├─ 40
│  │  │  └─ 3adbc1e527906a4aa59558cd582c20bcd1d738
│  │  ├─ 4a
│  │  │  └─ afc5f6ed86fe6dff8d4b6be59290cbdeb61656
│  │  ├─ 4c
│  │  │  └─ 3373726979dfbbbf833a2d46527dc3a8f27de8
│  │  ├─ 55
│  │  │  └─ 7c04d4a18d1da39f7d695c889c16d23890160d
│  │  ├─ 59
│  │  │  └─ 1a0312d9dac2a6f0e766b2a8f9151d62decd94
│  │  ├─ 64
│  │  │  └─ afaea7e0f99e8262f35bd394af63c86e2c04b3
│  │  ├─ 65
│  │  │  └─ 10c6a45035b6573151ff6196e4bdea78deb75d
│  │  ├─ 6c
│  │  │  └─ 4b475e5569b338d44b33daf3ee923ddc9a67a4
│  │  ├─ 87
│  │  │  └─ 9051a29739fdfb17ae82ed23b53fac251c2b7e
│  │  ├─ 91
│  │  │  └─ 0e297e0f53483455d2aa432887c3b7975d6c11
│  │  ├─ 99
│  │  │  └─ bf960e214e73e5513e054ac34c331b6d4b1a46
│  │  ├─ 9c
│  │  │  └─ 7cda25bcc6ad4cadb97c2ce0e81e4a9bc59df5
│  │  ├─ df
│  │  │  └─ 36fcfb72584e00488330b560ebcf34a41c64c2
│  │  ├─ e9
│  │  │  └─ 558405fdcc02f12d757acb308e02937a7444f1
│  │  ├─ ee
│  │  │  └─ 889abd1cd69bac58111726be035a3e42ce20fc
│  │  ├─ f3
│  │  │  └─ d2503fc2a44b5053b0837ebea6e87a2d339a43
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ babel.config.js
├─ jsconfig.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ base.css
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ icomoon.eot
│  │  ├─ icomoon.svg
│  │  ├─ icomoon.ttf
│  │  └─ icomoon.woff
│  ├─ images
│  │  ├─ app.png
│  │  ├─ icons.png
│  │  ├─ news.png
│  │  └─ quan-arr.gif
│  └─ index.html
├─ README.md
├─ src
│  ├─ App.vue
│  ├─ assets
│  │  ├─ css
│  │  └─ less
│  │     └─ loginForm.less
│  ├─ components
│  │  ├─ AppAbout.vue
│  │  ├─ AppLogo.vue
│  │  ├─ footer
│  │  │  ├─ AppFooter.vue
│  │  │  └─ components
│  │  │     ├─ AppAdvantage.vue
│  │  │     └─ AppServe.vue
│  │  ├─ header
│  │  │  ├─ AppHeader.vue
│  │  │  ├─ components
│  │  │  │  ├─ HeaderSearch.vue
│  │  │  │  ├─ HotWords.vue
│  │  │  │  └─ ShopCarEntrance.vue
│  │  │  └─ ShopCarHeader.vue
│  │  ├─ shop
│  │  │  └─ SmallShopBox.vue
│  │  └─ topNav
│  │     ├─ components
│  │     │  ├─ LoginEntrance.vue
│  │     │  └─ TopNavList.vue
│  │     └─ TopNav.vue
│  ├─ main.js
│  ├─ mock
│  │  ├─ imags
│  │  │  ├─ headPortrait
│  │  │  │  └─ headPortrait.jpg
│  │  │  ├─ shops
│  │  │  │  ├─ 0001
│  │  │  │  │  ├─ 19b4c42d4d01f449.jpg
│  │  │  │  │  ├─ 617bd1f57cae239b.jpg
│  │  │  │  │  ├─ a287cc5ede3308f0.jpg
│  │  │  │  │  ├─ c028322fbb87758f.jpg
│  │  │  │  │  ├─ c562c3531fe38f05.jpg
│  │  │  │  │  └─ dd3984f2c2b82d59.jpg
│  │  │  │  ├─ 0002
│  │  │  │  │  ├─ 222ad73c4973a363.jpg.avif
│  │  │  │  │  ├─ 3bde6e8393d70920.jpg.avif
│  │  │  │  │  └─ 4299fb46edb1b1fc.jpg.avif
│  │  │  │  ├─ 0003
│  │  │  │  │  ├─ 10db8cadb045f3c1.jpg.avif
│  │  │  │  │  └─ 974054cbaa7f3577.jpg.avif
│  │  │  │  ├─ 0004
│  │  │  │  │  ├─ 1286fe211af4b99b.jpg.avif
│  │  │  │  │  └─ 747f76f1e4285f4a.jpg.avif
│  │  │  │  ├─ 0005
│  │  │  │  │  ├─ 95c87099de5c4685.jpg.avif
│  │  │  │  │  └─ f0ebcdb58bfb0791.jpg.avif
│  │  │  │  ├─ 0006
│  │  │  │  │  ├─ d16f17e8f4a6e845.jpg.avif
│  │  │  │  │  └─ d5f533c025fc53da.jpg.avif
│  │  │  │  ├─ 0007
│  │  │  │  │  ├─ 4d27bdb928268dd4.jpg.avif
│  │  │  │  │  └─ 5e04bd96f6ebda50.jpg.avif
│  │  │  │  └─ 0008
│  │  │  │     ├─ 46881335fd2e1f0a.jpg.avif
│  │  │  │     └─ f3d8ad82ce64412e.jpg.avif
│  │  │  └─ slide
│  │  │     ├─ q.jpg
│  │  │     ├─ q1.jpg
│  │  │     └─ q2.jpg.avif
│  │  ├─ index.js
│  │  ├─ js
│  │  │  ├─ shop.js
│  │  │  └─ user.js
│  │  └─ json
│  │     ├─ ChineseAddress.json
│  │     ├─ order.json
│  │     ├─ shopCar.json
│  │     ├─ shops.json
│  │     ├─ shopSort.json
│  │     ├─ slide.json
│  │     └─ users.json
│  ├─ modules
│  │  ├─ formverify.js
│  │  └─ routerBefore.js
│  ├─ pages
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  ├─ components
│  │  │  │  │  ├─ DropDown.vue
│  │  │  │  │  ├─ FloorShop.vue
│  │  │  │  │  ├─ MainBanner.vue
│  │  │  │  │  ├─ MainBulletin.vue
│  │  │  │  │  ├─ MainFloor.vue
│  │  │  │  │  ├─ MainSlide.vue
│  │  │  │  │  ├─ MainTopNav.vue
│  │  │  │  │  └─ RightNav.vue
│  │  │  │  ├─ HomeMain.vue
│  │  │  │  └─ PositionNav.vue
│  │  │  └─ StoreHome.vue
│  │  ├─ login
│  │  │  ├─ components
│  │  │  │  ├─ ByPassword.vue
│  │  │  │  ├─ ByPhoneCode.vue
│  │  │  │  └─ MyTips.vue
│  │  │  └─ StoreLogin.vue
│  │  ├─ loginUp
│  │  │  ├─ components
│  │  │  │  └─ LoginUpForm.vue
│  │  │  └─ LoginUp.vue
│  │  ├─ orderForm
│  │  │  ├─ components
│  │  │  │  ├─ AllOrder.vue
│  │  │  │  ├─ AsideNav.vue
│  │  │  │  ├─ CompletedOrder.vue
│  │  │  │  ├─ OrderTemplate.vue
│  │  │  │  ├─ RefundingOrder.vue
│  │  │  │  └─ UncompletedOrder.vue
│  │  │  └─ OrderForm.vue
│  │  ├─ shop
│  │  │  ├─ components
│  │  │  │  ├─ ShopBaseInfo.vue
│  │  │  │  ├─ ShopSlide.vue
│  │  │  │  └─ StoreNav.vue
│  │  │  └─ ShopPage.vue
│  │  └─ shopCar
│  │     ├─ components
│  │     │  └─ ShopsList.vue
│  │     └─ ShopCar.vue
│  ├─ router
│  │  └─ index.js
│  ├─ store
│  │  ├─ index.js
│  │  └─ modules
│  │     └─ user.js
│  ├─ test.html
│  └─ utils
│     ├─ fetch.js
│     ├─ shop.js
│     └─ user.js
├─ vue.config.js
└─ yarn.lock

```