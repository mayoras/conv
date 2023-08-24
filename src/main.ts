import { askCurrencyPairs } from "./inquirer.ts";
import { showHeader } from "$app/src/lib/header.ts";
import { waitForEnter } from "$app/src/lib/misc.ts";
import { fetchAll } from "$app/src/api.ts";

async function main() {
  showHeader();

  const pair = await askCurrencyPairs();

  if (pair === null) {
    return;
  }

  const { from, to } = pair;
  console.log(from, to);

  console.log(await fetchAll());

  console.log(await waitForEnter());
}

main();
