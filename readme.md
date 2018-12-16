# 解析URL查询字符串
```
const queryString = require('zhf.query-string');

console.log(queryString.queryStringify({username: 'hello world'})); // username=hello%20world
console.log(queryString.queryParse('#a=1&b=2')); // {a: '1', b: '2'}
console.log(queryString.queryParse('?a=1&b=2')); // {a: '1', b: '2'}
console.log(queryString.queryParse('a=1&b=2')); // {a: '1', b: '2'}
console.log(queryString.queryStringify({a: 1, b: 2})); // 'a=1&b=2'
console.log(queryString.queryStringify({a: 1, b: ['x', 'y', 'z'], c: {n: 'n', m: 'm'}})); // 'a=1&b=%5B%22x%22%2C%22y%22%2C%22z%22%5D&c=%7B%22n%22%3A%22n%22%2C%22m%22%3A%22m%22%7D'
console.log(queryString.queryParse('a=1&b=%5B%22x%22%2C%22y%22%2C%22z%22%5D&c=%7B%22n%22%3A%22n%22%2C%22m%22%3A%22m%22%7D')); // {a: '1', b: ['x', 'y', 'z'], c: {n: 'n', m: 'm'}}
console.log(queryString.queryParse('a={"sentence":"hello world"}&b=["x","y","z"]')); // {a: {sentence: 'hello world'}, b: ['x', 'y', 'z']}
console.log(queryString.queryParse('a={sentence:"hello world"}&b=["x","y","z"]')); // {a: '{sentence:"hello world"}', b: ['x', 'y', 'z']} 因为 {sentence:"hello world"} 不是规范的json格式，导致JSON.parse解析不了，所以我进行了直接赋值
```

# 建议使用这个，他这个比我写的好多了
* https://www.npmjs.com/package/query-string
