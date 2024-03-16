# Cookie

## This project features two components:

1. client - simple react app with a button that sends a request to an express server.

   1. cd into `client` directory
   2. run `npm install`
   3. run `npm run dev` to start the client application

2. server - two variations of an express server:
   - `simplestCookie.js` is the simplest version I've gotten working which has a fixed timestamp of when the cookie will expire and the server will issue a new one at next request.
     1. cd into `server` directory
     2. run `npm install`
     3. run `npm run simple` to start the server application
   - `activityCookieExpiration.js` manually implements a cookie expiration that is refreshed with each request made (i.e. if expiration is set to 10 seconds, and before that time is up the user makes another request, the expiration of that cookie will be refreshed to 10 seconds). I think there are packages that will abstract this away for us, but good to know how it can be done manually.
     1. cd into `server` directory
     2. run `npm install`
     3. run `npm run activity` to start the server application.

As you interact with this application you will be able to see the cookies that are saved to the browser in the developer console's `Application` tab, after selecting `Cookies` and subsequently `http://localhost:5173`. Updates will also be logged to the server's console as you interact with the client.
