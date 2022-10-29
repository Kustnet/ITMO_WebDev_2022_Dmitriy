const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = '#f1f1f1';
document.getElementById('app').append(canvas);

var ctx = canvas.getContext('2d');
class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Planet {
  constructor(color, autmospher, position, size) {
    this.color = color;
    this.autmospher = autmospher;
    this.position = position;
    this.size = size;
  }
  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.autmospher;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }
}

class Earth extends Planet {
  constructor(position) {
    super('green', 'blue', position, 40);
  }
}

class Sun extends Planet {
  constructor(position) {
    super('red', 'yellow', position, 100);
  }
}

// const sun = {
//   color: 'red',
//   autmospher: 'blue',
//   x: 100,
//   y: 100,
//   size: 60,
// };

const sun = new Sun(new Position(canvas.width / 2, canvas.height / 2), 100);
const earth = new Earth(placePlanetRelativeToSun(sun, 10, 40), 40);
// function drowPlanet(planet) {
//   ctx.fillStyle = planet.color;
//   ctx.strokeStyle = planet.autmospher;
//   ctx.lineWidth = 2;
//   ctx.beginPath();
//   ctx.arc(planet.x, planet.y, planet.size, 0, 2 * Math.PI);
//   ctx.fill();
//   ctx.stroke();
// }
function placePlanetRelativeToSun(planet, offset, radius) {
  return new Position(
    planet.position.x + planet.size + offset + radius,
    planet.position.y + planet.size + offset + radius
  );
}
let alpha = 0;
sun.render(ctx);
// earth.render(ctx);
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const offsetPosition = (earth.position.x = 100 * Math.sin(alpha) + sun.position.x);
  earth.position.y = 100 * Math.cos(alpha) + sun.position.y;
  earth.render(ctx);
  alpha += 1 / Math.PI;
  if (alpha >= 2 * Math.PI) alpha = 0;
}, 100);
