describe( "When using the 'createTrailingSlashRoutes' option", function () {

    beforeEach( function () {
        SubRouteTest.setUp.call(this, "subroute2", {createTrailingSlashRoutes: true});
    } );

    afterEach( function () {
        SubRouteTest.tearDown.call(this);
    } );

    it( 'has a "default" route', function () {
        expect( this.router.routes['subroute2'] ).toEqual( 'handleDefaultRoute' );
    } );

    it( 'has an auto-generated "default" route with a trailing slash', function () {
        expect( this.router.routes['subroute2/'] ).toEqual( 'handleDefaultRoute' );
    } );

    it( 'has a "foo" route', function () {
        expect( this.router.routes['subroute2/foo'] ).toEqual( 'handleFooRoute' );
    } );

    it( 'has an auto-generated "foo" route with a trailing slash', function () {
        expect( this.router.routes['subroute2/foo/'] ).toEqual( 'handleFooRoute' );
    } );

    it( 'triggers the "default" route', function () {
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("subroute2", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

    it( 'triggers the auto-generated "default" route when using a trailing slash', function () {
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("subroute2/", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

    it( 'triggers the "foo" route', function () {
        this.router.bind("route:handleFooRoute", this.routeSpy);
        this.baseRouter.navigate("subroute2/foo", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

    it( 'does not trigger the "foo" route when using a trailing slash', function () {
        this.router.bind("route:handleFooRoute", this.routeSpy);
        this.baseRouter.navigate("subroute2/foo/", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

} );    
    