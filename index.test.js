const postcss = require("postcss");
const { equal } = require("node:assert");
const { test } = require("node:test");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test("does something", async () => {
  const input = `
  a {
    display: flex;
    gap: 10px;
  }`;
  const output = `
  a {
    display: flex;
  }
  a:not(:last-of-type) {
    margin-right: 10px;
  }`;

  await run(input, output, {});
});
