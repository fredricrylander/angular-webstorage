/**
 * WebStorage Service for AngularJS
 *
 * The webStorage service has both a generic and direct API. The generic
 * API will check for client support and preferred order before altering a
 * specific storage value, trying to degrade gracefully according to a set
 * heuristic. The direct APIs works with either the client's local, session
 * or the module's own in-memory storage engines.
 *
 * The selection heuristics for the generic API is mainly dictated by a set
 * order (defaults to `['local', 'session', 'memory']`.) If the client has no
 * support for the specified storage engine then the service will try to fall
 * back on the next specified engine and so forth.
 *
 * NOTE: The in-memory storage should really be seen as a last resort since
 * all its values will be lost on page reload (somewhat negating the whole
 * idea of client web storage!)
 *
 * If the client does not support local or session web storage the module will
 * try to mimic them by setting cookies on the current document.
 *
 * All errors will be broadcast via the `$rootScope` under a specific name
 * (defaults to: `webStorage.notification.error`.)
 *
 * The service provides the following generic methods:
 *
 * webStorage
 * - isSupported          -- boolean flag indicating client support status (local or session storage)
 * - add(key, value, all) -- [DEPRECATED: use `set`] add a value to storage under the specific key (storage according to 'order')
 * - set(key, value, all) -- add or set a value in storage under the specific key (storage according to 'order')
 * - get(key, all)        -- return the specified value (storage according to 'order')
 * - has(key, all)        -- checks if the given key exists (storage according to 'order')
 * - key(index, all)      -- returns the name of the nth key (storage according to 'order')
 * - length(all)          -- returns the number of items in the key/value store (storage according to 'order')
 * - remove(key, all)     -- remove a key/value pair from storage (storage according to 'order')
 * - clear(all)           -- remove all key/value pairs from storage (storage according to 'order')
 * - errorName(str)       -- get or set the name of the event that is broadcast over the $rootScope on errors
 * - prefix(str)          -- get or set the prefix used for keys while operating on storage values
 * - order(array)         -- get or set the order by which storage models are iterated (defaults to ['local', 'session', 'memory'])
 *
 * It also provides the following direct APIs:
 *
 * webStorage.local
 * - isSupported          -- boolean flag indicating client support status (local storage)
 * - add(key, value)      -- [DEPRECATED: use `set`] add a value to storage under the specific key (local storage)
 * - set(key, value)      -- add or update a value in storage under the specific key (local storage)
 * - get(key)             -- return the specified value (local storage)
 * - has(key)             -- checks if the given key exists (local storage)
 * - key(index)           -- return the name of the nth key (local storage)
 * - length()             -- returns the number of items in storage (local storage)
 * - remove(key)          -- remove a key/value pair from storage (local storage)
 * - clear()              -- remove all key/value pairs from storage (local storage)
 * - isPolyfilled(remove) -- returns `true` if local storage is polyfilled, if `remove` is true then the polyfill is removed (local storage)
 *
 * webStorage.session
 * - isSupported          -- boolean flag indicating client support status (session storage)
 * - add(key, value)      -- [DEPRECATED: use `set`] add a value to storage under the specific key (session storage)
 * - set(key, value)      -- add or set a value in storage under the specific key (session storage)
 * - get(key)             -- return the specified value (session storage)
 * - has(key)             -- checks if the given key exists (session storage)
 * - key(index)           -- return the name of the nth key (session storage)
 * - length()             -- returns the number of items in storage (session storage)
 * - remove(key)          -- remove a key/value pair from storage (session storage)
 * - clear()              -- remove all key/value pairs from storage (session storage)
 * - isPolyfilled(remove) -- returns `true` if session storage is polyfilled, if `remove` is true then the polyfill is removed (session storage)
 *
 * webStorage.memory
 * - isSupported     -- boolean true, the in-memory storage is always supported
 * - add(key, value) -- [DEPRECATED: use `set`] add a value to storage under the specific key (in-memory storage)
 * - set(key, value) -- add or set a value in storage under the specific key (in-memory storage)
 * - get(key)        -- return the specified value (in-memory storage)
 * - has(key)        -- checks if the given key exists (in-memory storage)
 * - key(index)      -- return the name of the nth key (in-memory storage)
 * - length()        -- returns the number of items in storage (in-memory storage)
 * - remove(key)     -- remove a key/value pair from storage (in-memory storage)
 * - clear()         -- remove all key/value pairs from storage (in-memory storage)
 * - isPolyfilled()  -- always returns `false` (in-memory storage)
 *
 *
 * Requirements
 * This module was originally built for AngularJS v1.0.5.
 *
 * Usage
 * Add `webStorageModule` to your app's dependencies. Then inject `webStorage`
 * into any controller that needs to use it, e.g.:
 *
 * <code>
 *     var myApp = angular.module('myApp', ['webStorageModule']);
 *     myApp.controller('myController', function ($scope, webStorage) { ... });
 * </code>
 *
 * @author Fredric Rylander, https://github.com/fredricrylander/angular-webstorage
 * @date 2015-09-01
 * @version 0.14.0
 *
 * @contributor Paulo Cesar (https://github.com/pocesar)
 * @contributor David Chang (https://github.com/hasdavidc)
 * @contributor David Rodriguez (https://github.com/programmerdave)
 * @contributor (https://github.com/jswxwxf)
 * @contributor Jose Andres Ramirez (https://github.com/joanrm20)
 * @contributor (https://github.com/gorjuce)
 * @contributor Sam Blowes (https://github.com/blowsie)
 * @contributor Timothee Moulin (https://github.com/timotheemoulin)
 *
 * The MIT License
 * Copyright (c) 2013-2015 Fredric Rylander
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

 /*
  * Change Log
  * ----------
  * v0.9.0
  * - Initial commit.
  *
  * v0.9.1
  * - Bugfix: removed trailing commas that IE choked on, as reported by
  *   Paulo Cesar (pocesar).
  *
  * v0.9.2
  * - Now using the identity operator instead of equality when comparing
  *   prefixes while clearing storage.
  * - Bugfix: clearSession() is now actually clearing sessionStorage and not
  *   localStorage, as reported by David Chang (hasdavidc).
  *
  * v0.9.3
  * - Bugfix: now using the `errorName` constant when broadcasting errors
  *   over the `$rootScope`.
  *
  * v0.9.4
  * - Added strict mode.
  * - Bugfix: the module threw access denied exceptions under 'Protected Mode'
  *   in IE, as reported by (jswxwxf). Fixed by wrapping the sessionStorage and
  *   localStorage polyfillers in a try/catch-block.
  *
  * v0.9.5
  * - Bugfix: `get()`, `getFromLocal()` and `getFromSession()` will now return
  *   `null` on errors as expected, reported by David Rodriguez (programmerdave).
  *
  * v0.10.0
  * - Added `allEngines` as an argument to the generic methods (`add`, `get`,
  *   `remove` and `clear`). This enables the caller to decide if all supported
  *   storage engines should be queried or only the first supported one.
  *   The default value for this argument was chosen so that `add()` will only
  *   use the first supported storage engine, while `get()`, `remove()` and
  *   `clear()` will query all supported storage engines. The update was
  *   inspired by David Rodriguez’s (programmerdave) pull request.
  * - Added `setStorageOrder()` so that users of the module may alter the order
  *   by which storage models are iterated.
  * - Added `setStoragePrefix()` so that users of the module may alter the
  *   prefix used when setting, getting or removing values from the store.
  * - Added `setErrorName()` so that users of the module may alter the name
  *   of the event that is broadcast over the `$rootScope` on module errors.
  *
  * v0.10.1
  * - Updated the API documentation with `setErrorName()` and `setStoragePrefix()`.
  * - Added the list of contributors to README.md.
  * - Added this changelog to README.md.
  *
  * v0.10.2
  * - Refactored `setErrorName()`, `setStorageOrder()` and `setStoragePrefix()`
  *   from being only setters into also being getters. To reflect this, they
  *   have been renamed `errorName()`, `order()` and `prefix()` respectively.
  *
  * v0.10.3
  * - Updated the AngularJS version in bower.json so that it now uses semantic
  *   versioning (semver).
  *
  * v0.10.4
  * - Added the minified version of the source, pull-request by Jose Andres
  *   Ramirez (joanrm20).
  *
  * v0.11.0
  * - Added the `has` method in order to check if a given key exists in web
  *   storage or not, as suggested by (gorjuce).
  *
  * v0.12.0
  * - Renamed `add` to `set` in order to mirror the underlying web storage
  *   interface, as suggested by Sam Blowes (blowsie) and Timothee Moulin
  *   (timotheemoulin). `add` has been deprecated in version 0.12.0 and
  *   will be deleted in version 1.0.
  *
  * v0.13.0
  * - Added the `length` method in order to fetch the number of items
  *   stored in a storage engine.
  * - Added the `key` method in order to be able to fetch the name of the
  *   nth key in a storage engine.
  *
  * v0.13.1
  * - Refactored some strings to var's in order to help minification.
  *
  * v0.14.0
  * - Added routines to check if local and/or session storage has been
  *   polyfilled or not. It is also possible to use the same routines to
  *   remove the polyfill functionality. `isPolyfilled(remove)` is now
  *   defined on `webStorage.local` and `webStorage.session`.
  */

/**
 * Setup the webStorageModule.
 */
var webStorageModule = angular.module('webStorageModule', []);

/**
 * Module settings.
 *
 * These are the module’s default settings, they may be queried and updated
 * via methods with the same name. E.g. the storage model order may be updated
 * by calling `webStorage.order(['session', 'local', 'memory'])` and the
 * current prefix may be fetched by calling `webStorage.prefix()`.
 *
 * @see errorName
 * @see order
 * @see prefix
 */
webStorageModule.constant('defaultSettings', {
	// Set a prefix that will be used for all storage data (defaults to the empty string.)
	// Use prefix() to modify this prefix.
	prefix: '',

	// The order in which the service selects what storage model to use. Note that
	// the module mimics localStorage and sessionStorage by using cookies if one,
	// or both, of the web storage models aren't supported.
	// Use order() to modify this list.
	order: ['local', 'session', 'memory'],

	// Name of the event that will be broadcast via the $rootScope on errors.
	// Use errorName() to modify this value.
	errorName: 'webStorage.notification.error',

	// Key used to test the availability of storage engines.
	testKey: 'webStorage.test.key'
});

/**
 * Setup the webStorage service.
 */
webStorageModule.factory('webStorage', ['$rootScope', 'defaultSettings', function ($rootScope, defaultSettings) {
	'use strict';

	/**
	 * Constant used for the string `undefined` (in order to help in minification.)
	 * @private
	 */
	var STR_UNDEFINED = 'undefined';

	/**
	 * Warning displayed on `console.warn` when `add()` is used instead of `set()`.
	 * @private
	 */
	var addDeprecatedWarning = 'angular-webstorage.js -- `add()` had been deprecated, use `set()` instead';

	/**
	 * Name of the event that will be broadcast over the $rootScope on errors.
	 * @see errorName
	 * @private
	 */
	var errorName = defaultSettings.errorName;

	/**
	 * Boolean flag indicating client support for local storage.
	 * @private
	 */
	var hasLocalStorage = testLocalStorage();

	/**
	 * Boolean flag indicating client support for session storage.
	 * @private
	 */
	var hasSessionStorage = testSessionStorage();

	/**
	 * Boolean flag indicating if local storage has been polyfilled by using cookies.
	 * @private
	 */
	var isLocalStoragePolyfilled = false;
	
	/**
	 * Boolean flag indicating if session storage has been polyfilled by using cookies.
	 * @private
	 */
	var isSessionStoragePolyfilled = false;
	
	/**
	 * Reference to the order of preference by which storage engines are iterated.
	 * @see order
	 * @private
	 */
	var order = defaultSettings.order;

	/**
	 * Prefix used on key names when setting/getting/deleting values from the web store.
	 * @see prefix
	 * @private
	 */
	var prefix = defaultSettings.prefix;

	/**
	 * In-memory object used as last resort if no web storage engine is supported by the client.
	 * @private
	 */
	var ram = {};

	/**
	 * The webStorage service API.
	 */
	var webStorage = {
		/** Boolean flag indicating that the client has support for some form of web storage or not. */
		isSupported: hasLocalStorage || hasSessionStorage,

		/**
		 * The local storage API.
		 * The API is the same as the generic API for the webStore service, but will
		 * only operate directly on the local store. Errors will be broadcast via
		 * the $rootScope.
		 */
		local: {
			isSupported: hasLocalStorage,
			add: addToLocal, // Deprecated: use `set`.
			set: setInLocal,
			get: getFromLocal,
			has: hasInLocal,
			key: keyInLocal,
			length: lengthInLocal,
			remove: removeFromLocal,
			clear: clearLocal,
			isPolyfilled: isLocalPolyfilled,
		},

		/**
		 * The session storage API.
		 * The API is the same as the generic API for the webStore service, but will
		 * only operate directly on the session store. Errors will be broadcast via
		 * the $rootScope.
		 */
		session: {
			isSupported: hasSessionStorage,
			add: addToSession, // Deprecated: use `set`.
			set: setInSession,
			get: getFromSession,
			has: hasInSession,
			key: keyInSession,
			length: lengthInSession,
			remove: removeFromSession,
			clear: clearSession,
			isPolyfilled: isSessionPolyfilled,
		},

		/**
		 * The in-memory API.
		 * The API is the same as the generic API for the webStore service, but will
		 * only operate directly on the in-memory store. Errors will be broadcast via
		 * the $rootScope.
		 */
		memory: {
			isSupported: true,
			add: addToMemory, // Deprecated: use `set`.
			set: setInMemory,
			get: getFromMemory,
			has: hasInMemory,
			key: keyInMemory,
			length: lengthInMemory,
			remove: removeFromMemory,
			clear: clearMemory,
			isPolyfilled: false
		}
	};

	/**
	 * Setter for the key/value web store.
	 *
	 * NOTE: This method will use local or session storage depending on the
	 * client's support as well as the order set in the module constant
	 * 'order'. If 'allEngines' is true (default is false) then the key/value
	 * pair will be added to all available storage engines.
	 *
	 * @param {string} key Name to store the given value under.
	 * @param {mixed} value The value to store.
	 * @param {boolean} allEngines If true, add to all available engines, else
	 *   only add to the first supported storage engine. Default is false.
	 * @return {boolean} True on success, else false. If 'allEngines' is true
	 *   then success is when the value was added to at least one storage engine.
	 * @deprecated Since version 0.12.0. Will be deleted in version 1.0. Use `set` instead.
	 */
	webStorage.add = function (key, value, allEngines) {
		console.warn(addDeprecatedWarning);
		return webStorage.set(key, value, allEngines);
	};

	/**
	 * Setter for the key/value web store.
	 *
	 * NOTE: This method will use local or session storage depending on the
	 * client's support as well as the order set in the module constant
	 * 'order'. If 'allEngines' is true (default is false) then the key/value
	 * pair will be added to all available storage engines.
	 *
	 * @param {string} key Name to store the given value under.
	 * @param {mixed} value The value to store.
	 * @param {boolean} allEngines If true, add to all available engines, else
	 *   only add to the first supported storage engine. Default is false.
	 * @return {boolean} True on success, else false. If 'allEngines' is true
	 *   then success is when the value was added to at least one storage engine.
	 */
	webStorage.set = function (key, value, allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : false;
		var result = false;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				result = engine.set(key, value) || result;
				if (!allEngines) {
					return result;
				}
			}
		}
		return result;
	};

	/**
	 * Getter for the key/value web store.
	 *
	 * NOTE: This method will use local or session storage depending on the
	 * client's support as well as the order set in the module constant 'order'.
	 * If 'allEngines' is false (default is true) then only the first supported
	 * storage engine will be queried for the specified key/value, otherwise all
	 * engines will be queried in turn until a non-null value is returned.
	 *
	 * @param {string} key Name of the value to retrieve.
	 * @param {boolean} allEngines If false only the first supported storage
	 *   engine will be queried for the given key/value pair, otherwise all
	 *   engines will be queried in turn until a non-null value is found.
	 *   Default is true.
	 * @return {mixed} The value previously added under the specified key,
	 *   else null.
	 */
	webStorage.get = function (key, allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : true;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				var value = engine.get(key);
				if (!allEngines || value !== null) {
					return value;
				}
			}
		}
		return null;
	};

	/**
	 * Check if a key exists.
	 *
	 * @param {string} key Name of the key to test.
	 * @param {boolean} allEngines If false only the first supported storage
	 *   engine will be queried for the given key, otherwise all engines will
	 *   be queried in turn until a non-null value is found. Default is true.
	 * @return {boolean} True if the key exists, else false.
	 */
	webStorage.has = function (key, allEngines) {
		return null !== webStorage.get(key, allEngines);
	};

	/**
	 * Return the name of the nth key in the key/value web store.
	 * 
	 * @param {number} num An integer representing the number of the key to 
	 *   the return the name of.
	 * @param {boolean} allEngines If false only the first supported storage
	 *   engine will be queried for the given key, otherwise all engines will
	 *   be queried in turn until a non-null value is found. Default is true.
	 * @return {string|null} The name of the key if available or null otherwise.
	 */
	webStorage.key = function (index, allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : true;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				var value = engine.key(index);
				if (!allEngines || value !== null) {
					return value;
				}
			}
		}
		return null;
	};

	/**
	 * Returns an integer representing the number of items stored
	 * in the key/value web store.
	 * 
	 * @param {number} num An integer representing the number of the key to 
	 *   the return the name of.
	 * @param {boolean} allEngines If false only the first supported storage
	 *   engine will be queried for it’s length, otherwise all engines will
	 *   be queried in turn until a non-zero value is found. Default is true.
	 * @return {number} The number of items currently stored in 
	 *   the key/value web store.
	 */
	webStorage.length = function (allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : true;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				var value = engine.length();
				if (!allEngines || value !== 0) {
					return value;
				} 
			}
		}
		return 0;
	};

	/**
	 * Remove a specified value from the key/value web store.
	 *
	 * NOTE: The method will use local or session storage depending on the
	 * client's support as well as the order set in the module constant 'order'.
	 * If 'allEngines' is true (the default) then the specified key/value pair
	 * will be removed from all supported storage engines, otherwise only
	 * the first supported storage engine will be used for the removal.
	 *
	 * @param {string} key Name of the value to remove.
	 * @param {boolean} allEngines If true, remove from all available engines,
	 *   else only remove from the first supported storage engine. Default is
	 *   true.
	 * @return {boolean} True on success, else false. If 'allEngines' is true
	 *   then success is when the value was removed from at least one storage
	 *   engine.
	 */
	webStorage.remove = function (key, allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : true;
		var result = false;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				result = engine.remove(key) || result;
				if (!allEngines) {
					return result;
				}
			}
		}
		return result;
	};

	/**
	 * Remove all values in the key/value web store.
	 *
	 * If a prefix has been specified in the module constant 'prefix' then
	 * only values with that specific prefix will be removed.
	 *
	 * NOTE: The method will use local or session storage depending on the
	 * client's support as well as the order set in the module constant 'order'.
	 * If 'allEngines' is true (the default) then the all key/value pairs
	 * will be removed from all supported storage engines, otherwise only
	 * the first supported storage engine will have its values removed.
	 *
	 * @param {boolean} allEngines If true, remove from all available engines,
	 *   else only remove from the first supported storage engine. Default is
	 *   true.
	 * @return {boolean} True on success, else false. If 'allEngines' is true
	 *   then success is when the all values was removed from at least one
	 *   storage engine.
	 */
	webStorage.clear = function (allEngines) {
		allEngines = typeof allEngines !== STR_UNDEFINED ? !!allEngines : true;
		var result = false;
		var length = order.length;
		for (var ith = 0; ith < length; ++ith) {
			var engine = webStorage[order[ith]];
			if (engine.isSupported) {
				result = engine.clear() || result;
				if (!allEngines) {
					return result;
				}
			}
		}
		return result;
	};

	/**
	 * Getter/setter for the error name that is used when broadcasting errors
	 * on the $rootScope.
	 *
	 * @param {string} newErrorName (Optional) The new error name.
	 * @return {mixed} The current (on get) or previous (on set) error name,
	 *   or false on error.
	 * @see defaultPrefix
	 */
	webStorage.errorName = function (newErrorName) {
		var result = errorName;
		if (typeof newErrorName !== STR_UNDEFINED) {
			if (typeof newErrorName !== 'string') {
				return false;
			}
			errorName = newErrorName;
		}
		return result;
	};

	/**
	 * Getter/setter for the order in which the service selects what storage
	 * model to use.
	 *
	 * @param {Array} newOrder (Optional) An array of string names of the order
	 *   to query storage engines. Recognized names are 'local', 'session'
	 *   and 'memory'. All other names are ignored.
	 * @return {Array} The current (on get) or previous (on set) order as an
	 *   array of strings.
	 * @see defaultOrder
	 */
	webStorage.order = function (newOrder) {
		var result = angular.copy(order);
		if (typeof newOrder !== STR_UNDEFINED) {
			order = [];
			for (var ith in newOrder) {
				if (/^(local|session|memory)$/.test(newOrder[ith])) {
					order.push(newOrder[ith]);
				}
			}
		}
		return result;
	};

	/**
	 * Getter/setter for the prefix that is used when adding, getting or
	 * removing data.
	 *
	 * @param {string} newPrefix (Optional) The new prefix.
	 * @return {mixed} The current (on get) or previous (on set) prefix,
	 *   or false on error.
	 * @see defaultPrefix
	 */
	webStorage.prefix = function (newPrefix) {
		var result = prefix;
		if (typeof newPrefix !== STR_UNDEFINED) {
			if (typeof newPrefix !== 'string') {
				return false;
			}
			prefix = newPrefix;
		}
		return result;
	};

	/**
	 * Add the specified key/value pair to the local web store.
	 *
	 * NOTE: The web store API only specifies that implementations should be able to
	 * handle string values, this method will therefore stringify all values into
	 * JSON strings before storing them.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set (all values are stored as JSON.)
	 * @return {boolean} True on success, else false.
	 * @private
	 * @deprecated Since version 0.12.0. Will be deleted in version 1.0. Use `setInLocal` instead.
	 */
	function addToLocal(key, value) {
		console.warn(addDeprecatedWarning);
		return setInLocal(key, value);
	}

	/**
	 * Add the specified key/value pair to the session web store.
	 *
	 * NOTE: The web store API only specifies that implementations should be able to
	 * handle string values, this method will therefore stringify all values into
	 * JSON strings before storing them.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set (all values are stored as JSON.)
	 * @return {boolean} True on success, else false.
	 * @private
	 * @deprecated Since version 0.12.0. Will be deleted in version 1.0. Use `setInSession` instead.
	 */
	function addToSession(key, value) {
		console.warn(addDeprecatedWarning);
		return setInSession(key, value);
	}

	/**
	 * Add the specified key/value pair to the in-memory store.
	 *
	 * NOTE: The in-memory storage does not use prefixes.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set.
	 * @return {boolean} True on success, else false.
	 * @private
	 * @deprecated Since version 0.12.0. Will be deleted in version 1.0. Use `setInMemory` instead.
	 */
	function addToMemory(key, value) {
		console.warn(addDeprecatedWarning);
		return setInMemory(key, value);
	}

	/**
	 * Add or update the specified key/value pair in the local web store.
	 *
	 * NOTE: The web store API only specifies that implementations should be able to
	 * handle string values, this method will therefore stringify all values into
	 * JSON strings before storing them.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set (all values are stored as JSON.)
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function setInLocal(key, value) {
		if (hasLocalStorage) {
			try { 
				localStorage.setItem(prefix + key, JSON.stringify(value)); 
			} catch (e) {
				return croak(e);
			}
			return true;
		}
		return false;
	}

	/**
	 * Add or update the specified key/value pair in the session web store.
	 *
	 * NOTE: The web store API only specifies that implementations should be able to
	 * handle string values, this method will therefore stringify all values into
	 * JSON strings before storing them.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set (all values are stored as JSON.)
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function setInSession(key, value) {
		if (hasSessionStorage) {
			try {
				sessionStorage.setItem(prefix + key, JSON.stringify(value));
			} catch (e) {
				return croak(e);
			}
			return true;
		}
		return false;
	}

	/**
	 * Add or update the specified key/value pair in the in-memory store.
	 *
	 * NOTE: The in-memory storage does not use prefixes.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to set.
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function setInMemory(key, value) {
		ram[key] = value;
		return true;
	}

	/**
	 * Get the specified value from the local web store.
	 *
	 * NOTE: Since all values are stored as JSON strings, this method will parse the fetched
	 * JSON string and return the resulting object/value.
	 *
	 * @param {string} key The name of the value.
	 * @return {mixed} The value previously added under the specified key, else null.
	 * @private
	 */
	function getFromLocal(key) {
		if (hasLocalStorage) {
			try {
				var value = localStorage.getItem(prefix + key);
				return value && JSON.parse(value);
			} catch (e) {
				croak(e);
				return null;
			}
		}
		return null;
	}

	/**
	 * Get the specified value from the session web store.
	 *
	 * NOTE: Since all values are stored as JSON strings, this method will parse the fetched
	 * JSON string and return the resulting object/value.
	 *
	 * @param {string} key The name of the value.
	 * @return {mixed} The value previously added under the specified key, else null.
	 * @private
	 */
	function getFromSession(key) {
		if (hasSessionStorage) {
			try {
				var value = sessionStorage.getItem(prefix + key);
				return value && JSON.parse(value);
			} catch (e) {
				croak(e);
				return null;
			}
		}
		return null;
	}

	/**
	 * Get the specified value from the in-memory store.
	 *
	 * NOTE: The in-memory storage does not use prefixes.
	 *
	 * @param {string} key The name of the value.
	 * @return {mixed} The value previously added under the specified key, else null.
	 * @private
	 */
	function getFromMemory(key) {
		return key in ram ? ram[key] : null;
	}

	/**
	 * Check if the given key exists in the local web store.
	 *
	 * @param {string} key The name of the value.
	 * @return {boolean} True if the key exists, else false.
	 * @private
	 */
	function hasInLocal(key) {
		return null !== getFromLocal(key);
	}

	/**
	 * Check if the given key exists in the session web store.
	 *
	 * @param {string} key The name of the value.
	 * @return {boolean} True if the key exists, else false.
	 * @private
	 */
	function hasInSession(key) {
		return null !== getFromSession(key);
	}

	/**
	 * Check if the given key exists in the in-memory store.
	 *
	 * @param {string} key The name of the value.
	 * @return {boolean} True if the key exists, else false.
	 * @private
	 */
	function hasInMemory(key) {
		return null !== getFromMemory(key);
	}

	/**
	 * Return the name of the nth key in the local web store.
	 * 
	 * @param {number} num An integer representing the number
	 *   of the key to the return the name of.
	 * @return {string|null} The name of the key if available
	 *   or null otherwise.
	 */
	function keyInLocal(num) {
		if (hasLocalStorage) {
			return localStorage.key(num);
		}
		return null;
	}

	/**
	 * Return the name of the nth key in the session web store.
	 * 
	 * @param {number} num An integer representing the number
	 *   of the key to the return the name of.
	 * @return {string|null} The name of the key if available
	 *   or null otherwise.
	 */
	function keyInSession(num) {
		if (hasSessionStorage) {
			return sessionStorage.key(num);
		}
		return null;
	}

	/**
	 * Return the name of the nth key in the memory store.
	 * 
	 * @param {number} index An integer representing the number
	 *   of the key to the return the name of.
	 * @return {string|null} The name of the key if available
	 *   or null otherwise.
	 */
	function keyInMemory(index) {
		var count = 0;
		for (var key in ram) {
			if (ram.hasOwnProperty(key)) {
				if (index === count) {
					return key;
				}
				count += 1;
				if (count > index) {
					return null;
				}
			}
		}
		return null;
	}
	
	/**
	 * Returns an integer representing the number of items stored
	 * in the local store.
	 * 
	 * @return {number} The number of items currently stored in 
	 *   the local store.
	 */
	function lengthInLocal() {
		if (hasLocalStorage) {
			return localStorage.length;
		}
		return 0;
	}

	/**
	 * Returns an integer representing the number of items stored
	 * in the session store.
	 * 
	 * @return {number} The number of items currently stored in 
	 *   the session store.
	 */
	function lengthInSession() {
		if (hasSessionStorage) {
			return sessionStorage.length;
		}
		return 0;
	}

	/**
	 * Returns an integer representing the number of items stored
	 * in the in-memory store.
	 * 
	 * @return {number} The number of items currently stored in 
	 *   the in-memory store.
	 */
	function lengthInMemory() {
		if (Object.keys) {
			return Object.keys(ram).length;
		}
		var count = 0;
		for (var key in ram) {
			if (ram.hasOwnProperty(key)) {
				count += 1;
			}
		}
		return count;
	}

	/**
	 * Remove the specified key/value pair from the local store.
	 *
	 * @param {string} key The name of the value to remove.
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function removeFromLocal(key) {
		if (hasLocalStorage) {
			try {
				localStorage.removeItem(prefix + key);
			} catch (e) {
				return croak(e);
			}
			return true;
		}
		return false;
	}

	/**
	 * Remove the specified key/value pair from the session store.
	 *
	 * @param {string} key The name of the value to remove.
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function removeFromSession(key) {
		if (hasSessionStorage) {
			try {
				sessionStorage.removeItem(prefix + key);
			} catch (e) {
				return croak(e);
			}
			return true;
		}
		return false;
	}

	/**
	 * Remove the specified key/value pair from the in-memory store.
	 *
	 * NOTE: The in-memory storage does not use prefixes.
	 *
	 * @param {string} key The name of the value to remove.
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function removeFromMemory(key) {
		delete ram[key];
		return true;
	}
	
	/**
	 * Clear all key/value pairs form the local store.
	 *
	 * NOTE: If a prefix has been specified in the module constant 'prefix' then only
	 * values with that specific prefix will be removed.
	 *
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function clearLocal() {
		if (!hasLocalStorage) return false;
		if (!!prefix) {
			var prefixLength = prefix.length;
			try {
				for (var key in localStorage) {
					if (key.substr(0, prefixLength) === prefix) {
						localStorage.removeItem(key);
					}
				}
			} catch (e) {
				return croak(e);
			}
			return true;
		}

		try {
			localStorage.clear();
		} catch (e) {
			return croak(e);
		}

		return true;
	}

	/**
	 * Clear all key/value pairs form the session store.
	 *
	 * NOTE: If a prefix has been specified in the module constant 'prefix' then only
	 * values with that specific prefix will be removed.
	 *
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function clearSession() {
		if (!hasSessionStorage) return false;
		if (!!prefix) {
			var prefixLength = prefix.length;
			try {
				for (var key in sessionStorage) {
					if (key.substr(0, prefixLength) === prefix) {
						sessionStorage.removeItem(key);
					}
				}
			} catch (e) {
				return croak(e);
			}
			return true;
		}

		try {
			sessionStorage.clear();
		} catch (e) {
			return croak(e);
		}

		return true;
	}

	/**
	 * Clear all key/value pairs form the in-memory store.
	 *
	 * NOTE: The in-memory storage does not use prefixes.
	 *
	 * @return {boolean} True on success, else false.
	 * @private
	 */
	function clearMemory() {
		ram = {};
		return true;
	}

	/**
	 * Test the client's support for storing values in the local store.
	 *
	 * @return {boolean} True if the client has support for the local store, else false.
	 * @private
	 */
	function testLocalStorage() {
		polyfillLocalStorage();
		try {
			localStorage.setItem(prefix + defaultSettings.testKey, defaultSettings.testKey);
			localStorage.removeItem(prefix + defaultSettings.testKey);
			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * Test the client's support for storing values in the session store.
	 *
	 * @return {boolean} True if the client has support for the session store, else false.
	 * @private
	 */
	function testSessionStorage() {
		polyfillSessionStorage();
		try {
			sessionStorage.setItem(prefix + defaultSettings.testKey, defaultSettings.testKey);
			sessionStorage.removeItem(prefix + defaultSettings.testKey);
			return true;
		} catch (e) {
			return false;
		}
	}

	/**
	 * Helper method, broadcasts an error notification on exceptions.
	 *
	 * @return {boolean} Always returns false.
	 * @private
	 */
	function croak(error) {
		$rootScope.$broadcast(errorName, error.title + ': ' + error.message);
		return false;
	}

	/**
	 * Polyfilling the localStorage API by setting cookies on the document.
	 * @private
	 */
	function polyfillLocalStorage() {
		try {
			/* jshint -W001 */// 'hasOwnProperty' is a really bad name.
			/* jshint -W014 */// Bad line break before +.
		
			// Support for localStorage, compatible with old browsers, like Internet
			// Explorer < 8 (tested and working even in Internet Explorer 6).
			// Source From: https://developer.mozilla.org/en-US/docs/DOM/Storage
			if (!window.localStorage) {
				window.localStorage = {
					getItem : function(sKey) {
						if (!sKey || !this.hasOwnProperty(sKey)) {
							return null;
						}
						return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)"
								+ escape(sKey).replace(/[\-\.\+\*]/g, "\\$&")
								+ "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
					},
					key : function(nKeyId) {
						return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "")
								.split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
					},
					setItem : function(sKey, sValue) {
						if (!sKey) {
							return;
						}
						document.cookie = escape(sKey) + "=" + escape(sValue)
								+ "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
						this.length = document.cookie.match(/\=/g).length;
					},
					length : 0,
					removeItem : function(sKey) {
						if (!sKey || !this.hasOwnProperty(sKey)) {
							return;
						}
						document.cookie = escape(sKey)
								+ "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
						this.length--;
					},
					hasOwnProperty : function(sKey) {
						return (new RegExp("(?:^|;\\s*)"
								+ escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\="))
								.test(document.cookie);
					}
				};
				window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
				isLocalStoragePolyfilled = true;
			}
		} catch (e) {
			// Protected Mode on IE? There's really nothing to do at this stage.
		}
	}
	
	/**
	 * Polyfilling the sessionStorage API by setting cookies on the document.
	 * @private
	 */
	function polyfillSessionStorage() {
		try {
			/* jshint -W001 */// 'hasOwnProperty' is a really bad name.
			/* jshint -W014 */// Bad line break before +.
		
			// Support for sessionStorage, compatible with old browsers, like Internet
			// Explorer < 8 (tested and working even in Internet Explorer 6).
			// Source From: https://developer.mozilla.org/en-US/docs/DOM/Storage
			if (!window.sessionStorage) {
				window.sessionStorage = {
					getItem : function(sKey) {
						if (!sKey || !this.hasOwnProperty(sKey)) {
							return null;
						}
						return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)"
								+ escape(sKey).replace(/[\-\.\+\*]/g, "\\$&")
								+ "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
					},
					key : function(nKeyId) {
						return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "")
								.split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
					},
					setItem : function(sKey, sValue) {
						if (!sKey) {
							return;
						}
						document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
						this.length = document.cookie.match(/\=/g).length;
					},
					length : 0,
					removeItem : function(sKey) {
						if (!sKey || !this.hasOwnProperty(sKey)) {
							return;
						}
						document.cookie = escape(sKey)
								+ "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
						this.length--;
					},
					hasOwnProperty : function(sKey) {
						return (new RegExp("(?:^|;\\s*)"
								+ escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\="))
								.test(document.cookie);
					}
				};
				window.sessionStorage.length = (document.cookie.match(/\=/g) || window.sessionStorage).length;
				isSessionStoragePolyfilled = true;
			}
		
		} catch (e) {
			// Protected Mode on IE? There's really nothing to do at this stage.
		}
	}
	
	/**
	 * Returns the polyfill status of local storage: `true` if local storage has been
	 * polyfilled, else `false`.
	 * 
	 * @param {boolean} removePolyfill If `removePolyfill` is `true` and local storage
	 *    is currently polyfilled then `window.localStorage` will be set to `null`. 
	 * @return {boolean} `true` if local storage is polyfilled by setting cookies on
	 *   the document, else `false`.
	 */
	function isLocalPolyfilled(removePolyfill) {
		var oldValue = isLocalStoragePolyfilled;
		if (removePolyfill === true && isLocalStoragePolyfilled) {
			window.localStorage = null;
			isLocalStoragePolyfilled = false;
		}
		return oldValue;
	}
	
	/**
	 * Returns the polyfill status of session storage: `true` if session storage has been
	 * polyfilled, else `false`.
	 * 
	 * @param {boolean} removePolyfill If `removePolyfill` is `true` and session storage
	 *    is currently polyfilled then `window.sessionStorage` will be set to `null`. 
	 * @return {boolean} `true` if session storage is polyfilled by setting cookies on
	 *   the document, else `false`.
	 */
	function isSessionPolyfilled(removePolyfill) {
		var oldValue = isSessionStoragePolyfilled;
		if (removePolyfill === true && isSessionStoragePolyfilled) {
			window.sessionStorage = null;
			isLocalStoragePolyfilled = false;
		}
		return oldValue;
	}

	return webStorage;
}]);
