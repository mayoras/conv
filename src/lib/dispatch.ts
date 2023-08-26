import { YargsInstance } from "https://deno.land/x/yargs@v17.7.2-deno/build/lib/yargs-factory.js";
import { Arguments } from "https://deno.land/x/yargs@v17.7.2-deno/deno-types.ts";
import { fetchConversion } from "../api.ts";

export async function dispatchArgs(
  args: Arguments,
  ya: YargsInstance,
): Promise<{
  from: string;
  to: string;
  conv: string | null;
}> {
  if (args.from !== undefined && args.to === undefined) {
    ya.showHelp();
    console.error("Cannot make a conversion with `to` currency undefined");
    Deno.exit(1);
  }

  const from = args.from as string;
  const to = args.to as string;

  const conv = await fetchConversion(from.toUpperCase(), to.toUpperCase());
  return {
    from,
    to,
    conv,
  };
}
