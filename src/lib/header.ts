import chalk from "npm:chalk";
import figlet from "npm:figlet";

export function showHeader(): void {
  console.log(
    chalk.yellow(
      figlet.textSync("$Conv$", { horizontalLayout: "full" }),
    ),
  );
}
