// =============================
// ส่วนที่ 1: ทำให้เมนูไฮไลต์ตามตำแหน่งที่ scroll อยู่
// =============================
// เมื่อโหลดหน้าเว็บ จะค้นหาเมนูที่มีคลาส .nav-link และ section ที่เกี่ยวข้อง
// ฟังก์ชัน onScroll จะตรวจสอบว่าขณะนี้อยู่ section ไหน แล้วเพิ่มคลาส active ให้เมนูนั้น
// เมื่อ scroll หรือคลิกเมนู จะเลื่อนไปยัง section และอัปเดต active อัตโนมัติ
document.addEventListener('DOMContentLoaded', function() {
  // เลือกเมนูทั้งหมดที่มีคลาส .nav-link
  const navLinks = document.querySelectorAll('.nav-link');
  // สร้าง array ของ section ที่เมนูแต่ละอันลิงก์ไปหา
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  });

  // ฟังก์ชันนี้จะถูกเรียกเมื่อ scroll เพื่ออัปเดตเมนู active
  function onScroll() {
    let currentSection = null;
    const scrollPos = window.scrollY + 120; // ชดเชย header ที่ fixed
    sections.forEach((section, idx) => {
      if (section && section.offsetTop <= scrollPos) {
        currentSection = idx;
      }
    });
    navLinks.forEach((link, idx) => {
      if (idx === currentSection) {
        link.classList.add('active'); // เพิ่ม active ให้เมนูที่ตรงกับ section
      } else {
        link.classList.remove('active');
      }
    });
  }

  // เมื่อ scroll ให้เรียก onScroll
  window.addEventListener('scroll', onScroll);
  // เรียกครั้งแรกเมื่อโหลดหน้าเว็บ
  onScroll();

  // เมื่อคลิกเมนู จะเลื่อนไปยัง section แบบ smooth และอัปเดต active
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').replace('#', '');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80, // ชดเชย header
          behavior: 'smooth'
        });
      }
    });
  });
});
// =============================
// ส่วนที่ 2: เอฟเฟกต์พิมพ์ข้อความอัตโนมัติ (Typing Effect)
// =============================
// เมื่อโหลดหน้าเว็บ จะค้นหา element ที่มีคลาส .typing-effect
// แล้วค่อย ๆ พิมพ์ข้อความทีละตัวอักษร วนซ้ำไปเรื่อย ๆ
document.addEventListener('DOMContentLoaded', function() {
  const el = document.querySelector('.typing-effect'); // เลือก element ที่จะทำเอฟเฟกต์
  if (!el) return;
  const text = el.textContent; // ข้อความต้นฉบับ
  let i = 0;
  el.textContent = '';
  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i); // เพิ่มตัวอักษรทีละตัว
      i++;
      setTimeout(type, 80); // หน่วงเวลาแต่ละตัวอักษร
    } else {
      setTimeout(() => {
        el.textContent = '';
        i = 0;
        type(); // เริ่มใหม่เมื่อพิมพ์ครบ
      }, 1200);
    }
  }
  type();
});