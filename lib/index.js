"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcss = void 0;
exports.default = default_1;
function default_1(_options) {
    if (_options === void 0) { _options = {}; }
    return {
        postcssPlugin: "postcss-polyfill-flex-gap",
        Once: function () {
            console.log(">>> Processing started");
        },
        Root: function (root) {
            root.nodes.forEach(function (node) {
                var _a, _b;
                if (node.type !== "rule")
                    return;
                var rule = node;
                var selector = rule.selector;
                var css = ((_b = (_a = rule.source) === null || _a === void 0 ? void 0 : _a.input) !== null && _b !== void 0 ? _b : {}).css;
                var isFlex = css === null || css === void 0 ? void 0 : css.includes("display: flex");
                var isColumn = css === null || css === void 0 ? void 0 : css.includes("flex-direction: column");
                var isWrap = css === null || css === void 0 ? void 0 : css.includes("flex-wrap: wrap");
                var props = ["gap", "row-gap", "column-gap"];
                rule.nodes.forEach(function (node) {
                    if (node.type !== "decl" || !isFlex || !props.includes(node.prop)) {
                        return;
                    }
                    var declaration = node;
                    var value = declaration.value, prop = declaration.prop;
                    var marginRight = { prop: "margin-right", value: value };
                    var marginBottom = { prop: "margin-bottom", value: value };
                    declaration.remove();
                    var clone = rule.cloneAfter({
                        selector: "".concat(selector, ":not(:last-child)"),
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
}
exports.postcss = true;
