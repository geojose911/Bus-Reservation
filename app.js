/* =========================================
   BusRoute — app.js
   Full bus reservation system logic
   ========================================= */

// =========== STATE ===========
const TOTAL_SEATS = 32;

/** @type {{ busNo: string, driver: string, from: string, to: string, arrival: string, departure: string, seats: string[] }[]} */
let buses = [];

let selectedBusForReserve = null;
let selectedSeat = null;

// =========== UTILS ===========
function fmtTime(t) {
  if (!t) return '—';
  const [h, m] = t.split(':');
  const hh = +h;
  return `${hh % 12 || 12}:${m} ${hh < 12 ? 'AM' : 'PM'}`;
}

function availableCount(bus) {
  return bus.seats.filter(s => !s).length;
}

function updateHomeStats() {
  const r = document.getElementById('stat-routes');
  const s = document.getElementById('stat-seats');
  if (r) r.textContent = buses.length;
  if (s) s.textContent = buses.reduce((acc, b) => acc + availableCount(b), 0);
}

function findBus(busNo) {
  return buses.find(b => b.busNo === busNo) || null;
}

// =========== VIEW ROUTING ===========
function showView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const v = document.getElementById('view-' + name);
  if (v) v.classList.add('active');
  const nl = document.getElementById('nav-' + name);
  if (nl) nl.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'buses')   renderBusGrid();
  if (name === 'reserve') renderReserveBusList();
  if (name === 'manage')  renderManageList();
  if (name === 'home')    updateHomeStats();
}

// =========== NAVBAR ===========
window.addEventListener('scroll', () => {
  const nb = document.getElementById('navbar');
  if (nb) nb.classList.toggle('scrolled', window.scrollY > 30);
});

function toggleMobileMenu() {
  const m = document.getElementById('mobileMenu');
  if (m) m.classList.toggle('open');
}

// =========== TOAST ===========
function showToast(msg, type = 'info', duration = 3000) {
  const c = document.getElementById('toastContainer');
  const icons = { success: '✔', error: '✖', info: 'ℹ' };
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span>${icons[type] || ''}</span> ${msg}`;
  c.appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastOut 0.25s ease forwards';
    setTimeout(() => t.remove(), 250);
  }, duration);
}

// =========== DEMO DATA ===========
function loadDemoData() {
  const demo = [
    { busNo:'KL-01', driver:'Rajan Kumar',   from:'Kochi',    to:'Thrissur',   arrival:'06:30', departure:'06:00' },
    { busNo:'KL-02', driver:'Anil Nair',     from:'Kottayam', to:'Ernakulam',  arrival:'09:00', departure:'08:30' },
    { busNo:'KL-03', driver:'Suresh Menon',  from:'Calicut',  to:'Palakkad',   arrival:'11:30', departure:'11:00' },
    { busNo:'TN-01', driver:'Murali Raja',   from:'Chennai',  to:'Coimbatore', arrival:'14:00', departure:'07:00' },
    { busNo:'TN-02', driver:'Pradeep Raj',   from:'Madurai',  to:'Salem',      arrival:'13:30', departure:'11:00' },
  ];
  let added = 0;
  demo.forEach(d => {
    if (!findBus(d.busNo)) {
      buses.push({ ...d, seats: Array(TOTAL_SEATS).fill('') });
      added++;
    }
  });

  // Pre-book some seats to make it realistic
  const kl01 = findBus('KL-01');
  if (kl01) {
    ['5','12','17','3','8','20','24'].forEach((s,i) => {
      const names = ['Arjun','Priya','Deepak','Anjali','Ravi','Sneha','Manu'];
      kl01.seats[+s-1] = names[i] || 'Passenger';
    });
  }
  const tn01 = findBus('TN-01');
  if (tn01) {
    ['1','2','7','15','22'].forEach((s,i) => {
      const names = ['Karthik','Divya','Senthil','Pooja','Vikram'];
      tn01.seats[+s-1] = names[i] || 'Passenger';
    });
  }

  updateHomeStats();
  showToast(`${added} sample route${added===1?'':'s'} loaded!`, 'success');
  const btn = document.getElementById('demoBtn');
  if (btn) {
    btn.textContent = 'Routes Loaded ✔';
    btn.disabled = true;
    btn.style.opacity = '0.7';
  }
}

// =========== MANAGE: Create Route ===========
function createRoute(e) {
  e.preventDefault();
  const busNo    = document.getElementById('fBusNo').value.trim().toUpperCase();
  const driver   = document.getElementById('fDriver').value.trim();
  const from     = document.getElementById('fFrom').value.trim();
  const to       = document.getElementById('fTo').value.trim();
  const arrival  = document.getElementById('fArrival').value;
  const departure= document.getElementById('fDeparture').value;
  const fb       = document.getElementById('routeFeedback');

  if (!busNo || !driver || !from || !to || !arrival || !departure) {
    setFeedback(fb, 'Please fill in all fields.', 'error');
    return;
  }
  if (findBus(busNo)) {
    setFeedback(fb, `Bus number "${busNo}" already exists.`, 'error');
    return;
  }

  buses.push({ busNo, driver, from, to, arrival, departure, seats: Array(TOTAL_SEATS).fill('') });
  setFeedback(fb, `Route "${busNo}" created successfully!`, 'success');
  document.getElementById('routeForm').reset();
  renderManageList();
  updateHomeStats();
  showToast(`Bus ${busNo} added!`, 'success');
}

function setFeedback(el, msg, type) {
  el.textContent = msg;
  el.className = 'form-feedback ' + type;
  setTimeout(() => { el.textContent = ''; el.className = 'form-feedback'; }, 4000);
}

function renderManageList() {
  const list  = document.getElementById('manageRouteList');
  const empty = document.getElementById('manageListEmpty');
  const count = document.getElementById('routeCount');
  if (!list) return;

  count.textContent = buses.length;

  if (buses.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';
  list.innerHTML = buses.map(b => `
    <div class="mrl-item">
      <div style="font-size:26px">🚌</div>
      <div class="mrl-info">
        <div class="mrl-route">${b.from} → ${b.to}</div>
        <div class="mrl-meta">${b.busNo} · Driver: ${b.driver} · Dep: ${fmtTime(b.departure)}</div>
      </div>
      <span class="mrl-tag">${availableCount(b)} open</span>
    </div>
  `).join('');
}

// =========== BUS GRID ===========
function renderBusGrid() {
  const grid  = document.getElementById('busGrid');
  const empty = document.getElementById('busListEmpty');
  if (!grid) return;

  const q = (document.getElementById('busSearch')?.value || '').toLowerCase();
  const filtered = buses.filter(b =>
    b.busNo.toLowerCase().includes(q) ||
    b.from.toLowerCase().includes(q) ||
    b.to.toLowerCase().includes(q) ||
    b.driver.toLowerCase().includes(q)
  );

  if (buses.length === 0) {
    grid.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="es-icon">🔍</div><h3>No results</h3><p>Try a different search term.</p></div>`;
    return;
  }

  grid.innerHTML = filtered.map(b => {
    const avail = availableCount(b);
    const pct   = Math.round(((TOTAL_SEATS - avail) / TOTAL_SEATS) * 100);
    const cls   = avail > 20 ? 'high' : avail > 8 ? 'mid' : 'low';
    const barColor = avail > 20 ? 'var(--green)' : avail > 8 ? 'var(--accent)' : 'var(--red)';
    return `
      <div class="bus-card">
        <span class="bc-tag">${b.busNo}</span>
        <div class="bc-route-line">
          <span class="bc-city">${b.from}</span>
          <span class="bc-arrow">→</span>
          <span class="bc-city">${b.to}</span>
        </div>
        <div class="bc-meta">
          <div class="bc-meta-item"><label>Driver</label><span>${b.driver}</span></div>
          <div class="bc-meta-item"><label>Departure</label><span>${fmtTime(b.departure)}</span></div>
          <div class="bc-meta-item"><label>Arrival</label><span>${fmtTime(b.arrival)}</span></div>
          <div class="bc-meta-item"><label>Total Seats</label><span>${TOTAL_SEATS}</span></div>
        </div>
        <div class="bc-availability">
          <span class="bc-avail-label">Available Seats</span>
          <span class="bc-avail-count ${cls}">${avail}</span>
        </div>
        <div class="bc-progress">
          <div class="bc-progress-bar" style="width:${pct}%;background:${barColor};opacity:0.7"></div>
        </div>
        <div class="bc-actions">
          <button class="btn-ghost btn-sm" style="flex:1" onclick="openBusDetail('${b.busNo}')">View Seats</button>
          <button class="btn-primary btn-sm" style="flex:1" onclick="reserveFromGrid('${b.busNo}')">Reserve →</button>
        </div>
      </div>
    `;
  }).join('');
}

function filterBuses() { renderBusGrid(); }

function reserveFromGrid(busNo) {
  showView('reserve');
  setTimeout(() => {
    const card = document.querySelector(`.rbl-card[data-bus="${busNo}"]`);
    if (card) card.click();
  }, 100);
}

// =========== BUS DETAIL MODAL ===========
function openBusDetail(busNo) {
  const b = findBus(busNo);
  if (!b) return;
  const avail = availableCount(b);
  const booked = TOTAL_SEATS - avail;

  const seatsHtml = b.seats.map((s, i) => `
    <div class="modal-seat ${s ? 'booked' : ''}" title="${s ? 'Booked: ' + s : 'Available'}">
      ${i+1}${s ? '<br><small style="font-size:9px;opacity:0.8">'+s.split(' ')[0]+'</small>' : ''}
    </div>
  `).join('');

  document.getElementById('modalContent').innerHTML = `
    <h2 class="modal-title">🚌 ${b.busNo} — ${b.from} → ${b.to}</h2>
    <div class="detail-grid">
      <div class="detail-item"><label>Driver</label><span>${b.driver}</span></div>
      <div class="detail-item"><label>Bus No</label><span>${b.busNo}</span></div>
      <div class="detail-item"><label>Departure</label><span>${fmtTime(b.departure)}</span></div>
      <div class="detail-item"><label>Arrival</label><span>${fmtTime(b.arrival)}</span></div>
      <div class="detail-item"><label>Available</label><span style="color:var(--green)">${avail}</span></div>
      <div class="detail-item"><label>Booked</label><span style="color:var(--red)">${booked}</span></div>
    </div>
    <div style="font-size:13px;color:var(--text2);margin-bottom:10px;font-weight:600">Seat Map (${TOTAL_SEATS} seats)</div>
    <div class="seat-legend" style="margin-bottom:12px">
      <span><i class="dot"></i>Available</span>
      <span><i class="dot booked"></i>Booked</span>
    </div>
    <div class="modal-seat-grid">${seatsHtml}</div>
  `;
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

// =========== RESERVE ===========
function renderReserveBusList() {
  const list  = document.getElementById('reserveBusList');
  const empty = document.getElementById('reserveBusEmpty');
  if (!list) return;

  resetReservation();

  if (buses.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    return;
  }
  empty.style.display = 'none';

  list.innerHTML = buses.map(b => {
    const avail = availableCount(b);
    const cls   = avail > 20 ? 'var(--green)' : avail > 8 ? 'var(--accent)' : 'var(--red)';
    return `
      <div class="rbl-card" data-bus="${b.busNo}" onclick="selectBusForReserve('${b.busNo}')">
        <div class="rbl-icon">🚌</div>
        <div class="rbl-info">
          <div class="rbl-route">${b.from} → ${b.to}</div>
          <div class="rbl-meta">Bus ${b.busNo} · ${b.driver} · Dep ${fmtTime(b.departure)}</div>
        </div>
        <div class="rbl-avail">
          <div class="rbl-avail-num" style="color:${cls}">${avail}</div>
          <div class="rbl-avail-label">seats left</div>
        </div>
      </div>
    `;
  }).join('');
}

function selectBusForReserve(busNo) {
  selectedBusForReserve = findBus(busNo);
  selectedSeat = null;
  if (!selectedBusForReserve) return;

  // Highlight selection
  document.querySelectorAll('.rbl-card').forEach(c => c.classList.toggle('selected', c.dataset.bus === busNo));

  // Show seat map step
  document.getElementById('step-seat-map').style.display = 'block';
  document.getElementById('step-passenger').style.display = 'none';
  document.getElementById('bookingSuccess').style.display = 'none';
  document.getElementById('reserveLayout').style.display = 'grid';

  // Bus info banner
  const b = selectedBusForReserve;
  document.getElementById('selectedBusInfo').innerHTML = `
    <strong>${b.from} → ${b.to}</strong> &nbsp;·&nbsp;
    Bus <strong>${b.busNo}</strong> &nbsp;·&nbsp;
    Driver: <strong>${b.driver}</strong> &nbsp;·&nbsp;
    Dep: <strong>${fmtTime(b.departure)}</strong>
  `;

  renderSeatGrid();
  document.getElementById('step-seat-map').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSeatGrid() {
  const grid = document.getElementById('seatGrid');
  if (!grid || !selectedBusForReserve) return;
  const b = selectedBusForReserve;

  let html = '';
  for (let i = 0; i < TOTAL_SEATS; i++) {
    // Add aisle spacer after every 2 seats (4 per row with aisle in middle)
    if (i > 0 && i % 4 === 2) {
      // visual gap handled by CSS gap
    }
    const isBooked = !!b.seats[i];
    const seatNum  = i + 1;
    html += `<button
      class="seat-btn ${isBooked ? 'booked' : ''} ${selectedSeat === seatNum ? 'selected' : ''}"
      onclick="${isBooked ? '' : `selectSeat(${seatNum})`}"
      title="${isBooked ? 'Booked by: ' + b.seats[i] : 'Seat ' + seatNum}"
    >${seatNum}</button>`;
  }
  grid.innerHTML = html;
}

function selectSeat(num) {
  selectedSeat = num;
  renderSeatGrid();

  // Show passenger panel
  const panel = document.getElementById('step-passenger');
  panel.style.display = 'block';

  // Update summary
  const b = selectedBusForReserve;
  document.getElementById('bookingSummary').innerHTML = `
    <strong>Bus:</strong> ${b.busNo} (${b.from} → ${b.to})<br>
    <strong>Seat:</strong> ${num}<br>
    <strong>Departure:</strong> ${fmtTime(b.departure)}<br>
    <strong>Driver:</strong> ${b.driver}
  `;
  document.getElementById('passengerName').focus();
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function confirmBooking() {
  const name = document.getElementById('passengerName').value.trim();
  if (!name) { showToast('Please enter passenger name.', 'error'); return; }
  if (!selectedBusForReserve || !selectedSeat) { showToast('Please select a seat.', 'error'); return; }

  const b = selectedBusForReserve;
  if (b.seats[selectedSeat - 1]) { showToast('Seat already booked!', 'error'); return; }

  b.seats[selectedSeat - 1] = name;
  updateHomeStats();
  showToast(`Seat ${selectedSeat} booked for ${name}!`, 'success');

  // Show ticket
  document.getElementById('reserveLayout').style.display = 'none';
  const success = document.getElementById('bookingSuccess');
  success.style.display = 'block';

  const now = new Date();
  document.getElementById('ticketCard').innerHTML = `
    <div class="ticket-row"><label>Passenger</label><span>${name}</span></div>
    <div class="ticket-row"><label>Route</label><span>${b.from} → ${b.to}</span></div>
    <div class="ticket-row"><label>Bus No</label><span>${b.busNo}</span></div>
    <div class="ticket-row"><label>Seat</label><span style="color:var(--accent);font-size:18px;font-family:var(--font-head)">#${selectedSeat}</span></div>
    <div class="ticket-row"><label>Driver</label><span>${b.driver}</span></div>
    <div class="ticket-row"><label>Departure</label><span>${fmtTime(b.departure)}</span></div>
    <div class="ticket-row"><label>Booked On</label><span>${now.toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'})}</span></div>
  `;
  success.scrollIntoView({ behavior: 'smooth' });
}

function resetReservation() {
  selectedBusForReserve = null;
  selectedSeat = null;
  document.getElementById('step-seat-map').style.display = 'none';
  document.getElementById('step-passenger').style.display = 'none';
  document.getElementById('bookingSuccess').style.display = 'none';
  document.getElementById('reserveLayout').style.display = 'grid';
  const pn = document.getElementById('passengerName');
  if (pn) pn.value = '';
  document.querySelectorAll('.rbl-card').forEach(c => c.classList.remove('selected'));
}

// =========== INIT ===========
document.addEventListener('DOMContentLoaded', () => {
  updateHomeStats();
});
