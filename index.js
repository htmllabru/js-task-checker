const { log } = require('console');
const { VM, VMScript } = require('vm2');
 

const tasks = [
  ['( str )','str is variable'],
  ['(typeof str === `string`)','str type is `string`'],
  ['str === `Привет`','str equivalent `Привет`'],
  ['( num )','num is variable'],
  ['typeof num === `number`','num type is `number`'],
  ['num === 123', 'num equivalent 123'],
  ['( flag )','flag is variable'],
  ['typeof flag === `boolean`','flag type is `boolean`'],
  ['flag === true', 'flag equivalent true'],
  ['( txt )','txt is variable'],
  ['typeof txt === `string`','txt type is `string`'],
  ['txt === "true"', 'txt equivalent "true"'],
];

const sandbox = {result:[]}
let vm = new VM({ timeout: 1000, sandbox });
 
const code = `let str = 'Привет', txt = 'true', flag = true, num = 123;
`
const tests = tasks.map(
  ( task ) => {
    const [conditional, describe] = task;
    return `
    try{
      if(${conditional}){
        result.push( {type:'+', message: '${describe}'} )
      } else throw new Error;
    }catch(err){
        result.push( {type:'-', message: '${describe}'})
    }`
  }
)

const codeTest = `${code};\n${tests.join('\n')}`
console.log(codeTest)
const script = new VMScript(codeTest);

try {
  vm.run(script);
} catch (err) {
  // console.error(' ');
  // console.error('Ошибка скрипта...');
  // console.error(' ');
 
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
    type: 'SyntaxError',
    line,
    code,
    message,
    position
  }
 
  // console.log('\tНомер строки с ошибкой: ', line)
 
  // //errorCodeLine и cursorErrorCode нужно выводить вместе в <pre>
  // console.log('\tСтрока  с ошибкой', code)
  // console.log('\tГде именно ошибка', pointer)
 
  // console.log('\tОшибка ', message)
  // console.log('\tПозиция символа с ошибкой ', position)
 
  // console.error(' ');
  console.log(JSON.stringify(error, null, ' '));
}
console.log(JSON.stringify(sandbox.result, null, ' '));
console.log('Ошибок:', sandbox.result.filter(m => m.type == '-').length);