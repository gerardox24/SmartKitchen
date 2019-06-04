console.log('ml5 version: ', ml5.version);

let mobilenet;
let video;
let label = 'Loading model...';
let value = 0;

function modelReady() {
    console.log('Model is ready!!!!');
    classifier.load('model_banana.json', customModelReady);
}

function customModelReady() {
    console.log('Custom Model ready!!!');
    label = 'Model ready';
    classifier.classify(gotResults);
}

function videoReady() {
    console.log('Video is ready!!!');
}

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
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
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);

    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}