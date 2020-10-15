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
        },
      },
    },
    concat: {
      dist: {
        src: ["web/js/dist/signup.js", "web/js/dist/signin.js"],
        dest: "web/js/dist/build-min.js",
      },
    },
    uglify: {
      dist: {
        src: "web/js/dist/build-min.js",
        dest: "web/js/dist/build-min.js",
      },
    },
    cssmin: {
      target: {
        files: {
          "web/css/build/build-min.css": ["web/css/site.css"],
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
