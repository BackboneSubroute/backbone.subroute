describe( "When an initial URL hash is provided at subroute initialization time", function () {

    var that;
    beforeEach( function () {

        var hash;
        if (Backbone.history.fragment) {
            hash = Backbone.history.getFragment();
        } else {
            hash = Backbone.history.getHash();
        }
        this.oldHash = hash;

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

        that = this;
        this.defaultRouteSpy = sinon.spy();
        this.fooRouteSpy = sinon.spy();

        this.loadUrlSpy = sinon.spy(Backbone.history, "loadUrl");

    } );

    var loadSubRoute = function(prefix) {
        
        if (prefix) {
            var testRouter = Backbone.SubRoute.extend( {
                routes: {
                    "":"handleDefaultRoute",
                    "foo":"handleFooRoute"
                },
                handleDefaultRoute: function() {
                    that.defaultRouteSpy();
                },
                handleFooRoute: function() {
                    that.fooRouteSpy();
                }
            } );

            this.baseRouter = new testRouter( prefix );

        }
    };
    
    afterEach( function () {
        try {
            Backbone.history.stop();
        } catch ( e ) {
        }

        this.baseRouter = null;
        Backbone.history.navigate(this.oldHash);
        this.defaultRouteSpy = undefined;
        this.fooRouteSpy = undefined;
        this.loadUrlSpy.restore();
    } );

    it( 'triggers the "default" route if the initial URL matches one of the routes', function () {

        Backbone.history.navigate("subroute6/");      
                
        loadSubRoute("subroute6/");
        
        expect( this.defaultRouteSpy ).toHaveBeenCalledOnce();
        expect( this.defaultRouteSpy ).toHaveBeenCalledWith();
        
        expect( this.loadUrlSpy ).toHaveBeenCalledOnce();
    } );


    it( 'triggers the "foo" route if the initial URL matches one of the routes', function () {

        Backbone.history.navigate("subroute6/foo");

        loadSubRoute("subroute6/");
        
        expect( this.fooRouteSpy ).toHaveBeenCalledOnce();
        expect( this.fooRouteSpy ).toHaveBeenCalledWith();

        expect( this.loadUrlSpy ).toHaveBeenCalledOnce();
    } );

    it( 'does not trigger the "default" route if the initial URL does NOT match one of the routes', function () {

        Backbone.history.navigate("subroute6a/");

        loadSubRoute("subroute6/");

        expect( this.defaultRouteSpy ).not.toHaveBeenCalledOnce();
        expect( this.defaultRouteSpy ).not.toHaveBeenCalledWith();

        expect( this.loadUrlSpy ).not.toHaveBeenCalledOnce();
    } );


    it( 'does not trigger the "foo" route if the initial URL does NOT match one of the routes', function () {

        Backbone.history.navigate("subroute6a/foo");

        loadSubRoute("subroute6/");

        expect( this.fooRouteSpy ).not.toHaveBeenCalledOnce();
        expect( this.fooRouteSpy ).not.toHaveBeenCalledWith();

        expect( this.loadUrlSpy ).not.toHaveBeenCalledOnce();
    } );
    
    
    
} );    
    