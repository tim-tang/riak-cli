/**
 * Logger printer tool to print readable log info.
 *
 * @Author: tim.tang
 *
 */

var util = require('util'),
    _ = require('underscore'),
    colors = require('colors');

colors.setTheme({
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

var LogPrinter = function LogPrinter() {};

_.extend(LogPrinter.prototype, {

    printArray: function(data) {
        if (!_.isArray(data)) {
            console.log('Result not an array can not print.'.error);
            return;
        }
        var boundary;
        var content;
        _.each(data, function(val, index) {
            boundary = '+';
            content = '| ';
            for (var i = 0; i <= val.length + 1; i++) {
                boundary = boundary.concat('-'.info);
            }
            content = content.concat(val);
            console.log(boundary.concat('+').info);
            console.log(content.concat(' |').info);
        });

        if(!_.isUndefined(boundary)){
            console.log(boundary.concat('+').info);
        }
    },

    printJSON: function(data) {
        var result = '';
        if(_.isObject(data)){
            var json;
            try{
                json = JSON.parse(data);
                result = JSON.stringify(json);
            }catch (ex){
                result = JSON.stringify(data);
            }
        }else{
            result = data;
        }
        var boundary = '+';
        var content = '| ';
        for (var i=0; i <= result.length + 1; i++){
            boundary = boundary.concat('-');
        }
        content = content.concat(result);
        console.log(boundary.concat('+').info);
        console.log(content.concat(' |').info);
        console.log(boundary.concat('+').info);
    },

    printString: function(data, isError){
       if(!_.isString(data)){
        console.log(data)
        return;
       }

       var boundary = '+';
       var content = '| ';
       for(var i=0; i<=data.length; i++){
        boundary = boundary.concat('-');
       }
       content = content.concat(data);
       if(isError){
           console.log(boundary.concat('+').error);
           console.log(content.concat(' |').error);
           console.log(boundary.concat('+').error);
       } else {
           console.log(boundary.concat('+').info);
           console.log(content.concat(' |').info);
           console.log(boundary.concat('+').info);
       }
    }
});

var logPrinter = new LogPrinter();

/* Public log printer */
module.exports = logPrinter;
