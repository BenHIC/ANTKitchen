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
      'products.p1.text': '主要成分：糖、蛋白、鮮奶油、堅果；口味：蔓越梅開心果、巧克力杏仁、原味杏仁、芝麻核桃、抹茶南瓜子。',
      'products.p1.br': '',
      'products.p2.title': '雪Q餅',
      'products.p2.text': '主要成分：奇福餅乾、奶粉、奶油、堅果、果乾；口味：蔓越梅、葡萄乾。',
      'products.p2.br': '',
      'products.p3.title': '巴斯克焦香重乳酪蛋糕',
      'products.p3.text': '主要成分：奶油乳酪、鮮奶油、砂糖、雞蛋、麵粉。',
      'contact.title': '聯絡我們',
      'contact.name': '姓名',
      'contact.email': '電子郵件',
      'contact.message': '訊息',
      'contact.submit': '送出',
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
      'products.p1.text': 'Main ingredients: sugar, egg white, cream, nuts. Flavors: Cranberry & Pistachio; Chocolate & Almond; Original Almond; Sesame & Walnut; Matcha & Pumpkin Seed.',
      'products.p1.br': '',
      'products.p2.title': 'Snow Q Cookie',
      'products.p2.text': 'Main ingredients: chiffon cookies, milk powder, butter, nuts, dried fruits. Flavors: Cranberry; Raisin.',
      'products.p2.br': '',
      'products.p3.title': 'Basque Burnt Cheesecake',
      'products.p3.text': 'Main ingredients: cream cheese, heavy cream, sugar, eggs, flour.',
      'contact.title': 'Contact Us',
      'contact.name': 'Name',
      'contact.email': 'Email',
      'contact.message': 'Message',
      'contact.submit': 'Send',
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
      // Preserve decorative icons (e.g. <i class="bi ...">) inside buttons/anchors
      const icons = Array.from(el.querySelectorAll('i.bi')).map(i => i.outerHTML).join('');
      if (icons) {
        el.innerHTML = translated + ' ' + icons;
      } else {
        el.textContent = translated;
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

