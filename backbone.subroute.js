// Copyright (C) 2012 Model N, Inc.  
// Released under the MIT License
//
// Backbone.SubRoute extends the functionality of Backbone.Router such that each of an application's modules
// can define its own module-specific routes.  This eliminates the need for one monolithic Router configuration,
// The base router can instead act as a simple delegator that forwards module-specific routes to the
// appropriate module-specific SubRoute.
//
// For example, given this URL:
//   http://example.org/myModule/foo/bar
//
// ...the base router would be responsible for invoking and delegating to the proper module based on "myModule".
// The module would then have its own SubRoute which would have its own mappings for the foo/bar part.
//
// This project is based on a Gist by Tim Branyan: https://gist.github.com/1235317

if (!Backbone) {
    throw new Error('Backbone.Subroute: Backbone dependency was not found');
}

Backbone.SubRoute = Backbone.Router.extend( {
    constructor:function ( prefix, options ) {
        var routes = {};

        // Prefix is optional, set to empty string if not passed
        this.prefix = prefix = prefix || "";

        // Allow for optionally omitting trailing /.  Since base routes do not
        // trigger with a trailing / this is actually kind of important =)
        if ( prefix.substr( -1 ) != "/" ) {
            prefix = prefix + '/';
        }

        // Every route needs to be prefixed
        _.each( this.routes, function ( callback, path ) {
            if ( path ) {
                routes[prefix + path] = callback;
            } else {
                // If the path is "" just set to prefix, this is to comply
                // with how Backbone expects base paths to look gallery vs gallery/
                routes[prefix.substr( 0, prefix.length - 1 )] = callback;
            }
        } );

        // Must override with prefixed routes
        this.routes = routes;

        // Required to have Backbone set up routes
        Backbone.Router.prototype.constructor.call( this, options );

        // grab the full URL
        var hash = Backbone.history.getFragment();

        // check if there is already a part of the URL that this subview cares about...
        var hashPart = hash.substr( prefix.length, hash.length );

        // ...if so, trigger the subroute immediately.  this supports the case where 
        // a user directly navigates to a URL with a subroute on the first page load.
        if ( hashPart && hashPart != "" ) {
            Backbone.history.loadUrl( prefix + hashPart );
        }
    },
    navigate:function ( route, options ) {
        if ( route.substr( 0, 1 ) != '/' && route.indexOf( this.prefix.substr( 0,
                this.prefix.length - 1 ) ) != 0 ) {
            route = this.prefix + route;
        }
        Backbone.Router.prototype.navigate.call( this, route, options );
    }
} );

