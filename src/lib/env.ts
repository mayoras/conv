export const DEFAULT_FC_BASE_URL = "https://api.freecurrencyapi.com";
export const DEFAULT_FC_API_VERSION = "v1";

export function loadEnvs() {
  const ENV: Record<string, string> = {
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
