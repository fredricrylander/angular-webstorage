WebStorage Service for AngularJS
================================

The webStorage service has both a generic and direct API. The generic API will check for client support and preferred order before altering a specific storage value, trying to degrade gracefully according to a set heuristic. The direct APIs works with either the client's local, session or the module's own in-memory storage engines.

The selection heuristics for the generic API is mainly dictated by a set order (defaults to ['local', 'session', 'memory'].) If the client has no support for the specified storage engine then the service will try to fall back on the next specified engine and so forth.

NOTE: The in-memory storage should really be seen as a last resort since all its values will be lost on page reload (somewhat negating the whole idea of client web storage!)

If the client does not support local or session web storage the module will try to mimic them by setting cookies on the current document.

All errors will be broadcast via the `$rootScope` under a specific name (defaults to: `webStorage.notification.error`.)

The service provides the following generic methods:

`webStorage`
* `isSupported`          -- boolean flag indicating client support status (local or session storage)
* `add(key, value, all)` -- add a value to storage under the specific key (storage according to 'order')
* `get(key, all)`        -- return the specified value (storage according to 'order')
* `has(key, all)`        -- checks if the given key exists (storage according to 'order')
* `remove(key, all)`     -- remove a key/value pair from storage (storage according to 'order')
* `clear(all)`           -- remove all key/value pairs from storage (storage according to 'order')
* `errorName(str)`       -- get or set the name of the event that is broadcast over the $rootScope on errors
* `prefix(str)`          -- get or set the prefix used for keys while operating on storage values
* `order(array)`         -- get or set the order by which storage models are iterated


It also provides the following direct APIs:

`webStorage.local`
* `isSupported`     -- boolean flag indicating client support status (local storage)
* `add(key, value)` -- add a value to storage under the specific key (local storage)
* `get(key)`        -- return the specified value (local storage)
* `has(key)`        -- checks if the given key exists (local storage)
* `remove(key)`     -- remove a key/value pair from storage (local storage)
* `clear()`         -- remove all key/value pairs from storage (local storage)

`webStorage.session`
* `isSupported`     -- boolean flag indicating client support status (session storage)
* `add(key, value)` -- add a value to storage under the specific key (session storage)
* `get(key)`        -- return the specified value (session storage)
* `has(key)`        -- checks if the given key exists (session storage)
* `remove(key)`     -- remove a key/value pair from storage (session storage)
* `clear()`         -- remove all key/value pairs from storage (session storage)

`webStorage.memory`
* `isSupported`     -- boolean true, the in-memory storage is always supported
* `add(key, value)` -- add a value to storage under the specific key (in-memory storage)
* `get(key)`        -- return the specified value (in-memory storage)
* `has(key)`        -- checks if the given key exists (in-memory storage)
* `remove(key)`     -- remove a key/value pair from storage (in-memory storage)
* `clear()`         -- remove all key/value pairs from storage (in-memory storage)

## Author
Fredric Rylander, https://github.com/fredricrylander/angular-webstorage

## Date
2014-07-16

## Module Version
0.11.0

## Requirements
This module was originally built for AngularJS v1.0.5.

## Usage
Add `webStorageModule` to your app's dependencies. Then inject `webStorage` into any controller that needs to use it, e.g.:

    var myApp = angular.module('myApp', ['webStorageModule']);
    myApp.controller('myController', function ($scope, webStorage) { ... });

## Contributors
* Paulo Cesar (https://github.com/pocesar)
* David Chang (https://github.com/hasdavidc)
* David Rodriguez (https://github.com/programmerdave)
* (https://github.com/jswxwxf)
* Jose Andres Ramirez (https://github.com/joanrm20)
* (https://github.com/gorjuce)

## Change Log
* v0.9.0
    - Initial commit.

* v0.9.1
    - Bugfix: removed trailing commas that IE choked on, as reported by
      Paulo Cesar (pocesar).

* v0.9.2
    - Now using the identity operator instead of equality when comparing
      prefixes while clearing storage.
    - Bugfix: clearSession() is now actually clearing sessionStorage and not
      localStorage, as reported by David Chang (hasdavidc).

* v0.9.3
    - Bugfix: now using the `errorName` constant when broadcasting errors
      over the `$rootScope`.

* v0.9.4
    - Added strict mode.
    - Bugfix: the module threw access denied exceptions under 'Protected Mode'
      in IE, as reported by (jswxwxf). Fixed by wrapping the sessionStorage and
      localStorage polyfillers in a try/catch-block.

* v0.9.5
    - Bugfix: `get()`, `getFromLocal()` and `getFromSession()` will now return
      `null` on errors as expected, reported by David Rodriguez (programmerdave).

* v0.10.0
    - Added `allEngines` as an argument to the generic methods (`add`, `get`,
      `remove` and `clear`). This enables the caller to decide if all supported
      storage engines should be queried or only the first supported one.
      The default value for this argument was chosen so that `add()` will only
      use the first supported storage engine, while `get()`, `remove()` and
      `clear()` will query all supported storage engines. The update was
      inspired by David Rodriguez’s (programmerdave) pull request.
    - Added `setStorageOrder()` so that users of the module may alter the order
      by which storage models are iterated.
    - Added `setStoragePrefix()` so that users of the module may alter the
      prefix used when setting, getting or removing values from the store.
    - Added `setErrorName()` so that users of the module may alter the name
      of the event that is broadcast over the `$rootScope` on module errors.

* v0.10.1
    - Updated the API documentation with `setErrorName()` and `setStoragePrefix()`.
    - Added the list of contributors to README.md.
    - Added this changelog to README.md.

* v0.10.2
    - Refactored `setErrorName()`, `setStorageOrder()` and `setStoragePrefix()`
      from being only setters into also being getters. To reflect this, they
      have been renamed `errorName()`, `order()` and `prefix()` respectively.

* v0.10.3
    - Updated the AngularJS version in bower.json so that it now uses semantic
      versioning (semver).

* v0.10.4
    - Added the minified version of the source in `angular-webstorage.min.js`,
      pull-request by Jose Andres Ramirez (joanrm20).

* v0.11.0
    - Added the `has` method in order to check if a given key exists in local
      storage or not, as suggested by (gorjuce).

## License
    The MIT License
    Copyright (c) 2013-2014 Fredric Rylander

    Permission is hereby granted, free of charge, to any person obtaining a
    copy of this software and associated documentation files (the "Software"),
    to deal in the Software without restriction, including without limitation
    the rights to use, copy, modify, merge, publish, distribute, sublicense,
    and/or sell copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.
