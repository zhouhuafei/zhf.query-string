(function (name, factory) {
    if (typeof exports === 'object' && typeof module !== 'undefined') { // nodejs - commonjs canon
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) { // requirejs - amd canon
        define(factory);
    } else { // window - browser canon
        if (Object.prototype.toString.call(window.zhf).slice(8, -1).toLowerCase() !== 'object') {
            window.zhf = {};
        }
        window.zhf[name] = factory();
    }
})('queryString', function () {
    function typeOf(v) {
        return Object.prototype.toString.call(v).slice(8, -1).toLowerCase();
    }

    function QueryString() {
    }

    // {a:1, b:2} 序列成 'a=1&b=2'
    QueryString.prototype.queryStringify = function (obj = {}) {
        const result = [];
        Object.keys(obj).forEach(function (key) {
            let v = obj[key];
            if (typeOf(v) === 'object' || typeOf(v) === 'array') {
                v = JSON.stringify(v);
            }
            result.push(`${key}=${encodeURIComponent(v)}`);
        });
        return result.join('&');
    };

    // 'a=1&b=2' 解析成 {a:'1', b:'2'}
    QueryString.prototype.queryParse = function (str, opts = {}) {
        const isFilterHashMark = opts.isFilterHashMark || true; // 是否过滤hash标识#号
        const isFilterSearchMark = opts.isFilterSearchMark || true; // 是否过滤search标识?号
        const result = {};
        if (str) {
            if ((isFilterHashMark && str.charAt(0) === '#') || (isFilterSearchMark && str.charAt(0) === '?')) {
                str = str.substring(1);
            }
            str.split('&').forEach(function (v) {
                const arr = v.split('=');
                try {
                    // 先parse一下，如果是对象就解析。
                    result[arr[0]] = JSON.parse(String(decodeURIComponent(arr[1])));
                } catch (e) {
                    // 如果不是对象就转成字符串。
                    result[arr[0]] = String(decodeURIComponent(arr[1]));
                }
            });
        }
        return result;
    };

    return new QueryString();
});
