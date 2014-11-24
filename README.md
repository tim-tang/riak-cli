Riak Command Line Tool With NodeJS.
========

- There is better solution, please refer -> [Contact](http://metadave.github.io/contact/)
- Use Riak http api with curl to query riak is really annoying! So the tool born. Cheers!
- This is a Riak terminal query tool, provides basic POST/PUT/DELETE/GET etc methods.

[![Build Status](https://travis-ci.org/tim-tang/riak-cli.svg)](https://travis-ci.org/tim-tang/riak-cli)

## Installation

    $ brew install node
    $ git clone https://github.com/tim-tang/riak-cli 
    $ cd riak-cli && npm install

> Export *RIAK_CLI_HOME* and bin directory to you system path.


## Usage

- Create an riak entry.

    ```
    $ riak-cli -m post -b bucket-name -k riak-key -d data
    $ riak-cli -m post -b bucket-name -k riak-key -f ${YOUR_JSON_DATA_DIR}/sample.json
    ```

- Update an riak entry

    ```
    $ riak-cli -m put -b bucket-name -k riak-key -d data
    $ riak-cli -m put -b bucket-name -k riak-key -f ${YOUR_JSON_DATA_DIR}/sample.json
    ```

- Get riak entry.

    ```
    $ riak-cli -m get -b bucket-name -k riak-key
    ```

- Get specified bucket properties.

    ```
    $ riak-cli -m get -b bucket-name
    ```

- Remove riak entry.

    ```
    $ riak-cli -m delete -b bucket-name -k riak-key
    ```

- Get all keys in specified bucket.
    
    ```
    $ riak-cli -m keys -b bucket-name
    ```

- Get all buckets.
    
    ```
    $ riak-cli -m buckets
    ```

- Get the total count of riak entry in specified bucket.

    ```
    $ riak-cli -m count -b bucket-name

- Get help info.

    ```
    $ riak-cli -help
    ```

> Please modify _conf/riak-conf.json_ to change riak client configurations.

## Contribution

- Run tests
    
    ```
    $ make test
    ```

