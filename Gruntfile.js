
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
          'transform-react-jsx',
          'transform-es2015-classes',
          'transform-es2015-spread',
          'transform-es2015-arrow-functions',
        ]
      },
      dist: {
        files: {
          './dest/main.js': './src/engine/app.js',
          './dest/**/*.js': './src/engine/**/*.js'
        }
      }
    },
    copy: {
      frame: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['index.html', '*.css'],
            dest: './dest/'
          }
        ]
      }
    },
    browserify: {
      dist: {
        files: {
          './dest/main.js': './src/engine/index.js',
        },
        options: {
          transform: ['babelify']
        }
      }
    },
    watch: {
      script: {
        files: ["./src/engine/*.js", "./src/engine/**/*.js"],
        tasks: ['browserify']
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['sass', 'copy', 'browserify']);
};

