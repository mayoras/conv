import { join } from "https://deno.land/std@0.200.0/path/mod.ts";
import {
  API_AUTH_ERR_TOL,
  FC_API_KEY,
  FC_API_VERSION,
  FC_BASE_URL,
} from "./constants.ts";
import { failLoading, startLoading, successLoading } from "./lib/loading.ts";

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
  const spinner = startLoading("Fetching currencies 💸...");

  const urlCurrencies = join(FC_BASE_URL, FC_API_VERSION, "currencies");

  try {
    let tol = 0;
    do {
      const res = await fetch(urlCurrencies, {
        headers: {
          "apikey": FC_API_KEY,
        },
      });

      try {
        const json = await res.json();
        if (Object.hasOwn(json, "data")) {
          successLoading(spinner, "Fetched 📥");
          return Object.keys(json.data);
        } else {
          ++tol;
        }
      } catch (err) {
        failLoading(spinner);
        console.error("Error on json", err);
        return null;
      }
    } while (tol <= API_AUTH_ERR_TOL);

    failLoading(spinner);
    return null;
  } catch (err) {
    failLoading(spinner);
    console.error("Error on `fetch` all currencies", err);
    return null;
  }
}

export async function fetchConversion(
  from: string,
  to: string,
): Promise<string | null> {
  const spinner = startLoading("Converting 💱...");

  const base = join(FC_BASE_URL, FC_API_VERSION, "latest");
  const query = `?base_currency=${from}&currencies=${to}`;
  const headers = {
    "apikey": FC_API_KEY,
  };

  const url = base + query;

  let tol = 0;
  do {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers,
      });

      try {
        const json = await res.json();

        if (Object.hasOwn(json, "data")) {
          successLoading(spinner);
          return json.data[to];
        } else {
          ++tol;
        }
      } catch (err) {
        failLoading(spinner);
        console.error("Error on `json`", err);
        return null;
      }
    } catch (err) {
      failLoading(spinner);
      console.error("Error on `fetch` conversion", err);
    }
  } while (tol <= API_AUTH_ERR_TOL);

  failLoading(spinner);
  return null;
}
