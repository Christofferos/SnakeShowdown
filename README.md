# Snake Showdown / (Multiplayer Snake)

- Try the application yourself: <a href="https://mystifying-austin-efe3a7.netlify.app/" target="_blank">https://mystifying-austin-efe3a7.netlify.app/</a>

Main topics covered:

- Socket IO,
- client-to-server communication,
- client [UI and keylistener],
- server [game logic and data handling],
- setting up front-end on Netlify, setting up back-end (server) on Heroku.

## Details:

Web-sockets/server is sticky meaning that when users connect they will be conntected to the same server.

**Enable flag:** heroku features:enable http-session-affinity --app [APP_NAME]

**_Automatic deployment enabled on Heroku._** Every push to this repo updates the backend on Heroku and frontend on Netlify.
