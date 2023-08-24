# conv

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mayoras/conv/blob/main/LICENSE)

CLI for dual-currency conversion made with Typescript and Deno.

## Installation

This project was made with the Deno Javascript/Typescript runtime environment,
so make sure you have Deno installed on your system to install the `conv`. You
can install Deno from https://deno.land/#installation.

```sh
deno install -A -n conv https://deno.land/x/conv/main.ts
```

## Usage

`conv` was made with the well-known NPM package `inquirer` to ask questions to
the user _on the fly_ (when the program is running), so all you need to do is
execute the program and follow the prompt instructions.

```sh
$ conv
   _     ____                            _  
  | |   / ___|   ___    _ __   __   __  | | 
 / __) | |      / _ \  | '_ \  \ \ / / / __)
 \__ \ | |___  | (_) | | | | |  \ V /  \__ \
 (   /  \____|  \___/  |_| |_|   \_/   (   /
  |_|                                   |_| 
? Select 'from' currency: EUR
? Select 'to' currency: USD
EUR = 1.0864957797 USD 💱
? Retry? No
Bye 👋
```

## Options

If you are more of that fast-single-command type of person, you may want to use
the command options available.

- `-f, --from`: Set the _from_ currency, i.e. the base currency.
- `-t, --to`: Set the _to_ currency, i.e. the converted currency.
- `-l, --list-currency`: Lists the currencies available.

> You have to provide for both `-f` and `-t` options its respectives currency
> codes (capitalized, uncapitalized or mixed). You can see the list of
> currencies supported with the `-l` option as seen above.

## Examples

_make examples of CLI interface_

## Contributing

I'd be very thankful if you want to contribute to this repository. The
guidelines are pretty standard and flexible as follows:

1. Fork the repository.
2. Create a branch for the feature or fix you want intend to make.
3. Make your changes and commit them with a clear message describing the
   changes.
4. Push your changes to your forked repository.
5. Make a pull request with the description of your changes.

Also, if you want to just notify a problem or bug, you can freely make an Issue
describing the problem.

## License

This project is licensed under the MIT License - see the
[LICENSE](https://github.com/mayoras/conv/blob/main/LICENSE) file for details.
