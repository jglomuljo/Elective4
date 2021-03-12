const names = ['Jo', 'Selle', 'Lom'];

const students = [
    {fname: names[0], age: 21, course:'BSIT'},
    {fname: names[1], age: 22, course:'BSCS'},
    {fname: names[2], age: 23, course:'BSIS'}
];


const greet = function (str = null){
    console.log('helo ${str}');
}


module.exports = {names, students, greet};