const { VM, VMScript } = require('vm2');
 
let vm = new VM({
  timeout: 1000,
  sandbox: {}
});
 
const code = `
const sum = (a,b) => a + b;
 
//for(let i = 0; i < 1e10; i++){  2 * 2; }
 
var v1 = sum(1,1;
let v2 = sum(2,2);
const v3 = sum(3,3);
this.v4 = sum (4,4);
123
`
 
try {
  vm.run(code);
} catch (err) {
  console.error(' ');
  console.error('Ошибка скрипта...');
  console.error(' ');
 
  // получаем фрагменты ответа с ошибкой от интерпретатора
  const [
    fileAndLineNumber,
    code,
    pointer,
    ,
    message
  ] = err.stack.split('\n');
 
 
  // если ошибка во второй строке "vm.js:2", получаем 2
  const line = fileAndLineNumber.split(':')[1];
 
  // номер символа где ошибка
  position = pointer.indexOf('^')
 
  // собираем новый ответ ошибку
  const error = {
    line,
    code,
    message,
    position
  }
 
  console.log('\tНомер строки с ошибкой: ', line)
 
  //errorCodeLine и cursorErrorCode нужно выводить вместе в <pre>
  console.log('\tСтрока  с ошибкой', code)
  console.log('\tГде именно ошибка', pointer)
 
  console.log('\tОшибка ', message)
  console.log('\tПозиция символа с ошибкой ', position)
 
  console.error(' ');
  console.log(JSON.stringify(error, null, ' '));
}
