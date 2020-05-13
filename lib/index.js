/**
 * @fileoverview ESLint integration with TeddyTags
 * @author Pranav Karawale
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
  recommended: {
    rules: {
      "@teddytags/jsx-vars": 1,
      "@teddytags/jsx-pragma": 1,
    },
  },
};
