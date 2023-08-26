import { CURRENCY_CODES } from "../../constants.ts";

const NUM_COLUMNS = 3;

export function listAllCurrencies() {
  if (CURRENCY_CODES.length === 0) {
    // throw new Error("Could not fetch currencies.");
    console.error("Could not fetch currencies.");
    Deno.exit(1);
  }

  const numRows = Math.ceil(CURRENCY_CODES.length / NUM_COLUMNS);

  for (let i = 0; i < numRows; i++) {
    let row = "";
    for (let j = i; j < CURRENCY_CODES.length; j += numRows) {
      row += CURRENCY_CODES[j].padEnd(15, " ");
    }
    console.log(row);
  }

  Deno.exit(0);
}
