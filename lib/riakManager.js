/**
 * Manage all riak operations.
 *
 * @Author tim.tang
 */

var riak= require('riak-js'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    _ = require('underscore');

var RiakManager = function(){
    this.riakClient = makeRiakClient();
};

function makeRiakClient(){
    var riakConf = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../conf/riak-conf.json'), 'UTF-8'));
    riakClient = riak.getClient(riakConf);
    return riakClient;
}

_.extend(RiakManager.prototype, {

    get: function(bucket, key, onResult){
        this.riakClient.get(bucket, key, function(err, reply, meta) {
            handleError(err);
            onResult(err, reply, meta);
        });
    },

    save: function(bucket, key, data, onResult){
        this.riakClient.save(bucket, key, data);
        onResult(true);
    },

    update: function(bucket, key, data, meta, onResult){
        this.riakClient.save(bucket, key, data, meta, function(err, result, meta){
            onResult(true);
        });
    },

    remove: function(bucket, key, onResult){
        this.riakClient.remove(bucket, key);
        onResult(true);
    },

    bucket: function(bucket, onResult){
        this.riakClient.getBucket(bucket, function(err, properties){
            handleError(err);
            onResult(properties);
        });
    },

    keys: function(bucket, onResult){
        var keys = this.riakClient.keys(bucket, {keys: 'stream'});
        var results = [];
        keys.on('keys', function(keys){
           results = results.concat(keys);
        }).on('end', function(){
            onResult(results);
        }).start();
    },

    count: function(bucket, onResult){
       this.riakClient.count(bucket, function(err, reply){
            handleError(err);
            onResult(reply);
        });
    },

    allBuckets: function(onResult){
        this.riakClient.buckets(function(err, reply){
            handleError(err);
            onResult(reply);
        });
    }
});

function handleError(err){
    if(err && err.statusCode != 404){
        console.log(util.format('Riak client got error: %s', err));
    }
}

var riakManager = new RiakManager(),
    riakClient = riakManager.riakClient;

/* Pulbic Riak Manager APIs */
module.exports = riakManager;
