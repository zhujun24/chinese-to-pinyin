module.exports = function (grunt) {
	grunt.initConfig({
		babel: {
			options: {
				// sourceMap: true,
				presets: ['babel-preset-es2015']
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: '',
						src: ['src/*.js'],
						dest: 'dist/',
						ext: '.js'
					}
				]
			}
		},
		eslint: {
			target: ['*.js', 'src/*.js']
		},
		watch: {
			node: {
				files: ['*.js', 'src/*.js'],
				options: {
					event: ['changed', 'added', 'deleted']
				},
				tasks: ['babel', 'eslint']
			}
		}
	});
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['babel']);
};
