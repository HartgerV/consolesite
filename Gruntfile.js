module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			example: {
				port: 1337,
				base: './'
			}
		},
        uglify: {
            options: {
                beautify:true,
                mangle:false,
                compress: {
                    drop_console: false
                }
            },
            build: {
                files: [{
                    expand: true,
                    cwd: './js',
                    src: '**/*.js',
                    dest: 'dest/js'
                }]
            }
        },
        csscomb: {
            dist: {
                dynamic_mappings: {
                    expand: true,
                    cwd: './style',
                    src: ['*.css', '!*.resorted.css'],
                    dest: 'dest/style/',
                    ext: '.resorted.css'
                }
            }
        }

	});

	grunt.loadNpmTasks('grunt-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-csscomb');

    grunt.registerTask('default', 'connect:example');
    grunt.registerTask('build', ['uglify','csscomb']);


};