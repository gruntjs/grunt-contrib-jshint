# grunt-contrib-jshint

> Validate files with JSHint.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-jshint --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-jshint');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The jshint task

### Overview

In your project's Gruntfile, add a section named `jshint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  jshint: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

Any option that JSHint supports can be specified as an option in the task or target `options` object. See the [JSHint documentation](http://www.jshint.com/docs/) for a list of supported options.

In addition, these other options are supported:

#### options.globals
Type: `Object`
Default value: `null`

An object containing names of globals that will be ignored for every linted file.

#### options.jshintrc
Type: `String`
Default value: `null`

If this filename is specified, options and globals defined therein will be used. The `jshintrc` file must be valid JSON and would look something like this:

```json
{
  "curly": true,
  "eqnull": true,
  "eqeqeq": true,
  "undef": true,
  "globals": {
    "jQuery": true
  }
}
```
### Usage examples

#### Wildcards
In this example, running `grunt jshint` will lint the project's Gruntfile as well as all JavaScript files in the `lib` and `test` directories and their subdirectores, using the default JSHint `options` and `globals`.

```javascript
// Project configuration.
grunt.initConfig({
  jshint: {
    all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
  }
});
```

#### Linting before and after concatenating
In this example, running `grunt jshint` will lint both the "beforeconcat" set and "afterconcat" sets of files. This is not ideal, because `dist/output.js` may get linted before it gets created via the [grunt-contrib-concat plugin](https://github.com/gruntjs/grunt-contrib-concat) `concat` task.

In this case, you should lint the "beforeconcat" set first, then concat, then lint the "afterconcat" set, by running `grunt jshint:beforeconcat concat jshint:afterconcat`.

```javascript
// Project configuration.
grunt.initConfig({
  concat: {
    dist: {
      src: ['src/foo.js', 'src/bar.js'],
      dest: 'dist/output.js'
    }
  },
  jshint: {
    beforeconcat: ['src/foo.js', 'src/bar.js'],
    afterconcat: ['dist/output.js']
  }
});
```

#### Specifying JSHint options and globals

In this example, custom JSHint `options` and `globals` are specified. Note that when `grunt jshint:uses_defaults` is run, those files are linted using the default options, but when `grunt jshint:with_overrides` is run, those files are linted using merged task/target options.

```javascript
// Project configuration.
grunt.initConfig({
  jshint: {
    options: {
      curly: true,
      eqeqeq: true,
      eqnull: true,
      browser: true,
      globals: {
        jQuery: true
      },
    },
    uses_defaults: ['dir1/**/*.js', 'dir2/**/*.js'],
    with_overrides: {
      options: {
        curly: false,
        undef: true,
      },
      files: {
        src: ['dir3/**/*.js', 'dir4/**/*.js']
      },
    }
  },
});
```


## Release History

 * 2012-10-17 - v0.1.0 - Work in progress, not yet officially released.

--
Task submitted by <a href="http://benalman.com/">"Cowboy" Ben Alman</a>.
