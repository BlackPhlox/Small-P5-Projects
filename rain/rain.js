var drops = [];
var rSlider, gSlider, bSlider;
var colorText = [255,255,255]; //Purple Rain [158, 7, 240]
var colorRain = [255,255,255]; //Purple Rain [158, 7, 240]
var colorBackground = [42,42,42];
var thickness = 1; //px
var headline = "Rain";
var maxVerSpeed=-40; //-px per sec  Default: -40
var minVerSpeed=-10; //-px per sec  Default: -10
var maxHozSpeed= 1;  //-px per sec  Default:  1
var minHozSpeed=-1;  //-px per sec  Default: -1
var wishDrops = 50;
var canvas;
var url = "http://www.youtube.com/watch?v=qIN4jQ7TgmY&index=1&list=PLsTiS0DBbj57lPyD95CEo0itdqJy64xT2";
var showUrl;
var p;

var sel;
var inp;
var state = 'Light';

function preload(){
  f = loadFont("BebasNeue.otf");
}

function setup(){
  canvas = createCanvas(windowWidth,windowHeight);
  spawnDrops();
  windowResized();

  var sel = createSelect();
  sel.position(10,10);
  sel.style('width', '72px');
  sel.option('Light');
  sel.option('Medium');
  sel.option('Heavy');
  sel.option('Custom');
  sel.changed(mySelectEvent);
  rSlider = createSlider(0, 255, 255);
  rSlider.position(10, 40);
  gSlider = createSlider(0, 255, 255);
  gSlider.position(10, 70);
  bSlider = createSlider(0, 255, 255);
  bSlider.position(10, 100);

  rSlider.style('width', '72px');
  gSlider.style('width', '72px');
  bSlider.style('width', '72px');
  rSlider.changed(rS);
}

function rS(){
  console.log(rSlider.value());
}

function showInp(bool){
  if (bool){
    var inp = createInput('');
    inp.position(10,30);
    inp.style('width', '20px');
    inp.input(changeDrops);
  } else {
    inp.remove();
  }
}

function changeDrops(){
  wishDrops = this.value();
}

function mySelectEvent() {
  var bool = false;
  if (this.value() == "Light"){
    bool = false;
    wishDrops = 20;
  }
  if (this.value() == 'Medium'){
    bool = false;
    wishDrops = 50;
  }
  if (this.value() == 'Heavy'){
    bool = false;
    wishDrops = 200;
  }
  if (this.value() == 'Custom'){
    bool = true;
  }
  showInp(bool);
}

function spawnDrops(){
  for (var i = 0; i<wishDrops;i++){
    drops[i] = new Drop(
    map(random(),0,1,0,width),
    map(random(),0,1,-60,height),
    random(),
    map(random(),0,1,minHozSpeed,maxHozSpeed),
    map(random(),0,1,minVerSpeed,maxVerSpeed)
  );
  }
}

function addDrops(){
  drops.push(new Drop(
    map(random(),0,1,0,width),
    map(random(),0,1,-60,height),
    random(),
    map(random(),0,1,minHozSpeed,maxHozSpeed),
    map(random(),0,1,minVerSpeed,maxVerSpeed)
  ));
}

function removeDrops(i){
  drops.splice(i,1);
}

function manageDrops(amount){
  if (amount < drops.length){
    removeDrops();
  }
  if (amount > drops.length){
    addDrops();
  }
}

function draw(){
  manageDrops(wishDrops);
  background(colorBackground);
  updateText();
  /*
  colorText[0] = rSlider.value();
  colorText[1] = gSlider.value();
  colorText[2] = bSlider.value();
  */

  for (var i = drops.length-1 ; i>=0 ; --i){
    drops[i].update();
  }
  //canvas.mousePressed(openUrl);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function openUrl(){
  open(url);
}

function updateText(font){
  textFont(font);
  noStroke();
  fill(colorText);
  textAlign(CENTER,CENTER);
  textSize(height*0.75);
  text(headline,width/2,height/2.5);
}

function Drop(x,y,length,rateX,rateY){
  this.pos = createVector(x,y);
  this.vel = createVector(rateX,rateY);
  this.update = function (){
    this.pos.sub(this.vel);
    this.prevPos = createVector(this.pos.x,this.pos.y-30*length);
    stroke(colorRain);
    //strokeWeight(thickness);
    //textSize(20);
    //text("GG",this.prevPos.x,this.prevPos.y);
    line(this.prevPos.x,this.prevPos.y,this.pos.x,this.pos.y);
    if (this.pos.x>width || this.pos.x<0 || this.pos.y>height-length){
      this.pos = createVector(map(random(),0,1,0,width),0);
    }
  }
}
