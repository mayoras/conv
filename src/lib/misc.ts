export async function waitForEnter(): Promise<string> {
  const charBuffer = new Uint8Array(1);

  await Deno.stdin.read(charBuffer);

  return new TextDecoder().decode(charBuffer);
}
