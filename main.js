status= "";
objects= [];
alarm="";
function preload(){ 
    alarm = loadSound('sweet_morning_alarm.mp3');
}


function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetection = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"; 
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
    objectDetection.detect(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects = results;
    }
 
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(status =! ""){
        r = random(255);
        g = random(255);
        b = random(255);
        for(i = 0;i <objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected ";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 , objects[i].y + 15 );
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "Person"){
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                alarm.stop();
            }
            else(){
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("start");
                alarm.play();
            }
        }
    }
  
}