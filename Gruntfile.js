module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({
    simplemocha: {
      backend: {
        src: 'test/be/**/*_spec.js'
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['simplemocha', 'karma']);
};