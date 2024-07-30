import { Processor, Plugin } from "postcss";

export default function (_options = {}): Plugin | Processor {
  return {
    postcssPlugin: "postcss-polyfill-flex-gap",

    Root(root, _postcss) {
      root.nodes.forEach((node) => {
        if (node.type !== "rule") return;

        const rule = node;
        const { selector } = rule;
        const { css } = rule.source?.input ?? {};
        const isFlex = css?.includes("display: flex");
        const isColumn = css?.includes("flex-direction: column");
        const isWrap = css?.includes("flex-wrap: wrap");
        const props = ["gap", "row-gap", "column-gap"];

        rule.nodes.forEach((node) => {
          if (node.type !== "decl" || !isFlex || !props.includes(node.prop)) {
            return;
          }

          const declaration = node;
          const { value, prop } = declaration;

          declaration.remove();
          const clone = rule.cloneAfter({
            selector: `${selector}:not(:last-child)`,
            nodes: [],
          });
          const marginRight = { prop: "margin-right", value };
          const marginBottom = { prop: "margin-bottom", value };

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
}

export const postcss = true;
