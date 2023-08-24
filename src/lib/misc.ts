export async function waitForKeyPressed(): Promise<string> {
  const charBuffer = new Uint8Array(1);

  await Deno.stdin.read(charBuffer);

  return new TextDecoder().decode(charBuffer);
}
