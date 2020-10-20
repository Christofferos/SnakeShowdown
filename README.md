# snakeMultiplayer
Main topics covered: 
* Socket IO, 
* client-to-server communication, 
* client [UI and keylistener], 
* server [game logic and data handling], 
* setting up front-end on Netlify, setting up back-end (server) on Heroku.

* Hyperlink: https://mystifying-austin-efe3a7.netlify.app/ 

## Details:

Web-sockets/server is sticky meaning that when users connect they will be conntected to the same server. 

**Enable flag:**
heroku features:enable http-session-affinity --app [APP_NAME]

***Automatic deployment enabled on Heroku.*** Every push to this repo updates the backend on Heroku and frontend on Netlify.
