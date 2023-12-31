import { YargsInstance } from "https://deno.land/x/yargs@v17.7.2-deno/build/lib/yargs-factory.js";
import { Arguments } from "https://deno.land/x/yargs@v17.7.2-deno/deno-types.ts";
import { fetchConversion } from "./api.ts";
import { logError } from "./lib/misc.ts";

function optionIsValid(opt: unknown): boolean {
  return (opt !== undefined && opt !== "" && opt !== null);
}

export async function dispatchArgs(
  args: Arguments,
  ya: YargsInstance,
): Promise<{
  from: string;
  to: string;
  conv: string | null;
}> {
  if (optionIsValid(args.from) && !optionIsValid(args.to)) {
    logError("Cannot make a conversion with `to` currency undefined.");
    ya.showHelp();
    Deno.exit(1);
  }

  const from = (args.from as string).toUpperCase();
  const to = (args.to as string).toUpperCase();

  const conv = await fetchConversion(from, to);
  return {
    from,
    to,
    conv,
  };
}
