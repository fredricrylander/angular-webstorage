'use strict';

describe('Web Storage Module', function () {
	var webStorage;
	
	beforeEach(module('webStorageModule'));
	
	beforeEach(inject(function (_webStorage_) {
		webStorage = _webStorage_;
		webStorage.clear(true);
	}));
	
	it('Generic storage interface', function () {
		var key = '_webStorage.generic.value';
		var value = { a: 4 };
		
		expect(webStorage.has(key)).toEqual(false);
		expect(webStorage.get(key)).toEqual(null);
		expect(webStorage.set(key, value)).toEqual(true);
		expect(webStorage.get(key)).toEqual(value);
		expect(webStorage.has(key)).toEqual(true);
		expect(webStorage.remove(key)).toEqual(true);
		expect(webStorage.has(key)).toEqual(false);
		expect(webStorage.get(key)).toEqual(null);
		
		expect(webStorage.set(key + '-1', value)).toEqual(true);
		expect(webStorage.set(key + '-2', value)).toEqual(true);
		expect(webStorage.has(key + '-1')).toEqual(true);
		expect(webStorage.has(key + '-2')).toEqual(true);
		expect(webStorage.clear()).toEqual(true);
		expect(webStorage.has(key + '-1')).toEqual(false);
		expect(webStorage.has(key + '-2')).toEqual(false);
	});
	
	it('Local storage interface', function () {
		var key = '_webStorage.local.value';
		var value = { b: 5 };
		
		expect(webStorage.local.has(key)).toEqual(false);
		expect(webStorage.local.get(key)).toEqual(null);
		expect(webStorage.local.set(key, value)).toEqual(true);
		expect(webStorage.local.get(key)).toEqual(value);
		expect(webStorage.local.has(key)).toEqual(true);
		expect(webStorage.local.remove(key)).toEqual(true);
		expect(webStorage.local.has(key)).toEqual(false);
		expect(webStorage.local.get(key)).toEqual(null);
		
		expect(webStorage.local.set(key + '-1', value)).toEqual(true);
		expect(webStorage.local.set(key + '-2', value)).toEqual(true);
		expect(webStorage.local.has(key + '-1')).toEqual(true);
		expect(webStorage.local.has(key + '-2')).toEqual(true);
		expect(webStorage.local.clear()).toEqual(true);
		expect(webStorage.local.has(key + '-1')).toEqual(false);
		expect(webStorage.local.has(key + '-2')).toEqual(false);
	});
	
	it('Session storage interface', function () {
		var key = '_webStorage.session.value';
		var value = { b: 5 };
		
		expect(webStorage.session.has(key)).toEqual(false);
		expect(webStorage.session.get(key)).toEqual(null);
		expect(webStorage.session.set(key, value)).toEqual(true);
		expect(webStorage.session.get(key)).toEqual(value);
		expect(webStorage.session.has(key)).toEqual(true);
		expect(webStorage.session.remove(key)).toEqual(true);
		expect(webStorage.session.has(key)).toEqual(false);
		expect(webStorage.session.get(key)).toEqual(null);
		
		expect(webStorage.session.set(key + '-1', value)).toEqual(true);
		expect(webStorage.session.set(key + '-2', value)).toEqual(true);
		expect(webStorage.session.has(key + '-1')).toEqual(true);
		expect(webStorage.session.has(key + '-2')).toEqual(true);
		expect(webStorage.session.clear()).toEqual(true);
		expect(webStorage.session.has(key + '-1')).toEqual(false);
		expect(webStorage.session.has(key + '-2')).toEqual(false);
	});
	
	it('Memory storage interface', function () {
		var key = '_webStorage.memory.value';
		var value = { c: 6 };
		
		expect(webStorage.memory.has(key)).toEqual(false);
		expect(webStorage.memory.get(key)).toEqual(null);
		expect(webStorage.memory.set(key, value)).toEqual(true);
		expect(webStorage.memory.get(key)).toEqual(value);
		expect(webStorage.memory.has(key)).toEqual(true);
		expect(webStorage.memory.remove(key)).toEqual(true);
		expect(webStorage.memory.has(key)).toEqual(false);
		expect(webStorage.memory.get(key)).toEqual(null);
		
		expect(webStorage.memory.set(key + '-1', value)).toEqual(true);
		expect(webStorage.memory.set(key + '-2', value)).toEqual(true);
		expect(webStorage.memory.has(key + '-1')).toEqual(true);
		expect(webStorage.memory.has(key + '-2')).toEqual(true);
		expect(webStorage.memory.clear()).toEqual(true);
		expect(webStorage.memory.has(key + '-1')).toEqual(false);
		expect(webStorage.memory.has(key + '-2')).toEqual(false);
	});
});