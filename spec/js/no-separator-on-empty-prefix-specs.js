describe("When using an empty prefix", function() {

    beforeEach(function() {
        SubRouteTest.setUp.call(this, "", {}, {
            "": "handleDefaultRoute",
            "about": "handleAboutRoute"
        });
    });

    afterEach(function() {
        SubRouteTest.tearDown.call(this);
    });

    it('has a "default" route', function() {
        expect(this.router.routes[""]).toEqual('handleDefaultRoute');
    });

    it('has a "about" route', function() {
        expect(this.router.routes.about).toEqual('handleAboutRoute');
    });

    it('has not a "about" route with a separator', function() {
        expect(this.router.routes["/about"]).toBeUndefined();
    });

    it('triggers the "default" route', function() {
        this.router.bind("route:handleDefaultRoute", this.routeSpy);
        this.baseRouter.navigate("", {
            trigger: true
        });
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith();
    });

    it('triggers the "about" route', function() {
        this.router.bind("route:handleAboutRoute", this.routeSpy);
        this.baseRouter.navigate("about", {
            trigger: true
        });
        expect(this.routeSpy).toHaveBeenCalledOnce();
        expect(this.routeSpy).toHaveBeenCalledWith();
    });
});
