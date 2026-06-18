// =============================================
//  Digital Clock — script.js
// =============================================

// Month & Day names
const MONTHS = [
  'January', 'February', 'March',     'April',
  'May',     'June',     'July',      'August',
  'September','October', 'November',  'December'
];

const DAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday',
  'Thursday', 'Friday', 'Saturday'
];

// Pad single digit numbers with a leading zero  e.g.  5 → "05"
function pad(n) {
  return String(n).padStart(2, '0');
}

// Show user's timezone (e.g. Asia/Karachi)
function setTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    document.getElementById('tz-row').textContent = tz.replace('_', ' ');
  } catch (e) {
    document.getElementById('tz-row').textContent = '';
  }
}

// Main tick function — runs every second
function tick() {
  const now = new Date();

  // Hours (12-hour format)
  let h  = now.getHours();
  const m  = now.getMinutes();
  const s  = now.getSeconds();
  const ap = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;   // convert 0 → 12

  // Update time digits
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('mins').textContent  = pad(m);
  document.getElementById('secs').textContent  = pad(s);
  document.getElementById('ampm').textContent  = ap;

  // Update date & day
  document.getElementById('date-text').textContent =
    `${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`;

  document.getElementById('day-text').textContent = DAYS[now.getDay()];

  // Update seconds progress bar  (0 – 59  →  0% – 100%)
  const pct = (s / 59) * 100;
  document.getElementById('sec-bar').style.width = pct + '%';
}

// ── Init ──
setTimezone();
tick();                          // run immediately so there's no blank flash
setInterval(tick, 1000);        // then repeat every 1 second
