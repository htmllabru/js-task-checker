const { VM, VMScript } = require('vm2');
 

const sandbox = {
    test: [
         function(v1){ console.log(v1); return v1 === 234}
    ],
    messages: [],
    v1: 12
};

let vm = new VM({
  timeout: 100,
  sandbox
});
 
const code = `
const v1 = 234;


messages.push( { type: typeof v1 == 'number' ? 'success' : 'error', payload: 'v1 создана и она числового типа' })  
messages.push( { type: v1 == 234 ? 'success' : 'error', payload: 'v1 равна 234' })  
messages.push( { type: test[0](v1) ? 'success' : 'error', payload: 'проверка функцией: v1 равна 234' })  

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

console.log(sandbox.messages)