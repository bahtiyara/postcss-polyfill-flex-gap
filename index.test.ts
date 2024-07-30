import postcss from "postcss";
import plugin from ".";

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
  // const output = `
  // a {
  //   display: flex;
  //   gap: 10px;
  // }`;

  await run(input, output, {});
});
