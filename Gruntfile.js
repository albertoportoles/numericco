module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
        options: {
            separator: ';'
        },
        dist: {
            src: ['js/front/numericco-vendor.js', 'js/front/utils.js'],
            dest: "js/front/build/numericco-vendor.js"
        }
    },
    concat_in_order: {
      back:{
        files: {
          "js/admin/build/admin-vendor.js":
          [
            'js/admin/admin-vendor.js',
            'js/admin/utils.js'
          ],
        }
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {


            /*BACK JS FILES*/
            'dist/app/webroot/js/admin/vendor.js':
              [
                'js/admin/build/admin-vendor.js'
              ],

            'dist/app/webroot/js/admin/admin-view.js':
                [
                  'js/admin/plugins/jquery.jeditable.mini.js',
                  'node_modules/fancybox/dist/js/jquery.fancybox.js',
                  'node_modules/jquery-tags-input/dist/jquery-tagsinput.min.js',
                ],

            'dist/app/webroot/js/admin/admin-general.js':
                [
                  'node_modules/bootstrap/js/modal.js',
                  'node_modules/bootstrap/js/dropdown.js',
                  'node_modules/jquery-ui-dist/jquery-ui.min.js',
                  'js/admin/plugins/dynamitable.jquery.min.js',
                  'js/admin/general/general.js'
                ],


            /*FRONT JS FILES*/
            'dist/app/webroot/js/vendor.js':
              [
                'js/front/build/numericco-vendor.js'
              ],

            'dist/app/webroot/js/numericco-common.js':
              [
                'js/front/comunes/**.js',
                'node_modules/jquery-ui-dist/jquery-ui.min.js',
                'node_modules/skrollr/dist/skrollr.min.js',
                'node_modules/jquery-validation/dist/jquery.validate.js',
              ],

        }
      }
    },
    watch: {
     files: ['js/**/*.js'],
     tasks: ['build']
   }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-in-order');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['concat', 'concat_in_order:back', 'uglify']);
  grunt.registerTask('admin', ['concat_in_order:back', 'uglify']);

  // Default task(s).
  grunt.registerTask('default', ['build']);

};
