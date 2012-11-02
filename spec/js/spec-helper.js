var expectRouteToBeCalled = function ( url, expandedUrl, routeFunctionName ) {
    checkRoute( url, expandedUrl, routeFunctionName, true );
};

var expectRouteNotToBeCalled = function ( url, expandedUrl, routeFunctionName ) {
    checkRoute( url, expandedUrl, routeFunctionName, false );
};

SubRouteTest = {};

SubRouteTest.setUp = function (prefix, options, overrideRoutes) {

    var baseRouterDef = Backbone.Router.extend( {
        routes:{
            "":"handleRootRoute",
            "foo":"handleRootFooRoute"
        }
    } );

    this.baseRouter = new baseRouterDef();

    try {
        Backbone.history.start( {silent:true, pushState:true} );
    } catch ( e ) {
    }

    var routesToUse = {
        "":"handleDefaultRoute",
        "foo":"handleFooRoute"
    };
    
    if (overrideRoutes) {
        routesToUse = overrideRoutes;
    } 
    
    if (prefix) {
        var testRouter = Backbone.SubRoute.extend( {
            routes: routesToUse
        } );

        this.router = new testRouter( prefix, options );

    }

    this.routeSpy = sinon.spy();

    if ( Backbone.history._hasPushState ) {

        this.historySpy = sinon.stub( window.history, 'pushState' );

    } else if ( Backbone.history._wantsHashChange ) {

        this.historySpy = sinon.stub( Backbone.history, '_updateHash' );

    }

    // so that tests navigating to the root will trigger a change
    this.baseRouter.navigate("elsewhere");
};

SubRouteTest.tearDown = function () {
    try {
        Backbone.history.stop();
    } catch ( e ) {
    }

    this.router = null;
    this.routeSpy = null;
    this.historySpy.restore();
    this.historySpy = null;    
};
