/**
 * Integration testing cases for riak manager.
 *
 * @Author: tim.tang
 *
 */

var riakManager = require('../lib/riakManager'),
    util = require('util'),
    should = require('should');

describe('riak manager integration tests', function(){
    beforeEach(function(done){
       console.log('testing start.');
       done();
    });

    afterEach(function(done){
        console.log('testing done.');
        done();
    });

    it('save an riak entry', function(done){
        riakManager.save('riak-cli-test', 'tim.tang@xplusz.com', {name: 'tim.tang'}, function(reply){
            reply.should.be.true;
            done();
        });
    });

    it('list buckets', function(done){
        riakManager.allBuckets(function(reply){
            reply.should.include('riak-cli-test');
            done();
        });
    });
});
