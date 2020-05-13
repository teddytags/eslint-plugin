const JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;
const JS_IDENTIFIER_REGEX = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;
function getFromContext(context) {
  let pragma = "teddy";
  const sourceCode = context.getSourceCode();
  const pragmaNode = sourceCode
    .getAllComments()
    .find((node) => JSX_ANNOTATION_REGEX.test(node.value))
  if (pragmaNode) {
    const matches = JSX_ANNOTATION_REGEX.exec(pragmaNode.value);
    pragma = matches[1].split(".")[0];
  } else if (context.settings.teddytags && context.settings.teddytags.pragma) {
    pragma = context.settings.teddytags.pragma;
  }

  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`Pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}
module.exports = { getFromContext };
