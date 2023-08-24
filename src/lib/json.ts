export function isJSON(obj: unknown) {
  try {
    JSON.stringify(obj);
    return true;
  } catch (_err) {
    return false;
  }
}
