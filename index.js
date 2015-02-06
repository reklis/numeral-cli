#!/usr/bin/env node

/*global require, process */

(function () {
  'use strict';

  var
    fs = require('fs'),
    path = require('path'),
    yargs = require('yargs'),
    eventstream = require('event-stream'),
    numeral = require('numeral'),
    argv, input, output, use_separator = false
  ;

  function iterator (data) {
    if (!data.length) {
      return;
    }

    var
      num = ''+data,
      formatted = numeral(num).format(argv.f)
    ;

    if (use_separator) {
      formatted = argv.s + formatted;
    }

    use_separator = true;

    /*jshint validthis: true */
    this.emit('data', formatted);
  }

  function finalizer () {
    output.write('\n');
  }

  function main () {
    yargs = yargs
      .usage('Usage: $0 -i [inputfile] -o [outputfile] -f [format] -s [separator]')
      .option('f', {
        alias: 'format',
        default: ''
      })
      .option('i', {
        alias: 'input',
        default: 'stdin'
      })
      .option('o', {
        alias: 'output',
        default: 'stdout'
      })
      .option('s', {
        alias: 'separator',
        default: '\n'
      })
    ;

    argv = yargs.argv;

    if (argv.h) {
      console.log(yargs.help());
      process.exit();
    }

    if (argv.s === true) {
      argv.s = '';
    }

    input = ('stdin' === argv.i)
      ? process.stdin
      : fs.createReadStream(path.normalize(argv.i))
    ;

    output = ('stdout' === argv.o)
      ? process.stdout
      : fs.createWriteStream(path.normalize(argv.o))
    ;

    input
      .pipe(eventstream.split())
      .pipe(eventstream.through(iterator, finalizer))
      .pipe(output)
    ;

  }

  main();

}());