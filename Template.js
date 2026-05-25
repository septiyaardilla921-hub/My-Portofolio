// Template.js

// ── Contact form handler ──────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        btn.textContent = 'Terkirim ✓';
        btn.disabled = true;
        btn.style.background = '#16a34a';
        setTimeout(() => {
            btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            btn.disabled = false;
            btn.style.background = '';
            this.reset();
        }, 3000);
    });
}

// ── Mobile menu toggle ────────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const nav     = document.querySelector('nav');
if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── Active nav link ───────────────────────────────
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// ── Mobile menu toggle ────────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const nav     = document.querySelector('nav');
if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
}

// ── Contact Form → Google Sheets ─────────────────
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzBkSgSQInlUhV6QR4PpkmAKww7gXkEPFQvF5Ls3iRTuJaJeOk0egrw46nm9Er9aMw/exec'; // ← URL dari deploy ulang

const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('cf-submit-btn');

if (contactForm && submitBtn) {

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const nama   = (contactForm.querySelector('[name="nama"]').value   || '').trim();
        const email  = (contactForm.querySelector('[name="email"]').value  || '').trim();
        const wa     = (contactForm.querySelector('[name="kontak"]').value || '').trim();
        const subjek = (contactForm.querySelector('[name="subjek"]').value || '').trim();
        const pesan  = (contactForm.querySelector('[name="pesan"]').value  || '').trim();

        // Validasi
        if (!nama || !pesan || (!email && !wa)) {
            alert('Harap isi Nama, Pesan, dan minimal Email atau No. WhatsApp.');
            return;
        }

        // Loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Mengirim...';

        try {
            await fetch(APPS_SCRIPT_URL, {
                method:  'POST',
                mode:    'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nama:   nama,
                    kontak: email || wa,
                    subjek: subjek || '-',
                    pesan:  pesan
                })
            });

            // Sukses (no-cors tidak bisa baca response, tapi kalau tidak error = berhasil)
            submitBtn.innerHTML     = '<i class="fa-solid fa-circle-check"></i> Terkirim!';
            submitBtn.style.background = '#16a34a';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled         = false;
                submitBtn.style.background = '';
                submitBtn.innerHTML        = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            }, 3000);

        } catch (err) {
            submitBtn.disabled  = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            alert('Gagal mengirim. Periksa koneksi internet kamu.');
            console.error('Fetch error:', err);
        }
    });

}
// =============================================
// Template.js — clean, no duplicates
// =============================================

// =============================================
// Template.js — clean, no duplicates
// =============================================

// ── Mobile Menu Toggle ────────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const nav     = document.querySelector('nav');

if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');

        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (nav.classList.contains('open')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        }
    });

    // Tutup menu saat link diklik
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            const icon = menuBtn.querySelector('i');
            if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
        });
    });
}

// ── Active Nav Link ───────────────────────────────
document.querySelectorAll('nav a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// ── Contact Form → Google Sheets ─────────────────
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
                method:  'POST',
                mode:    'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, kontak: email || wa, subjek: subjek || '-', pesan })
            });

            submitBtn.innerHTML        = '<i class="fa-solid fa-circle-check"></i> Terkirim!';
            submitBtn.style.background = '#16a34a';
            contactForm.reset();

            setTimeout(() => {
                submitBtn.disabled         = false;
                submitBtn.style.background = '';
                submitBtn.innerHTML        = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            }, 3000);

        } catch (err) {
            submitBtn.disabled  = false;
            submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Pesan';
            alert('Gagal mengirim. Periksa koneksi internet kamu.');
            console.error('Fetch error:', err);
        }
    });
}