# 🎄 Advent of Code 2020 🎄

My (not that optimized, but hopefully working) solutions for the [Advent of Code 2020](https://adventofcode.com/2020).

## Run a solution

To run a solution for one of the puzzles execute:

```bash
# this would run the puzzle in src/01
npm run puzzle 01
```

## Run tests

To continuously run the tests while developing a puzzle solution, run:

```bash
# this would run the tests in src/01
npm run dev 01
```

The tests are run with [AVA](https://github.com/avajs/ava).

## Bootstrap daily puzzle

To automatically fetch the puzzle input and create the scaffold, run:

```bash
npm run bootstrap 08 epic-solution
```

The bootstrap script

- fetches the puzzle input by looking into the chrome cookie jar and using the stored session token
- copies scaffolding files from the `00` folder
- replaces name placeholders
