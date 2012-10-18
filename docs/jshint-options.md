# Options

Any option that JSHint supports can be specified as an option in the task or target `options` object. See the [JSHint documentation](http://www.jshint.com/docs/) for a list of supported options.

In addition, these other options are supported:

## options.globals
Type: `Object`
Default value: `null`

An object containing names of globals that will be ignored for every linted file.

## options.jshintrc
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