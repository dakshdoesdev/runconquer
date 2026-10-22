// ========================================
// Leaderboard — App Version
// ========================================

const leaderboardData = {
  global: [
    { rank: 1, name: 'TigraLuna', flag: '🇸🇪', avatar: '🐺', score: 90909, subtitle: 'Stockholm', barPct: 100 },
    { rank: 2, name: 'Sergey Avdeev', flag: '🇷🇺', avatar: '🦅', score: 90899, subtitle: 'Moscow', barPct: 99 },
    { rank: 3, name: 'RunKing_AU', flag: '🇦🇺', avatar: '🦘', score: 85420, subtitle: 'Sydney', barPct: 94 },
    { rank: 4, name: 'MarathonMax', flag: '🇩🇪', avatar: '🏃', score: 78340, subtitle: 'Berlin', barPct: 86 },
    { rank: 5, name: 'SprintMaster', flag: '🇯🇵', avatar: '⚡', score: 71200, subtitle: 'Tokyo', barPct: 78 },
    { rank: 6, name: 'TrailBlazer', flag: '🇧🇷', avatar: '🔥', score: 65100, subtitle: 'São Paulo', barPct: 72 },
    { rank: 7, name: 'You', flag: '🇮🇳', avatar: '👤', score: 89450, subtitle: 'Delhi NCR', barPct: 98, highlight: true },
    { rank: 8, name: 'NightRunner', flag: '🇬🇧', avatar: '🌙', score: 58900, subtitle: 'London', barPct: 65 },
    { rank: 9, name: 'DelhiDasher', flag: '🇮🇳', avatar: '🏅', score: 52400, subtitle: 'New Delhi', barPct: 58 },
    { rank: 10, name: 'StormChaser', flag: '🇺🇸', avatar: '⛈️', score: 48700, subtitle: 'New York', barPct: 54 },
  ],
  city: [
    { rank: 1, name: 'RunKing_IN', flag: '🇮🇳', avatar: '👑', score: 45200, subtitle: 'Gurgaon', barPct: 100 },
    { rank: 2, name: 'SprintQueen', flag: '🇮🇳', avatar: '💨', score: 38900, subtitle: 'South Delhi', barPct: 86 },
    { rank: 3, name: 'PaceSetter', flag: '🇮🇳', avatar: '🎯', score: 34100, subtitle: 'Noida', barPct: 75 },
    { rank: 4, name: 'StreetKing', flag: '🇮🇳', avatar: '🏙️', score: 29800, subtitle: 'CP', barPct: 66 },
    { rank: 5, name: 'MorningMiler', flag: '🇮🇳', avatar: '🌅', score: 25400, subtitle: 'Rohini', barPct: 56 },
    { rank: 6, name: 'DelhiDasher', flag: '🇮🇳', avatar: '🏅', score: 22100, subtitle: 'Dwarka', barPct: 49 },
    { rank: 7, name: 'You', flag: '🇮🇳', avatar: '👤', score: 19800, subtitle: 'Sec 14', barPct: 44, highlight: true },
    { rank: 8, name: 'TrackStar', flag: '🇮🇳', avatar: '⭐', score: 16500, subtitle: 'Vasant Kunj', barPct: 37 },
  ],
  teams: [
    { rank: 1, name: 'Blue Thunder', flag: '🔵', avatar: '⚡', score: 1245000, subtitle: '847 members', barPct: 100, teamClass: 'team-blue' },
    { rank: 2, name: 'Red Storm', flag: '🔴', avatar: '🌪️', score: 1098000, subtitle: '792 members', barPct: 88, teamClass: 'team-red' },
    { rank: 3, name: 'Blue Wolves', flag: '🔵', avatar: '🐺', score: 890000, subtitle: '634 members', barPct: 71, teamClass: 'team-blue' },
    { rank: 4, name: 'Red Phoenix', flag: '🔴', avatar: '🔥', score: 756000, subtitle: '521 members', barPct: 61, teamClass: 'team-red' },
    { rank: 5, name: 'Blue Arrows', flag: '🔵', avatar: '🏹', score: 645000, subtitle: '445 members', barPct: 52, teamClass: 'team-blue' },
    { rank: 6, name: 'Red Titans', flag: '🔴', avatar: '💪', score: 534000, subtitle: '398 members', barPct: 43, teamClass: 'team-red' },
  ]
};

function formatScore(score) {
  if (score >= 1000000) return (score / 1000000).toFixed(1) + 'M';
  if (score >= 1000) return score.toLocaleString();
  return score.toString();
}

function renderLeaderboard(tab = 'global') {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;

  const data = leaderboardData[tab] || leaderboardData.global;
  const sorted = [...data].sort((a, b) => a.rank - b.rank);

  // Update your rank banner
  const banner = document.querySelector('.your-rank-banner');
  if (banner) {
    const you = data.find(p => p.highlight);
    if (you) {
      banner.querySelector('.rank-number').textContent = '#' + you.rank;
      banner.querySelector('.rank-score').textContent = formatScore(you.score) + ' M²';
    }
  }

  container.innerHTML = sorted.map((player, i) => `
    <div class="lb-row ${player.highlight ? 'highlight' : ''} ${player.teamClass || ''}" style="animation-delay:${i * 0.04}s">
      <span class="lb-rank">${player.rank}</span>
      <div class="lb-avatar" style="background:${player.highlight ? 'rgba(0,187,255,0.12)' : 'var(--surface-2)'}">
        ${player.avatar}
      </div>
      <div class="lb-info">
        <div class="lb-name"><span class="lb-flag">${player.flag}</span>${player.name}</div>
        <div class="lb-subtitle">${player.subtitle}</div>
      </div>
      <div>
        <span class="lb-score">${formatScore(player.score)}<span class="lb-score-unit"> M²</span></span>
        <div class="lb-bar-wrapper"><div class="lb-bar" style="width:${player.barPct}%"></div></div>
      </div>
    </div>
  `).join('');
}

function initLeaderboard() {
  const tabs = document.querySelectorAll('.pill-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderLeaderboard(tab.dataset.tab);
    });
  });
  renderLeaderboard('global');
}

window.initLeaderboard = initLeaderboard;
