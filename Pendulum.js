class Pendulum {
    constructor(originX, frequency, ballRadius, gravity){
        this.originX = originX;
        this.originY = 0;
        this.ballX = originX + frequency;
        this.ballY = this.originY + frequency;
        this.ballRadius = ballRadius;
        this.gravity = gravity;
        this.frequency = frequency;
        this.angle = Math.PI/2;
        this.angleVelocity = 0.0;
        this.angleAcceleration = 0.0;
        this.damping = 0.999;
        this.strokeColor = [140,40,140];
        this.strokeWeight = 6;
        this.fillColor = [200,60,120];
    }

    updateAngle(){
        this.angleAcceleration = (-1 * gravity / this.frequency) * sin(this.angle);  // Calculate acceleration (see: http://www.myphysicslab.com/pendulum1.html)
        this.angleVelocity += this.angleAcceleration;                            // Increment velocity
        this.angleVelocity *= this.damping;                                  // Arbitrary damping
        this.angle += this.angleVelocity;    
    }

    updatePosition(){
        // this.position.set(this.frequency * sin(this.currentAngle), this.frequency * cos(this.angle), 0); 
        // console.log(this.angle);
        this.ballX = Math.sin(this.angle) * this.frequency + this.originX;
        this.ballY = Math.cos(this.angle) * this.frequency; 
    }

    update(){
        this.updateAngle();
        this.updatePosition();
    }

    display(){
        stroke(this.strokeColor);
        strokeWeight(this.strokeWeight);
        fill(this.fillColor);
        line(this.originX, this.originY, this.ballX, this.ballY);
        ellipse(this.ballX, this.ballY, this.ballRadius * 2);

    }

}
