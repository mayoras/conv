import * as _constants from "./src/constants.ts";
import { main } from "./src/main.ts";

try {
  await main(Deno.args);
  Deno.exit(0);
} catch (_err) {
  Deno.exit(1);
}
