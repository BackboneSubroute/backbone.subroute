describe( "When provided a subroute and prefix", function () {

    beforeEach( function () {
        SubRouteTest.setUp.call(this, "subroute1");        
    } );

    afterEach( function () {
        SubRouteTest.tearDown.call(this);
    } );

    it( 'has a "default" route', function () {
        expect( this.router.routes['subroute1'] ).toEqual( 'handleDefaultRoute' );
    } );

    it( 'does not have a "default" route with a trailing slash', function () {
        expect( this.router.routes['subroute1/'] ).toBeUndefined();
    } );

    it( 'has a "foo" route', function () {
        expect( this.router.routes['subroute1/foo'] ).toEqual( 'handleFooRoute' );
    } );

    it( 'does not have a "foo" route with a trailing slash', function () {
        expect( this.router.routes['subroute1/foo/'] ).toBeUndefined();
    } );
    
    it( 'triggers the "default" route', function () {                
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("subroute1", {trigger:true} );                
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );
    
    it( 'does not trigger the "default" route when using a trailing slash', function () {        
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("subroute1/", {trigger:true} );
        expect( this.routeSpy ).not.toHaveBeenCalledOnce();
        expect( this.routeSpy ).not.toHaveBeenCalledWith();
    } );

    it( 'triggers the "foo" route', function () {
        this.router.bind("route:handleFooRoute", this.routeSpy);
        this.baseRouter.navigate("subroute1/foo", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

    it( 'does not trigger the "foo" route when using a trailing slash', function () {        
        this.router.bind("route:handleFooRoute", this.routeSpy);
        this.baseRouter.navigate("subroute1/foo/", {trigger:true} );
        expect( this.routeSpy ).not.toHaveBeenCalledOnce();
        expect( this.routeSpy ).not.toHaveBeenCalledWith();
    } );

} );    
    