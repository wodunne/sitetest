let xp = 100;
let yp = 10;
let R = 160;
let G = 160;
let B = 160;
let brickNum = 200;
let redSwitch = 0;
let play = 0;
let begin = 0;
let bigText = "NAVIGATE";
let bfSize = 100;
let score = 0;
let winCon = 15;
let win = 0;

let bricks = [];
let dotsx = [];
let dotsy = [];
let textStuff;
let dots;
let scream;


function setup() {
  createCanvas(600, 400);
  scream = new p5.Oscillator();
  scream.setType('sine');
  dotter();
  textStuff = new TextStuff();
  dots = new Dots();
  for (i=0;i<brickNum;i++){
    bricks.push( new Brick(i));
    xp += 40;
    if (xp >= 500){
      yp += 20;
      xp = 100;
    }
  }
}

function draw() {
  background(0);
  title();
  if (play == 1){
    scream.freq(random(0,250));
    for (i=0;i<bricks.length;i++){
      if(begin == 1) {
        bricks[i].longer();
      }
      else bricks[i].isTouched = 0;
      bricks[i].makeMe();
    }
    makeRed();
    textStuff.makeStart();
    textStuff.makeFin();
    dots.makeStart();
    dots.makeFin();
    ender();
  }
  else if (play == 0){
    for (let i = 0; i < bricks.length;i++){
      bricks[i].ySize = 10;
    }
  }
}

function dotter(){
  let dotX = 135;
  let dotY = 25;
  for (let i=0; i < 9; i++) {
    dotsx.push(dotX);
    dotX += 40;
  }
  for (let i=0; i < 18; i++) {
    dotsy.push(dotY);
    dotY += 20;
  }
}

function makeRed(){
  for(let i=0;i<bricks.length;i++){
    if(bricks[i].isTouched == 0){
      redSwitch = 0;
    }
  }
  for(let i=0;i<bricks.length;i++){
    if(bricks[i].isTouched == 1){
      redSwitch = 1;
    }
  }
  if (redSwitch == 0){
    R = 160;
    G = 160;
    B = 160;
    scream.stop();
  }
  else if (redSwitch == 1){
    R += 6;
    G = 0;
    B = 0;
    scream.start();
  }
  if (R >= 300) R = 20;
}

function title(){
  if (play == 0){
    textAlign(CENTER);
    textSize(bfSize);
    textFont('Avenir')
    textStyle(BOLD);
    fill(300,300,300);
    text(bigText,width/2,height/2);
  }
}

function ender(){
  if (score >= winCon){
    play = 0;
    win = 1;
    bfSize = 70;
    bigText = 'ADEQUATE JOB';
  }
}

class Brick{
  constructor(id){
    this.id = id;
    this.x = xp;
    this.y = yp;
    this.xSize = 30;
    this.ySize = 10;
    this.speed = 7;
    this.isTouched = 0;
  }
  
  makeMe(){
    fill(R,G,B);
    noStroke();
    rect(this.x, this.y, this.xSize, this.ySize, 8);
  }
  
  longer(){
    
    if(mouseX >= this.x && mouseX <= this.x + this.xSize && mouseY >= this.y && mouseY <= this.y + this.ySize){
      this.ySize += this.speed;
      this.isTouched = 1;
      if (this.y+this.ySize > height){
        bfSize = 90;
        bigText = "INADEQUATE";
        play = 0;
        this.isTouched = 0;
        begin = 0;
        score = 0;
      }
    }
    else this.isTouched = 0;
    
  }
  
}

class TextStuff{
  constructor(){
    this.xStart = 10;
    this.yStart = 40;
    this.xFin = width-10;
    this.yFin = 40;
    this.size = 30;
    this.fillS = color(0,150,0);
    this.fillF = color(150,0,0);
  }
  makeStart(){
    fill(this.fillS);
    textAlign(LEFT);
    textSize(this.size);
    textFont('Avenir')
    textStyle(BOLD);
    text('start',this.xStart,this.yStart);
  }
  makeFin(){
    fill(this.fillF);
    textAlign(RIGHT);
    textSize(this.size);
    textFont('Avenir')
    textStyle(BOLD);
    text('finish',this.xFin,this.yFin);
  }
}

class Dots{
  constructor(){
    this.starterX = dotsx[int(random(0,dotsx.length))];
    this.starterY = dotsy[int(random(0,dotsy.length))];
    this.finX = dotsx[int(random(0,dotsx.length))];
    this.finY = dotsy[int(random(0,dotsy.length))];
    this.size = 5;
  }
  makeStart(){
    ellipseMode(RADIUS);
    fill(0,150,0);
    ellipse(this.starterX,this.starterY,this.size);
  }
  makeFin(){
    ellipseMode(RADIUS);
    fill(150,0,0);
    ellipse(this.finX,this.finY,this.size);
  }
}

function mousePressed(){
  if (play == 0 && win == 0) play = 1;
  else {
    if (abs(mouseX-dots.starterX) < dots.size && abs(mouseY-dots.starterY) < dots.size){
      begin = 1;
    }
    if (abs(mouseX-dots.finX) < dots.size && abs(mouseY-dots.finY) < dots.size){
      if (begin == 1){
        dots.starterX = dots.finX;
        dots.starterY = dots.finY
        dots.finX = dotsx[int(random(0,dotsx.length))];
        dots.finY = dotsy[int(random(0,dotsy.length))];
        score += 1;
      }
    }
  }
}

