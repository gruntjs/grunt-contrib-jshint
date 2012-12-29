# Options

Any specified option will be passed through directly to [JSHint][], thus you can specify any option that JSHint supports. See the [JSHint documentation][] for a list of supported options.

[JSHint]: http://www.jshint.com/
[JSHint documentation]: http://www.jshint.com/docs/

A few additional options are supported:

## globals
Type: `Object`
Default value: `null`

A map of global variables, with keys as names and a boolean value to determine if they are assignable. This is not a standard JSHint option, but is passed into the `JSHINT` function as its third argument. See the [JSHint documentation][] for more information.

## jshintrc
Type: `String`
Default value: `null`

If this filename is specified, options and globals defined therein will be used. The `jshintrc` file must be valid JSON and looks something like this:

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

## jshintignore
Type: `String`
Default value: `null`

If this filename is given then any directories or files specified will be skipped over.
For example, there are two files `foo/bar.js` and `foo/baz.js`, and the content of `.jshintignore` is

```
foo/bar.js
```

then following `jshint` task checks `foo/baz.js` but ignores `foo/bar.js`.

```javascript
jshint: {
  all: ["foo/*.js"],
  options: {
    jshintrc: ".jshintrc",
    jshintignore: ".jshintignore"
  }
}
```
