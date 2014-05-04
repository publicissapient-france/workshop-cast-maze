'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'gh-pages': {
            options: {
                base: 'dist',
                add: true
            },
            src: ['**']
        },
        'clean': ['_site', 'dist'],
        'jekyll': {
            dist: {
                options: {
                    dest: 'dist/workshop/',
                    config: '_config.yml'
                }
            }
        },
        copy: {
            index: {
                src: 'dist/workshop/index.html',
                dest: 'dist/workshop/index.html',
                options: {
                    process: function (content) {
                        content = content.replace(/\.\.\/css/g, '/workshop-cast-maze/workshop/css');
                        return content;
                    }
                }
            },
            css: {
                src: 'dist/workshop/css/*',
                dest: 'dist/workshop/css/',
                options: {
                    process: function (content) {
                        content = content.replace(/\.\.\/img/g, '/workshop-cast-maze/workshop/img');
                        return content;
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-jekyll');

    grunt.registerTask('dist', ['clean', 'jekyll', 'copy']);
};