describe("When the routes hash is initially empty", function() {
    it("should allow a route to be dynamically added", function() {
        var browserModule = new Backbone.SubRoute("browser", {
            createTrailingSlashRoutes: true
        });
        browserModule.route('browse', function() {
            console.log('browse');
        });
    });
});
