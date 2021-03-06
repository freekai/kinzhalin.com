/*global module, require */
module.exports = function (grunt) {
    "use strict";
    
    var fs = require("fs-extra");
    
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dst: "dist",
        requirejs: {
            build: {
                options: {
                    appDir: "www",
                    baseUrl: "./",
                    dir: "<%= dst %>",
                    optimize: "uglify2",
                    generateSourceMaps: false,
                    useSourceUrl: true,
                    preserveLicenseComments: false,
                    useStrict: true,
                    uglify2: {},
                    optimizeCss: "standard",
                    module: {
                        name: "js/main"
                    }
                }
            }
        },
        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "www/",
                        dest: "<%= dst %>",
                        src: [
                            "index.html",
                            "js/3rd/*",
                            "html/**"
                        ]
                    }
                ]
            }
        },
        "ftp-deploy": {
            build: {
                auth: {
                    host: "mkhs.com",
                    port: 21,
                    authKey: "secret"
                },
                src: "dist",
                dest: "public_html",
                exclusions: ["build.txt"]
            }
        }
    });
    
    grunt.registerTask("clean-dist", function () {
        var done = this.async();
        
        grunt.config.requires("dst");
        
        fs.remove(grunt.config("dst"), function (err) {
            if (err) {
                done(false);
            } else {
                done();
            }
        });
    });
    
    grunt.registerTask("make-dist", function () {
        var done = this.async();

        grunt.config.requires("dst");
        
        fs.mkdirs(grunt.config("dst"), function (err) {
            if (err) {
                done(false);
            } else {
                done();
            }
        });
    });
    
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks("grunt-ftp-deploy");
    
    grunt.registerTask("default", ["clean-dist", "make-dist", "copy", "requirejs"]);
    grunt.registerTask("publish", ["ftp-deploy"]);
    grunt.registerTask("clean", ["clean-dist"]);
    
};
