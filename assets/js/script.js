// Modular JS: I18nService, UIService, FormService
const I18nService = (function () {
  const TRANSLATIONS = {
    zh: {
      'nav.about': '關於',
      'nav.products': '商品',
      'nav.contact': '聯絡',
      'hero.title': 'ANTKitchen',
      'hero.lead': '健康・手作・美味 — 用心烘焙每一口',
      'hero.cta': '查看商品',
      'about.title': '關於 ANTKitchen',
      'about.p': 'ANTKitchen 是一間以健康為出發點的手作烘焙坊。我們選用天然食材、少糖配方，並以心製作每一款烘焙商品，讓你吃得安心又滿足。',
      'about.li1': '天然食材',
      'about.li2': '手作小量製作',
      'about.li3': '可訂製低糖／特殊需求',
      'products.title': '招牌商品',
      'products.p1.title': '牛軋糖',
      'products.p1.ingredients': '<strong>成分：</strong>葡萄糖漿、砂糖、奶油、奶粉、堅果、蔓越莓、開心果、蛋白粉、調味粉。',
      'products.p1.flavors': '<strong>口味：</strong>蔓越梅開心果、巧克力杏仁、原味杏仁、芝麻核桃、抹茶南瓜子。',
      'products.p1.br': '',
      'products.p2.title': '雪Ｑ餅',
      'products.p2.ingredients': '<strong>成分：</strong>小麥粉、奶油、奶粉、蛋白、麥芽糖、蔓越莓、葡萄乾、鹽、酵母、膨脹劑。',
      'products.p2.flavors': '<strong>口味：</strong>雪Ｑ餅（蔓越梅、葡萄乾）。',
      'products.p2.br': '',
      'products.p4.title': '湯圓',
      'products.p4.ingredients': '<strong>成分：</strong>糯米、水、奶油、糖、花生粉、芝麻粉。',
      'products.p4.flavors': '<strong>口味：</strong>芝麻、花生。',
      'products.p5.title': '雪Ｑ餅 + 牛軋糖',
      'products.p5.ingredients': '<strong>成分：</strong>麵粉、奶油、奶粉、蛋白、麥芽糖、蔓越莓、開心果、葡萄乾、杏仁。',
      'products.p5.flavors': '<strong>口味：</strong>雪Ｑ餅（蔓越梅＋葡萄乾）、牛軋糖（蔓越梅開心果、巧克力杏仁、芝麻核桃）。',
      'products.p3.title': '巴斯克焦香重乳酪蛋糕',
      'products.p3.text': '<strong>成分：</strong>奶油乳酪、鮮奶油、砂糖、雞蛋、麵粉。',
      'contact.title': '聯絡我們',
      'contact.name': '姓名',
      'contact.email': '電子郵件',
      'contact.message': '訊息',
      'contact.submit': '送出',
      'carousel.prev': '上一頁',
      'carousel.next': '下一頁',
      'contact.or': '或透過社群與我們聯繫：'
    },
    en: {
      'nav.about': 'About',
      'nav.products': 'Products',
      'nav.contact': 'Contact',
      'hero.title': 'ANTKitchen',
      'hero.lead': 'Healthy · Handmade · Delicious — Baked with care',
      'hero.cta': 'View Products',
      'about.title': 'About ANTKitchen',
      'about.p': 'ANTKitchen is a handmade bakery focused on health. We use natural ingredients and lower-sugar recipes, crafting each item with care so you can enjoy treats that are both tasty and wholesome.',
      'about.li1': 'Natural ingredients',
      'about.li2': 'Small-batch handmade',
      'about.li3': 'Custom low-sugar / special diets',
      'products.title': 'Signature Products',
      'products.p1.title': 'Nougat',
      'products.p1.ingredients': '<strong>Main ingredients:</strong> glucose syrup, sugar, butter, milk powder, nuts, cranberry, pistachio, whey protein, flavoring.',
      'products.p1.flavors': '<strong>Flavors:</strong> Cranberry & Pistachio; Chocolate & Almond; Original Almond; Sesame & Walnut; Matcha & Pumpkin Seed.',
      'products.p1.br': '',
      'products.p2.title': 'Snow Q Cookie',
      'products.p2.ingredients': '<strong>Main ingredients:</strong> wheat flour, butter, milk powder, egg white, maltose, cranberry, raisin, salt, yeast, leavening agent.',
      'products.p2.flavors': '<strong>Flavors:</strong> Snow Q Cookie (Cranberry, Raisin).',
      'products.p2.br': '',
      'products.p4.title': 'Rice Ball',
      'products.p4.ingredients': '<strong>Main ingredients:</strong> glutinous rice, water, butter, sugar, peanut powder, sesame powder.',
      'products.p4.flavors': '<strong>Flavors:</strong> sesame, peanut.',
      'products.p5.title': 'Snow Q Cookie + Nougat',
      'products.p5.ingredients': '<strong>Main ingredients:</strong> flour, butter, milk powder, egg white, maltose, cranberry, pistachio, raisin, almond.',
      'products.p5.flavors': '<strong>Flavors:</strong> Snow Q Cookie (Cranberry + Raisin); Nougat (Cranberry & Pistachio, Chocolate & Almond, Sesame & Walnut).',
      'products.p3.title': 'Basque Burnt Cheesecake',
      'products.p3.text': '<strong>Main ingredients:</strong> cream cheese, heavy cream, sugar, eggs, flour.',
      'contact.title': 'Contact Us',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.submit': 'Send',
      'carousel.prev': 'Previous',
      'carousel.next': 'Next',
      'contact.or': 'Or reach us on social:'
    }
  };

  function apply(lang) {
    const map = TRANSLATIONS[lang] || TRANSLATIONS['zh'];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      if (!key) return;
      const translated = map[key];
      if (typeof translated === 'undefined') return;
      // Preserve decorative icons (e.g. <i class="bi ...">) and keep their original position (before/after text)
      const iconEls = Array.from(el.querySelectorAll('i.bi'));
      const iconsHtml = iconEls.map(i => i.outerHTML).join('');
      if (iconEls.length) {
        const firstIsIcon = el.firstElementChild && el.firstElementChild.matches && el.firstElementChild.matches('i.bi');
        if (firstIsIcon) {
          el.innerHTML = iconsHtml + ' ' + translated;
        } else {
          el.innerHTML = translated + ' ' + iconsHtml;
        }
      } else {
        el.innerHTML = translated;
      }
    });
    document.querySelectorAll('[data-lang]').forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-lang') === lang);
    });
    localStorage.setItem('antk_lang', lang);
  }

  return { apply };
})();

const UIService = (function () {
  function bindLanguageButtons() {
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        I18nService.apply(this.getAttribute('data-lang'));
      });
    });
  }

  function enableSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  return { bindLanguageButtons, enableSmoothScroll };
})();

const FormService = (function () {
  function init() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      if (!name || !email || !message) {
        alert(localStorage.getItem('antk_lang') === 'en' ? 'Please fill the form.' : '請完整填寫表單。');
        return;
      }
      alert(localStorage.getItem('antk_lang') === 'en' ? 'Thank you, ANTKitchen will contact you shortly!' : '感謝您的訊息，ANTKitchen 會儘快回覆您！');
      form.reset();
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', function () {
  UIService.bindLanguageButtons();
  UIService.enableSmoothScroll();
  const saved = localStorage.getItem('antk_lang') || 'zh';
  I18nService.apply(saved);
  FormService.init();
});

