// Unix epoch - January 1st, 1970 00:00:00 am
const moment = require('moment');

const date = moment();
date.add(1, 'years').subtract(9, 'months');

console.log(date.format('MMMM DD, YYYY'));

console.log(date.format('DDD'));

console.log(date.format('MMMM Do, YYYY'));

// Current time - 10:35 am format
// padded minutes, unpadded hours

const someTimestamp = moment().valueOf();
console.log("################");
console.log(someTimestamp);
console.log("################");

const createdAt = new Date();
const myDate = moment(createdAt);

console.log(myDate.format('h:mm a'));