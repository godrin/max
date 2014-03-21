module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //src: 'src/<%= pkg.name %>.js',
        src: 'js/main.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    bower: {
      install: {
        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
      }
    },
    requirejs: {
      production: {
        options: {
          baseUrl: "js",
          mainConfigFile: "js/main.js",
          name:"main",
//          name: "path/to/almond", // assumes a production build using almond
          out: "build/optimized.js",
          optimize:"none"
        }
      }
    },
    less: {
      development:{
        options:{
          //paths:["assets/css"]
        },
        files:{
          "dist/progress.css":"js/css/progress.less"
        }
      },
      production:{
        files: {
          "dist/production.css":[
            "js/libs/bootstrap/dist/css/bootstrap.min.css",
            "js/libs/bootstrap/dist/css/bootstrap-theme.min.css",
            "index.css",
            "js/css/progress.less"
          ]
        }
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task(s).
  grunt.registerTask('default', ['uglify','less','requirejs']);

};
