var canvas = document.getElementById('canvas')
canvas.width = window.innerWidth-4;
canvas.height = window.innerHeight-8;
var ctx = canvas.getContext('2d');

var mouse = {
  x: undefined,
  y: undefined
}
var maxRadius = 40;
// var minRadius = 3;

var colorArray = [
  '#7109AA',
  '#9FEE00',
  '#FFD300',
  '#48036F',
  '#FFE773',
]

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(event){
    canvas.width = window.innerWidth-4;
    canvas.height = window.innerHeight-8;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius,
  this.minRadius = radius,
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fillStyle = this.color;
    ctx.fill()
  }

  this.update = function() {
    if(this.x>canvas.width-this.radius || this.x-this.radius<0){
      this.dx = -this.dx;
    }
    if(this.y>canvas.height-this.radius || this.y-this.radius<0){
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if(this.radius < maxRadius){
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }

}

var circleArray = [];

for (var i = 0; i < 3000; i++) {
  var x = Math.random()*(canvas.width-radius*2) + radius,
      y = Math.random()*(canvas.height-radius*2) + radius,
      dx = Math.random() - 0.7 ,
      dy = Math.random() - 0.7 ,
      radius = Math.random() * 10 + 1;

  circleArray.push(new Circle(x, y, dx, dy, radius));
}

console.log(circleArray);

function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

animate();
