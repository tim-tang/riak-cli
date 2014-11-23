/**
 * Riak common constants.
 *
 * @Author: tim.tang
 */

/**
 * Constants definition.
 *
 * @param {String} key
 * @param {String} value
 */
function define(key, value) {
    Object.defineProperty(exports, key, {
        value: value,
        enumerable: true
    });
}

// ------- Constants For CLI Methods-------------//
define('METHOD_GET', 'get');
define('METHOD_PUT', 'put');
define('METHOD_POST', 'post');
define('METHOD_DELETE', 'delete');
define('METHOD_BUCKETS', 'buckets');
define('METHOD_COUNT', 'count');
define('METHOD_KEYS', 'keys');

// ------------- Constants ---------------------//
define('DEFAULT_OPT', 'default');
