/**
 * @fileoverview Prevent JSX pragma to be marked as unused
 * @author Pranav Karawale
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const util = require("../util/getpragma");
module.exports = {
  meta: {
    docs: {
      description: "Prevent JSX pragma to be marked as unused",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    const pragma = util.getFromContext(context);
    function handleOpeningElement() {
      context.markVariableAsUsed(pragma);
    }

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      JSXOpeningElement: handleOpeningElement,
      JSXOpeningFragment: handleOpeningElement,
    };
  },
};
