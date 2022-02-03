class Layer {
  constructor(image, speedModifier = 1) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height =  700;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = gameSpeed * this.speedModifier;
  }
  update() {
    this.speed = gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = 0
    }
    this.x = Math.floor(this.x - this.speed);
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 2;

const speedModifiers = [0.2, 0.4, 0.6, 0.8, 1];
const layers = [];

for (let i = 0; i < 5; i++) {
  const backgroundImage = new Image();
  backgroundImage.src = `assets/bg/layer-${i + 1}.png`;
  const layer = new Layer(backgroundImage, speedModifiers[i] ?? 1);
  layers.push(layer);
}

const slider = document.getElementById('slider');
slider.value = gameSpeed;
const showGameSpeed = document.getElementById('showGameSpeed');
showGameSpeed.innerText = gameSpeed;
slider.addEventListener('change', e => {
  gameSpeed = e.target.value;
  showGameSpeed.innerText = gameSpeed;
})

const audio = document.querySelector('#audio');
audio.volume = 0.3;
const audioToggler = document.querySelector('.audio-toggler');
audioToggler.addEventListener('click', () => {
  audioToggler.classList.toggle('off');
  audio.paused ? audio.play() : audio.pause();
})
function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  layers.forEach(layer => {
    layer.update();
    layer.draw();
  })
  requestAnimationFrame(animate);
}

animate();