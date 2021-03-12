const http = require('http');
const fs = require('fs');



const server = http.createServer((req, res)=>{
    console.log(req.url);
    res.setHeader('Content-Type', 'text/html');
    let pages = './pages/';

    if(req.url == '/'){
        pages += 'index.html';
        res.statusCode == 200;
    }else if(req.url == '/about'){
        pages += 'about.html';
        res.statusCode == 200;
    }else if(req.url == '/contact'){
        pages += 'contact.html';
        res.statusCode == 200;
    }else{
        pages += 'error.html';
        res.statusCode == 404;
    }

    fs.readFile(pages, (err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }else{
            res.end(data);
        }
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening');
});

//readfile
// fs.readFile('./files/note1.text', {encoding: 'utf8'}, (err, data) => {
//     if(err){
//         console.log(err);
//     }
//     else{
//     console.log(data);
//     }
// });
// console.log('this is last line of code');

//write file
// fs.writeFile('./files/note2.txt', 'Joselle', () => {
//     console.log('successful write');

// });

// fs.appendFile('./files/note2.txt', '\n\nJoselly Wow\n', (err)=> {
//     if(err){
//         console.log(err);
//     } else{
//         console.log('appended file.');
//     }
// });

// const readStream = fs.createReadStream('./files/note3.txt');

// readStream.on('data', (chunk)=>{
//     console.log('\nNewData\n');
//     console.log(chunk.toString());
// });