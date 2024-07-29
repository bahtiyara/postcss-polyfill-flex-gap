import { Processor, Plugin, Root } from "postcss";

export default function (_options = {}): Plugin | Processor {
  // Work with options here

  return {
    postcssPlugin: "postcss-polyfill-flex-gap",

    Root(root, postcss) {
      findGap(root);
    },

    // Once(root) {
    //   //
    // },

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
}

export const postcss = true;

function findGap(root: Root) {
  root.nodes.forEach((node) => {
    if (node.type === "rule") {
      const rule = node;
      const selector = rule.selector;

      rule.nodes.forEach((node) => {
        if (node.type === "decl") {
          const declaration = node;

          if (declaration.prop === "gap") {
            console.log(">>> selector:", selector);
          }
        }
      });
    }
  });
}
