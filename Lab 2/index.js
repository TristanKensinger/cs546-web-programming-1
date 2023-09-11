const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

//mean
try {
    //should pass
    const result = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
} catch (e) {
    console.error('mean failed test case');
}
try {
    //should fail
    const result = arrayUtils.mean(1234);
    console.error('mean did not error');
} catch (e) {
    console.log('mean failed successfully');
}

//medianSquared
try {
    //should pass
    const result = arrayUtils.medianSquared([2, 3, 4]);
    console.log('medianSquared passed successfully');
} catch (e) {
    console.error('medianSquared failed test case');
}
try {
    //should fail
    const result = arrayUtils.medianSquared(1234);
    console.error('medianSquared did not error');
} catch (e) {
    console.log('medianSquared failed successfully');
}

//maxElement
try {
    //should pass
    const result = arrayUtils.maxElement([2, 3, 4]);
    console.log('maxElement passed successfully');
} catch (e) {
    console.error('maxElement failed test case');
}
try {
    //should fail
    const result = arrayUtils.maxElement(1234);
    console.error('maxElement did not error');
} catch (e) {
    console.log('maxElement failed successfully');
}

//fill
try {
    //should pass
    const result = arrayUtils.fill(3, 'Welcome');
    console.log('fill passed successfully');
} catch (e) {
    console.error('fill failed test case');
}
try {
    //should fail
    const result = arrayUtils.fill(0);
    console.error('fill did not error');
} catch (e) {
    console.log('fill failed successfully');
}

//countRepeating
try {
    //should pass
    const result = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countRepeating passed successfully');
} catch (e) {
    console.error('countRepeating failed test case');
}
try {
    //should fail
    const result = arrayUtils.countRepeating("foobar");
    console.error('countRepeating did not error');
} catch (e) {
    console.log('countRepeating failed successfully');
}

//isEqual
try {
    //should pass
    const result = arrayUtils.isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]]);
    console.log('isEqual passed successfully');
} catch (e) {
    console.error('isEqual failed test case');
}
try {
    //should fail
    const result = arrayUtils.isEqual([1, 2, 3]);
    console.error('isEqual did not error');
} catch (e) {
    console.log('isEqual failed successfully');
}

//camelCase
try {
    //should pass
    const result = stringUtils.camelCase('my function rocks');
    console.log('camelCase passed successfully');
} catch (e) {
    console.error('camelCase failed test case');
}
try {
    //should fail
    const result = stringUtils.camelCase(123);
    console.error('camelCase did not error');
} catch (e) {
    console.log('camelCase failed successfully');
}

//replaceChar
try {
    //should pass
    const result = stringUtils.replaceChar("babbbbble");
    console.log('replaceChar passed successfully');
} catch (e) {
    console.error('replaceChar failed test case');
}
try {
    //should fail
    const result = stringUtils.replaceChar(123);
    console.error('replaceChar did not error');
} catch (e) {
    console.log('replaceChar failed successfully');
}

//mashUp
try {
    //should pass
    const result = stringUtils.mashUp("Patrick", "Hill");
    console.log('mashUp passed successfully');
} catch (e) {
    console.error('mashUp failed test case');
}
try {
    //should fail
    const result = stringUtils.mashUp("John");
    console.error('mashUp did not error');
} catch (e) {
    console.log('mashUp failed successfully');
}

//makeArrays
try {
    //should pass
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };
    const result = objUtils.makeArrays([first, second, third]);
    console.log('makeArrays passed successfully');
} catch (e) {
    console.error('makeArrays failed test case');
}
try {
    //should fail
    const result = stringUtils.makeArrays([1,2,3]);
    console.error('makeArrays did not error');
} catch (e) {
    console.log('makeArrays failed successfully');
}

//isDeepEqual
try {
    //should pass
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"};
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}};
    const result = objUtils.isDeepEqual(forth, fifth);
    console.log('isDeepEqual passed successfully');
} catch (e) {
    console.error('isDeepEqual failed test case');
}
try {
    //should fail
    const result = stringUtils.isDeepEqual([1,2,3], [1,2,3]);
    console.error('isDeepEqual did not error');
} catch (e) {
    console.log('isDeepEqual failed successfully');
}

//computeObject
try {
    //should pass
    const result = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject passed successfully');
} catch (e) {
    console.error('computeObject failed test case');
}
try {
    //should fail
    const result = stringUtils.computeObject({}, n => n * 2);
    console.error('computeObject did not error');
} catch (e) {
    console.log('computeObject failed successfully');
}