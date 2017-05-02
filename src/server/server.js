import express from 'express'
import webpack from 'webpack'
import compression from 'compression'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import { createStore, applyMiddleware } from 'redux'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import thunk from 'redux-thunk'
import { apiMiddleware } from 'redux-api-middleware'
import { renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import React from 'react'
import rootReducer from '../common/reducers'
import routes from '../common/routes'
import config from '../../webpack.config'
import prefetchData from './prefetchData'
import css from './inlineCss'

const app = express()
app.use(compression())
const PORT = process.env.NODE_PORT || 3000

const getMarkup = (store, props) => {
  const html = renderToStaticMarkup(
    <Provider store={store} key="provider">
      <RouterContext {...props} />
    </Provider>
  )
  const preloadState = JSON.stringify(store.getState())
  return `
<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Daily Sync App!</title>
    <style>${css}</style>
  </head>
  <body>
    <div id='app'>${html}</div>
    <link rel="preload" href="/dist/styles.css" as="style" onload="this.rel='stylesheet'">
    <noscript>
      <link rel="stylesheet" href="/dist/styles.css" media="all">
    </noscript>
    <script defer>
      !function(e){"use strict";var n=function(n,t,o){function i(e){return a.body?e():void setTimeout(function(){i(e)})}function r(){l.addEventListener&&l.removeEventListener("load",r),l.media=o||"all"}var d,a=e.document,l=a.createElement("link");if(t)d=t;else{var s=(a.body||a.getElementsByTagName("head")[0]).childNodes;d=s[s.length-1]}var f=a.styleSheets;l.rel="stylesheet",l.href=n,l.media="only x",i(function(){d.parentNode.insertBefore(l,t?d:d.nextSibling)});var u=function(e){for(var n=l.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){u(e)})};return l.addEventListener&&l.addEventListener("load",r),l.onloadcssdefined=u,u(r),l};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);
      !function(t){if(t.loadCSS){var e=loadCSS.relpreload={};if(e.support=function(){try{return t.document.createElement("link").relList.supports("preload")}catch(e){return!1}},e.poly=function(){for(var e=t.document.getElementsByTagName("link"),r=0;r<e.length;r++){var n=e[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(t.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!e.support()){e.poly();var r=t.setInterval(e.poly,300);t.addEventListener&&t.addEventListener("load",function(){e.poly(),t.clearInterval(r)}),t.attachEvent&&t.attachEvent("onload",function(){t.clearInterval(r)})}}}(this);
    </script>
    <script>window.__preloadState = ${preloadState}</script>
    <script src='/dist/bundle.js' defer></script>
  </body>
</html>
`
}

const compiler = webpack(config)

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}))
app.use(webpackHotMiddleware(compiler))

app.use('/dist', express.static('./dist'))
app.use('/public', express.static('./public'))
app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  const middlewares = [thunk, apiMiddleware, routerMiddleware(memoryHistory)]
  const store = createStore(rootReducer, {}, applyMiddleware(...middlewares))
  const history = syncHistoryWithStore(memoryHistory, store)
  // Safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/601.6.17
  // (KHTML, like Gecko) Version/9.1.1 Safari/601.6.17'
  // Chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko)
  // Chrome/57.0.2987.133 Safari/537.36'
  // FireFox: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.11; rv:51.0) Gecko/20100101 Firefox/51.0'
  // IE9: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)'
  const userAgent = (req.headers['user-agent'].indexOf('MSIE') !== -1 ? parseInt(req.headers['user-agent'].split('MSIE')[1], 10) : req.headers['user-agent'])
  console.log(req.headers['user-agent'])
  const isNotSupport = (userAgent < 9.0)
  match({
    routes: routes(store, history, isNotSupport),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      const { components } = renderProps
      prefetchData(store.dispatch, components, renderProps)
        .then(() => { res.status(200).send(getMarkup(store, renderProps)) })
        .catch((err) => { console.log(err); res.status(500).send('Internal Server Error') })
    } else {
      res.status(404).send('Not found')
    }
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

module.exports = app
