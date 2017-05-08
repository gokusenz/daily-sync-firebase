import React from 'react'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import { renderToStaticMarkup } from 'react-dom/server'
import express from 'express'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import { syncHistoryWithStore } from 'react-router-redux'
import { Helmet } from 'react-helmet'
import 'css-modules-require-hook/preset'

import routes from '../common/routes'
import configureStore from '../common/store'
import prefetchData from './prefetchData'
import css from './inlineCss'

require('dotenv').config()

const app = express()
const PORT = process.env.NODE_PORT || 3000

const renderHTML = (reactComponent, initialState) => (`
<!doctype html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Daily Sync App!</title>
    <link rel="stylesheet" href="/public/css/bootstrap.min.css">
    <style>${css}</style>
  </head>
  <body>
    <div id='react-root'>${reactComponent}</div>
    <link rel="preload" href="/public/dist/styles.css" as="style" onload="this.rel='stylesheet'">
    <noscript>
      <link rel="stylesheet" href="/public/dist/styles.css" media="all">
    </noscript>
    <script defer>
      !function(e){"use strict";var n=function(n,t,o){function i(e){return a.body?e():void setTimeout(function(){i(e)})}function r(){l.addEventListener&&l.removeEventListener("load",r),l.media=o||"all"}var d,a=e.document,l=a.createElement("link");if(t)d=t;else{var s=(a.body||a.getElementsByTagName("head")[0]).childNodes;d=s[s.length-1]}var f=a.styleSheets;l.rel="stylesheet",l.href=n,l.media="only x",i(function(){d.parentNode.insertBefore(l,t?d:d.nextSibling)});var u=function(e){for(var n=l.href,t=f.length;t--;)if(f[t].href===n)return e();setTimeout(function(){u(e)})};return l.addEventListener&&l.addEventListener("load",r),l.onloadcssdefined=u,u(r),l};"undefined"!=typeof exports?exports.loadCSS=n:e.loadCSS=n}("undefined"!=typeof global?global:this);
      !function(t){if(t.loadCSS){var e=loadCSS.relpreload={};if(e.support=function(){try{return t.document.createElement("link").relList.supports("preload")}catch(e){return!1}},e.poly=function(){for(var e=t.document.getElementsByTagName("link"),r=0;r<e.length;r++){var n=e[r];"preload"===n.rel&&"style"===n.getAttribute("as")&&(t.loadCSS(n.href,n,n.getAttribute("media")),n.rel=null)}},!e.support()){e.poly();var r=t.setInterval(e.poly,300);t.addEventListener&&t.addEventListener("load",function(){e.poly(),t.clearInterval(r)}),t.attachEvent&&t.attachEvent("onload",function(){t.clearInterval(r)})}}}(this);
    </script>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
    </script>
    <script src='/public/dist/bundle.js' defer></script>
    <script src="/public/js/jquery.min.js" defer></script>
    <script src="/public/js/bootstrap.min.js" defer></script>
  </body>
</html>
`)

app.use('/dist', express.static('./dist'))
app.use('/public', express.static('./public'))

// const compiler = webpack(config)

// app.use(webpackMiddleware(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath,
// }))
// app.use(webpackHotMiddleware(compiler))


app.use((req, res) => {
  const memoryHistory = createMemoryHistory(req.originalUrl)
  // const middlewares = [thunk, apiMiddleware, routerMiddleware(memoryHistory)]
  const store = configureStore(memoryHistory)
  const history = syncHistoryWithStore(memoryHistory, store)

  console.log(req.headers['user-agent'])
  match({
    routes: routes(store, history),
    location: req.originalUrl,
  }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, `${redirectLocation.pathname}${redirectLocation.search}`)
    } else if (renderProps) {
      const { components, params } = renderProps
      prefetchData(store.dispatch, components, params)
      .then(() => {
        const renderedComponent = renderToStaticMarkup(
          <Provider store={store} key="provider">
            <RouterContext {...renderProps} />
          </Provider>,
        )
        const helmet = Helmet.renderStatic()
        res.status(200).send(renderHTML(renderedComponent, store.getState(), helmet))
      })
      .catch((err) => {
        console.log(err)
        res.status(500).send(err)
      })
    } else {
      res.status(404).send('Not Found')
    }
  })
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})
