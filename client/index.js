console.log('ml5 version:', ml5.version);

let mobilenet;
let video;
let label = 'test';
let value = 0;
let ukeButton;
let whistleButton;
let trainButton;
// let slider;
// let addButton;
// let predictor;

function modelReady() {
    console.log('Model is ready!!!');
    //mobilenet.predict(gotResults);
}

function videoReady() {
    console.log('Video is ready!!!');
    //mobilenet.predict(gotResults);
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training Complete');
        classifier.classify(gotResults);
        //predictor.predict(gotResults);
    } else {
        console.log(loss);
    }
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result[0].label;
        classifier.classify(gotResults);
        // value = result.value;
        // predictor.predict(gotResults);

    }
}

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
    classifier = mobilenet.classification(video, videoReady);
    // predictor = mobilenet.regression(video, videoReady);

    // slider = createSlider(0, 1, 0.5, 0.01);

    ukeButton = createButton('add banana');
    ukeButton.mousePressed(function() {
        classifier.addImage('banana');
    });

    whistleButton = createButton('add orange');
    whistleButton.mousePressed(function() {
        classifier.addImage('orange');
    });

    // addButton = createButton('add example image');
    // addButton.mousePressed(function() {
    //     predictor.addImage(slider.value());
    // })

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
        // predictor.train(whileTraining);
        classifier.train(whileTraining);
    })

    saveButton = createButton('save');
    saveButton.mousePressed(function() {
        classifier.save();
    })
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    // rectMode(CENTER);
    // fill(255, 0, 200);
    // rect(value * width, height / 2, 50, 50);

    fill(255);
    textSize(16);
    text(label, 10, height - 10);
    // text(value, 10, height - 10);
}