import { load } from "std/dotenv/mod.ts";
import { fetchAvailableCurrencies } from "$app/src/api.ts";

const ENV = await load();

export const FC_BASE_URL = ENV["FC_BASE_URL"];
export const FC_API_VERSION = ENV["FC_API_VERSION"];
export const FC_API_KEY = ENV["FC_API_KEY"];

export const API_AUTH_ERR_TOL = 5;

// INITIALIZATION DEAD ZONE
export const CURRENCY_CODES: string[] = (await fetchAvailableCurrencies()) ||
  [];
