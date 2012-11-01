# Options
{%= s.multi_task_options %}

Any specified option will be passed through directly to JSHint, thus you can specify any option that JSHint supports. See the [JSHint documentation][] for a list of supported options.

[JSHint documentation]: http://www.jshint.com/docs/

A few additional options are supported:

## globals
Type: `Object`
Default value: `null`

An object of global variables, with keys as names and a boolean value to determine if they are assignable. This is not a standard JSHint option, but gets passed into the `JSHINT` function as its third argument. See the [JSHint documentation][] for more information.

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
