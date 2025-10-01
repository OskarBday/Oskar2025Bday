// Party Configuration
const partyConfig = {
    date: "Sábado 11 de Octubre 2025",
    time: "7:30 PM",
    address: "Calle Álvarez del Castillo 127, La Penal, Guadalajara, Jalisco, Mexico",
    whatsappNumber: "+523313988383" // Replace with actual WhatsApp number
};

// Initialize the invitation
document.addEventListener('DOMContentLoaded', function() {
    initializeInvitation();
    addScrollAnimations();
    addSparkleEffect();
});

// Initialize party details
function initializeInvitation() {
    document.getElementById('party-date').textContent = partyConfig.date;
    document.getElementById('party-time').textContent = partyConfig.time;
    document.getElementById('party-address').textContent = partyConfig.address;
    
    // Initialize map immediately
    initializeMap();
}

// Smooth scroll to next section
function scrollToNextSection() {
    scrollToSection('quote');
}

// Smooth scroll to specific section
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Map is now always visible - toggle function removed

function initializeMap() {
    const mapElement = document.getElementById('map');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Mobile: Show only the button to open maps app
        mapElement.innerHTML = `
            <div class="map-content mobile-map">
                <div class="mobile-map-info">
                    <i class="fas fa-map-marker-alt"></i>
                    <p class="mobile-map-text">Toca el botón para abrir la ubicación en tu app de mapas</p>
                </div>
                <div class="map-actions">
                    <button class="open-maps-btn mobile-only" onclick="openInMapsApp()">
                        <i class="fas fa-mobile-alt"></i>
                        Abrir en Maps
                    </button>
                </div>
            </div>
        `;
    } else {
        // Desktop: Show iframe with optional button
        mapElement.innerHTML = `
            <div class="map-content desktop-map">
                <div class="map-iframe-container">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.9948947330163!2d-103.32140918797721!3d20.66978669992913!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b18731370159%3A0xbd7be08f8fa5e8e3!2sC.%20%C3%81lvarez%20del%20Castillo%20127%2C%20La%20Penal%2C%2044380%20Guadalajara%2C%20Jal.!5e0!3m2!1sen!2smx!4v1759205623353!5m2!1sen!2smx" 
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
                        title="Ubicación de la fiesta">
                    </iframe>
                </div>
                <div class="map-actions">
                    <button class="open-maps-btn desktop-only" onclick="openInMapsApp()">
                        <i class="fas fa-external-link-alt"></i>
                        Ver en Google Maps
                    </button>
                </div>
            </div>
        `;
    }
}

// Open location in Maps app (mobile-optimized)
function openInMapsApp() {
    const address = encodeURIComponent(partyConfig.address);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    
    if (isMobile) {
        if (isIOS) {
            // Try to open Apple Maps first, fallback to Google Maps
            const appleMapsUrl = `maps://maps.google.com/maps?q=${address}`;
            const googleMapsUrl = `https://maps.google.com/maps?q=${address}`;
            
            // Try Apple Maps first
            window.location = appleMapsUrl;
            
            // Fallback to Google Maps if Apple Maps doesn't open
            setTimeout(() => {
                window.open(googleMapsUrl, '_blank');
            }, 1000);
            
        } else if (isAndroid) {
            // Open Google Maps app on Android
            const androidMapsUrl = `geo:0,0?q=${address}`;
            const googleMapsUrl = `https://maps.google.com/maps?q=${address}`;
            
            try {
                window.location = androidMapsUrl;
            } catch (e) {
                window.open(googleMapsUrl, '_blank');
            }
        } else {
            // Other mobile browsers
            const googleMapsUrl = `https://maps.google.com/maps?q=${address}`;
            window.open(googleMapsUrl, '_blank');
        }
    } else {
        // Desktop - open in new tab
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`;
        window.open(googleMapsUrl, '_blank');
    }
}

// Pinterest inspiration functionality
function openPinterest() {
    const pinterestUrl = 'https://mx.pinterest.com/osfra2005/dress-code-black-glam-rock-pop/black-glam-rock-pop/';
    window.open(pinterestUrl, '_blank');
}

// Google Drive photos functionality
function openGoogleDrive() {
    const driveUrl = 'https://drive.google.com/drive/folders/1UhuC10r0cHS8h9U-9MRSUJkaHqV_UpJ0';
    window.open(driveUrl, '_blank');
}

// RSVP functionality
function openRSVP() {
    const message = encodeURIComponent(
        `¡Hola Oscar! Confirmo mi asistencia a tu fiesta de cumpleaños. ¡No me lo perdería!`
    );
    const whatsappUrl = `https://wa.me/${partyConfig.whatsappNumber}?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger effect for dress code items
                if (entry.target.classList.contains('dress-code-section')) {
                    const items = entry.target.querySelectorAll('.dress-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // Initialize hero section as visible
    document.querySelector('.hero-section').style.opacity = '1';
    document.querySelector('.hero-section').style.transform = 'translateY(0)';
}

// Add intensive sparkle effect
function addSparkleEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    // Create floating sparkles frequently
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'floating-sparkle';
        
        // Random size between 2-6px
        const size = Math.random() * 4 + 2;
        
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            box-shadow: 0 0 6px rgba(255, 255, 255, 0.8), 0 0 12px rgba(255, 255, 255, 0.4);
            animation: sparkleFloat ${Math.random() * 3 + 2}s ease-in-out forwards;
            z-index: 1;
        `;
        
        // Random position across the entire section
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        
        heroSection.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 6000);
    }

    // Add CSS for floating sparkles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            20% {
                opacity: 1;
                transform: scale(1);
            }
            50% {
                opacity: 0.8;
                transform: scale(1.2);
            }
            80% {
                opacity: 0.6;
                transform: scale(0.8);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Create sparkles very frequently - every 200ms
    setInterval(createSparkle, 200);
    
    // Create initial burst of sparkles
    for (let i = 0; i < 15; i++) {
        setTimeout(createSparkle, i * 100);
    }
}

// Add touch interactions for mobile
document.addEventListener('touchstart', function(e) {
    const target = e.target.closest('.dress-item, .date-item, .rsvp-btn, .map-btn');
    if (target) {
        target.style.transform = 'scale(0.95)';
    }
});

document.addEventListener('touchend', function(e) {
    const target = e.target.closest('.dress-item, .date-item, .rsvp-btn, .map-btn');
    if (target) {
        setTimeout(() => {
            target.style.transform = '';
        }, 150);
    }
});

// Add parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.sparkles-bg');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Preload animations for better performance
function preloadAnimations() {
    const animationPromises = [];
    
    // Preload font awesome icons
    const iconClasses = [
        'fas fa-birthday-cake',
        'fas fa-calendar-alt',
        'fas fa-clock',
        'fas fa-music',
        'fas fa-map-marker-alt',
        'fas fa-tshirt',
        'fas fa-star',
        'fas fa-crown',
        'fas fa-fire',
        'fas fa-gem',
        'fas fa-glasses',
        'fas fa-link',
        'fas fa-shoe-prints',
        'fas fa-palette',
        'fas fa-check-circle'
    ];
    
    iconClasses.forEach(iconClass => {
        const icon = document.createElement('i');
        icon.className = iconClass;
        icon.style.opacity = '0';
        icon.style.position = 'absolute';
        icon.style.top = '-100px';
        document.body.appendChild(icon);
        
        setTimeout(() => {
            document.body.removeChild(icon);
        }, 100);
    });
}

// Initialize preloading when DOM is ready
document.addEventListener('DOMContentLoaded', preloadAnimations);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            const nextSection = sections[currentIndex + 1];
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
    
    if (e.key === 'ArrowUp') {
        e.preventDefault();
        const sections = document.querySelectorAll('section');
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.top <= window.innerHeight / 2;
        });
        
        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            const prevSection = sections[currentIndex - 1];
            if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});