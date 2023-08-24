import { join } from "std/path/mod.ts";
import { FC_API_KEY, FC_API_VERSION, FC_BASE_URL } from "$app/src/constants.ts";

export async function fetchAll(): Promise<unknown> {
  const url = join(FC_BASE_URL, FC_API_VERSION);

  try {
    const res = await fetch(url, {
      headers: {
        "apikey": FC_API_KEY,
      },
    });

    return await res.json();
  } catch (err) {
    console.error("Error on `fetch`", err);
  }
}
