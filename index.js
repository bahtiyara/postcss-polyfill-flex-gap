/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  // Work with options here

  return {
    postcssPlugin: "postcss-polyfill-flex-gap",

    Root(root, postcss) {
      console.log("root:", root, "postcss:", postcss);
      // Transform CSS AST here
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;
