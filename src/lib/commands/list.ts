import { fetchAvailableCurrencies } from "../../api.ts";

const NUM_COLUMNS = 3;

export async function listAllCurrencies() {
  const currencies = await fetchAvailableCurrencies();

  if (currencies === null) {
    // throw new Error("Could not fetch currencies.");
    console.error("Could not fetch currencies.");
    Deno.exit(1);
  }

  const numRows = Math.ceil(currencies.length / NUM_COLUMNS);

  for (let i = 0; i < numRows; i++) {
    let row = "";
    for (let j = i; j < currencies.length; j += numRows) {
      row += currencies[j].padEnd(15, " ");
    }
    console.log(row);
  }

  Deno.exit(0);
}
