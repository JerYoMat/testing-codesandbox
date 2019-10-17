module.exports = {
  parser: "babel-eslint",
  root: true,
  extends: ["airbnb", "prettier"],
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  plugins: ["import", "react-hooks"],
  rules: {
    /**********************************************************************
     * Style
     **********************************************************************/

    // airbnb uses double-quotes for attributes, we use single.
    //"jsx-quotes": [ "error", "prefer-single" ],
    camelcase: ["error", { ignoreDestructuring: true }],
    curly: ["error", "all"],
    // Generally we don't allow variables to have dangling underscores, but we use this
    // to denote "private" variables on a class (i.e. `this._myPrivateVar = 'foo'), so allow
    // it only in those cases.
    "no-underscore-dangle": ["error", { allowAfterThis: true }],

    /**********************************************************************
     * Variables
     **********************************************************************/
    // Typically it is good to avoid re-assigning parameter values. But in the case of the
    // browser event object, this is the only way to set some properties on native DOM elements.
    "no-param-reassign": [
      "error",
      { ignorePropertyModificationsFor: ["event"] }
    ],

    // Ignore unused variables that start with `_`. For example, this is legal:
    //   const foo = (_a, b, _c) => b;
    "no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],

    /**********************************************************************
     * Accessibility (a11y)
     **********************************************************************/

    // This is deprecated in favor of "jsx-a11y/label-has-associated-control", but airbnb
    // is still using it. However, they have `allowChildren: false`, wherease we want to allow
    // children to be passed into the content of a label, i.e.: `<label>{children}</label>`
    "jsx-a11y/label-has-for": [
      "error",
      {
        required: {
          every: ["nesting", "id"]
        },
        allowChildren: true
      }
    ],

    // The HTML spec is naturally accessible when a <label> wraps an <input> - in this case,
    // no "for" attribute is needed as there is an implicit association based on the markup.
    // The linter does not know which of our React components render inputs under the hood,
    // so we have to whitelist them.
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        controlComponents: ["Checkbox"]
      }
    ],

    /**********************************************************************
     * React
     **********************************************************************/

    // I'm not sure why this works, but it does. But it may stop working in the future.
    // According to the docs on this (@see https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/forbid-prop-types.md),
    // this is supposed to only apply to things on `React.PropTypes` -- but we want to forbid
    // `ImmutablePropTypes.map`, for example, and this seems to do that.
    "react/forbid-prop-types": [
      "error",
      { forbid: ["any", "array", "object", "map"] }
    ],

    // airbnb rules require .jsx extension -- we use .js mostly.
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }],

    // Enabling this rule makes for some extremely convoluted JSX and overly fussy whitespace
    // management.
    "react/jsx-one-expression-per-line": "off",

    // Enforce prop-types are defined in alphabetical order.
    "react/sort-prop-types": "error",

    /**********************************************************************
     * React Hooks
     **********************************************************************/

    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error"
  }
};
