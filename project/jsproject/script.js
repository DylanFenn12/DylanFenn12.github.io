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
    