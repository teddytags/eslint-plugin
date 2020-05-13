# Prevent JSX pragma to be marked as unused (jsx-pragma)

This rule is specifically introduced to prevent the JSX Pragma (the function that creates JSX elements) to be unused. Defaults to `teddy`.

## Rule Details

This rule aims to mark JSX pragma as used, provided JSX variables are present.

Examples of **incorrect** code for this rule:

```jsx
var teddy;

/** @jsx Foo */ var teddy;
<div />;

var teddy;
<div />;

var h;
<></>;
```

Examples of **correct** code for this rule:

```jsx
var teddy;
<div />;

var teddy;
(function () {
  <div />;
})();

/** @jsx Foo */ var Foo;
<div />;

var Foo;
<div />; /* .eslintrc => settings : {
  teddytags: {
    pragma: "Foo",
  },*/

var teddy;
<></>;
```
