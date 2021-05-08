module.exports = function (grunt) {
  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ["@babel/preset-env"],
      },
      dist: {
        files: {
          "web/js/dist/signup.js": "web/es6/signup.js",
          "web/js/dist/signin.js": "web/es6/signin.js",
          "web/js/dist/home.js": "web/es6/home.js",
          "web/js/dist/dashboard.js": "web/es6/dashboard.js",
          "web/js/dist/landingpage.js": "web/es6/landingpage.js",
        },
      },
    },
    concat: {
      dist: {
        src: ["web/js/dist/signup.js", "web/js/dist/signin.js"],
        dest: "web/js/dist/build-main.js",
      },
    },
    uglify: {
      build: {
        files: [
          {
            src: "web/js/dist/build-main.js",
            dest: "web/js/dist/build-main.js",
          },
          {
            src: "web/js/dist/home.js",
            dest: "web/js/dist/build-home.js",
          },
          {
            src: "web/js/dist/dashboard.js",
            dest: "web/js/dist/build-dashboard.js",
          },
          {
            src: "web/js/dist/landingpage.js",
            dest: "web/js/dist/build-landingpage.js",
          },
        ],
      },
    },
    cssmin: {
      target: {
        files: {
          "web/css/dist/build-main.css": ["web/css/site.css"],
        },
      },
    },
    watch: {
      options: {
        atBegin: true,
        event: ["all"],
      },
      src: {
        files: [
          "web/es6/*.js",
          "web/js/dist/signup.js",
          "web/js/dist/signin.js",
          "web/js/dist/build.js",
          "web/css/site.css",
        ],
        tasks: ["babel", "concat", "concat", "uglify", "cssmin"],
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-babel");

  grunt.registerTask("default", ["watch"]);
};
