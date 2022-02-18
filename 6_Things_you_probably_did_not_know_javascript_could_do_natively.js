//reference link: https://dev.to/duranenmanuel/6-things-you-probably-did-not-know-javascript-could-do-natively-2pen

//! new for me
// Getting query string parameters
// URLSearchParams: an interface that allows us to process query string parameters
// to get the query strings from the current url use window.location.search
const queryStrings = new URLSearchParams('?browser=chrome&action=redirect');
let a = queryStrings.get('browser');
let b = queryStrings.has('action');


// Create a unique list of elements using the Set object --- 去重
const list = [1, 2, 3, 5, 2, 5, 7];
const uniqueList = [...new Set(list)];

//! new for me
// Cast a list of primitive values to a different type
// 把数组中的元素通过 map 变成自己想要的数据类型
const naiveList = ['1500', '1350', '4580'];
const castedList = naiveList.map(Number);

// Avoid object mutations with Object.freeze
const immutableObject = {
    name: 'Enmascript',
    url: 'https://enmascript.com'
};
Object.freeze(immutableObject);
immutableObject.twitter = 'https://twitter.com/duranenmanuel';
immutableObject.name = 'Another name';

// Flatten nested array values
const nestedList = [133, 235, 515, [513, 15]];
const flattenList = nestedList.flat();

// Created Controlled objects with Object.seal
// this allows you to change the values of properties that were already defined in the object, this will enable you to _control _the properties declared in an object but not the definitions:
const controlledObject = {
    name: 'Barry Allen'
};
Object.seal(controlledObject);
controlledObject.name = 'Clark Kent';
controlledObject.hero = 'Superman';
// controlledObject will return { name: "Clark Kent" }
console.log("controlledObject", controlledObject);