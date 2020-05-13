/**
 * @fileoverview Prevent JSX pragma to be marked as unused
 * @author Pranav Karawale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
var babelParser = require("../helpers/parsers").BABEL_ESLINT;
const eslint = require("eslint");
const rule = require("eslint/lib/rules/no-unused-vars"),
  RuleTester = require("eslint").RuleTester;

const parserOptions = {
  ecmaVersion: 2018,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true,
  },
};

const settings = {
  teddytags: {
    pragma: "Foo",
  },
};
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester({ parserOptions });
const linter = ruleTester.linter || eslint.linter;
linter.defineRule("jsx-pragma", require("../../../lib/rules/jsx-pragma"));
ruleTester.run("no-unused-vars", rule, {
  valid: [
    { code: "/*eslint jsx-pragma:1*/ var teddy; <div />;" },
    {
      code:
        "/*eslint jsx-pragma:1*/ var teddy; (function () { <div /> })();",
    },
    { code: "/*eslint jsx-pragma:1*/ /** @jsx Foo */ var Foo; <div />;" },
    { code: "/*eslint jsx-pragma:1*/ var Foo; <div />;", settings },
    {
      code: "/*eslint jsx-pragma:1*/ var teddy; <></>;",
      parser: babelParser,
    },
  ],

  invalid: [
    {
      code: "/*eslint jsx-pragma:1*/ var teddy;",
      errors: [{ message: "'teddy' is defined but never used." }],
    },
    {
      code: "/*eslint jsx-pragma:1*/ /** @jsx Foo */ var teddy; <div />;",
      errors: [{ message: "'teddy' is defined but never used." }],
    },
    {
      code: "/*eslint jsx-pragma:1*/ var teddy; <div />;",
      errors: [{ message: "'teddy' is defined but never used." }],
      settings,
    },
    {
      code: "/*eslint jsx-pragma:1*/ var h; <></>;",
      parser: babelParser,
      errors: [{ message: "'h' is defined but never used." }],
      settings,
    },
  ],
});
