import postcss from "postcss";
import { equal } from "node:assert";
import { test } from "node:test";
import plugin from ".";

async function run(input: string, output: string, opts = {}) {
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
