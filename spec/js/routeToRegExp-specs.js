describe('When a user overrides _routeToRegExp to be case insensitive', function() {

    beforeEach(function() {
        SubRouteTest.setUp.call(this);

        var routesToUse = {
            "": "handleDefaultRoute",
            "foo": "handleFooRoute",
            "user/:user": "handleUserRoute"
        };

        var TestRouter = Backbone.SubRoute.extend({
            routes: routesToUse,
            _routeToRegExp: function(route) {
                route = Backbone.Router.prototype._routeToRegExp.call(this, route);
                return new RegExp(route.source, 'i');
            }
        });
        this.router = new TestRouter('insensitive');
    });

    afterEach(function() {
        SubRouteTest.tearDown.call(this);
    });

    it('triggers default route when using INsensitive', function() {
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("INsensitive", {
            trigger: true
        });
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith();
    });

    it('triggers "foo" when "FOO" is used', function() {
        this.router.bind("route:handleFooRoute", this.routeSpy);
        this.baseRouter.navigate("insensitive/FOO", {
            trigger: true
        });
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith();
    });
});
