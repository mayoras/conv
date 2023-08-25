import { load } from "https://deno.land/std@0.200.0/dotenv/mod.ts";

export const DEFAULT_FC_BASE_URL = "https://api.freecurrencyapi.com";
export const DEFAULT_FC_API_VERSION = "v1";

export async function loadEnvs() {
  let ENV = await load();

  if (Object.keys(ENV).length > 0) {
    console.log("there is an env file");
    return ENV;
  } else {
    console.log("there is not an env file");
    ENV = {
      FC_BASE_URL: DEFAULT_FC_BASE_URL,
      FC_API_VERSION: DEFAULT_FC_API_VERSION,
    };

    // set the API key
    if (
      Deno.env.has("FC_API_KEY") && Deno.env.get("FC_API_KEY") !== undefined &&
      Deno.env.get("FC_API_KEY") !== ""
    ) {
      ENV["FC_API_KEY"] = Deno.env.get("FC_API_KEY")!;
    } else {
      const message =
        "FC_API_KEY have not been found.\nPlease provide an API key exporting an FC_API_KEY environment variable.\nFollow instructions on https://github.com/mayoras/conv#api-usage for further information.";
      console.error(message);
      Deno.exit(1);
    }

    return ENV;
  }
}
