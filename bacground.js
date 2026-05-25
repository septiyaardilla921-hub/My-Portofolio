// Tab switcher — detail.js
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        // Update tombol aktif
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update section aktif
        document.querySelectorAll('.detail-page').forEach(sec => sec.classList.remove('active'));
        document.getElementById(target).classList.add('active');
    });
});

// Buka tab dari URL hash (mis: detail.html#work)
const hash = window.location.hash.replace('#', '');
if (hash) {
    const target = document.querySelector(`[data-target="${hash}"]`);
    if (target) target.click();
}