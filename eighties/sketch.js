
let count = 0;
let input = "Hello World";
let ground;
let wall;
let speedSlider;
let speedText;
let checkbox;
let fpsText;
let avgFps = 0;
let avgFpsTemp = 0;

alert("Please be advised! This sketch may cause an epileptic reaction");

let bg;
function preload(){
  bg = loadImage('bg.jpg');

}

function setup(){
  createCanvas(770,740,WEBGL);
  ground = createGraphics(600,600);
  //wall = createGraphics(1200,600);
  speedSlider = createSlider(0,9,1);
  speedSlider.position(20,20);
  speedText = createP(1);
  fpsText = createP(0);
  checkbox = createCheckbox("Debug");
  checkbox.style("color", "white");
  checkbox.position(20,40);
}

function draw(){
  if(mouseX > 100 && mouseY > 100){
    speedSlider.position(-200,0);
    checkbox.position(-200,0);
    speedText.position(-200,0);
  } else {
    speedSlider.position(20,20);
    checkbox.position(20,40);
    speedText.position(6,8);
  }
  background(0);
  count += speedSlider.value();
  if(speedText.value != speedSlider.value()){
    speedText.remove();
    speedText = createP(speedSlider.value());
    speedText.style("color", "white");
    speedText.position(6,8);
  }

  push();
      push();
        ground.background(0);
        ground.stroke(185, 23, 189);
        ground.fill(0,0,0);
        ground.pixelDensity(3);
        ground.strokeWeight(1);
        for(let y = 0; y < 30; y++){
          for(let x = 0; x < 18;x++){
            ground.rect(130+x*20,count+y*20,20,20);
          }
        }

        count>20?count = 0: count;
      pop();
    texture(ground);
    translate(0,100,-1000);
    rotateX(HALF_PI);
    plane(5000,3000);
  pop();

  if(checkbox.checked()){
    plane(600,600);
      fpsText.remove();
      fpsText = createP("Avg. fps: " + nfc(avgFps,2));
      fpsText.style("color", "white");
      fpsText.position(6,45);

  } else {
      fpsText.remove();
  }

push();
  /*wall.background(5, 2, 8);
  wall.fill(185, 23, 189,10);
  wall.ellipse(wall.width/2+0.1*35,433,220);
  wall.fill(250, 176, 10,50);
  wall.ellipse(wall.width/2+0.1*35,433,200);*/

  texture(bg);
  translate(0,-850,-2500);
  plane(3800,1900);

pop();

  avgFpsTemp += frameRate();
  if(frameCount % 60 == 0){
    avgFps = avgFpsTemp/60;
    avgFpsTemp = 0;
  }

}
