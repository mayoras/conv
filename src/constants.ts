import { load } from "std/dotenv/mod.ts";

const ENV = await load();

export const FC_BASE_URL = ENV["FC_BASE_URL"];
export const FC_API_VERSION = ENV["FC_API_VERSION"];
export const FC_API_KEY = ENV["FC_API_KEY"];

// TODO: put a list of all currencies available
export const CURRENCY_CODES: string[] = [
  "EUR",
  "USD",
  "GBP",
  "JPY",
  "CHF",
  "CNY",
  "CAD",
];
