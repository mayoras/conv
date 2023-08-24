import { join } from "std/path/mod.ts";
import { FC_API_KEY, FC_API_VERSION, FC_BASE_URL } from "$app/src/constants.ts";

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

export async function fetchAvailableCurrencies(): Promise<string[] | null> {
  const urlCurrencies = join(FC_BASE_URL, FC_API_VERSION, "currencies");

  const res = await fetch(urlCurrencies, {
    headers: {
      "apikey": FC_API_KEY,
    },
  });

  const json = res.json()
    .then((data) => {
      return Object.keys(data.data);
    })
    .catch((err) => {
      console.error("Error on json", err);
      return null;
    });

  return json;
}
