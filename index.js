#!/usr/bin/env node
const { program } = require("./cli/commands/commands");

program.parse(process.argv);
