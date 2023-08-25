// @deno-types="npm:@types/inquirer"
import inquirer, { QuestionCollection } from "npm:inquirer";
import { CURRENCY_CODES } from "./constants.ts";

type CurrencyPairType = { from: string; to: string };

export async function askCurrencyPairs(): Promise<CurrencyPairType | null> {
  const questions: QuestionCollection = [
    {
      name: "from",
      type: "list",
      message: "Select 'from' currency:",
      choices: CURRENCY_CODES,
    },
    {
      name: "to",
      type: "list",
      message: "Select 'to' currency:",
      choices: ({ from }) => {
        if (from === undefined) {
          throw new Error("User did not choose the from currency.");
        }
        return CURRENCY_CODES.filter((curr) => curr !== from);
      },
    },
  ];

  try {
    const answers = await inquirer.prompt(questions);

    if (answers === undefined) {
      throw new Error("Answers are undefined");
    }

    return answers as CurrencyPairType;
  } catch (err) {
    console.error("Error on inquirer.prompt", err);
    return null;
  }
}

export async function askRetry(): Promise<boolean> {
  const q: QuestionCollection = [{
    name: "retry",
    type: "confirm",
    message: "Retry?",
  }];

  try {
    const { retry } = await inquirer.prompt(q);

    return retry;
  } catch (err) {
    // finish if err
    console.error("Error on inquirer.prompt", err);
    return false;
  }
}
