import { YargsInstance } from "https://deno.land/x/yargs@v17.7.2-deno/build/lib/yargs-factory.js";
import { Arguments } from "https://deno.land/x/yargs@v17.7.2-deno/deno-types.ts";
import { fetchConversion } from "../api.ts";

export async function dispatchArgs(args: Arguments, ya: YargsInstance) {
  const from = args.from;
  const to = args.to;

  if (from !== undefined && to === undefined) {
    ya.showHelp();
    console.error("Cannot make a conversion with `to` currency undefined");
    Deno.exit(1);
  }

  const conv = await fetchConversion(from, to);
  return [from, to, conv];
}
