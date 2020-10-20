# snakeMultiplayer
Main topics covered: Socket IO, client-to-server communication, client [UI and keylistener], server [game logic and data handling], setting up front-end on Netlify, setting up back-end (server) on Heroku.

## Details:

Web-sockets/server is sticky meaning (everytime a user connects they will be conntected to the same server). 

**Enable flag:**
heroku features:enable http-session-affinity --app [APP_NAME]

***Automatic deployment enabled on Heroku. Every push to this repo updates the backend on Heroku and frontend on Netlify.***
