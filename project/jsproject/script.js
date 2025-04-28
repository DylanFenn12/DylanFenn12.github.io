//Import all of the elements from Matter.js library
const { Engine, Render, Runner, Bodies, Composite, Events, Body } = Matter;

const board = document.getElementById("board");
const display = document.getElementById("phone-display");
const input = document.getElementById("digit-input");

const COLS = 12, ROWS = 12;
let digits = Array(10).fill(null);
let engine, world, render, runner;
let bins = [];
let balls = [];

//updatedisplay function
function updateDisplay() {
  let phonenumbers = "";
    for (let i = 0; i < digits.length; i++) {
if (i === 3 || i === 6) {
      phonenumbers += "-" + (digits[i] ?? "_");
    }
    else {
      phonenumbers += digits[i] ?? "_";
    }
  }
  display.textContent = phonenumbers;
}

function initPhysics() {
  const width = board.clientWidth;
  const height = board.clientHeight;
  engine = Engine.create();
  world = engine.world;

    render = Render.create({
    element: board,
    engine: engine,
    options: {
      width: width,
      height: height,
      wireframes: false,
      background: "navy",
    }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    //walls
    Composite.add(world, [
        Bodies.rectangle(width / 2, -10, width, 20, { isStatic: true }),
        Bodies.rectangle(-10, height / 2, 20, height, { isStatic: true }),
        Bodies.rectangle(width + 10, height / 2, 20, height, { isStatic: true }),
    ]);

    //pegs
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < COLS; col++) {
    const pegX = (width / COLS) * 1.3;
    const pegY = ((height - 20) / (ROWS + 1)) * 1.1;
    const x = -33 + ((col + (row % 2 ? .5 : 0)) * pegX) + (pegX / 2);
    const y = (row + 1) * pegY;

    Composite.add(world,
        Bodies.circle(x, y, 12, {
            isStatic: true,
            restitution: 1,
            render: {
                fillStyle: "white",}
        })
    );
        }
    }

    //bins
const binWidth = width / 10;
const binHeight = 40;
for (let i = 0; i < 10; i++) {
    const x = i * binWidth + (binWidth / 2);
    const bin = Bodies.rectangle(x, height - binHeight / 2, binWidth - 4, binHeight, {
        isStatic: true,
        label: `bin_${i}`,
        render: {
            fillStyle: "black",
            strokeStyle: "white",
            lineWidth: 1,
        }
    });
    bins.push(bin);
    Composite.add(world, bin);
}

//collision detection
Events.on(engine, "collisionStart", e => {
    e.pairs.forEach(({bodyA, bodyB}) => {
        const [ball, bin] = [bodyA, bodyB].sort(
            (a, b) => (a.label === "ball" ? -1 : 1)
          );          

        if (ball.label === "ball" && bin.label.startsWith("bin_")) {
            const binIndex = +bin.label.split("_")[1];
            if (digits[binIndex] === null) {
                digits[binIndex] = ball.digit;
                updateDisplay();
                bin.render.fillStyle = "green";
                Body.setStatic(ball, true);
                ball._binIndex = binIndex;
            } else {
                    Composite.remove(world, ball);
                }
            }
        });
    });

    //digits on ball
    Events.on(render, "afterRender", () => {
        const context = render.context;
        context.font = "bold 15px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.textBaseline = "middle";
        world.bodies.forEach(body => {
            if (body.label === "ball") {
                context.fillText(body.digit, body.position.x, body.position.y);
            }
        });
    });

// bin separators
for (let i = 1; i < 10; i++) {
    const x = i * binWidth;
    const separator = Bodies.rectangle(x, height - binHeight / 2, 3, 80, {
        isStatic: true,
        render: {
            fillStyle: "white",
            strokeStyle: "white",
            lineWidth: 1,
        }
    });
    Composite.add(world, separator);
}
}

function dropBall(n){
const ball = Bodies.circle(Math.random() * board.clientWidth, 10, 12, {
    label: "ball",
    restitution: 1,     // bounciness of ball
    render: {
        fillStyle: "red"}
});
ball.digit = n;
Composite.add(world, ball);
balls.push(ball);
}

//Event Listeners
document.getElementById("ok").addEventListener("click", () => {
    const value = parseInt(input.value);
    if (value >= 0 && value <= 9) {
        dropBall(value);
    }
    else {
        alert("Please enter a digit between 0 and 9");
        return;
    }
});

document.getElementById("undo").addEventListener("click", () => {
    const lastBall = balls.pop();
    if (!lastBall) {
        alert("No balls to remove");
        return;
    }
    if (lastBall._binIndex != null) {
        digits[lastBall._binIndex] = null;
        bins[lastBall._binIndex].render.fillStyle = "black";
        updateDisplay();
    }
    Composite.remove(world, lastBall);
});

document.getElementById("reset").addEventListener("click", () => {
    location.reload();
}
);

document.getElementById("enter").addEventListener("click", () => {
    alert(`Phone number entered: ${display.textContent}`);
});

//init
window.addEventListener("load", () => {
    initPhysics();
    updateDisplay();
});