const PACKAGES = {
  pilot: {
    turnaround: 'Turnaround: 3–4 business days',
    heading: 'Pilot 3D Browser Walkthrough (1–3 rooms)',
    summary:
      'Ideal for interior studios, dental clinics, and villa developers who want to accelerate client approval with an interactive browser preview instead of static moodboards.',
    bullets: [
      'Interactive Three.js / GLB browser link (lightweight mobile-ready load)',
      '3 high-resolution Blender Cycles architectural still renders (4K)',
      'Bonus room-by-room PBR Material & Lighting Specification Sheet',
      '2 rounds of lighting & finish revisions included',
    ],
    subject: 'Inquiry: Pilot 3D Browser Walkthrough (1-3 rooms)',
  },
  villa: {
    turnaround: 'Turnaround: 5–7 business days',
    heading: 'Off-Plan Villa Showcase (Stills + 30s Reel + WebGL)',
    summary:
      'Complete off-plan marketing kit designed for Bali and international luxury real estate developers pitching remote overseas investors.',
    bullets: [
      '6 photorealistic exterior & interior renders (Daylight + Dusk moods)',
      '30-second architectural walkthrough video (1080p MP4 + WhatsApp-ready <12MB cut)',
      'Interactive browser 3D preview & PBR Material Specification Sheet',
      'Clean Blender Cycles + FBX + GLB handover upon completion',
    ],
    subject: 'Inquiry: Off-Plan Villa 3D Showcase Package',
  },
  clinic: {
    turnaround: 'Turnaround: 4–5 business days',
    heading: 'Clinic, Hospitality & Exhibition Booth Visualization',
    summary:
      'Built for medical wellness practices, hospitality lounges, and regional exhibition booth contractors needing fast, high-trust spatial presentations.',
    bullets: [
      '4 calibrated high-CRI daylight architectural renders of key client zones',
      'Interactive browser tour ready to embed on your Room & Facilities page',
      'Hygienic material & lighting specification schedule for contractors',
      'White-label delivery option for design agencies',
    ],
    subject: 'Inquiry: Clinic / Hospitality / Booth 3D Visualization',
  },
  game: {
    turnaround: 'Turnaround: 5–10 business days',
    heading: 'Game-Ready 3D Hero Asset or UE5 Biome Pack',
    summary:
      'Production-tested character rigs, creature bosses, and Unreal Engine 5.8 environments with clean topology, LOD chains, and 4K ORM PBR textures.',
    bullets: [
      'Clean quad/tri game topology with baked 4K PBR (BaseColor, ORM, Normal)',
      'Custom skeletal rigging & animation loops (.fbx / .glb / .blend)',
      'Unreal Engine 5.8 Nanite / LOD0–LOD3 performance verification',
      'Full commercial IP rights transfer on custom commissions',
    ],
    subject: 'Inquiry: Custom Game-Ready 3D Asset / UE5 Environment',
  },
};

// Theme toggle
const themeBtn = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('dh3d_theme');
const initialTheme =
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

function applyTheme(next) {
  root.dataset.theme = next;
  localStorage.setItem('dh3d_theme', next);
  if (themeBtn) {
    themeBtn.textContent = next === 'light' ? 'Dark' : 'Light';
    themeBtn.setAttribute(
      'aria-label',
      `Switch to ${next === 'light' ? 'dark' : 'light'} studio theme`
    );
  }
}

applyTheme(initialTheme);
themeBtn?.addEventListener('click', () => {
  applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light');
});

// Interactive package selector
const pkgButtons = document.querySelectorAll('.pkg-btn');
const elTurnaround = document.getElementById('pkg-turnaround');
const elHeading = document.getElementById('pkg-heading');
const elSummary = document.getElementById('pkg-summary');
const elBullets = document.getElementById('pkg-bullets');
const elMailto = document.getElementById('pkg-mailto');

pkgButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-pkg');
    const data = PACKAGES[key];
    if (!data) return;

    pkgButtons.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-selected', active);
      b.setAttribute('aria-checked', String(active));
    });

    if (elTurnaround) elTurnaround.textContent = data.turnaround;
    if (elHeading) elHeading.textContent = data.heading;
    if (elSummary) elSummary.textContent = data.summary;
    if (elBullets) {
      elBullets.innerHTML = '';
      data.bullets.forEach((txt) => {
        const li = document.createElement('li');
        li.textContent = txt;
        elBullets.appendChild(li);
      });
    }
    if (elMailto) {
      elMailto.setAttribute(
        'href',
        `mailto:prasada.arif@gmail.com?subject=${encodeURIComponent(data.subject)}`
      );
    }
  });
});

// Native accessible dialog lightbox
const dialog = document.getElementById('work-dialog');
const dTitle = document.getElementById('dialog-title');
const dCat = document.getElementById('dialog-category');
const dImg = document.getElementById('dialog-img');
const dDesc = document.getElementById('dialog-desc');
const dSpecs = document.getElementById('dialog-specs');
const dClose = document.getElementById('dialog-close');

document.querySelectorAll('.work-trigger').forEach((trigger) => {
  trigger.addEventListener('click', () => {
    if (!dialog || typeof dialog.showModal !== 'function') return;
    if (dTitle) dTitle.textContent = trigger.getAttribute('data-title') || '';
    if (dCat) dCat.textContent = trigger.getAttribute('data-category') || '';
    if (dImg) {
      dImg.setAttribute('src', trigger.getAttribute('data-img') || '');
      dImg.setAttribute('alt', trigger.getAttribute('data-title') || '');
    }
    if (dDesc) dDesc.textContent = trigger.getAttribute('data-desc') || '';
    if (dSpecs) dSpecs.textContent = trigger.getAttribute('data-specs') || '';
    dialog.showModal();
  });
});

dClose?.addEventListener('click', () => dialog?.close());
dialog?.addEventListener('click', (evt) => {
  if (evt.target === dialog) dialog.close();
});
