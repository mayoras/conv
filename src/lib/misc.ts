import chalk from "npm:chalk";

export async function waitForEnter(): Promise<string> {
  const charBuffer = new Uint8Array(1);

  await Deno.stdin.read(charBuffer);

  return new TextDecoder().decode(charBuffer);
}

export function logWarning(msg: string): void {
  console.warn(chalk.yellow.bold("WARNING: ") + msg);
}
