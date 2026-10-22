// ========================================
// Territory Map — Leaflet.js Integration
// ========================================

function initMap() {
  const mapEl = document.getElementById('territory-map');
  if (!mapEl) return;

  const map = L.map('territory-map', {
    center: [28.4595, 77.0266],
    zoom: 14,
    zoomControl: false,
    attributionControl: true,
  });

  // Save reference for re-invalidation on screen switch
  window._mapInstance = map;

  // Add zoom control to top-left
  L.control.zoom({ position: 'topleft' }).addTo(map);

  // Public tiles keep the demo usable without a provider API key.
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    maxZoom: 19
  }).addTo(map);

  // Territory data
  const territories = [
    { coords: [[28.465, 77.020], [28.465, 77.028], [28.458, 77.028], [28.458, 77.020]], team: 'blue', owner: 'You', area: '12,450', captured: '2h ago' },
    { coords: [[28.458, 77.028], [28.458, 77.036], [28.452, 77.036], [28.452, 77.028]], team: 'blue', owner: 'You', area: '8,200', captured: '1d ago' },
    { coords: [[28.470, 77.025], [28.470, 77.033], [28.465, 77.033], [28.465, 77.025]], team: 'blue', owner: 'RunKing_IN', area: '15,800', captured: '3h ago' },
    { coords: [[28.452, 77.015], [28.452, 77.023], [28.446, 77.023], [28.446, 77.015]], team: 'blue', owner: 'SprintMaster', area: '9,100', captured: '5h ago' },
    { coords: [[28.475, 77.018], [28.475, 77.026], [28.470, 77.026], [28.470, 77.018]], team: 'blue', owner: 'DelhiDasher', area: '11,300', captured: '12h ago' },
    { coords: [[28.458, 77.012], [28.458, 77.020], [28.452, 77.020], [28.452, 77.012]], team: 'red', owner: 'SpeedDemon', area: '10,200', captured: '30m ago' },
    { coords: [[28.465, 77.033], [28.465, 77.041], [28.458, 77.041], [28.458, 77.033]], team: 'red', owner: 'NightRunner', area: '14,500', captured: '4h ago' },
    { coords: [[28.470, 77.033], [28.470, 77.041], [28.465, 77.041], [28.465, 77.033]], team: 'red', owner: 'StormChaser', area: '7,600', captured: '6h ago' },
    { coords: [[28.446, 77.023], [28.446, 77.031], [28.440, 77.031], [28.440, 77.023]], team: 'red', owner: 'RedBaron', area: '13,200', captured: '1d ago' },
    { coords: [[28.452, 77.036], [28.452, 77.044], [28.446, 77.044], [28.446, 77.036]], team: 'red', owner: 'FlashPoint', area: '6,800', captured: '8h ago' },
    { coords: [[28.446, 77.008], [28.446, 77.015], [28.440, 77.015], [28.440, 77.008]], team: 'blue', owner: 'MarathonMax', area: '8,900', captured: '2d ago' },
    { coords: [[28.475, 77.026], [28.475, 77.034], [28.470, 77.034], [28.470, 77.026]], team: 'blue', owner: 'You', area: '5,400', captured: '6h ago' },
    { coords: [[28.440, 77.015], [28.440, 77.023], [28.434, 77.023], [28.434, 77.015]], team: 'green', owner: 'Unclaimed', area: '18,000', captured: '—' },
    { coords: [[28.440, 77.031], [28.440, 77.039], [28.434, 77.039], [28.434, 77.031]], team: 'green', owner: 'Unclaimed', area: '16,500', captured: '—' },
  ];

  const teamColors = {
    blue: { fill: '#00bbff', border: '#00bbff', fillOpacity: 0.2, borderOpacity: 0.7 },
    red: { fill: '#ff2d55', border: '#ff2d55', fillOpacity: 0.18, borderOpacity: 0.6 },
    green: { fill: '#00e676', border: '#00e676', fillOpacity: 0.08, borderOpacity: 0.3 }
  };

  territories.forEach(t => {
    const color = teamColors[t.team];
    const polygon = L.polygon(t.coords, {
      color: color.border, weight: 2, opacity: color.borderOpacity,
      fillColor: color.fill, fillOpacity: color.fillOpacity,
      dashArray: t.team === 'green' ? '5, 10' : null,
    }).addTo(map);

    const teamLabel = t.team === 'blue' ? '🔵 Blue' : t.team === 'red' ? '🔴 Red' : '⚪ Open';
    polygon.bindPopup(`
      <div style="min-width:160px">
        <div style="font-weight:700;font-size:0.95rem;margin-bottom:4px">${t.owner}</div>
        <div style="font-size:0.75rem;color:#9898b0;margin-bottom:8px">${teamLabel}</div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;margin-bottom:3px">
          <span style="color:#9898b0">Area</span>
          <span style="font-weight:700;color:${color.fill}">${t.area} M²</span>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:0.75rem">
          <span style="color:#9898b0">Captured</span>
          <span style="font-weight:600">${t.captured}</span>
        </div>
        ${t.team !== 'green' && t.owner !== 'You' ?
        `<button style="width:100%;margin-top:8px;padding:7px;border:none;border-radius:8px;background:${t.team === 'red' ? '#ff2d55' : '#00bbff'};color:white;font-weight:600;cursor:pointer;font-size:0.75rem">⚔️ Attack</button>` :
        t.team === 'green' ?
          `<button style="width:100%;margin-top:8px;padding:7px;border:none;border-radius:8px;background:#00e676;color:#0a0a0f;font-weight:600;cursor:pointer;font-size:0.75rem">🏃 Claim</button>` : ''}
      </div>
    `);

    polygon.on('mouseover', function () { this.setStyle({ fillOpacity: color.fillOpacity + 0.15, weight: 3 }); });
    polygon.on('mouseout', function () { this.setStyle({ fillOpacity: color.fillOpacity, weight: 2 }); });
  });

  // Runner marker
  const runnerIcon = L.divIcon({
    className: 'runner-marker',
    html: `<div style="width:14px;height:14px;background:#00bbff;border-radius:50%;border:3px solid white;box-shadow:0 0 16px rgba(0,187,255,0.6),0 0 32px rgba(0,187,255,0.3);animation:runnerPulse 2s ease-in-out infinite"></div>`,
    iconSize: [14, 14], iconAnchor: [7, 7],
  });

  const runnerMarker = L.marker([28.461, 77.024], { icon: runnerIcon }).addTo(map);
  runnerMarker.bindPopup(`<div style="text-align:center;min-width:120px"><div style="font-weight:700">🏃 You</div><div style="font-size:0.75rem;color:#00e676;margin-top:2px">Running</div><div style="font-size:0.7rem;color:#9898b0;margin-top:2px">4.2 km • 23:12</div></div>`);

  // Simulate movement
  let lat = 28.461, lng = 77.024;
  setInterval(() => {
    lat += (Math.random() - 0.45) * 0.0003;
    lng += (Math.random() - 0.45) * 0.0003;
    runnerMarker.setLatLng([lat, lng]);
  }, 2000);

  // Pulse animation
  const style = document.createElement('style');
  style.textContent = `@keyframes runnerPulse { 0%,100%{box-shadow:0 0 16px rgba(0,187,255,0.6),0 0 32px rgba(0,187,255,0.3)} 50%{box-shadow:0 0 24px rgba(0,187,255,0.8),0 0 48px rgba(0,187,255,0.4)} }`;
  document.head.appendChild(style);

  // Show alert toast after 4 seconds
  setTimeout(() => {
    const toast = document.getElementById('alert-toast');
    if (toast) {
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 8000);
    }
  }, 4000);

  // Invalidate map size after a tick to fix rendering
  setTimeout(() => map.invalidateSize(), 200);
}

window.initMap = initMap;
