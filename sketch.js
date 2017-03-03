/////////////////////////////////////////////////////////////////////////////////////////////////
// GLOBAL VARIABLES /////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////
var P;         // Particle array
var N = 20;         // number of Particle columns

/////////////////////////////////////////////////////////////////////////////////////////////////
// p5.js FUNCTIONS //////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

// p5: setup() //////////////////////////////////////////////////////////////////////////////////
function setup() {
  // set canvas size
  createCanvas( windowWidth , windowHeight );
  // initialize particles
  P = [];
  var w = windowWidth / N;
  var h = windowWidth / N;
  for( var n = 0 ; n < N ; n++ ) {
    P[n] = new Particle( n*w , 0.5*(windowHeight-h)  , w , h );
  }
} // end of p5: setup()

// p5: draw() ///////////////////////////////////////////////////////////////////////////////////
function draw() {
  // draw the background
  background( 255 );
  // evolve the particles
  for( var n = 0 ; n < N ; n++ ) {
    P[n].evolve();
    P[n].draw();
  }
} // end of p5: draw()

/////////////////////////////////////////////////////////////////////////////////////////////////
// CLASS: Particle
//    A particle contained in a bounding box
/////////////////////////////////////////////////////////////////////////////////////////////////
// INPUTS:
//    xIn: x coordinate for upper-right corner of bounding box
//    yIn: y coordinate for upper-right corner of bounding box
//    wIn: width of bounding box
//    hIn: height of bounding box
/////////////////////////////////////////////////////////////////////////////////////////////////
function Particle( xIn , yIn , wIn , hIn ) {
  /////////////////////////////////////////////////////////////////////////////////////////
  // FIELDS: Particle /////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  this.x = xIn;     // x coordinate for upper-right corner of bounding box
  this.y = yIn;     // y coordinate for upper-right corner of bounding box
  this.w = wIn;     // width of bounding box
  this.h = hIn;     // height of bounding box
  // position of the particle (random location inside of bounding box)
  this.p = createVector( random(this.x,this.x+this.w) , random(this.y,this.y+this.h) );
  // velocity of the particle (random direction with magnitude 1)
  this.v = p5.Vector.random2D();
  
  /////////////////////////////////////////////////////////////////////////////////////////
  // METHODS: Particle ////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////////////////
  // Particle Method: draw()
  //    draws the particle, its velocity direction, and the bounding box
  /////////////////////////////////////////////////////////////////////////////////////
  this.draw = function() {
    // draw bounding box
    rect( this.x , this.y , this.w , this.h );
    // draw particle
    ellipse( this.p.x , this.p.y , 10 , 10 );
    // draw perticle velocity
    line( this.p.x , this.p.y , this.p.x + 10*this.v.x , this.p.y + 10*this.v.y );
  } // end of Particle method: draw()///////////////////////////////////////////////////
  
  /////////////////////////////////////////////////////////////////////////////////////
  // Particle Method: evolve()
  //    updates the particle's position and velocity:
  //    ToDo: Particle needs to bounce off of walls of the bounding box
  //    NEEDS TO BE COMPLETED - SEE BELOW!!!!!!!!
  /////////////////////////////////////////////////////////////////////////////////////
  this.evolve = function() {
    // update the position by adding the velocity to it
    this.p.add( this.v );
    
    // check whether particle has moved outside of bounding box, and adjust the
    //   velocity accordingly:
    // if particle has gone off left edge
    if( this.p.x < this.x ) {
      // update the particle's velocity
      // force x component of velocity to be positive (moving right)
      this.v.x = abs( this.v.x );
    }
    // if particle has gone off right edge
    if( this.p.x > this.x + this.w ) {
      // update the particle's velocity
      // force x component of velocity to be negative (moving left)
      this.v.x = -abs( this.v.x );
    }
    // if particle has gone off upper edge
    if( this.p.y < this.y ) {
      // update the particle's velocity
      // force y component of velocity to be positive (moving up)
      this.v.y = abs( this.v.y );
    }
    // if particle has gone off lower edge
    if( this.p.y > this.y + this.h ) {
      // update the particle's velocity
      // force y component of velocity to be negative (moving down)
      this.v.y = -abs( this.v.y );
    }
  } // end of Particle method: evolve() /////////////////////////////////////////////////////////
} // END OF CLASS: Particle /////////////////////////////////////////////////////////////////////
