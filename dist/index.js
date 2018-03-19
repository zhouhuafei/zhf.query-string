'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (name, factory) {
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // requirejs - amd canon
        define(factory);
    } else {
        // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('queryString', function () {
    function QueryString() {}

    // {a:1, b:2} 序列成 'a=1&b=2'
    QueryString.prototype.queryStringify = function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var self = this;
        var result = [];
        Object.keys(obj).forEach(function (key) {
            var v = obj[key];
            if (self.typeOf(v) === 'object' || self.typeOf(v) === 'array') {
                v = JSON.stringify(v);
            }
            result.push(key + '=' + encodeURIComponent(v));
        });
        return result.join('&');
    };

    // 'a=1&b=2' 解析成 {a:1, b:2}
    QueryString.prototype.queryParse = function (str) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var isFilterHashMark = opts.isFilterHashMark || true; // 是否过滤hash标识#号
        var isFilterSearchMark = opts.isFilterSearchMark || true; // 是否过滤search标识?号
        var result = {};
        if (str) {
            if (isFilterHashMark && str.charAt(0) === '#' || isFilterSearchMark && str.charAt(0) === '?') {
                str = str.substring(1);
            }
            str.split('&').forEach(function (v) {
                var arr = v.split('=');
                try {
                    result[arr[0]] = JSON.parse(decodeURIComponent(arr[1]));
                } catch (e) {
                    result[arr[0]] = decodeURIComponent(arr[1]);
                }
            });
        }
        return result;
    };

    QueryString.prototype.typeOf = function (v) {
        return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    };

    return new QueryString();
});