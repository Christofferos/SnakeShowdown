# snakeMultiplayer
Socket IO, Netlify, Heroku

Web sockets, sticky servers - everytime a user connects they will be conntected to the same server. (Session infinity flag in heroku enabled.)

**Enable flag:**
heroku features:enable http-session-affinity --app [APP_NAME]

***Automatic deployment enabled on Heroku. Every push to this repo updates the backend on Heroku and frontend on Netlify.***
