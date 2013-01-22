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
            var routes = {};

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
            var createTrailingSlashRoutes = options && options.createTrailingSlashRoutes;

            // Register each sub-route with Backbone by combining the prefix and the sub-route path 
            _.each( this.routes, function ( callback, path ) {
                if ( path ) {

                    // strip off any leading slashes in the sub-route path, 
                    // since we already handle inserting them when needed.
                    if (path.substr(0) === "/") {
                        path = path.substr(1, path.length);
                    }

                    routes[prefix + this.separator + path] = callback;

                    if (createTrailingSlashRoutes) {
                        routes[prefix + this.separator + path + "/"] = callback;
                    }

                } else {
                    // default routes (those with a path equal to the empty string) 
                    // are simply registered using the prefix as the route path.
                    routes[prefix] = callback;

                    if (createTrailingSlashRoutes) {
                        routes[prefix + "/"] = callback;
                    }
                }
            }, this );

            // Override the local sub-routes with the fully-qualified routes that we just set up.
            this.routes = routes;

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
        }
    } );
}));
