
### Riot.js demo

This is a demo single-page application made with Riot.js. It's a generic skeleton for an administration panel that shows the core concepts of modular client side development.

### Features
- actually something useful, just fork it and extend it to your needs
- plain and minimal UI
- authentication and session management
- small: ~7.5kb minified, including Riot (3kb gzipped)
- optional caching of data
- no big customer listings, search does the job


### Modular architecture
- one global variable `admin` to build modules
- modules can be included in no specific order(ui/*.js, api/*.js)
- each can be renamed/removed/modified on without breaking the app
- backend agnostic
- maintainable / good for multiple developers


### Extendable
- Real API: try for example `admin().load("customers")` on console
- Documented methods *and* events
- Promise pattern for more fluent error handling
- Use app name to extend instead of a framework name: `admin(callback)`


### Future
- real backend (firebase, hosted server, to be decided...)
- realtime channel
- tests for both UI and API layer