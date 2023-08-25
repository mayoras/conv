import { fetchAvailableCurrencies } from "./api.ts";
import { loadEnvs } from "./lib/env.ts";

export const ENV = loadEnvs();

export const FC_BASE_URL = ENV["FC_BASE_URL"];
export const FC_API_VERSION = ENV["FC_API_VERSION"];
export const FC_API_KEY = ENV["FC_API_KEY"];

export const API_AUTH_ERR_TOL = 5;

// INITIALIZATION DEAD ZONE
export const CURRENCY_CODES: string[] = (await fetchAvailableCurrencies()) ||
  [];
