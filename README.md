#Backbone Subroute

[![Build Status](https://travis-ci.org/ModelN/backbone.subroute.png)](https://travis-ci.org/ModelN/backbone.subroute) [![Code Climate](https://codeclimate.com/github/ModelN/backbone.subroute.png)](https://codeclimate.com/github/ModelN/backbone.subroute) [![devDependency Status](https://david-dm.org/ModelN/backbone.subroute/dev-status.png)](https://david-dm.org/ModelN/backbone.subroute#info=devDependencies) [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

##About

Backbone's Router feature is really powerful, but for large multi-module apps, it can quickly become large and unmaintainable.  

Backbone.SubRoute extends the functionality of Backbone.Router such that each of an application's modules
can define its own module-specific routes.  This eliminates the need for one monolithic Router configuration,
The base router can instead act as a simple delegator that forwards module-specific routes to the
appropriate module-specific SubRoute.

For example, given this URL:
  http:example.org/myModule/foo/bar

...the base router would be responsible for invoking and delegating to the proper module based on "myModule".
The module would then have its own SubRoute which would have its own mappings for the foo/bar part.

This project is based on [a Gist by Tim Branyen](https://gist.github.com/1235317), and [used with permission](https://gist.github.com/1235317/74bf2745515d902e0bfc87bd8e95e94c93362915#gistcomment-234230) from the original author.

Subroute is lightweight, weighing in at under 300 bytes minified and gzipped.

## Downloads

*Latest Stable Release: 0.4.5*

* Minified: [backbone.subroute.min.js](https://raw.github.com/ModelN/backbone.subroute/0.4.5/dist/backbone.subroute.min.js)
* Development (Uncompressed, Comments): [backbone.subroute.js](https://raw.github.com/ModelN/backbone.subroute/0.4.5/backbone.subroute.js)
* Full Release (Tests, Examples): [0.4.5.zip](https://github.com/ModelN/backbone.subroute/archive/0.4.5.zip).  

*Unreleased Edge Version (master)*

* Minified: [backbone.subroute.min.js](https://raw.github.com/ModelN/backbone.subroute/master/dist/backbone.subroute.min.js)
* Development (Uncompressed, Comments): [backbone.subroute.js](https://raw.github.com/ModelN/backbone.subroute/master/backbone.subroute.js)
* Full Release (Tests, Examples): [master.zip](https://github.com/ModelN/backbone.subroute/archive/master.zip).  

Visit the [project repo](https://github.com/ModelN/backbone.subroute) to download the latest unreleased code (may be unstable).


## Get Involved!

### Mailing List

Join the [Backbone.Subroute Google Group](https://groups.google.com/forum/#!forum/backbone-subroute) to discuss new features and stay-up-to-date on project updates.

### Ways to Contribute

Has Subroute been helpful to you?  If you'd like to give back, here are a few ways:

1. Blog about your experiences using Subroute, and let us know about it!
2. Create a demo app using Subroute and add it to the repo.
3. Improve the docs in the README.  
4. Fix a bug or add a new feature and submit a pull request (see below)

### Pull Requests

Pull requests are welcome.  For any significant change or new feature, please start a discussion in the Google Group, or log an issue first.  This will save you some time, in case your idea is deemed not general enough to be included in the project.

Before submitting a pull request, please:

1. Write unit tests to cover any new or modified lines of code, and add it to the `specs/` directory.  See the [Testing](#testing) section for more info.
2. Run the test specs to make sure everything works.  You can fire up a local web server, and point your browser to `http://localhost:<port>/spec/`
3. Run the Grunt task to lint, test, and run code coverage on the project.  See the [Build](#build) section for more info.

## Build

### Grunt

Subroute uses [Grunt](http://gruntjs.com/) to verify each build.  If you are not familiar with Grunt, check out the [getting started guide](http://gruntjs.com/getting-started) for an introduction and installation instructions.

Before submitting a pull request, please run the grunt task.  To do so:

First, install local development dependencies.  From the root Subroute directory, run:

```
npm install
```

then

```
grunt
```

Grunt will perform these tasks:

* Beautify

To reduce merging and styling issues related to whitespace and formatting, the [jsbeautifier](https://github.com/vkadam/grunt-jsbeautifier) task normalizes all formatting in project source.  If you fail to run `grunt` prior to check-in, and any files have not been beautified, Travis-CI will reject the checkin.

* Uglify

The code will be minified and saved to `dist/backbone.subroute.min.js`.

* Lint

Javascript files are checked for errors using [JSHint](http://jshint.com/).  The JSLint configuration is driven by the `.jshintrc` file.

* Test

Test specs are run headlessly using [PhantomJS](www.phantomjs.org)

* Coverage

Code coverage is enforced using [Istanbul](http://istanbul-js.org/).  Currently not every feature of Subroute has coverage.  
But the enforced coverage levels are set such that code coverage cannot decrease.  Over time, more tests will be added to increase coverage
to as close to 100% as possible (help with this is greatly appreciated!)

### Travis-CI

The Grunt build is run automatically using [Travis-CI](travis-ci.org) upon every pull request and push to master.  But if any errors are found, you'll need to fix them and re-submit your pull request.  So please run the grunt task locally to save time.



### Defining a SubRouter
Let's say that you've got a section of your web app multiple pieces of functionality all live under the URL prefix `http://yourserver.org/books`.  Here's how you'd create your subrouter.  

```
var BooksRouter = Backbone.SubRoute.extend({
    routes: {
        ""               : "showBookstoreHomepage",
        "search"         : "searchBooks",
        "view/:bookId"   : "viewBookDetail",
    },
    showBookstoreHomepage: function() {
        // ...module-specific code
    },
    searchBooks: function() {
        // ...module-specific code
    },
    viewBookDetail: function(bookId) {
        // ...module-specific code using bookId param
    }
});
```
Note that the subrouter, itself, doesn't know or care what its prefix is.  The prefix is only provided when instantiating specific instances of the sub-router.  This makes sub-routers especially useful for reusing common pieces of code.

### Creating an Instance

To use your sub-router, simply call its constructor and provide a prefix, like so:

```
var mySubRouteInstance = new BooksRouter("books");
```

### Understanding The Magic

Given the example above, with an instance of the sub-route being created with the `"books"` argument passed as a constructor, and deployed on a server with a base URL of `yourserver.org`, this results in the following routes being created:

<table>
  <tr>
    <th>Subroute</th><th>Expands To</th><th>Matches URL</th>
  </tr>
  <tr>
    <td>""</td><td>books</td><td>http://yourserver.org/books</td>
  </tr>
  <tr>
    <td>"search"</td><td>books/search</td><td>http://yourserver.org/books/search</td>
  </tr>
  <tr>
    <td>"view/:bookId"</td><td>books/view/:bookId</td><td>http://yourserver.org/books/view/1234</td>
  </tr>
</table>

### Passing Parameters to SubRouter Instances

When instantiating a SubRouter, you may wish to provide some parameters from the calling code, which may be needed in your sub-router code.  The sub-router constructor takes an optional object literal as a second argument.

For instance:

```
var mySubRouteInstance = new BooksRouter("books", {locale: "en_US", isVIP: true));
```

Then in your sub-router definition, you can access these parameters using the familiar Backbone `options` object, used in other Backbone components.  Like so:

```
initialize: function(options) {
    this.locale = options.locale;
    this.isVIP = options.isVIP;
}

```
Thanks to [@carpeliam](https://github.com/ModelN/backbone.subroute/pull/2) for this feature.

### Trailing Slashes

Backbone treats routes with trailing slashes as totally different routes than those without.  For instance, these are two different routes in Backbone:

`"search"`

`"search/"`

URL semantics aside, [many people have found this behavior annoying](https://github.com/documentcloud/backbone/issues/848).  If you're one of them, and you want to support either format without duplicating each and every one of your routes, you can pass the optional `createTrailingSlashRoutes` parameter when you instantiate your sub-router.  

For example:

```
var mySubRouteInstance = new BooksRouter("books", {createTrailingSlashRoutes: true});
```

Using the examples above, a URL of either `http://yourserver.org/books/search` or `http://yourserver.org/books/search/` would fire the `searchBooks()` callback.

## Testing

The `spec` directory in the repo contains a suite of test specs.  To run them, start a web server in the project directory, then point your browser to the `spec` directory.

The test specs can also be run online [here](http://modeln.github.com/backbone.subroute/spec/).

## Examples & Tutorials

* See [my blog post](http://www.geekdave.com/2012/04/05/module-specific-subroutes-in-backbone/) for a walkthrough of setting up subroutes for an online shopping site.
* [Swizec Teller](https://twitter.com/swizec) wrote a great piece about [how his team used subroutes](http://swizec.com/blog/writing-modular-backbone-with-backbone-subroute/swizec/6297) to simplify a complex multi-module architecture.

## Version History

### 0.4.6
*Released 29 April 2015*

* [Allows for](https://github.com/ModelN/backbone.subroute/pull/52) using Backbone.history.loadUrl() into an uninitialized subRoute (Thanks, [oskbor](https://github.com/oskbor)!)

### 0.4.5
*Released 13 October 2014*

* Actually [export the router](https://github.com/ModelN/backbone.subroute/pull/44) when used as CommonJS module (Thanks, [xMartin](https://github.com/xMartin)!)

### 0.4.4
*Released 1 September 2014*

* Add official bower support
* Add grunt-version to dev dependencies

### 0.4.3
*Released 9 May 2014*

* Fix [issue 38](https://github.com/ModelN/backbone.subroute/issues/38) due to minified dist file being out-of-sync from latest source.  

### 0.4.2
*Released 7 April 2014*

* Fix issues with [dynamic route creation](https://github.com/ModelN/backbone.subroute/pull/31). Thanks [@hellorachid](https://github.com/hellorachid) for the fix!
* Allow [empty prefix](https://github.com/ModelN/backbone.subroute/pull/34).  Thanks to [@maoueh](https://github.com/maoueh) for the PR!
* Support [for CommonJS](https://github.com/ModelN/backbone.subroute/pull/35) thanks to [@gdw2](https://github.com/gdw2)'s work.
* Published on NPM thanks to [@thejameskyle](https://github.com/ModelN/backbone.subroute/pull/36)'s prep work.

### 0.4.1
*Released 23 September 2013*

* Fix [Issue #27](https://github.com/ModelN/backbone.subroute/issues/27), which caused multiple instances of the same subrouter class to get polluted with each others routes in their `routes` hash.  Big thanks to @mikesnare for suggesting the fix, and @joshuaballoch for providing the specs to identify the issue.

### 0.4.0
*Released 17 July 2013*

* Fix [Issue #22](https://github.com/ModelN/backbone.subroute/issues/22), a bug that would cause initial loading to not happen correctly if prefix contained parameters.  Thanks, @whyohwhyamihere for the PR!
* Add build support using Grunt

### 0.3.2
*Released 22 January 2013*

* Skip call to loadUrl on SubRoute init if history hash does not match SubRoute prefix

### 0.3.1
*Released 26 October 2012*

* Fixed [Issue #13](https://github.com/ModelN/backbone.subroute/issues/13).  This was an IE8-only issue where manually
  including a trailing slash in a subroute prefix caused a double slash to appear in the fully-qualified route.
  Thanks to [@mikesnare](https://github.com/mikesnare) for logging the issue and providing the fix!
* Added Jasmine test specs for above case

### 0.3
*Released 30 August 2012*

* Fixed issue in `navigate` method where separator `/` character was omitted after prefix
* Added Jasmine test specs

### 0.2
*Released 15 July 2012*

* AMD support
* Added `createTrailingSlashRoutes` property
* No longer append trailing slash to route prefix (to support default empty-string routes)
* Robust handling of subroute path creation, supporting prefixes with and without trailing slashes


### 0.1
*Released 16 April 2012*

* Initial version based on Tim's gist, with a fix for invoking a subroute on first load

##License
The MIT License (MIT)

Copyright (c) 2012 Model N, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
