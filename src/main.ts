import { askCurrencyPairs } from "./inquirer.ts";
import { showHeader } from "./lib/header.ts";
import { askRetry } from "./inquirer.ts";
import { fetchConversion } from "./api.ts";

export async function main() {
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
