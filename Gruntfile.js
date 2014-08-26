module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                options: {
                    report: "gzip"
                },
                src: '<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        "jsbeautifier": {
            fix: {
                src: ['beautify.json', 'Gruntfile.js', 'backbone.subroute.js', 'spec/js/*.js'],
                options: {
                    config: "beautify.json"
                }
            },
            check: {
                src: ['beautify.json', 'Gruntfile.js', 'backbone.subroute.js', 'spec/js/*.js'],
                options: {
                    config: "beautify.json",
                    mode: "VERIFY_ONLY"
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'backbone.subroute.js', 'spec/js/*.js']
        },
        connect: {
            uses_defaults: {}
        },
        jasmine: {
            all: {
                src: 'backbone.subroute.js',
                options: {
                    host: 'http://127.0.0.1:8000/',
                    vendor: [
                        'node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/sinon/pkg/sinon.js',
                        'node_modules/jasmine-sinon/lib/jasmine-sinon.js'
                    ],
                    specs: 'spec/js/*specs.js',
                    helpers: 'spec/js/*helper.js',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '.istanbul/coverage.json',
                        report: {
                            type: 'text-summary',
                            options: {
                                dir: 'spec'
                            }
                        },
                        thresholds: {
                            lines: 84,
                            statements: 84,
                            branches: 66,
                            functions: 83
                        }
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-jsbeautifier');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('beautify', ['jsbeautifier:fix']);
    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('travis', ['jsbeautifier:check', 'jshint', 'connect', 'jasmine']);

    grunt.registerTask('default', ['jsbeautifier:fix', 'jshint', 'uglify', 'connect', 'jasmine']);
};
