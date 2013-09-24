describe("When initializing multiple routers from the same class", function() {

    var subRouter = Backbone.SubRoute.extend( {
        routes: {
            "":"handDefaultRoute"
        }
    } );

    it ( 'should have normal subroutes if just one subroute is initialized', function () {
        SubRouterOne = new subRouter("subrouterone");
        expect(SubRouterOne.routes).toEqual( { '' : 'handDefaultRoute', subrouterone : 'handDefaultRoute' } );
    } );

    it ( 'should not cross pollute routes', function () {
        SubRouterOne = new subRouter("subrouterone");
        SubRouterTwo = new subRouter("subroutertwo");
        expect(SubRouterOne.routes).toEqual( { '' : 'handDefaultRoute', subrouterone : 'handDefaultRoute' } );
        expect(SubRouterTwo.routes).toEqual( { '' : 'handDefaultRoute', subroutertwo : 'handDefaultRoute' } );
    } );

} );
