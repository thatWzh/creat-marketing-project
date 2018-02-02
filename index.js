#!/usr/bin/env node
const app = require('./bin/app.js');
const program = require('commander');
const packageJson = require('./package.json')

function image(url) {
    app.image(url);
}

program.version(packageJson.version);
program.option('-u,--url <value>','url of image dictionary',image);
program.command('init')
    .description('init project dictionary')
    .action(function () {
        app.init();
    });
program.command('make')
    .description('create htmls by model')
    .action(function () {
        app.make();
    });
program.command('remake')
    .description('refresh htmls by model')
    .action(function () {
        app.remake();
    });
program.parse(process.argv);