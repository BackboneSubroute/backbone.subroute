// backbone-subroute.js v0.3.2
//
// Copyright (C) 2012 Dave Cadwallader, Model N, Inc.  
// Distributed under the MIT License
//
// Documentation and full license available at:
// https://github.com/ModelN/backbone.subroute

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // Register as an AMD module if available...
        define(['underscore', 'backbone'], factory);
    } else {
        // Browser globals for the unenlightened...
        factory(_, Backbone);
    }
}(function(_, Backbone){

    Backbone.SubRoute = Backbone.Router.extend( {
        constructor:function ( prefix, options ) {

            // Prefix is optional, set to empty string if not passed
            this.prefix = prefix = prefix || "";

            // SubRoute instances may be instantiated using a prefix with or without a trailing slash.
            // If the prefix does *not* have a trailing slash, we need to insert a slash as a separator
            // between the prefix and the sub-route path for each route that we register with Backbone.        
            this.separator =
                    ( prefix.slice( -1 ) === "/" )
                            ? ""
                            : "/";

            // if you want to match "books" and "books/" without creating separate routes, set this
            // option to "true" and the sub-router will automatically create those routes for you.
            this.createTrailingSlashRoutes = options && options.createTrailingSlashRoutes;

            // Remove the routes from the router so we can add them using this.route() after the 
            // initialization
            var routes = this.routes;
            delete this.routes;

            // Required to have Backbone set up routes
            Backbone.Router.prototype.constructor.call( this, options );
          
            // grab the full URL
            var hash;
            if (Backbone.history.fragment) {
                hash = Backbone.history.getFragment();
            } else {
                hash = Backbone.history.getHash();
            }

            // Trigger the subroute immediately.  this supports the case where 
            // a user directly navigates to a URL with a subroute on the first page load.
            if (hash.indexOf(prefix) === 0) {
                Backbone.history.loadUrl( hash );
            }

            if (this.postInitialize) {
                this.postInitialize(options);
            }
        },
        navigate:function ( route, options ) {
            if ( route.substr( 0, 1 ) != '/' && route.indexOf( this.prefix.substr( 0,
                    this.prefix.length - 1 ) ) != 0 ) {
                
                route = this.prefix + 
                        ( route ? this.separator : "") + 
                        route;
            }
            Backbone.Router.prototype.navigate.call( this, route, options );
        },
        route : function (route, name, callback) {
          // strip off any leading slashes in the sub-route path, 
          // since we already handle inserting them when needed.
          if (route.substr(0) === "/") {
            route = route.substr(1, route.length);
          }
          
          route = this.prefix + this.separator + route;
          
          if (this.createTrailingSlashRoutes) {
            Backbone.Router.prototype.route.call(this, route + '/', name, callback);
          }
          
          return Backbone.Router.prototype.route.call(this, route, name, callback);
        }
    } );
}));
