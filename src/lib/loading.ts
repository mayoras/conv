import ora from "npm:ora";

export function startLoading(msg = "Loading..."): ora.Ora {
  return ora(msg).start();
}

export function successLoading(
  spinner: ora.Ora,
  msg = "Success ✅",
): void {
  spinner.succeed(msg);
}

export function failLoading(spinner: ora.Ora, msg = "Failed ❌"): void {
  spinner.fail(msg);
}
