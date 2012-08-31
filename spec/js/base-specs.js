describe( "When a plain Backbone Router is created", function () {

    beforeEach( function () {
        SubRouteTest.setUp.call(this, "subroute1");
    } );

    afterEach( function () {
        SubRouteTest.tearDown.call(this);
    } );    
    
    it( 'has a "default" route', function () {
        expect( this.baseRouter.routes[''] ).toEqual( 'handleRootRoute' );
    } );
    it( 'has a "foo" route', function () {
        expect( this.baseRouter.routes['foo'] ).toEqual( 'handleRootFooRoute' );
    } );

    it( 'triggers the "default" route', function () {
        this.baseRouter.bind("route:handleRootRoute", this.routeSpy);
        this.baseRouter.navigate("", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();
    } );

    it( 'triggers the "foo" route', function () {
        this.baseRouter.bind("route:handleRootFooRoute", this.routeSpy);
        this.baseRouter.navigate("foo", {trigger:true} );
        expect( this.routeSpy ).toHaveBeenCalledOnce();
        expect( this.routeSpy ).toHaveBeenCalledWith();

    } );
} );   
