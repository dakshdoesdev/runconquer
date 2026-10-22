// ========================================
// Main App — Screen Switching & Init
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initProfileNav();

    // Init modules
    if (typeof initMap === 'function') initMap();
    if (typeof initLeaderboard === 'function') initLeaderboard();
    if (typeof initDashboard === 'function') initDashboard();
    if (typeof initStats === 'function') initStats();
});

// === Tab-based Screen Switching ===
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const screens = document.querySelectorAll('.screen');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.screen;

            // Update tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Switch screen
            screens.forEach(s => s.classList.remove('active'));
            const target = document.getElementById(targetId);
            if (target) {
                target.classList.add('active');

                // Re-invalidate map size when switching to map screen
                if (targetId === 'screen-map' && window._mapInstance) {
                    setTimeout(() => window._mapInstance.invalidateSize(), 100);
                }
            }
        });
    });

    // CTA buttons
    const startRunBtn = document.getElementById('btn-start-run');
    if (startRunBtn) {
        startRunBtn.addEventListener('click', () => {
            // Switch to Run screen
            const runTab = document.querySelector('.tab[data-screen="screen-run"]');
            if (runTab) runTab.click();
        });
    }
}

// === Profile Navigation ===
function initProfileNav() {
    const profileBtn = document.getElementById('btn-profile');
    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            const profileTab = document.querySelector('.tab[data-screen="screen-profile"]');
            if (profileTab) profileTab.click();
        });
    }
}
