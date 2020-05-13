/**
 * @fileoverview Prevent JSX variables to be declared unused
 * @author Pranav Karawale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const eslint = require("eslint");
const ruleNoUnusedVars = require("eslint/lib/rules/no-unused-vars");
const rulePreferConst = require("eslint/lib/rules/prefer-const");
const rule = require("../../../lib/rules/jsx-vars"),
  RuleTester = require("eslint").RuleTester;
const parsers = require("../helpers/parsers");
//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const linter = ruleTester.linter || eslint.linter;
linter.defineRule("jsx-vars", rule);
ruleTester.run("no-unused-vars", ruleNoUnusedVars, {
  valid: [
    {
      code: `
          /* eslint jsx-vars: 1 */
          function foo() {
            var App;
            var bar = render(<App/>);
            return bar;
          };
          foo()
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          render(<App/>);
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var a = 1;
          render(<img src={a} />);
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          function f() {
            return <App />;
          }
          f();
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          <App.Hello />
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          <App:Hello />
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          class HelloMessage {};
          <HelloMessage />
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          class HelloMessage {
            render() {
              var HelloMessage = <div>Hello</div>;
              return HelloMessage;
            }
          };
          <HelloMessage />
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          function foo() {
            var App = { Foo: { Bar: {} } };
            var bar = render(<App.Foo.Bar/>);
            return bar;
          };
          foo()
        `,
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          function foo() {
            var App = { Foo: { Bar: { Baz: {} } } };
            var bar = render(<App.Foo.Bar.Baz/>);
            return bar;
          };
          foo()
        `,
      parser: parsers.BABEL_ESLINT,
    },
  ],
  invalid: [
    {
      code: "/* eslint jsx-vars: 1 */ var App;",
      errors: [{ message: "'App' is defined but never used." }],
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          var unused;
          render(<App unused=""/>);
        `,
      errors: [{ message: "'unused' is defined but never used." }],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var App;
          var Hello;
          render(<App:Hello/>);
        `,
      errors: [{ message: "'Hello' is defined but never used." }],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          var Button;
          var Input;
          render(<Button.Input unused=""/>);
        `,
      errors: [{ message: "'Input' is defined but never used." }],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          class unused {}
        `,
      errors: [{ message: "'unused' is defined but never used." }],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          class HelloMessage {
            render() {
              var HelloMessage = <div>Hello</div>;
              return HelloMessage;
            }
          }
        `,
      errors: [
        {
          message: "'HelloMessage' is defined but never used.",
          line: 3,
        },
      ],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          class HelloMessage {
            render() {
              var HelloMessage = <div>Hello</div>;
              return HelloMessage;
            }
          }
        `,
      errors: [
        {
          message: "'HelloMessage' is defined but never used.",
          line: 3,
        },
      ],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
          /* eslint jsx-vars: 1 */
          import {Hello} from 'Hello';
          function Greetings() {
            const Hello = require('Hello').default;
            return <Hello />;
          }
          Greetings();
        `,
      errors: [
        {
          message: "'Hello' is defined but never used.",
          line: 3,
        },
      ],
      parser: parsers.BABEL_ESLINT,
    },
  ],
});
ruleTester.run("prefer-const", rulePreferConst, {
  valid: [],
  invalid: [
    {
      code: `
        /* eslint jsx-vars:1 */
        let App = <div />;
        <App />;
      `,
      errors: [{ message: "'App' is never reassigned. Use 'const' instead." }],
      parser: parsers.BABEL_ESLINT,
    },
    {
      code: `
        /* eslint jsx-vars:1 */
        let filters = 'foo';
        <div>{filters}</div>;
      `,
      errors: [
        { message: "'filters' is never reassigned. Use 'const' instead." },
      ],
      parser: parsers.BABEL_ESLINT,
    },
  ],
});
