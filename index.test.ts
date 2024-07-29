import postcss from "postcss";
import plugin from ".";

async function run(input: string, output: string, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });

  expect(result.css).toEqual(output);
  // expect(result.warnings().length).toEqual(0);
}

test("removes flex gap", async () => {
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
  // const output = `
  // a {
  //   display: flex;
  //   gap: 10px;
  // }`;

  await run(input, output, {});
});
