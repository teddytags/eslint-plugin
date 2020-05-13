/**
 * @fileoverview Prevent JSX variables to be declared unused
 * @author Pranav Karawale
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Prevent JSX variables to be declared unused",
      category: "Best Practices",
      recommended: true,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [],
  },

  create: function (context) {
    return {
      JSXOpeningElement(node) {
        let name;
        if (node.name.namespace && node.name.namespace.name) {
          // <Foo:Bar>
          name = node.name.namespace.name;
        } else if (node.name.name) {
          // <Foo>
          name = node.name.name;
        } else if (node.name.object) {
          // <Foo...Bar>
          let parent = node.name.object;
          while (parent.object) {
            parent = parent.object;
          }
          name = parent.name;
        } else {
          return;
        }
        context.markVariableAsUsed(name);
      },
    };
  },
};
