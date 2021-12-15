import { VM, VMScript } from 'vm2';

export default function(task, code){
  // извлечение подзадач
const subtasks = task.subtasks;

// создание песочницы
const sandbox = {result:[]}
let vm = new VM({ timeout: 1000, sandbox });
 

//подготовка тестов для задачи
const tests = subtasks.map(
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

const script = new VMScript(codeTest);

try {
  vm.run(script);
  return sandbox.result
} catch (err) {
 
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

  return error;  
}

}