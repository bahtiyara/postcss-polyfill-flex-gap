import type { Processor, Plugin } from "postcss";

module.exports = function (): Plugin | Processor {
  return {
    postcssPlugin: "postcss-polyfill-flex-gap",

    Root(root) {
      root.nodes.forEach((node) => {
        if (node.type !== "rule") return;

        const rule = node;
        const { selector } = rule;
        const props = ["gap", "row-gap", "column-gap"];
        let isFlex = false;
        let isColumn = false;
        let isWrap = false;

        rule.walkDecls((decl) => {
          if (decl.prop === "display" && decl.value === "flex") {
            isFlex = true;
          }
          if (decl.prop === "flex-direction" && decl.value === "column") {
            isColumn = true;
          }
          if (decl.prop === "flex-wrap" && decl.value === "wrap") {
            isWrap = true;
          }
        });

        rule.nodes.forEach((node) => {
          if (node.type !== "decl" || !isFlex || !props.includes(node.prop)) {
            return;
          }

          const declaration = node;
          const { value, prop } = declaration;
          const marginRight = { prop: "margin-right", value };
          const marginBottom = { prop: "margin-bottom", value };

          const clone = rule.cloneAfter({
            selector: `${selector} > *:not(:last-child)`,
            nodes: [],
          });

          if (isWrap) return;

          declaration.remove();

          if (prop === "row-gap") {
            clone.append(marginRight);
            return;
          }

          if (prop === "column-gap") {
            clone.append(marginBottom);
            return;
          }

          clone.append(isColumn ? marginBottom : marginRight);
        });
      });
    },
  };
};

module.exports.postcss = true;
