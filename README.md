
TODO
- source documentation
- Backend to make more sense
- jslint


## Features
- actually something useful (for you to fork)
- login / logout (reloading), always a challenge
- session management
- small: ~7.5kb minified, including Riot (3kb gzipped)
- one global variable only: admin
- optional caching of data
- uncluttered pages (UI wise), no nested views
- no big customer listings, search does the job


## Modular
- modules included ui/*.js, api/*.js in no specific order
- can be renamed/removed/modified on the fly and concat works.
- backend agnostic
- maintainable / team


## Extendable
- real API: admin().load("customers")
- events to hook
- promise interfaces on api calls
- admin(function), white labeling: use app name to extend instead of a framework name


## Future
- realtime
- more tests