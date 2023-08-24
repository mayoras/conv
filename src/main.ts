import { askCurrencyPairs } from "$app/src/inquirer.ts";
import { showHeader } from "$app/src/lib/header.ts";
import { askRetry } from "$app/src/inquirer.ts";
import { fetchConversion } from "$app/src/api.ts";

async function main() {
  showHeader();

  let retry = false;
  do {
    const pair = await askCurrencyPairs();

    if (pair === null) {
      return;
    }

    const { from, to } = pair;

    const fromToConversion = await fetchConversion(from, to);

    if (fromToConversion === null) {
      console.log("There was an error. Retrying ⏪");
      continue;
    }

    console.log(`${from} = ${fromToConversion} ${to} 💱`);

    retry = await askRetry();
  } while (retry);

  console.log("Bye 👋");
}

await main();
