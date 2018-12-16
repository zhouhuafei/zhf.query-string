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
    function typeOf(v) {
        return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    }

    function QueryString() {}

    // {a:1, b:2} 序列成 'a=1&b=2'
    QueryString.prototype.queryStringify = function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var result = [];
        Object.keys(obj).forEach(function (key) {
            var v = obj[key];
            if (typeOf(v) === 'object' || typeOf(v) === 'array') {
                v = JSON.stringify(v);
            }
            result.push(key + '=' + encodeURIComponent(v));
        });
        return result.join('&');
    };

    // 'a=1&b=2' 解析成 {a:'1', b:'2'}
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
                var res = '';
                try {
                    // parse成功说明是正规的json格式的数据。走这里。
                    res = JSON.parse(decodeURIComponent(arr[1]));
                } catch (e) {
                    // parse失败说明非正规的json格式的数据。走这里。
                    res = decodeURIComponent(arr[1]);
                }
                // 地址栏中获取的数据其类型默认都应该是字符串
                if (typeof res === 'number') {
                    res = String(res);
                }
                result[arr[0]] = res;
            });
        }
        return result;
    };

    return new QueryString();
});