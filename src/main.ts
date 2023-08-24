import { load } from "std/dotenv/mod.ts";

import { askCurrencyPairs } from "./inquirer.ts";
import { showHeader } from "$app/src/lib/header.ts";
import { waitForKeyPressed } from "$app/src/lib/misc.ts";

async function main() {
  // load env variables
  await load({
    export: true,
  });

  showHeader();

  const pair = await askCurrencyPairs();

  if (pair === null) {
    return;
  }

  const { from, to } = pair;
  console.log(from, to);

  console.log(await waitForKeyPressed());
}

main();
