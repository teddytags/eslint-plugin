# @teddytags/eslint-plugin

ESLint integration with TeddyTags

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@teddytags/eslint-plugin`:

```
$ npm install @teddytags/eslint-plugin --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `@teddytags/eslint-plugin` globally.

## Usage

Add `@teddytags` to the plugins section of your `.eslintrc` configuration file.

```json
{
  "plugins": ["@teddytags"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "teddytags/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here

  - [jsx-pragma](./docs/rules/jsx-pragma)
  - [jsx-vars](./docs/rules/jsx-vars)
