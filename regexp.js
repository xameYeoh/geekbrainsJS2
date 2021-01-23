//task 1
const text = "Hello 'User' aren't 'admin'";
let changed = text.replace(/'/gm, '"');
console.log(changed);
//task2
const text2 = "Hello 'User' and 'admin'";
let changed2 = text.replace(/^'|'$|\s'/gm, ' "')
console.log(changed2);