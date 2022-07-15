function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}
function modelLoaded(){
  console.log("Model Is Loaded!!");
}
function draw(){
  image(video,0,0,300,300);
  classifier.classify(video,got_results);
}
var previous_result = '';

function got_results(error,results){
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
        console.log(results);
        previous_result = results[0].label;
        synth = window.speechSynthesis;
        speak_data = "Object Found is " + previous_result;
        utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);

        document.getElementById("result-object-name").innerHTML = previous_result;
        document.getElementById("result-object-accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
  }
}