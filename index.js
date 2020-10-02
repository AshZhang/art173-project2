const gravity = 0.8;

const pendulums = Array.from({ length: 4 },(e, i)=> {
    return new Pendulum(400, (i+1)*100, (i+1)*30, gravity)
});


function setup(){
    createCanvas(800, 800);
}

function draw(){
    background(220, 220, 250);

    pendulums.forEach(pendulum => {
        pendulum.update();
        pendulum.display();
    })

}