import express from "express"
import cors from "cors"
import { renderToString } from "react-dom/server"
import App from '../shared/App'
import React from 'react'
import serialize from 'serialize-javascript'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/core/styles';
import {matchPath} from 'react-router-dom'
import routes from '../shared/routes'
import { StaticRouter } from 'react-router-dom'
const app = express()
const sheets = new ServerStyleSheets();
app.use(cors())

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))
app.get("*", (req, res, next) => {
  const activeRoute = routes.find((route) => matchPath(req.url,route)) || {}
  const promise = activeRoute.fetchInitialData
  ?activeRoute.fetchInitialData(req.path)
  :Promise.resolve()
  
  promise.then((data)=>{
    const context = {data}
    const markup = renderToString(
      sheets.collect(
        <ThemeProvider>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
        </ThemeProvider>
      ) 
    )
    const css = sheets.toString();    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <style id="jss-server-side">${css}</style>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__=${serialize(data)}</script>
        </head>
  
        <body>
          <div id="app"> ${markup}</div>
        </body>
      </html>
    `)

  }).catch(next)

  })
app.set( 'port', ( process.env.PORT || 5000 ));
app.listen(app.get('port'), function(){
  console.log(`Server is listening on port: `+app.get('port'));
})
