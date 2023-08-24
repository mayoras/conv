import chalk from "npm:chalk";
import clear from "npm:clear";
import figlet from "npm:figlet";

import { askCurrencyPairs } from "./inquirer.ts";

async function waitForKeyPressed(): Promise<string> {
  const charBuffer = new Uint8Array(1);

  await Deno.stdin.read(charBuffer);

  return new TextDecoder().decode(charBuffer);
}

async function main() {
  clear();

  console.log(
    chalk.yellow(
      figlet.textSync("$Conv$", { horizontalLayout: "full" }),
    ),
  );

  const pair = await askCurrencyPairs();

  if (pair === null) {
    return;
  }

  const { from, to } = pair;
  console.log(from, to);

  console.log(await waitForKeyPressed());
}

main();
