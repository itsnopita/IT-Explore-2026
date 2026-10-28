document.addEventListener("DOMContentLoaded", () => {
  // Tahun otomatis di footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Navbar berubah saat di-scroll + tombol kembali ke atas
  const navbar = document.getElementById("mainNav");
  const toTop = document.getElementById("toTop");
  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
    toTop.classList.toggle("show", window.scrollY > 500);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  // Tutup menu mobile setelah link diklik
  document
    .querySelectorAll("#navbarNav .nav-link, #navbarNav .btn")
    .forEach((link) => {
      link.addEventListener("click", () => {
        const menu = document.getElementById("navbarNav");
        if (menu.classList.contains("show"))
          bootstrap.Collapse.getOrCreateInstance(menu).hide();
      });
    });

  // Efek mengetik pada peran
  const roles = [
    "Website Developer",
    "Mahasiswa Sistem Informasi",
    "Computer Community Member",
  ];
  const typed = document.getElementById("typed-text");
  let r = 0,
    c = 0,
    deleting = false;
  (function type() {
    const word = roles[r];
    typed.textContent = word.substring(0, c);
    if (!deleting && c < word.length) {
      c++;
      setTimeout(type, 80);
    } else if (!deleting) {
      deleting = true;
      setTimeout(type, 1600);
    } else if (c > 0) {
      c--;
      setTimeout(type, 40);
    } else {
      deleting = false;
      r = (r + 1) % roles.length;
      setTimeout(type, 300);
    }
  })();

  // Animasi muncul saat di-scroll, progress bar, dan penghitung angka
  const animateCount = (el) => {
    const target = +el.dataset.count,
      suffix = el.dataset.suffix || "";
    const steps = 40;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      el.textContent = Math.round((target * i) / steps) + suffix;
      if (i >= steps) clearInterval(timer);
    }, 30);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("visible");
        el.querySelectorAll(".bar-fill").forEach(
          (b) => (b.style.width = b.dataset.level + "%"),
        );
        el.querySelectorAll("[data-count]").forEach(animateCount);
        observer.unobserve(el);
      });
    },
    { threshold: 0.15 },
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // Formulir kontak: validasi lalu buka aplikasi email
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nama = form.nama.value.trim();
    const email = form.email.value.trim();
    const subjek = form.subjek.value.trim();
    const pesan = form.pesan.value.trim();
    if (!nama || !subjek || !pesan || !/^\S+@\S+\.\S+$/.test(email)) {
      status.textContent = "Mohon lengkapi semua kolom dengan benar.";
      status.className = "ms-3 small text-danger";
      return;
    }
    // Ganti alamat tujuan dengan email Anda yang sebenarnya
    const tujuan = "email@example.com";
    const body = `Nama: ${nama}\nEmail: ${email}\n\n${pesan}`;
    window.location.href = `mailto:${tujuan}?subject=${encodeURIComponent(subjek)}&body=${encodeURIComponent(body)}`;
    status.textContent = "Membuka aplikasi email Anda...";
    status.className = "ms-3 small text-success";
    form.reset();
  });
});
