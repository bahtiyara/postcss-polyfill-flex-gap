import postcss from "postcss";

const plugin = require("./index.ts");

async function run(input: string, output: string, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });

  expect(result.css).toEqual(output);
}

test("removes flex gap", async () => {
  const input = `
  .list {
    display: flex;
    gap: 10px;
  }
  .item {
    display: flex;
    background-color: red;
  }`;
  const output = `
  .list {
    display: flex;
  }
  .list > *:not(:last-child) {
    margin-right: 10px;
  }
  .item {
    display: flex;
    background-color: red;
  }`;

  const input2 = `
    .container {
      display: flex;
      gap: 4px;
      position: relative;
    }
  `;
  const output2 = `
    .container {
      display: flex;
      position: relative;
    }
    .container > *:not(:last-child) {
      margin-right: 4px;
    }
  `;

  await run(input, output, {});
  await run(input2, output2, {});
});
