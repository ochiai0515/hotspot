/* =============================================
   フリースクール ホットスポット
   JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  // ① ヘッダー：スクロールで影を追加
  const header = document.querySelector('.site-header');
  function updateHeader() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });

  // ② スクロールトップボタン
  const scrollTopBtn = document.getElementById('scrollTop');
  function updateScrollBtn() {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', updateScrollBtn, { passive: true });
  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ③ フェードインアニメーション（Intersection Observer）
  const fadeElements = document.querySelectorAll(
    '.value-item, .activity-card, .community-card, .parents-card, ' +
    '.staff-card, .step, .schedule-card, .target-list li, ' +
    '.learning-item, .about-card, .reason-quote, .reason-body, ' +
    '.arinomama-content, .school-main, .school-steps, ' +
    '.contact-method, .contact-form, .contact-cta'
  );

  // 各要素にfade-inクラスを追加
  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  // IntersectionObserver
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          // 少し遅延させてアニメーション開始（連続する要素はずらす）
          const siblings = Array.from(entry.target.parentElement.children).filter(
            function (el) { return el.classList.contains('fade-in'); }
          );
          const index = siblings.indexOf(entry.target);
          const delay = Math.min(index * 80, 400);
          setTimeout(function () {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -32px 0px'
    }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ④ スムーズスクロール（href="#..." リンク）
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 60;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // ⑤ お問い合わせフォーム送信（静的サイト用ダミー処理）
  window.handleSubmit = function (e) {
    e.preventDefault();
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    // ここではフォームを隠して完了メッセージを表示
    form.style.display = 'none';
    success.style.display = 'block';
    // 実際の送信先（Formspree等）に繋ぐ場合はここにfetchを記述
    /*
    const formData = new FormData(form);
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(function(response) {
      if (response.ok) {
        form.style.display = 'none';
        success.style.display = 'block';
      }
    });
    */
  };

  // ⑥ 石畳エフェクト（ヒーローセクションのパターンをわずかに動かす）
  const stoneBg = document.querySelector('.stone-pattern');
  if (stoneBg) {
    window.addEventListener('scroll', function () {
      const scrolled = window.scrollY;
      stoneBg.style.transform = 'translateY(' + scrolled * 0.15 + 'px)';
    }, { passive: true });
  }

  // ⑦ ナビゲーション：現在のセクションをハイライト（アクティブ状態）
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.footer-nav a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      const sectionBottom = sectionTop + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        navLinks.forEach(function (link) {
          link.style.opacity = link.getAttribute('href') === '#' + id ? '1' : '0.6';
          link.style.fontWeight = link.getAttribute('href') === '#' + id ? '500' : '300';
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

});
