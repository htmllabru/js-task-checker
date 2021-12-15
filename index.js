import jsTaskChecker from './js-task-checker.js';

// пример задачи
const task = {
  "_id": "1",
  "task": "Определите переменные str, num, flag и txt со значениями 'Привет', 123, true, 'true'. При помощи оператора определения типа убедитесь, что переменных принадлежат типам: string, number, boolean.",
  "subtasks" : [
      ["( str )","str is variable"],
      ["(typeof str === `string`)","str type is `string`"],
      ["str === `Привет`","str equivalent `Привет`"],
      ["( num )","num is variable"],
      ["typeof num === `number`","num type is `number`"],
      ["num === 123", "num equivalent 123"],
      ["( flag )","flag is variable"],
      ["typeof flag === `boolean`","flag type is `boolean`"],
      ["flag === true", "flag equivalent true"],
      ["( txt )","txt is variable"],
      ["typeof txt === `string`","txt type is `string`"],
      ["txt === 'true'", "txt equivalent `true`"]
    ]
};

// внешний код - будет получаться от обучаемого
const code = `let str 'Привет', txt = 'true', flag = true, num = 123;`

const result = jsTaskChecker(task, code);

if(typeof result.message == 'string' ){
  console.log(JSON.stringify(result, null, ' '))
} else {
  console.log(JSON.stringify(result, null, ' '))
  console.log('Ошибок:', result.message.filter(m => m.type == '-').length);
}

