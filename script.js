// ===== CONFIGURACIÓN INICIAL =====
const noviaNombre = "Pequeñita";

// Elementos del DOM
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const responseMessage = document.getElementById('responseMessage');
const message = document.getElementById('message');
const heartsContainer = document.getElementById('heartsContainer');
const photoFrames = document.querySelectorAll('.photo-frame');
const hearts = document.querySelectorAll('.heart');

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log("Invitación de San Valentín cargada");
    console.log(`Para: ${noviaNombre}`);
    
    // Crear corazones flotantes
    createHearts();
    
    // Añadir efectos táctiles a los corazones del encabezado
    hearts.forEach(heart => {
        heart.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.style.transform = 'scale(1.5)';
            createTouchHeart(e.touches[0].clientX, e.touches[0].clientY);
        });
        
        heart.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        heart.addEventListener('click', function(e) {
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            createTouchHeart(e.clientX, e.clientY);
        });
    });
    
    // Añadir efectos táctiles a las fotos
    photoFrames.forEach(frame => {
        frame.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        frame.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
        
        frame.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
            createMiniHearts();
        });
    });
    
    // Verificar si es un dispositivo táctil
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        console.log("Dispositivo táctil detectado");
        // Añadir clase para dispositivos táctiles
        document.body.classList.add('touch-device');
        
        // Ajustar el evento del botón "No" para dispositivos táctiles
        setupNoButtonForTouch();
    } else {
        // Configuración para dispositivos no táctiles
        setupNoButtonForDesktop();
    }
    
    // Configurar botón "Sí" para ambos tipos de dispositivos
    setupYesButton();
});

// ===== FUNCIONES PRINCIPALES =====

// Crear corazones flotantes iniciales
function createHearts() {
    // Limpiar contenedor primero (por si acaso)
    heartsContainer.innerHTML = '';
    
    // Crear 15 corazones (menos en móvil para mejor rendimiento)
    const heartCount = 15;
    
    for (let i = 0; i < heartCount; i++) {
        setTimeout(() => {
            createFloatingHeart();
        }, i * 300);
    }
}

// Crear un corazón flotante individual
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // Posición aleatoria
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Retraso aleatorio en la animación
    heart.style.animationDelay = Math.random() * 3 + 's';
    
    // Tamaño aleatorio
    const size = Math.random() * 20 + 15;
    heart.style.fontSize = size + 'px';
    
    // Color aleatorio
    const colors = ['#ff4081', '#e91e63', '#ff80ab', '#f8a5c2', '#ff4d8d'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Duración aleatoria de animación
    const duration = Math.random() * 3 + 4;
    heart.style.animationDuration = duration + 's';
    
    heartsContainer.appendChild(heart);
    
    // Eliminar el corazón después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, duration * 1000 + 1000);
}

// Crear corazón en posición táctil
function createTouchHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // Posición donde se tocó
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    
    // Tamaño
    heart.style.fontSize = '25px';
    heart.style.color = '#ff4081';
    
    // Animación especial
    heart.style.animation = 'floatUp 2s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2000);
}

// Crear mini corazones alrededor de las fotos
function createMiniHearts() {
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart-particle');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            
            // Posición alrededor de las fotos
            const photosContainer = document.querySelector('.photos-container');
            const rect = photosContainer.getBoundingClientRect();
            
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            
            heart.style.left = x + 'px';
            heart.style.top = y + 'px';
            heart.style.fontSize = '20px';
            heart.style.color = '#e91e63';
            heart.style.animation = 'floatUp 1.5s ease-out forwards';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 1500);
        }, i * 100);
    }
}

// ===== CONFIGURACIÓN DE BOTONES =====

// Configurar botón "Sí"
function setupYesButton() {
    yesBtn.addEventListener('click', function(e) {
        // Efecto táctil
        this.style.transform = 'scale(0.95)';
        
        // Restaurar después de un momento
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            showResponse(true);
        }, 300);
    });
    
    // Para dispositivos táctiles
    yesBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(0.95)';
    });
    
    yesBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        this.style.transform = 'scale(1)';
        showResponse(true);
    });
}

// Configurar botón "No" para dispositivos táctiles
function setupNoButtonForTouch() {
    let noClicks = 0;
    const maxClicks = 3;
    
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        
        if (noClicks < maxClicks) {
            // Mover el botón a una nueva posición
            moveNoButton();
            noClicks++;
            
            // Cambiar texto después de algunos intentos
            updateNoButtonText(noClicks);
            
            // Si alcanzó el máximo, convertirlo en "Sí"
            if (noClicks >= maxClicks) {
                convertNoToYes();
            }
        }
    });
    
    // También manejar clics (para compatibilidad)
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (noClicks < maxClicks) {
            moveNoButton();
            noClicks++;
            updateNoButtonText(noClicks);
            
            if (noClicks >= maxClicks) {
                convertNoToYes();
            }
        }
    });
}

// Configurar botón "No" para escritorio
function setupNoButtonForDesktop() {
    let noClicks = 0;
    const maxClicks = 3;
    
    noBtn.addEventListener('mouseover', function() {
        if (noClicks < maxClicks) {
            moveNoButton();
            noClicks++;
            updateNoButtonText(noClicks);
            
            if (noClicks >= maxClicks) {
                convertNoToYes();
            }
        }
    });
    
    // También manejar clics en escritorio
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (noClicks >= maxClicks) {
            showResponse(true);
        }
    });
}

// Mover botón "No" a una posición aleatoria
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    
    // Calcular posición aleatoria dentro del contenedor
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    // Asegurarse de que no sea negativo
    if (maxX > 0 && maxY > 0) {
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'absolute';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        noBtn.style.zIndex = '100';
    }
}

// Actualizar texto del botón "No"
function updateNoButtonText(clickCount) {
    switch(clickCount) {
        case 1:
            noBtn.innerHTML = '<i class="fas fa-smile-wink"></i><span>¿Segura cachetoncita?</span>';
            break;
        case 2:
            noBtn.innerHTML = '<i class="fas fa-grin-tongue-wink"></i><span>¡En serio!</span>';
            break;
        case 3:
            noBtn.innerHTML = '<i class="fas fa-heart"></i><span>¡Broma! ¡SÍ ACEPTO PEQUEÑO PONY! </span>';
            break;
    }
}

// Convertir botón "No" en botón "Sí"
function convertNoToYes() {
    noBtn.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
    noBtn.style.boxShadow = '0 8px 15px rgba(76, 175, 80, 0.3)';
    noBtn.classList.remove('no-btn');
    noBtn.classList.add('yes-btn');
    
    // Actualizar el ID para estilos CSS
    noBtn.id = 'fakeNoBtn';
}

// ===== MOSTRAR RESPUESTA =====
function showResponse(accepted) {
    // Ocultar elementos
    document.querySelector('.buttons-container').classList.add('hidden');
    message.classList.add('hidden');
    document.querySelector('.photos-container').classList.add('hidden');
    document.querySelector('.footer').classList.add('hidden');
    
    // Mostrar mensaje de respuesta
    responseMessage.classList.remove('hidden');
    
    if (accepted) {
        // Respuesta positiva
        responseMessage.innerHTML = `
            <i class="fas fa-heart" style="color:#e91e63; font-size: 2.5rem; margin-bottom: 15px;"></i>
            <p>¡${noviaNombre}, me has hecho el noviecito más feliz del mundo al decir que si! 🎉</p>
            <p>Recuerda que a pesar de ser mi princesita yo te seguire enamorando siempe 💖</p>
            <p>¡No puedo esperar para que veas la sopresa que tengo preparada! 💑</p>
            <p style="margin-top: 20px; font-size: 1.8rem; color: #4CAF50;">¡TE AMO MUCHOTE AMORCHITO! <i class="fas fa-heart" style="color: #e91e63;"></i></p>
        `;
        
        // Crear celebración
        celebrateAcceptance();
        
        // Cambiar fondo del header
        document.querySelector('.header').style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
        
    } else {
        // Respuesta negativa (por si acaso)
        responseMessage.innerHTML = `
            <i class="fas fa-heart-broken" style="color:#f44336; font-size: 2.5rem; margin-bottom: 15px;"></i>
            <p>${noviaNombre}, mi corazón está un poco roto 💔</p>
            <p>Pero aún así, respeto tu decisión.</p>
            <p style="margin-top: 20px;">Siempre serás especial para mí...</p>
        `;
        
        // Cambiar fondo del header
        document.querySelector('.header').style.background = 'linear-gradient(135deg, #757575 0%, #9e9e9e 100%)';
    }
}

// ===== CELEBRACIÓN POR ACEPTACIÓN =====
function celebrateAcceptance() {
    // Crear muchos corazones
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createCelebrationHeart();
        }, i * 100);
    }
    
    // Efecto de confeti
    setTimeout(() => {
        createConfetti();
    }, 500);
    
    // Reproducir sonido de celebración (si está permitido)
    playCelebrationSound();
}

// Crear corazón de celebración
function createCelebrationHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-particle');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    
    // Posición aleatoria
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamaño aleatorio
    const size = Math.random() * 25 + 20;
    heart.style.fontSize = size + 'px';
    
    // Color aleatorio
    const colors = ['#ff4081', '#e91e63', '#4CAF50', '#8BC34A', '#FF9800', '#2196F3'];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];
    
    // Animación más rápida
    heart.style.animation = 'floatUp 2.5s ease-out forwards';
    
    document.body.appendChild(heart);
    
    // Eliminar después
    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 2500);
}

// Crear efecto de confeti
function createConfetti() {
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['❤️', '💖', '💕', '💗', '💓', '💞'][Math.floor(Math.random() * 6)];
        confetti.style.position = 'fixed';
        confetti.style.fontSize = '20px';
        confetti.style.zIndex = '9999';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-50px';
        confetti.style.opacity = '0.9';
        
        // Animación
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        document.body.appendChild(confetti);
        
        // Eliminar después
        animation.onfinish = () => {
            if (confetti.parentNode) {
                confetti.remove();
            }
        };
    }
}

// Reproducir sonido de celebración
function playCelebrationSound() {
    // Solo intentar en dispositivos que no sean iOS (iOS tiene restricciones)
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
    if (!isIOS) {
        try {
            // Crear contexto de audio
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                const audioContext = new AudioContext();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                // Melodía simple y feliz
                oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Do
                oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // Mi
                oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // Sol
                oscillator.frequency.setValueAtTime(1046.50, audioContext.currentTime + 0.3); // Do alto
                
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.5);
            }
        } catch (e) {
            console.log("No se pudo reproducir sonido:", e);
        }
    }
}

// ===== MANEJO DE ORIENTACIÓN DE PANTALLA =====
window.addEventListener('resize', function() {
    // Reajustar posición del botón "No" si es necesario
    if (noBtn.style.position === 'absolute') {
        const container = document.querySelector('.buttons-container');
        const btnRect = noBtn.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Verificar si el botón está fuera de los límites
        if (btnRect.left < containerRect.left || 
            btnRect.right > containerRect.right ||
            btnRect.top < containerRect.top || 
            btnRect.bottom > containerRect.bottom) {
            
            // Moverlo dentro de los límites
            moveNoButton();
        }
    }
});

// Manejar cambios de orientación
window.addEventListener('orientationchange', function() {
    // Pequeño retraso para que se complete el cambio de orientación
    setTimeout(() => {
        // Volver a crear corazones para adaptarse a la nueva orientación
        heartsContainer.innerHTML = '';
        createHearts();
        
        // Resetear posición del botón "No" si es necesario
        if (noBtn.style.position === 'absolute') {
            noBtn.style.position = 'static';
            noBtn.style.left = '';
            noBtn.style.top = '';
            noBtn.style.zIndex = '';
        }
    }, 300);
});