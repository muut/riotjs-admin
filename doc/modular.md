
# Building modular applications with Riot.js

[TOC]

# What is Riot.js?

## 1. A minimal approach to MV* world
Riot is a client-side MVP framework to build modular single page applications. It weights 1kb and has 3 public methods so it's extremely simple and easy to learn. You'll be in complete control and there is no extra stuff on your way. You start small and add stuff as you need it. Not the other way around. Minimal approach helps everyone to understand the pieces that make your application.

## 2. Vanilla JavaScript and jQuery
Riot uses vanilla JavaScript to structure the code and jQuery to build the user interaction. You'll master classic design patterns and elementary JavaScript instead of framework specific idioms. Frameworks come and go but universal programming skills are forever.

## 3. Focus on modular design
The purpose of Riot is to build modular applications that are easy to manage and extend by multiple developers. Your application will be "loosely coupled". Riot.js is all about modularity and the documentation centers solely on this purpose.

## 4. Demo application
Riot.js comes with an example application that goes beyond a Todo MVC. It's an administration panel that is easy to continue with. Something useful. It's well documented and shows the basics of modular programming.

This documentation is split into two parts: 1) outlining the core concepts in modular single page applications and 2) code samples. After those you can peek the source code of the [demo application](https://github.com/moot/riotjs-admin) to get full understanding of modular Riot applications.


# Modular applications

Your job is to build applications that are split into modules. Each module performs a logically discrete function and it's not dependent on other modules. This has major benefits:

1) A large program can be broken into smaller and simpler units
2) Modules can be added/removed/modified without breaking the application
3) Several programmers can work on individual modules at the same time
4) The program structure is easy to understand even for newcomers
5) Ability to build a different subset of modules for different needs

Modularity is the single most important key for large scale applications.

## What is modular?

A modular application consists of two things:

1. Core
2. Modules

The application core is a piece of software with a well documented API. It's not just a data layer, that you might have seen on other MV* setups. It's your precious business logic.

The modules are extensions to the core. These modules are "loosely coupled" meaning that they hook to the application core by "listening" to it. The core application is not aware of these modules.

There are no hard-coded function references. Strong coupling does not scale. There can be hard-coded dependencies inside the core, but not between the core and modules.

To actually keep things modular is constant organization work. Things should be on their most logical place. Think layers in Photoshop, table of contents on a book or visual hierarchy in an user interface. It's constant balancing. And when you add features it must fit to the big picture.



# Model, View and Presenter

Riot.js helps you to build single page applications that are easy to maintain.

Let's clean the table.

First you need to know the goals of your application. What id does and what it doesn't do? You model your business with JavaScript. That's the application core. Also called as Model.

Then you have the browser and the user interface. The layout (HTML), document object model (DOM) and the style (CSS). The piece that user sees and interacts with. That's the View.

Then you need to bind these two things together. You need to listen to what happens on the View: clicks, keypresses and scrolls. You also need to listen to the Model: maybe a new entry came trough a real-time channel or somone liked a post. This someone listens to all these events and reacts accordingly.

This "middleman" is called the Presenter.

Riot uses these terms to describe the big picture: Model, View and Presenter.

MVP at it's heart aims to separate the application logic (Model) from the user interface (View). This separation is important because it simplifies your code and makes it more testable. The lack of this high level separation causes so called "spaghetti code" where business and UI logic is mixed together. This is the jQuery era before single page applications (SPA) started gaining popularity.

In classic UI terminology Riot uses the the "passive view" branch of the MVP family.

> A Passive View handles reduces the behavior of the UI components to the absolute minimum by using a controller that not just handles responses to user events, but also does all the updating of the view.

Unlike most MVC-style configurations, Passive View results in no dependencies between view and model. It's a simple pattern and easy to understand – which makes you powerful.

Lastly, it's important to realize that MVP (or MVC) is not a framework. It's a high level design pattern. It's purpose is to simplify the architecture of UI heavy applications. A way to structure your code. In loosely coupled application the modules communicate with each other with events.

Most of the current frameworks are an overkill since basically all you need is a proper event system.



# Model

Model is the application core. It's the most important part on your application since everything is build on top of it. It's the public interface to the rest of the world. You'll be using it, your team will be using it and 3rd parties are using it.

A well designed application core can be extended with loosely coupled modules and allows anyone to develop the system on their own.

In Riot the model is a complete application and not just a helper object for the presenter layer as you might have seen on MVC configurations. It's also a good practice to keep your Models fat since the closer you come to the view the harder it becomes to test the assets. Anything that is difficult to test should have minimal behavior.


This allows multiple different user interfaces to be build on top of the same Model. Think different Twitter client's for example (when things were fine with them). People could develop wildly different experiences on top of the same API without knowing about each other.


## Designing the Model

Model is the starting point of the application design. You should reserve time for designing the Model and make it as simple as possible because you'll be spending lot of time with it later. Set the bar high. Think jQuery API.

Two things to keep in mind:

1. Which problem the product solves?
2. Who is using the product?

Model is a domain specific thing. Think what your application does, what are the goals, what features are there and what features are *not* there. Breaking your business into pieces / logical modules and thinking how they communicate. Something you may have done with object oriented languages in the past.

Keep these in mind when designing the properties, methods and events. Not going to go deeper here, but the API is the root of all good or evil.



## Backend

Riot does not include a separate backend component and this is purposely left open. Currently REST dominates the way of thinking but Web Sockets and real- time patterns are just around the corner, where RPC pattern makes more sense.

Your backend interface can just have a generic `call` method and the underlying implementation can be changed. Be it REST, RPC or a custom AJAX based thing.



# View

The view is what user sees and interacts with. The HTML page on a web browser. What's actually interesting for a JavaScript developer is the document object model (DOM). You can do all kinds of creative tricks to build user experiences. Most importantly it's a source of events:

1) User events: click, scroll, keypress, mousemove etc..
2) Document ready event
3) URL change events

These events are in special interest for Presenters, which perform the actual manipulation of the view. The view itself has no logic – just plain old HTML and CSS code.


# Presenter

Presenter is the important middleman between the View and Model. Each presenter is a loosely-coupled module performing a discrete function and can be developed individually.

Presenter listens to the View events and calls the appropriate methods on the API. It also listens to the Model events and manipulates the DOM accordingly.

- Think of making a new Twitter client
- presenter "hook" to the view using CSS- like selectors (jQuery)
- explicitly define links to emit an URL change event
- presenter shouldn't be making assertions about the business model
- all decorative stuff such as localization and date formatting belong here
- other frameworks call this layer a "view", but in MVP this is called the "presenter"


## Templating

- HTML is not originally meant to describe logic, JavaScript is
- <template/> tag, the contract between view and presenter
- template loops are mostly unnecessary. you need to iterate lists upon initialization as well as add items to the DOM on runtime. hard to handle with template loops without data binding
- if logic is absolutely crucial, feel free to use your favorite template engine (overrated, why?)
- single presenter can work with multiple template tags


## jQuery

- jQuery exists because the vanilla DOM is a complete disaster to work with. jQuery does a massive cleanup by exposing the DOM in an elegant and powerful way.

- there are other implementations [x] too, but the real credits go to John Resig. He made the whole thing. The jQuery API is a standard interface that has multiple implementations. It's that good.

- And when Riot manifests about jQuery it's a manifest of using the jQuery API. Feel free to use any of the implementations. The advantages of using jQuery itself are following

- best cross browser support, IE6 is still there
- biggest test suite
- already there on websites, possibly cached from CDN's


## Data binding
- here modularity means that you or a new employee can start adding features to the view just by binding new functionality. Select the same elements and attach stuff. This module can later be removed. Modularity is not about small syntax details, it's about the big picture. Can you attach new features without touching the other parts of the client.

Riot is not a data-binding framework. It does not aim to be. Data binding violates modularity.

AngularJS explicitly states that its suited best for standard CRUD apps. If you need to do something which requires touching the DOM or some low level manipulation, better stay away from it.





# The code

Now let's focus to actual coding. Here is the goal:

- decoupled modules
- one signature to extend the application
- full, documented API is given on the argument
- each team member can work on their own module, without breaking the core


## Application lifecycle

1) Initialize application: your_app_name(config) // see module interface below
  This can be done on various stages:
  - document.ready
  - at the end of the page
  - a user event (open an overlay for example)

2) Load initial data
  - after the initial data has been loaded from the server fire "ready" event which instantiates modules

2) Modules begin listening the events
  - these can be on model and presenter layer


## Module interface

``` js
// a nice observable trick to manage bootstrapping of a single page application
var spa = $.observable(function(fn) {
   spa.on("ready", fn)
})

// 1st extension
spa(function(app) {
   console.info("model logic");
})

// 2nd extension
spa(function(app) {
   console.info("presenter logic");
})

// launch applicaiton
$(function() {
   spa.trigger("ready", { hello: "world" });
})
```


## View switching

- $(document).on("click.todo", 'a[href~="#"]', $.route);
- application reloads: login / logout




# Extensions (on later doc?)

- standalone tools, something to use and not extend
- usable everywhere, not just Riot (it's vanilla anyway)
- extend jQuery if it's DOM related
- if it's functionality, make it a function! there is a tendency to build unnecessary modularity around a simple function,
- Riot is just a list of functions, they just extend the jQuery space and not global space
- a list of functions and patterns that you can copy and paste, perhaps modify a bit
- I'd dream about something like Gist but with awesome discoverability, better search ...browsable with tags
- Anyway, here is a starting point: riotjs/gists/ (backbone type presenter layout, promise interface)




# Testing (on later doc?)

The driving reason to use Passive View is to enhance testability


"Humble View"
Humble Object - any object that is difficult to test should have minimal behavior.
http://martinfowler.com/eaaDev/uiArchs.html#Model-view-presentermvp

- models
- presenters
- views: CSS in different states



- [MVP passive view](http://martinfowler.com/eaaDev/PassiveScreen.html)


