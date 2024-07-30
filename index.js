module.exports = function () {
  return {
    postcssPlugin: "postcss-polyfill-flex-gap",

    Root(root) {
      root.nodes.forEach((node) => {
        if (node.type !== "rule") return;

        const rule = node;
        const { selector } = rule;
        const { css } = rule.source ? rule.source.input : { css: "" };
        const isFlex = css.includes("display: flex");
        const isColumn = css.includes("flex-direction: column");
        const isWrap = css.includes("flex-wrap: wrap");
        const props = ["gap", "row-gap", "column-gap"];

        rule.nodes.forEach((node) => {
          if (node.type !== "decl" || !isFlex || !props.includes(node.prop)) {
            return;
          }

          const declaration = node;
          const { value, prop } = declaration;
          const marginRight = { prop: "margin-right", value };
          const marginBottom = { prop: "margin-bottom", value };

          declaration.remove();

          const clone = rule.cloneAfter({
            selector: `${selector}:not(:last-child)`,
            nodes: [],
          });

          if (prop === "row-gap") {
            clone.append(marginRight);
            return;
          }

          if (prop === "column-gap") {
            clone.append(marginBottom);
            return;
          }

          if (isWrap) {
            clone.append(marginBottom, marginRight);
            return;
          }

          clone.append(isColumn ? marginBottom : marginRight);
        });
      });
    },
  };
};

module.exports.postcss = true;
