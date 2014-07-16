
/**
 * Extended utility methods for the AngularJS WebStorage service.
 *
 * This module adds extra methods to `webStorage`:
 *
 * webStorage.array
 * - length(key)         -- return the length of the specified web storage array
 * - pop(key)            -- removes the last element of an array, and returns that element
 * - push(key, value)    -- adds a new element to the end of an array, and returns the new length
 * - shift(key)          -- Removes the first element of an array, and returns that element
 * - unshift(key, value) -- adds a new element to the beginning of an array, and returns the new length
 *
 * It also provides the following direct APIs:
 *
 * webStorage.local.array
 * - length(key)         -- return the length of the specified web storage array
 * - pop(key)            -- removes the last element of an array, and returns that element
 * - push(key, value)    -- adds a new element to the end of an array, and returns the new length
 * - shift(key)          -- Removes the first element of an array, and returns that element
 * - unshift(key, value) -- adds a new element to the beginning of an array, and returns the new length
 *
 * webStorage.session.array
 * - length(key)         -- return the length of the specified web storage array
 * - pop(key)            -- removes the last element of an array, and returns that element
 * - push(key, value)    -- adds a new element to the end of an array, and returns the new length
 * - shift(key)          -- Removes the first element of an array, and returns that element
 * - unshift(key, value) -- adds a new element to the beginning of an array, and returns the new length
 *
 * webStorage.memory.array
 * - length(key)         -- return the length of the specified web storage array
 * - pop(key)            -- removes the last element of an array, and returns that element
 * - push(key, value)    -- adds a new element to the end of an array, and returns the new length
 * - shift(key)          -- Removes the first element of an array, and returns that element
 * - unshift(key, value) -- adds a new element to the beginning of an array, and returns the new length
 *
 *
 * Requirements
 * This module depends on `webStorageModule` i.e. `angular-webstorage.js`.
 *
 * Usage
 * Load the `angular-webstorage-utils.js` file after `angular-webstorage.js`, e.g.:
 *
 *     <script src="angular-webstorage.js"></script>
 *     <script src="angular-webstorage-utils.js"></script>
 *
 * Add `webStorageModule` to your app’s dependencies. Then inject `webStorage`
 * into any controller that needs to use it, e.g.:
 *
 *     var myApp = angular.module('myApp', ['webStorageModule']);
 *     myApp.controller('myController', ['webStorage', function (webStorage) { ... }]);
 *
 *
 * @author Fredric Rylander, https://github.com/fredricrylander/angular-webstorage
 * @date 2013-12-19
 * @version 0.1.0
 *
 *
 * The MIT License
 * Copyright (c) 2013 Fredric Rylander
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
  * v0.1.0
  * - Initial commit.
  *
  */

/**
 * Setup the add-on utiltity functions for the webStorage service.
 */
angular.module('webStorageModule').run(['webStorage', function (webStorage) {
	'use strict';

	// Setup the generic utility methods.
	webStorage.array = {
		length: function (key) { return lengthFromEngine(key, webStorage); },
		pop: function (key) { return popFromEngine(key, webStorage); },
		push: function (key, value) { return pushToEngine(key, value, webStorage); },
		shift: function (key) { return shiftFromEngine(key, webStorage); },
		unshift: function (key, value) { return unshiftToEngine(key, value, webStorage); }
	};
	
	// Setup the utility methods on the local model.
	webStorage.local.array = {
		length: function (key) { return lengthFromEngine(key, webStorage.local); },
		pop: function (key) { return popFromEngine(key, webStorage.local); },
		push: function (key, value) { return pushToEngine(key, value, webStorage.local); },
		shift: function (key) { return shiftFromEngine(key, webStorage.local); },
		unshift: function (key, value) { return unshiftToEngine(key, value, webStorage.local); }
	};

	// Setup the utility methods on the session model.
	webStorage.session.array = {
		length: function (key) { return lengthFromEngine(key, webStorage.session); },
		pop: function (key) { return popFromEngine(key, webStorage.session); },
		push: function (key, value) { return pushToEngine(key, value, webStorage.session); },
		shift: function (key) { return shiftFromEngine(key, webStorage.session); },
		unshift: function (key, value) { return unshiftToEngine(key, value, webStorage.session); }
	};
	
	// Setup the utility methods on the in-memory model.
	webStorage.memory.array = {
		length: function (key) { return lengthFromEngine(key, webStorage.memory); },
		pop: function (key) { return popFromEngine(key, webStorage.memory); },
		push: function (key, value) { return pushToEngine(key, value, webStorage.memory); },
		shift: function (key) { return shiftFromEngine(key, webStorage.memory); },
		unshift: function (key, value) { return unshiftToEngine(key, value, webStorage.memory); }
	};

	/**
	 * Returns the length of the specified web storage array.
	 *
	 * NOTE: The value stored under `key`, if any, is assumed to be an array.
	 * If a non-array value is stored under `key` then it will count as 1.
	 *
	 * @param {string} key The name of the value.
	 * @param {Object} engine The web storage model engine to operate on.
	 * @return {mixed} The length of the array, or 1 for non-array values, 
	 *   or `undefined` if no value exist for the given key.
	 * @private
	 */
	function lengthFromEngine(key, engine) {
		var value = engine.get(key);
		if (value === null)
			return undefined;
		return angular.isArray(value) ? value.length : 1;
	}

	/**
	 * Removes the last value from the specified web storage array,
	 * and returns that value.
	 *
	 * NOTE: The value stored under `key`, if any, is assumed to be an array.
	 * The last value of this array will be removed, the web store will
	 * be updated and the value returned. If a non-array value is stored
	 * under `key` then it will be removed from the web store and returned.
	 *
	 * @param {string} key The name of the value.
	 * @param {Object} engine The web storage model engine to operate on.
	 * @return {mixed} The last item in the array previously added under
	 *   the specified key, else null.
	 * @private
	 */
	function popFromEngine(key, engine) {
		var value = engine.get(key);
		if (value === null)
			return null;
		
		if (!angular.isArray(value)) {
			engine.remove(key);
			return value;
		}
		
		var result = value.pop();
		engine.add(key, value);
		return result;
	}

	/**
	 * Adds the specified value as the last item in the given web storage array.
	 *
	 * NOTE: The value stored under `key`, if any, is assumed to be an array,
	 * and if it’s not an array it will be turned into one.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to push.
	 * @param {Object} engine The web storage model engine to operate on.
	 * @return {boolean} The length of the array on success, otherwise false.
	 * @private
	 */
	function pushToEngine(key, value, engine) {
		var currentValue = engine.get(key);
		
		if (currentValue === null)
			currentValue = [];
		else if (!angular.isArray(currentValue))
			currentValue = [currentValue];
		
		currentValue.push(value);
		return engine.add(key, currentValue) ? currentValue.length : false;
	}
	
	/**
	 * Removes the first item from the specified web storage array,
	 * and returns that value.
	 *
	 * NOTE: The value stored under `key`, if any, is assumed to be an array.
	 * The first value of this array will be shifted, the web store will
	 * be updated and the value returned. If a non-array value is stored
	 * under `key` then it will be removed from the web store and returned.
	 *
	 * @param {string} key The name of the value.
	 * @param {Object} engine The web storage model engine to operate on.
	 * @return {mixed} The first item in the array previously added under
	 *   the specified key, else null.
	 * @private
	 */
	function shiftFromEngine(key, engine) {
		var value = engine.get(key);
		if (value === null)
			return null;
		
		if (!angular.isArray(value)) {
			engine.remove(key);
			return value;
		}
		
		var result = value.shift();
		engine.add(key, value);
		return result;
	}
	
	/**
	 * Adds the specified value as the first item in the given web storage array.
	 *
	 * NOTE: The value stored under `key`, if any, is assumed to be an array,
	 * and if it’s not an array it will be turned into one.
	 *
	 * @param {string} key The name to store the value under.
	 * @param {mixed} value The value to push.
	 * @param {Object} engine The web storage model engine to operate on.
	 * @return {boolean} The length of the array on success, otherwise false.
	 * @private
	 */
	function unshiftToEngine(key, value, engine) {
		var currentValue = engine.get(key);
		
		if (currentValue === null)
			currentValue = [];
		else if (!angular.isArray(currentValue))
			currentValue = [currentValue];
		
		currentValue.unshift(value);
		return engine.add(key, currentValue) ? currentValue.length : false;
	};
	
}]);
