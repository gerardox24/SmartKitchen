let mobilenet;
let video;
let label = 'test';
let value = 0;
let telephoneButton;
let trainButton;
let saveButton;

function modelReady() {
    console.log('Model is ready!!!');
    classifier.load('model.json', customModelReady);
}

function customModelReady() {
    console.log('Custom Model ready!!!');
    label = 'Model ready';
    classifier.classify(gotResults);
}

function videoReady() {
    console.log('Video is ready!!!');
}

function whileTraining(loss) {
    if (loss == null) {
        console.log('Training Complete');
        classifier.classify(gotResults);
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
    }
}

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', video, modelReady);
    classifier = mobilenet.classification(video, videoReady);

    telephoneButton = createButton('add telephone');
    telephoneButton.mousePressed(function() {
        classifier.addImage('telephone');
    });

    trainButton = createButton('train');
    trainButton.mousePressed(function() {
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

    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}