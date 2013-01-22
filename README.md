#Backbone Subroute


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

This project is based on [a Gist by Tim Branyen](https:gist.github.com/1235317), and [used with permission](https://gist.github.com/1235317/74bf2745515d902e0bfc87bd8e95e94c93362915#gistcomment-234230) from the original author.

## Get Involved!

### Mailing List

Join the [Backbone.Subroute Google Group](https://groups.google.com/forum/#!forum/backbone-subroute) to discuss new features and stay-up-to-date on project updates.

### Contributions

Contributions are greatly appreciated!  For best results:

* Please submit a failing test spec with any issue reports.
* Please submit passing test specs for new features.

##Usage

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

To use your sub-router, siply call its constructor and provide a prefix, like so:

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
var mySubRouteInstance = new BooksRouter("books", {createTrailingSlashRoutes: true));
```

Using the examples above, a URL of either `http://yourserver.org/books/search` or `http://yourserver.org/books/search/` would fire the `searchBooks()` callback.

## Unit Tests

The `spec` directory in the repo contains a suite of test specs.  To run them, start a web server in the project directory, then point your browser to the `spec` directory.

The test specs can also be run online [here](http://modeln.github.com/backbone.subroute/spec/).

## More Examples

See [my blog post](http://www.geekdave.com/?p=13) for detailed instructions on how to set up and use your sub-routes.

## Version History

### 0.3.2
*Released 22 Jan 2013*

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
