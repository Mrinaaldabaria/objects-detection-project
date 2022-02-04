video="";

function preload(){
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(video, 0, 0,480, 380);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for (var i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Dtected Are : " + objects.length;
            fill("red");
            percent = floor(objects [i].confidence * 100);
            text(objects [i].label +" " + percent + "%", objects [i].x + 15, objects [i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(inputTxt.value);
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
    }
  }
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function speechUtterance()