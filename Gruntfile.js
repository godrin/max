module.exports = function(grunt) {

  var cssFiles= [
    "js/libs/bootstrap/dist/css/bootstrap.min.css",
    "js/libs/bootstrap/dist/css/bootstrap-theme.min.css",
    "index.css",
    "js/css/*.less"
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        compress:false
      },
      build: {
        //src: 'src/<%= pkg.name %>.js',
        src: ['js/libs/requirejs/require.js','build/optimized.js'],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    //    bower: {
      //      install: {
        //        //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
        //      }
        //    },
        requirejs: {
          production: {
            options: {
              baseUrl: "js",
              mainConfigFile: "js/main.js",
              name:"main",
              logLevel:3,
              //          name: "path/to/almond", // assumes a production build using almond
              out: "build/optimized.js",
              optimize:"none",
              //          include: ['libs/requirejs/require.js']
            }
          }
        },
        less: {
          development:{
            options:{
              //paths:["assets/css"]
            },
            files:{
              "dist/progress.css":["js/css/*.less"]
            }
          },
          production:{
            options: {
              optimization:true,
              cleancss:true
            },
            files: {
              "dist/production.css":cssFiles
            }
          }
        },
        watch: {
          less:{
            files:cssFiles,
            tasks:["less","autoprefixer"],
            options: {
              // Start a live reload server on the default port 35729
              livereload: true,
              //               },
              //               
            }
          }
        },
        autoprefixer: {
          single:{
            src:"dist/production.css",
            dest:"dist/production.prefixed.css"
          }
        },
        cssmin: {
          min:{
            files:{
              "dist/production.min.css":["dist/production.prefixed.css"]
            }
          }
        }


  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  //  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task(s).
  grunt.registerTask('default', ['less','autoprefixer','requirejs','uglify']);

};
