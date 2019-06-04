import { ml5 } from './node_modules/ml5/dist/ml5.min.js';
let fs = require('fs');

let mobilenet;

function modelReady() {
    console.log('Model ready!!');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Trainig complete');
    } else {
        console.log(loss);
    }
}

fs.readdir('./data', function(err, items) {
    console.log(items);
})