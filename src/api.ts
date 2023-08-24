import { join } from "std/path/mod.ts";
import {
  API_AUTH_ERR_TOL,
  FC_API_KEY,
  FC_API_VERSION,
  FC_BASE_URL,
} from "$app/src/constants.ts";

export async function fetchAll(): Promise<unknown> {
  const urlLatest = join(FC_BASE_URL, FC_API_VERSION, "latest");

  try {
    const res = await fetch(urlLatest, {
      headers: {
        "apikey": FC_API_KEY,
      },
    });

    return await res.json();
  } catch (err) {
    console.error("Error on `fetch`", err);
  }
}

export async function fetchAvailableCurrencies(): Promise<
  string[] | null
> {
  const urlCurrencies = join(FC_BASE_URL, FC_API_VERSION, "currencies");

  try {
    let tol = 0;
    do {
      ++tol;

      const res = await fetch(urlCurrencies, {
        headers: {
          "apikey": FC_API_KEY,
        },
      });

      try {
        const json = await res.json();
        if (Object.hasOwn(json, "data")) {
          return Object.keys(json.data);
        }
      } catch (err) {
        console.error("Error on json", err);
        return null;
      }
    } while (tol <= API_AUTH_ERR_TOL);

    return null;
  } catch (err) {
    console.error("Error on `fetch`", err);
    return null;
  }
}
