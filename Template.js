// ── Mobile Menu Drawer ──────────────────────────
const menuBtn  = document.querySelector('.menu-btn');
const nav      = document.querySelector('nav');
const overlay  = document.getElementById('nav-overlay');

function openNav() {
    nav.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    const icon = menuBtn.querySelector('i');
    if (icon) icon.classList.replace('fa-bars', 'fa-xmark');
}

function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
    const icon = menuBtn.querySelector('i');
    if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
}

if (menuBtn && nav) {
    menuBtn.addEventListener('click', openNav);
    overlay.addEventListener('click', closeNav);
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
}

// ── Active Nav Link ─────────────────────────────
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) link.classList.add('active');
});

// ── Contact Form → Google Sheets ───────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBkSgSQInlUhV6QR4PpkmAKww7gXkEPFQvF5Ls3iRTuJaJeOk0egrw46nm9Er9aMw/exec';
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('cf-submit-btn');

if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const nama   = (contactForm.querySelector('[name="nama"]')?.value   || '').trim();
        const email  = (contactForm.querySelector('[name="email"]')?.value  || '').trim();
        const wa     = (contactForm.querySelector('[name="kontak"]')?.value || '').trim();
        const subjek = (contactForm.querySelector('[name="subjek"]')?.value || '').trim();
        const pesan  = (contactForm.querySelector('[name="pesan"]')?.value  || '').trim();

        if (!nama || !pesan || (!email && !wa)) {
            alert('Harap isi Nama, Pesan, dan minimal Email atau No. WhatsApp.');
            return;
        }
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';
        try {
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST', mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, kontak: email || wa, subjek: subjek || '-', pesan })
            });
            submitBtn.innerHTML        = '<i class="fa-solid fa-circle-check"></i> Terkirim!';
            submitBtn.style.background = '#16a34a';
            contactForm.reset();
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            }, 3000);
        } catch (err) {
            submitBtn.disabled  = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            alert('Gagal mengirim. Periksa koneksi internet kamu.');
        }
    });
}