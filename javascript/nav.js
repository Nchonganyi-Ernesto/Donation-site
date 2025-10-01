window.addEventListener('scroll', function() {
    var h1 = document.getElementById('h1');
    var header2 = document.getElementById('header2');
    var spacer = document.getElementById('header2-spacer');
    if (!h1 || !header2 || !spacer) return;
    var h1Rect = h1.getBoundingClientRect();
    var header2Rect = header2.getBoundingClientRect();
    spacer.style.height = header2.offsetHeight + 'px';
    // If h1 is out of view and header2 reaches the top, make header2 sticky
    if (h1Rect.bottom <= 0 && header2Rect.top <= 0) {
        header2.classList.add('fixed-header2');
        spacer.style.display = 'block';
    } else {
        header2.classList.remove('fixed-header2');
        spacer.style.display = 'none';
    }
});

function hideSelectedOption(selectedElement) {
    const selectedOption = selectedElement.options[selectedElement.selectedIndex];
    const allOptions = selectedElement.querySelectorAll('option');
    allOptions.forEach(option => {
        option.style.display = 'block'; // Show all options first
    });
    selectedOption.style.display = 'none'; // Hide the selected option
}

// Number counting animation
const countElements = document.querySelectorAll('#count');
let hasAnimated = false;

// Function to animate counting
function animateCount(element, start, end, duration, isDecimal) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentNumber = Math.floor(progress * (end - start) + start);
        
        if (isDecimal) {
            element.textContent = currentNumber + 'B';
        } else {
            element.textContent = currentNumber;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = isDecimal ? end + 'B' : end;
        }
    };
    window.requestAnimationFrame(step);
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Scroll event listener to trigger animation
window.addEventListener('scroll', function() {
    if (!hasAnimated && countElements.length > 0) {
        const firstCountElement = countElements[0];
        if (isInViewport(firstCountElement)) {
            hasAnimated = true;
            
            // Animate first number (2009)
            animateCount(countElements[0], 0, 2009, 2000, false);
            
            // Animate second number (120B)
            animateCount(countElements[1], 0, 120, 2000, true);
        }
    }
});
