/**
 * Riak command option router.
 *
 * @Author: tim.tang
 */
var riakManager = require('../lib/riakManager'),
    constants = require('../utils/constants'),
    fs = require('fs'),
    printer = require('../utils/logPrinter'),
    _ = require('underscore'),
    util = require('util');


var RiakOptionRouter = function RiakOptionRouter(){};

_.extend(RiakOptionRouter.prototype, {
    dispatch: function(argv){
        handleOption(argv);
    }
});

function handleOption(argv){
    switch(argv.m){
        case constants.METHOD_POST:
            if(_.isEqual(argv.d, constants.DEFAULT_OPT) && _.isEqual(argv.f, constants.DEFAULT_OPT)){
                printer.printString('[Error] - JSON data not specified with -d or -f param.', true);
                return;
            }
            doSave(argv);
            break;

        case constants.METHOD_GET:
            doGet(argv);
            break;

        case constants.METHOD_PUT:
            if(_.isEqual(argv.d, constants.DEFAULT_OPT) && _.isEqual(argv.f, constants.DEFAULT_OPT)){
                printer.printString('[Error] - JSON data not specified with -d or -f param.', true);
                return;
            }
            doUpdate(argv);
            break;

        case constants.METHOD_DELETE:
            doDelete(argv);
            break;

        case constants.METHOD_KEYS:
            doGetKeys(argv);
            break;

        case constants.METHOD_COUNT:
            countBucket(argv);
            break;

        case constants.METHOD_BUCKETS:
            getAllBuckets(argv);
            break;

        default:
            console.log(util.format('The method::%s not supported.',method));
    }
}

function getAllBuckets(){
    riakManager.allBuckets(function(reply){
        printer.printArray(reply);
    });
}

function countBucket(argv){
    riakManager.count(argv.b, function(reply){
        printer.printString(reply.toString());
    });
}

function doGetKeys(argv){
    riakManager.keys(argv.b, function(reply){
        printer.printArray(reply);
    });
}

function doDelete(argv){
    riakManager.remove(argv.b, argv.k, function(reply){
        if(reply){
            printer.printString('Delete success.', false)
        }
    });
}

function doSave(argv){
    var riakData =  fetchRiakData(argv);
    if(_.isNull(riakData)){
        return;
    }
    riakManager.save(argv.b, argv.k, riakData , function(reply){
            if(reply){
                printer.printString('Save success!', false);
            }
        });
}

function doUpdate(argv){
    var riakData =  fetchRiakData(argv);
    if(_.isNull(riakData)){
        return;
    }
    riakManager.get(argv.b, argv.k, function(err, reply, meta){
        if(err && _.isEqual(reply.statusCode, 404)){
            printer.printString(util.format('[Error] - %s',err.message), true);
            return;
        }
        riakManager.update(argv.b, argv.k, fetchRiakData(argv), meta, function(reply){
            if(reply){
                printer.printString('Update success!', false);
            }
        });
    });
}

function doGet(argv){
    if(_.isEqual(argv.k, constants.DEFAULT_OPT)){
        riakManager.bucket(argv.b, function(reply){
            printer.printString(JSON.stringify(reply), false);
        });
    }else{
        riakManager.get(argv.b, argv.k, function(err, reply, meta){
            if(err){
                printer.printString(util.format('[Error] - %s',err.message), true);
            }else {
                console.log(meta);
                console.log('--- \n');
                if(_.isEqual(meta.statusCode,300)){
                    console.log(reply);
                    printer.printString('[Error] - Sibling confliction!', true);
                }else{
                    printer.printJSON(reply);
                }
            }
        });
    }
}

function fetchRiakData(argv){
    if(!_.isEqual(argv.f, constants.DEFAULT_OPT)){
        fs.exists(argv.f, function(isExists){
           if(!isExists){
               return printer.printString(util.format('Specified json data file -> %s not exists.', argv.f));
           }
           return JSON.parse(fs.readFileSync(argv.f, 'UTF-8'));
        });
    }

    if(!_.isEqual(argv.d, constants.DEFAULT_OPT)){
        return argv.d;
    }
    return null;
}


var riakOptionRouter = new RiakOptionRouter();

/* Pulbic riak option router */
module.exports = riakOptionRouter;
