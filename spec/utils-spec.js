describe('gridstack utils', function() {
    'use strict';

    var utils;

    beforeEach(function() {
        utils = window.GridStackUI.Utils;
    });

    describe('setup of utils', function() {

        it('should set gridstack utils.', function() {
            expect(utils).not.toBeNull();
            expect(typeof utils).toBe('object');
        });

    });

    describe('test toBool', function() {

        it('should return booleans.', function() {
            expect(utils.toBool(true)).toEqual(true);
            expect(utils.toBool(false)).toEqual(false);
        });

        it('should work with integer.', function() {
            expect(utils.toBool(1)).toEqual(true);
            expect(utils.toBool(0)).toEqual(false);
        });

        it('should work with Strings.', function() {
            expect(utils.toBool('')).toEqual(false);
            expect(utils.toBool('0')).toEqual(false);
            expect(utils.toBool('no')).toEqual(false);
            expect(utils.toBool('false')).toEqual(false);
            expect(utils.toBool('yes')).toEqual(true);
            expect(utils.toBool('yadda')).toEqual(true);
        });

    });

    describe('test isIntercepted', function() {
        var src = {x: 3, y: 2, width: 3, height: 2};

        it('should intercept.', function() {
            expect(utils.isIntercepted(src, {x: 0, y: 0, width: 4, height: 3})).toEqual(true);
            expect(utils.isIntercepted(src, {x: 0, y: 0, width: 40, height: 30})).toEqual(true);
            expect(utils.isIntercepted(src, {x: 3, y: 2, width: 3, height: 2})).toEqual(true);
            expect(utils.isIntercepted(src, {x: 5, y: 3, width: 3, height: 2})).toEqual(true);
        });

        it('shouldn\'t intercept.', function() {
            expect(utils.isIntercepted(src, {x: 0, y: 0, width: 3, height: 2})).toEqual(false);
            expect(utils.isIntercepted(src, {x: 0, y: 0, width: 13, height: 2})).toEqual(false);
            expect(utils.isIntercepted(src, {x: 1, y: 4, width: 13, height: 2})).toEqual(false);
            expect(utils.isIntercepted(src, {x: 0, y: 3, width: 3, height: 2})).toEqual(false);
            expect(utils.isIntercepted(src, {x: 6, y: 3, width: 3, height: 2})).toEqual(false);
        });
    });

});
