# Prevent JSX variables to be declared unused (jsx-vars)

When using ESLint with JSX(or TSX) it normally declares variables unused. This plugin helps decimitate that deficiency, resulting clean and err-free code.

## Rule Details

This rule aims to mark JSX variables as used

Examples of **incorrect** code for this rule:

```jsx
//example 1
var App;

//example 2
var App;
var unused;
render(<App unused="" />);

//example 3
var App;
var Hello;
render(<App:Hello />);

//example 4
var Button;
var Input;
render(<Button.Input unused="" />);

//example 5
class unused {}

//example 6
class HelloMessage {
  render() {
    var HelloMessage = <div>Hello</div>;
    return HelloMessage;
  }
}

//example 7
class HelloMessage {
  render() {
    var HelloMessage = <div>Hello</div>;
    return HelloMessage;
  }
}

//example 8
import { Hello } from "Hello";
function Greetings() {
  const Hello = require("Hello").default;
  return <Hello />;
}
Greetings();
```

Examples of **correct** code for this rule:

```jsx
//example 1
function foo() {
  var App;
  var bar = render(<App />);
  return bar;
}
foo();

//example 2
var App;
render(<App />);

//example 3
var a = 1;
render(<img src={a} />);

//example 4
var App;
function f() {
  return <App />;
}
f();

//example 5
var App;
<App.Hello />;

//example 6
var App;
<App:Hello />;

//example 7
class HelloMessage {}
<HelloMessage />;

//example 8
class HelloMessage {
  render() {
    var HelloMessage = <div>Hello</div>;
    return HelloMessage;
  }
}
<HelloMessage />;

//example 9
function foo() {
  var App = { Foo: { Bar: {} } };
  var bar = render(<App.Foo.Bar />);
  return bar;
}
foo();

//example 10
function foo() {
  var App = { Foo: { Bar: { Baz: {} } } };
  var bar = render(<App.Foo.Bar.Baz />);
  return bar;
}
foo();
```
