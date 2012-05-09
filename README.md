Backbone Subroute
=================

About
-------

Backbone.SubRoute extends the functionality of Backbone.Router such that each of an application's modules
can define its own module-specific routes.  This eliminates the need for one monolithic Router configuration,
The base router can instead act as a simple delegator that forwards module-specific routes to the
appropriate module-specific SubRoute.

For example, given this URL:
  http:example.org/myModule/foo/bar

...the base router would be responsible for invoking and delegating to the proper module based on "myModule".
The module would then have its own SubRoute which would have its own mappings for the foo/bar part.

This project is based on a Gist by Tim Branyen: https:gist.github.com/1235317

License
-------
The MIT License (MIT)

Copyright (c) 2012 Model N, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
