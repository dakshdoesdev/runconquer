// ========================================
// Run Dashboard — Live Simulation
// ========================================

function initDashboard() {
    // Simulate live run data updates
    const distanceEl = document.getElementById('run-distance');
    const paceEl = document.getElementById('run-pace');
    const durationEl = document.getElementById('run-duration');
    const caloriesEl = document.getElementById('run-calories');

    if (!distanceEl) return;

    let distance = 4.2;
    let seconds = 23 * 60 + 12; // 23:12
    let calories = 312;

    function formatDuration(totalSeconds) {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function formatPace(totalSeconds, distKm) {
        const paceSeconds = totalSeconds / distKm;
        const paceMins = Math.floor(paceSeconds / 60);
        const paceSecs = Math.floor(paceSeconds % 60);
        return `${paceMins}:${paceSecs.toString().padStart(2, '0')}`;
    }

    // Update every 3 seconds
    setInterval(() => {
        seconds += 3;
        distance += 0.008 + Math.random() * 0.005;
        calories += 1 + Math.random() * 0.5;

        if (distanceEl) distanceEl.textContent = distance.toFixed(1);
        if (paceEl) paceEl.textContent = formatPace(seconds, distance);
        if (durationEl) durationEl.textContent = formatDuration(seconds);
        if (caloriesEl) caloriesEl.textContent = Math.floor(calories);
    }, 3000);
}

window.initDashboard = initDashboard;
