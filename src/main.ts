import yargs from "https://deno.land/x/yargs@v17.7.2-deno/deno.ts";
import { Arguments } from "https://deno.land/x/yargs@v17.7.2-deno/deno-types.ts";
import { askCurrencyPairs } from "./inquirer.ts";
import { showHeader } from "./lib/header.ts";
import { askRetry } from "./inquirer.ts";
import { fetchConversion } from "./api.ts";
import { VERSION } from "./constants.ts";
import { dispatchArgs } from "./lib/dispatch.ts";
import { listAllCurrencies } from "./lib/commands/list.ts";
import { logWarning } from "./lib/misc.ts";

const outputConversion = (
  from: string,
  to: string,
  conv: string | null,
): boolean => {
  if (conv === null) {
    console.log("There was an error. Retrying ⏪");
    return false;
  }

  console.log(`${from} = ${conv} ${to} 💱`);
  return true;
};

export async function main(args: string[]) {
  if (args.length === 0) {
    showHeader();

    let retry = false;
    do {
      const pair = await askCurrencyPairs();

      if (pair === null) {
        return;
      }

      const { from, to } = pair;

      const fromToConversion = await fetchConversion(from, to);

      if (!outputConversion(from, to, fromToConversion)) {
        continue;
      }

      retry = await askRetry();
    } while (retry);

    console.log("Bye 👋");
  } else {
    const ya = await yargs(Deno.args)
      .usage("Usage: $0 [COMMAND|-f [string] -t [string]]")
      .command(
        "list",
        "lists the currencies available",
        {},
        async (_argv: Arguments) => await listAllCurrencies(),
      )
      .option("from", {
        alias: "f",
        type: "string",
        describe: "The currency from which make the conversion.",
        default: "EUR",
      })
      .option("to", {
        alias: "t",
        type: "string",
        describe: "The currency to convert.",
      })
      .check((argv: Arguments, _options: never) => {
        const listCmd = argv._.find((cmd) => cmd === "list") !== undefined;

        if (listCmd && Deno.args.length > 1) {
          throw "Bad Arguments";
        } else {
          return true;
        }
      })
      .check((_argv: Arguments, _options: never) => {
        const userFrom = Deno.args.find((opt) =>
          opt.includes("--from") || opt.includes("-f")
        );

        // if user did not specified from currency
        if (userFrom === undefined) {
          logWarning("Using EUR as default from currency.");
        }

        return true;
      })
      .version(VERSION)
      .help("help")
      .alias("h", "help")
      .showHelpOnFail(true)
      .strict();
    ya.$0 = "conv";
    const argsParsed: Arguments = ya.parse();

    // console.log(argsParsed);
    const [from, to, conv] = await dispatchArgs(argsParsed, ya);

    outputConversion(from, to, conv);
  }
}
