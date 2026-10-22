// ========================================
// Territory Stats — Animated Counters
// ========================================

function animateCounter(el, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    const suffix = el.dataset.suffix || '';

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);
        el.textContent = current.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function initStats() {
    // Animate ring number when stats screen is visible
    const ringNumber = document.querySelector('.ring-number');
    if (ringNumber) {
        // Use MutationObserver to detect when stats screen becomes active
        const statsScreen = document.getElementById('screen-stats');
        if (statsScreen) {
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(m => {
                    if (m.target.classList.contains('active') && !ringNumber.dataset.animated) {
                        ringNumber.dataset.animated = 'true';
                        const target = parseInt(ringNumber.dataset.count);
                        if (!isNaN(target)) animateCounter(ringNumber, target);
                    }
                });
            });
            observer.observe(statsScreen, { attributes: true, attributeFilter: ['class'] });
        }
    }
}

window.initStats = initStats;
