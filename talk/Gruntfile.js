'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                src: ['css/**', 'js/*', 'lib/**', 'plugin/**', 'img/**', 'index.html'], dest: 'dist/talk/', filter: 'isFile'
            }
        },
        'gh-pages': {
            options: {
                base: 'dist',
                add: true
            },
            src: ['**']
        },
        'clean': ['dist']
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dist', ['clean', 'copy']);
};