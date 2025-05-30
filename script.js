
// Clear session storage to ensure password is always required
sessionStorage.removeItem('birthdayAccess');

// Password protection functionality
document.addEventListener('DOMContentLoaded', function() {
    const passwordScreen = document.getElementById('password-screen');
    const mainContent = document.getElementById('main-content');
    const passwordInput = document.getElementById('password-input');
    const enterBtn = document.getElementById('enter-btn');
    const errorMessage = document.getElementById('error-message');
    
    const correctPassword = 'pretty31';
    
    // Handle enter button click
    enterBtn.addEventListener('click', checkPassword);
    
    // Handle enter key press
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    
    // Clear error message when user starts typing
    passwordInput.addEventListener('input', function() {
        hideErrorMessage();
    });
    
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === '') {
            showErrorMessage('Please enter a password');
            return;
        }
        
        if (enteredPassword === correctPassword) {
            // Store access in session storage
            sessionStorage.setItem('birthdayAccess', 'granted');
            showMainContent();
        } else {
            showErrorMessage('Incorrect password. Try again! 💕');
            passwordInput.value = '';
            shakePasswordContainer();
        }
    }
    
    function showMainContent() {
        passwordScreen.style.animation = 'fadeOut 0.8s ease-in-out forwards';
        // In your showMainContent() function, add:
setTimeout(() => {
  const audio = document.getElementById('background-music');
  audio.play().catch(error => {
    console.log('Autoplay prevented:', error);
    // Show a play button if autoplay fails
  });
}, 1000);

        setTimeout(() => {
            passwordScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            mainContent.style.animation = 'fadeIn 1s ease-in-out forwards';
            
            // Show first card
            const firstCard = document.getElementById('birthday-wishes-card');
            firstCard.classList.remove('hidden');
            firstCard.style.animation = 'cardAppear 1s ease-out forwards';
            
            // Add floating decoration animations
            animateDecorations();
        }, 800);
    }
    
    function showErrorMessage(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    function hideErrorMessage() {
        errorMessage.classList.remove('show');
    }
    
    function shakePasswordContainer() {
        const container = document.querySelector('.password-container');
        container.style.animation = 'shake 0.6s ease-in-out';
        
        setTimeout(() => {
            container.style.animation = 'slideIn 1s ease-out';
        }, 600);
    }
    
    function animateDecorations() {
        const decorations = document.querySelectorAll('.decoration');
        
        decorations.forEach(decoration => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            
            decoration.style.left = `${randomX}px`;
            decoration.style.top = `${randomY}px`;
        });
    }
});

// Function to show next card
function showNextCard(cardId) {
    // Get all cards
    const allCards = document.querySelectorAll('.birthday-card');
    
    // Hide all cards with a smooth fade out effect
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(-30px) scale(0.95)';
    });
    
    // After a short delay, hide all cards and show the requested card
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.add('hidden');
        });
        
        const nextCard = document.getElementById(cardId);
        nextCard.classList.remove('hidden');
        
        // Force reflow
        void nextCard.offsetWidth;
        
        // Animate card entrance with smoother animation
        nextCard.style.animation = 'cardAppear 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
    }, 400);
}

// Function to show photo slideshow
function showPhotoSlideshow() {
    // Hide header when showing slideshow
    const header = document.getElementById('main-header');
    header.style.animation = 'fadeOut 0.5s ease-in-out forwards';
    
    setTimeout(() => {
        header.style.display = 'none';
    }, 500);
    
    showNextCard('photo-slideshow-card');
    
    // Make slideshow fullscreen
    setTimeout(() => {
        const slideshowCard = document.getElementById('photo-slideshow-card');
        slideshowCard.classList.add('fullscreen-active');
        startSlideshow();
    }, 1000);
}

// Slideshow functionality
let slideIndex = 1;
let slideshowInterval;

function startSlideshow() {
    // Start automatic slideshow that changes every 5 seconds
    slideshowInterval = setInterval(() => {
        slideIndex++;
        if (slideIndex > 6) { // Assuming 6 photos
            slideIndex = 1;
        }
        showSlide(slideIndex);
    }, 5000);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    // Hide all slides with smooth transition
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'scale(0.98)';
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Show current slide and activate corresponding dot with smooth animation
    setTimeout(() => {
        if (slides[slideIndex - 1]) {
            slides[slideIndex - 1].classList.add('active');
            slides[slideIndex - 1].style.opacity = '1';
            slides[slideIndex - 1].style.transform = 'scale(1)';
        }
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].classList.add('active');
        }
    }, 200);
}

function currentSlide(n) {
    // Clear automatic slideshow when user manually selects a slide
    clearInterval(slideshowInterval);
    slideIndex = n;
    showSlide(slideIndex);
    
    // Restart automatic slideshow after 6 seconds
    setTimeout(() => {
        startSlideshow();
    }, 6000);
}

// Add enhanced animations to CSS dynamically
const enhancedKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
    20%, 40%, 60%, 80% { transform: translateX(8px); }
}

@keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slowHeartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
`;

// Add the keyframes to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedKeyframes;
document.head.appendChild(styleSheet);

// Photo loading with fallback
document.addEventListener('DOMContentLoaded', function() {
    const photos = document.querySelectorAll('.slide-image');
    
    photos.forEach(photo => {
        photo.addEventListener('error', function() {
            // If image fails to load, show a placeholder
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDMwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRkNFNEVDIi8+CjxwYXRoIGQ9Ik0xMjAgMTAwSDEyMFYxNTBIMTgwVjEwMEgxODBWMTUwSDE4MFYxMDBIMTgwVjE1MEgxMjBWMTAwWiIgZmlsbD0iI0U5MUU2MyIvPgo8dGV4dCB4PSIxNTAiIHk9IjE4MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjRTkxRTYzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BZGQgWW91ciBQaG90byBIZXJlIPCfk7g8L3RleHQ+Cjwvc3ZnPgo=';
            this.style.objectFit = 'contain';
        });
    });
});

// Console easter egg
console.log(`
🎉 Happy Birthday Website 🎉
Made with 💕 for a special friend
Password: pretty31
`);
