# numeral-cli

command line interface to the awesome numeral.js


### installation

    npm i -g numeral-cli


### usage

    Usage: numeral -i [inputfile] -o [outputfile] -f [format] -s [separator]

    Options:
      -f, --format     [default: ""]
      -i, --input      [default: "stdin"]
      -o, --output     [default: "stdout"]
      -s, --separator  [default: "\n"]


### examples

    # default formatting is commas, separated by new lines
    echo '123123123123' | numeral
    123,123,123,123

    # money format
    echo '1111.333333' | numeral -f '$,.00'
    $1,111.33

    # print files sizes in bytes
    ls -l | awk '{print $5}' | numeral -f b

    # using tab as a custom separator
    ls -l | awk '{print $5}' | numeral -f k -s $'\t'

    # chaining with json, underscore, and jshon
    tail -q -n 1 nc.log mn.log or.log | json -g | underscore pluck total | jshon -a -u | numeral
