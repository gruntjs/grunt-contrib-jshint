# Usage examples

## Wildcards
In this example, running `grunt jshint:all` (or `grunt jshint` because `jshint` is a [multi task][]) will lint the project's Gruntfile as well as all JavaScript files in the `lib` and `test` directories and their subdirectores, using the default JSHint options.

```js
// Project configuration.
grunt.initConfig({
  jshint: {
    all: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js']
  }
});
```

## Linting before and after concatenating
In this example, running `grunt jshint` will lint both the "beforeconcat" set and "afterconcat" sets of files. This is not ideal, because `dist/output.js` may get linted before it gets created via the [grunt-contrib-concat plugin](https://github.com/gruntjs/grunt-contrib-concat) `concat` task.

In this case, you should lint the "beforeconcat" files first, then concat, then lint the "afterconcat" files, by running `grunt jshint:beforeconcat concat jshint:afterconcat`.

```js
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

## Specifying JSHint options and globals

In this example, custom JSHint options are specified. Note that when `grunt jshint:uses_defaults` is run, those files are linted using the default options, but when `grunt jshint:with_overrides` is run, those files are linted using _merged_ task/target options.

```js
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

## Specifying reporters

In this example, three jshint reporters are specified. Output from the `checkstyle` reporter will be written into `report/jshint_checkstyle.xml` and similar with `jslint`. The last reporters is a custom reporter, which is defined in the module `path/to/myreporter.js`.

```js
// Project configuration.
grunt.initConfig({
  jshint: {
    options: {
      jshintrc: '.jshintrc',
      reporters: [
        {name: 'checkstyle', dest: 'report/jshint_checkstyle.xml'},
        {name: 'jslint', dest: 'report/jslint.xml'},
        {name: 'path/to/myreporter.js', dest: 'report/jshint_myreporter.json'},
      ]
    },
    all: 'lib/**/*.js'
  }
});
```
