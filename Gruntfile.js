
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: false
      },
      dist: {
        files: {
          './dest/main.css': './src/style/main.sass'
        }
      }
    },
    babel: {
      options: {
        presets: ['env', 'react', 'flow'],
        plugins: [
          'transform-es2015-classes',
          'transform-es2015-spread',
          'transform-es2015-arrow-functions',
        ]
      },
      dist: {
        files: {
          './dest/main.js': './src/engine/app.js'
        }
      }
    },
    copy: {
      frame: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: 'index.html',
            dest: './dest/'
          }
        ]
      }
    },
    jest: {
      options: {
        coverage: true,
        testPathPattern: /.*-test.js/
      }
    },
    watch: {
      script: {
        files: "./src/engine/*.js",
        tasks: ['babel']
      },
      style: {
        files: './src/style/*.sass',
        tasks: ['sass']
      },
      frame: {
        files: './src/index.html',
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('default', ['sass', 'babel', 'copy']);
};

