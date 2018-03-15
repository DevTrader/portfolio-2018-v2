//Canvas Particles Handler
console.log('Canvas',$(window).width(),window.innerWidth, window.innerHeight)
  let canvas = document.querySelector('canvas');

  canvas.width = $(window).width();
  canvas.height = $(window).height();

  let c = canvas.getContext('2d');
  console.log(c);

  let maxRadius = 20;
  //let minRadius = Math.random() * 8 + 1;

  //background gradient colors: 030B26,124973

  let colorArray = [
  	'#17AEC2',
  	'#89FAFA',
    '#c0f9f9'
  ]

  let mouse = {
  	x:undefined,
  	y:undefined
  }
  // Mouse event listener, updates mouse object with current mouse coordinates
  window.addEventListener('mousemove', function(event){
  	mouse.x = event.x;
  	mouse.y = event.y;
  })

  //Resizing window
  window.addEventListener('resize', function(){
  	canvas.width = $(window).width();
  	canvas.height = $(window).height();
  	init();
  })

  //Create Circle Object with parameters:

  function Circle(x, y, dx, dy, radius){
    //x and y are initial positions, dx and dy are particle velocity and radius is size.

    // Getting a random color from colorArray
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  	//parameter values

  	this.x = x;
  	this.y = y;
  	this.dx = dx;
  	this.dy = dy;
  	this.radius = radius;
  	this.minRadius = radius;//Store original radius to be used on shrink

  	//If the particle has the darker color, make it smaller and slower
  	if(this.color == '#17AEC2'){
      this.x = x;
      this.y = y;
      this.dx = dx/10;
      this.dy = dy/10;
      this.radius = radius/3;
      this.minRadius = radius/3;
    }

  	//Method, if you call Circle.draw(), this will fire and draw the circle
  	this.draw = function() {
  		c.beginPath();
      c.lineWidth = 5;
  		c.strokeStyle = '#b5f2ff';

  		c.fillStyle = this.color;



      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.stroke();
  		c.fill();
  	}

  	// Gets the limits of the window and increments x and y positions (this was in the animate function on project 03)
  	this.update = function(){
  		if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
  			this.dx = -this.dx;
  		}

  		if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
  			this.dy = -this.dy;
  		}

  		this.x += this.dx;
  		this.y += this.dy;

  //------//Interactivity

  		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {

  			if (this.radius < maxRadius){ //estabilish radius limit
  				this.radius += 0.5;
  			}
  		} else if (this.radius >  this.minRadius){ // min radius
  			this.radius -= 0.25;
  		}

  		this.draw();
  	}
  }

  //Init (for auto generating circles on resize), gets called on resize and once on startup.
  let circleArray = []

  function init(){
  	//Resets circle array as part of the init
  	circleArray = [];
    //Amount of particles
  	for(let i = 0; i < window.innerWidth/7; i++){
  		let x, y, dx, dy, radius;

  		radius = Math.random() * 4 + 1; // Absolute minimum is now 2
  		x = Math.random() * (innerWidth - radius * 2) + radius; // so it doesnt spawn beyond the canvas limits;
  		y = Math.random() * (innerHeight - radius * 2) + radius;
  		dx = (Math.random() - 0.5) * 0.65;
  		dy = (Math.random() - 0.5) * 0.95;

      //if;

  		circleArray.push(new Circle(x, y, dx ,dy, radius)) // creates new circle with randomized parameters and pushes it into the circleArray
  	}

  }

  // Animation
  function animate(){
  	requestAnimationFrame(animate); //recursion loop

  	c.clearRect(0, 0, innerWidth, innerHeight); // this clears the canvas from 0 to innerDimension so the circle isn't drawn multiple times;

  	for(let i = 0; i < circleArray.length; i++){
  		circleArray[i].update();
  	}


  }

  init();

  animate();
