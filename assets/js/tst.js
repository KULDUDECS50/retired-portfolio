const canvasOne = document.querySelector('.canvasOne');
const ctx = canvasOne.getContext('2d');
const text = document.querySelector('.autotype')
canvasOne.width = window.innerWidth;
canvasOne.height = window.innerHeight;
const particleArray = [];
const mouse = {
    x: undefined,
    y: undefined,
    radius: 125
}
let adjustX = 2;
let adjustY = 0;

// eventListeners
addEventListener('resize', () => {
    canvasOne.width = window.innerWidth
    canvasOne.height = window.innerHeight
})

addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})

// main
ctx.fillStyle = 'white';
ctx.font = '18px verdana';
ctx.fillText(text, 0, 30);

const textCoordinates = ctx.getImageData(0, 0, 100, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x
        this.baseY = this.y
        // this.density = Math.random() * 30 + 1;
        this.density = Math.random() * 15 + 5;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius
        let force = (maxDistance - distance) / maxDistance
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/5
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/5
            }
            this.size = 3;
        }

        this.draw();
    }
}

function init() {
    // for (let i = 0; i < 500; i++) {
    //     let x = Math.random() * canvasOne.width;
    //     let y = Math.random() * canvasOne.height;
    //     particleArray.push(new Particle(x, y));  
    // }
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particleArray.push(new Particle(positionX * 20, positionY * 14));
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvasOne.width, canvasOne.height);
    particleArray.forEach((particle, i) => {
        particle.update()
    })
    connect();
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {
            // let dx = mouse.x - this.x;
            // let dy = mouse.y - this.y;
            // let distance = Math.sqrt(dx * dx + dy * dy);
            let dx = particleArray[a].x - particleArray[b].x;
            let dy = particleArray[a].y - particleArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 25) {
                opacityValue = 1 - (distance/50);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue} )`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particleArray[a].x, particleArray[a].y);
                ctx.lineTo(particleArray[b].x, particleArray[b].y)
                ctx.stroke();
            }
        }
    }
}

init();
animate();