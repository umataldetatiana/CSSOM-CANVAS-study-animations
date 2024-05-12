document.addEventListener('DOMContentLoaded', function() {
    const simpleParallaxCanvas = document.getElementById('simpleParallaxCanvas');
    const advancedParallaxCanvas = document.getElementById('advancedParallaxCanvas');
    const canvasWidth = 600;
    const canvasHeight = 600;

    initializeCanvas(simpleParallaxCanvas, drawSimpleParallaxLayer);
    initializeCanvas(advancedParallaxCanvas, drawAdvancedParallaxLayer);

    function initializeCanvas(canvas, drawLayerFunction) {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const context = canvas.getContext('2d');
        drawLayerFunction(context);
    }

    function drawSimpleParallaxLayer(context) {
        const layers = [
            { color: 'rgba(255, 99, 71, 0.8)', size: canvasWidth },
            { color: 'rgba(75, 192, 192, 0.8)', size: canvasWidth / 2 },
            { color: 'rgba(153, 102, 255, 0.8)', size: canvasWidth / 6 }
        ];

        let layerIndex = 0;

        function drawLayer() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            const layer = layers[layerIndex];
            context.fillStyle = layer.color;
            const x = (canvasWidth - layer.size) / 2;
            const y = (canvasHeight - layer.size) / 2;
            context.fillRect(x, y, layer.size, layer.size);
        }

        drawLayer();

        window.toggleSimpleLayers = function() {
            layerIndex = (layerIndex + 1) % layers.length;
            drawLayer();
        };
    }

    function drawAdvancedParallaxLayer(context) {
        const layers = [
            { size: canvasWidth, color: 'rgba(255, 99, 71, 0.8)', animationType: 0 },
            { size: canvasWidth / 2, color: 'rgba(75, 192, 192, 0.8)', animationType: 0 },
            { size: canvasWidth / 6, color: 'rgba(153, 102, 255, 0.8)', animationType: 0 }
        ];

        let currentLayer = 0;

        function drawLayer() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            const layer = layers[currentLayer];
            context.fillStyle = layer.color;
            const x = (canvasWidth - layer.size) / 2;
            const y = (canvasHeight - layer.size) / 2;
            context.fillRect(x, y, layer.size, layer.size);
            animateLayer(layer);
        }

        function animateLayer(layer) {
            if (layer.animationType === 0) {
                // Rotation animation
                context.translate(canvasWidth / 2, canvasHeight / 2);
                context.rotate(Math.PI / 180);
                context.translate(-canvasWidth / 2, -canvasHeight / 2);
            } else {
                // Pulse animation
                if (layer.sizeChangeDirection === undefined) {
                    layer.sizeChangeDirection = 1;
                }
                layer.size += layer.sizeChangeDirection;
                if (layer.size > layer.originalSize + 20 || layer.size < layer.originalSize - 20) {
                    layer.sizeChangeDirection *= -1;
                }
            }
        }

        window.changeAdvancedAnimation = function() {
            const layer = layers[currentLayer];
            layer.animationType = (layer.animationType + 1) % 2;
            drawLayer();
        };

        window.toggleAdvancedLayers = function() {
            currentLayer = (currentLayer + 1) % layers.length;
            drawLayer();
        };

        drawLayer();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    let particles = [];

    class Particle {
        constructor(color) {
            this.x = Math.random() * canvas.width;
            this.y = 0; // Partículas começam no topo do canvas
            this.size = Math.random() * 5 + 1; // Tamanho entre 1 e 6
            this.speed = Math.random() * 2 + 1; // Velocidade de queda
            this.color = color;
        }

        update() {
            this.y += this.speed; // Move a partícula para baixo
            if (this.y > canvas.height) {
                this.y = 0; // Reinicia na parte superior do canvas
                this.x = Math.random() * canvas.width; // Posição x aleatória
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles(numParticles, color) {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle(color));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles(100, '#FFFFFF'); // Inicia com partículas brancas
    animate();

    // Função para mudar a cor das partículas
    window.changeParticleColor = function() {
        const color = document.getElementById('particleColor').value;
        particles.forEach(particle => particle.color = color);
    };
});

