let video;
let yolo;
let status;
let objects = [];

function setup() {
    createCanvas(320, 240);
    video = createCapture(VIDEO);
    video.size(320, 240);

    yolo = ml5.YOLO(video, modelReady);

    video.hide();
    status = select("#status");
}

function draw() {
    image(video, 0, 0, width, height);
    for (let i = 0; i < objects.length; i++) {
        noStroke();
        fill(0, 255, 0);
        text(objects[i].label, objects[i].x * width, objects[i].y * height - 5);
        noFill();
        strokeWeight(4);
        stroke(0, 255, 0);
        rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
}

function modelReady() {
    yolo.loadModel('model_yolo.json');
    startDetecting();
}

function startDetecting() {
    status.html('model loaded');
    detect();
}

function detect() {
    yolo.detect(function(err, results) {
        objects = results;
        detect();
    });
}