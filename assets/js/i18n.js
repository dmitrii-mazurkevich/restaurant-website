/* ==========================================================================
   i18n - EN in the markup, RU and KA in the dictionary below.
   Same engine as the portfolio hub. Georgian copy should be checked by a
   native speaker before a real launch.
   ========================================================================== */

(function () {
  'use strict';

  var LANGS = ['en', 'ru', 'ka'];
  var DEFAULT = 'en';

  var DICT = {
    ru: {
      'nav.skip': 'Перейти к содержимому',
      'nav.about': 'О нас',
      'nav.menu': 'Меню',
      'nav.visit': 'Как найти',
      'nav.book': 'Забронировать стол',
      'nav.menuBtn': 'Открыть меню',
      'demo.text': ' Брони никуда не отправляются.',
      'demo.link': 'Вернуться в портфолио',
      'foot.about': 'Грузинская кухня и вино из квеври у моря. Хлеб из печи тоне, хинкали лепим руками.',
      'foot.hours': 'Часы работы',
      'foot.hoursText': 'Вт-Вс 12:00-23:00<br>Пн 17:00-23:00',
      'foot.find': 'Как найти',
      'foot.address': 'Батуми, Приморская улица, 14<br><a href="tel:+995555000000">+995 555 00 00 00</a>',
      'foot.concept': 'Сайт сделал <a href="https://github.com/dmitrii-mazurkevich">Дмитрий Мазуркевич</a>.',

      'home.metaTitle': 'Kvali - грузинская кухня и вино из квеври в Батуми',
      'home.metaDesc': 'Грузинский ресторан у моря в Батуми: хачапури из печи тоне, хинкали ручной лепки, вино из квеври. Бронирование стола онлайн.',
      'home.eyebrow': 'Грузинская кухня · Батуми',
      'home.title': 'Длинный стол, <em>тёплый хлеб</em> и вино из квеври',
      'home.lede': 'Готовим так, как грузинские семьи готовят для гостей: щедро, без спешки, с хлебом прямо из печи тоне. Заходите на один хачапури, оставайтесь на тосты.',
      'home.cta1': 'Забронировать стол',
      'home.cta2': 'Посмотреть меню',
      'home.hoursShort': 'Сегодня с 12:00 · по понедельникам с 17:00',
      'home.aboutEyebrow': 'О Kvali',
      'home.aboutTitle': '«Квали» значит «след»',
      'home.about1': 'След, который оставляет хороший ужин: запах хлеба, тост, который запомнился, рецепт, который хочется повторить дома. Наш шеф выросла в Аджарии и готовит по тетради своей бабушки, с рыбой с утреннего рынка и вином из небольших семейных марани.',
      'home.about2': 'У каждого блюда в меню указаны аллергены, а официант подскажет, что можно приготовить без орехов или молока. Спрашивайте, мы любим вопросы.',
      'home.sigTitle': 'С чего начать',
      'home.sigAll': 'Всё меню',
      'home.galTitle': 'Внутри Kvali',
      'home.g1': 'Основной зал вечером',
      'home.g2': 'Квеври в винном погребе',
      'home.g3': 'Хинкали ручной лепки',
      'home.g4': 'Саперави из семейного марани',
      'home.g5': 'Терраса у моря',
      'home.g6': 'Хлеб из печи тоне',
      'home.revTitle': 'Что говорят гости',
      'home.r1': 'Пришли на один ужин и вернулись трижды за неделю. Лучший аджарули, который мы ели в Батуми.',
      'home.r1a': 'Анна, Тбилиси*',
      'home.r2': 'Официант без подсказок знал, какие блюда без орехов. С ребёнком-аллергиком это очень много значит.',
      'home.r2a': 'Ольга, Алматы*',
      'home.r3': 'Янтарное вино из квеври, хинкали и море за окном. Это и есть весь отзыв.',
      'home.r3a': 'Марк, Берлин*',
      'home.revNote': '* Отзывы на демо-сайте - примеры.',
      'home.visitTitle': 'Приходите',
      'home.f1': 'Адрес',
      'home.f1v': 'Батуми, Приморская улица, 14. Пять минут от башни Алфавита.',
      'home.f2': 'Часы',
      'home.f2v': 'Со вторника по воскресенье 12:00-23:00<br>Понедельник 17:00-23:00',
      'home.f3': 'Телефон',
      'home.f4': 'Компании',
      'home.f4v': 'До 40 гостей в основном зале. Супру с банкетным меню лучше бронировать за неделю.',

      'menu.metaTitle': 'Меню - Kvali, грузинская кухня',
      'menu.metaDesc': 'Меню Kvali: пхали, хачапури, хинкали, мцвади, десерты и вино из квеври. Аллергены и пометки для каждого блюда.',
      'menu.title': 'Меню',
      'menu.lede': 'Цены в лари, обслуживание не включено. У каждого блюда указаны аллергены: уберите то, что вам нельзя, и меню подстроится.',
      'menu.filtersAria': 'Фильтры меню',
      'menu.navAria': 'Разделы меню',
      'menu.legend': 'Аллергены:',
      'menu.note': 'Расскажите официанту о любой аллергии. На кухне используются орехи и мука, поэтому следы возможны в любом блюде.',

      'bk.metaTitle': 'Бронирование стола - Kvali',
      'bk.metaDesc': 'Забронируйте стол в Kvali, Батуми: день, время, число гостей и место.',
      'bk.title': 'Бронирование стола',
      'bk.lede': 'Выберите день и время. Держим стол 20 минут и подтверждаем каждую бронь сообщением.',
      'bk.day': 'День',
      'bk.time': 'Время',
      'bk.guestsSeat': 'Гости и место',
      'bk.guests': 'Гости',
      'bk.people': 'чел.',
      'bk.hall': 'Основной зал',
      'bk.terrace': 'Терраса',
      'bk.cellar': 'Винный погреб',
      'bk.contacts': 'Ваши данные',
      'bk.name': 'Имя',
      'bk.phone': 'Телефон или WhatsApp',
      'bk.note': 'Комментарий',
      'bk.optional': '(необязательно)',
      'bk.notePh': 'День рождения, детский стульчик, аллергия на орехи...',
      'bk.consent': 'Согласен, что ресторан свяжется со мной по этой брони',
      'bk.submit': 'Забронировать'
    },

    ka: {
      'nav.skip': 'შინაარსზე გადასვლა',
      'nav.about': 'ჩვენ შესახებ',
      'nav.menu': 'მენიუ',
      'nav.visit': 'მისამართი',
      'nav.book': 'მაგიდის დაჯავშნა',
      'nav.menuBtn': 'მენიუს გახსნა',
      'demo.text': 'სადემონსტრაციო საიტი: რესტორანი გამოგონილია. ჯავშანი არსად იგზავნება.',
      'demo.link': 'პორტფოლიოში დაბრუნება',
      'foot.about': 'ქართული სამზარეულო და ქვევრის ღვინო ზღვასთან. პური თონედან, ხინკალი ხელით.',
      'foot.hours': 'სამუშაო საათები',
      'foot.hoursText': 'სამ-კვ 12:00-23:00<br>ორშ 17:00-23:00',
      'foot.find': 'მისამართი',
      'foot.address': 'ბათუმი, ზღვისპირა ქუჩა 14<br><a href="tel:+995555000000">+995 555 00 00 00</a>',
      'foot.concept': 'საიტი შექმნა <a href="https://github.com/dmitrii-mazurkevich">დიმიტრი მაზურკევიჩი</a>.',

      'home.metaTitle': 'Kvali - ქართული სამზარეულო და ქვევრის ღვინო ბათუმში',
      'home.metaDesc': 'ქართული რესტორანი ზღვასთან ბათუმში: ხაჭაპური თონედან, ხელით გაკეთებული ხინკალი, ქვევრის ღვინო. მაგიდის დაჯავშნა ონლაინ.',
      'home.eyebrow': 'ქართული სამზარეულო · ბათუმი',
      'home.title': 'გრძელი სუფრა, <em>თბილი პური</em> და ქვევრის ღვინო',
      'home.lede': 'ვამზადებთ ისე, როგორც ქართულ ოჯახში სტუმრისთვის: უხვად, აუჩქარებლად, თონიდან ახლად ამოღებული პურით.',
      'home.cta1': 'მაგიდის დაჯავშნა',
      'home.cta2': 'მენიუს ნახვა',
      'home.hoursShort': 'დღეს ღიაა 12:00-დან · ორშაბათობით 17:00-დან',
      'home.aboutEyebrow': 'Kvali-ს შესახებ',
      'home.aboutTitle': '„კვალი“ - ეს არის ნაკვალევი',
      'home.about1': 'კვალი, რომელსაც კარგი ვახშამი ტოვებს: პურის სუნი, დამახსოვრებული სადღეგრძელო, რეცეპტი, რომლის გამეორებაც სახლში გინდა. ჩვენი შეფი აჭარაში გაიზარდა და ბებიის რვეულით ამზადებს.',
      'home.about2': 'მენიუში ყველა კერძს ალერგენები აქვს მითითებული. მიმტანი გეტყვით, რისი მომზადება შეიძლება თხილეულის ან რძის გარეშე.',
      'home.sigTitle': 'რით დავიწყოთ',
      'home.sigAll': 'სრული მენიუ',
      'home.galTitle': 'Kvali შიგნიდან',
      'home.g1': 'მთავარი დარბაზი საღამოს',
      'home.g2': 'ქვევრი ღვინის მარანში',
      'home.g3': 'ხელით გაკეთებული ხინკალი',
      'home.g4': 'საფერავი საოჯახო მარნიდან',
      'home.g5': 'ტერასა ზღვასთან',
      'home.g6': 'პური თონედან',
      'home.revTitle': 'სტუმრების შეფასებები',
      'home.r1': 'ერთ ვახშამზე მოვედით და კვირაში სამჯერ დავბრუნდით. საუკეთესო აჭარული ბათუმში.',
      'home.r1a': 'ანა, თბილისი*',
      'home.r2': 'მიმტანმა ზუსტად იცოდა, რომელი კერძია თხილეულის გარეშე. ალერგიანი ბავშვით ეს ძალიან მნიშვნელოვანია.',
      'home.r2a': 'ოლგა, ალმათი*',
      'home.r3': 'ქარვისფერი ღვინო ქვევრიდან, ხინკალი და ზღვა ფანჯრიდან. ეს არის მთელი შეფასება.',
      'home.r3a': 'მარკი, ბერლინი*',
      'home.revNote': '* სადემონსტრაციო საიტზე შეფასებები მაგალითებია.',
      'home.visitTitle': 'გვეწვიეთ',
      'home.f1': 'მისამართი',
      'home.f1v': 'ბათუმი, ზღვისპირა ქუჩა 14. ანბანის კოშკიდან ხუთი წუთი.',
      'home.f2': 'საათები',
      'home.f2v': 'სამშაბათიდან კვირამდე 12:00-23:00<br>ორშაბათი 17:00-23:00',
      'home.f3': 'ტელეფონი',
      'home.f4': 'ჯგუფები',
      'home.f4v': 'მთავარ დარბაზში 40 სტუმრამდე. სუფრისთვის წინასწარ, ერთი კვირით ადრე დაჯავშნეთ.',

      'menu.metaTitle': 'მენიუ - Kvali, ქართული სამზარეულო',
      'menu.metaDesc': 'Kvali-ს მენიუ: ფხალი, ხაჭაპური, ხინკალი, მწვადი, დესერტი და ქვევრის ღვინო. ალერგენები ყველა კერძზე.',
      'menu.title': 'მენიუ',
      'menu.lede': 'ფასები ლარშია, მომსახურება არ შედის. მონიშნეთ, რისი ჭამაც არ შეგიძლიათ, და მენიუ შეიცვლება.',
      'menu.filtersAria': 'მენიუს ფილტრები',
      'menu.navAria': 'მენიუს განყოფილებები',
      'menu.legend': 'ალერგენები:',
      'menu.note': 'ალერგიის შესახებ უთხარით მიმტანს. სამზარეულოში ვიყენებთ თხილეულს და ფქვილს.',

      'bk.metaTitle': 'მაგიდის დაჯავშნა - Kvali',
      'bk.metaDesc': 'დაჯავშნეთ მაგიდა Kvali-ში, ბათუმი: დღე, დრო, სტუმრების რაოდენობა და ადგილი.',
      'bk.title': 'მაგიდის დაჯავშნა',
      'bk.lede': 'აირჩიეთ დღე და დრო. მაგიდას 20 წუთი ვინახავთ და ყველა ჯავშანს შეტყობინებით ვადასტურებთ.',
      'bk.day': 'დღე',
      'bk.time': 'დრო',
      'bk.guestsSeat': 'სტუმრები და ადგილი',
      'bk.guests': 'სტუმრები',
      'bk.people': 'კაცი',
      'bk.hall': 'მთავარი დარბაზი',
      'bk.terrace': 'ტერასა',
      'bk.cellar': 'ღვინის მარანი',
      'bk.contacts': 'თქვენი მონაცემები',
      'bk.name': 'სახელი',
      'bk.phone': 'ტელეფონი ან WhatsApp',
      'bk.note': 'კომენტარი',
      'bk.optional': '(არასავალდებულო)',
      'bk.notePh': 'დაბადების დღე, საბავშვო სკამი, ალერგია თხილზე...',
      'bk.consent': 'ვეთანხმები, რომ რესტორანი დამიკავშირდება ამ ჯავშანთან დაკავშირებით',
      'bk.submit': 'დაჯავშნა'
    }
  };

  /* ---------- engine --------------------------------------------------- */

  var root = document.documentElement;
  var originals = null;

  function selectorNodes() {
    return document.querySelectorAll('[data-i18n], [data-i18n-html], [data-i18n-attr]');
  }

  function cacheOriginals() {
    if (originals) return;
    originals = [];
    Array.prototype.forEach.call(selectorNodes(), function (el) {
      var rec = { el: el };
      if (el.hasAttribute('data-i18n')) rec.text = el.textContent;
      if (el.hasAttribute('data-i18n-html')) rec.html = el.innerHTML;
      if (el.hasAttribute('data-i18n-attr')) {
        rec.attrs = {};
        el.getAttribute('data-i18n-attr').split('|').forEach(function (pair) {
          var attr = pair.split(':')[0].trim();
          rec.attrs[attr] = el.getAttribute(attr);
        });
      }
      originals.push(rec);
    });
  }

  function restore() {
    originals.forEach(function (rec) {
      if (rec.text !== undefined) rec.el.textContent = rec.text;
      if (rec.html !== undefined) rec.el.innerHTML = rec.html;
      if (rec.attrs) {
        Object.keys(rec.attrs).forEach(function (attr) {
          if (rec.attrs[attr] !== null) rec.el.setAttribute(attr, rec.attrs[attr]);
        });
      }
    });
  }

  function translate(lang) {
    var dict = DICT[lang] || {};
    Array.prototype.forEach.call(selectorNodes(), function (el) {
      var key = el.getAttribute('data-i18n');
      if (key && dict[key] !== undefined) el.textContent = dict[key];

      var htmlKey = el.getAttribute('data-i18n-html');
      if (htmlKey && dict[htmlKey] !== undefined) el.innerHTML = dict[htmlKey];

      var attrSpec = el.getAttribute('data-i18n-attr');
      if (attrSpec) {
        attrSpec.split('|').forEach(function (pair) {
          var parts = pair.split(':');
          var attr = parts[0].trim(), k = (parts[1] || '').trim();
          if (dict[k] !== undefined) el.setAttribute(attr, dict[k]);
        });
      }
    });
  }

  function apply(lang, persist) {
    if (LANGS.indexOf(lang) === -1) lang = DEFAULT;
    cacheOriginals();
    restore();
    if (lang !== DEFAULT) translate(lang);

    root.setAttribute('lang', lang);
    root.setAttribute('data-lang', lang);
    root.classList.remove('i18n-pending');

    document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang') === lang));
    });

    if (persist) { try { localStorage.setItem('kv-lang', lang); } catch (e) {} }

    // Keep the URL honest so a shared link opens in the same language.
    if (window.history && history.replaceState) {
      var url = new URL(location.href);
      if (lang === DEFAULT) { url.searchParams.delete('lang'); }
      else { url.searchParams.set('lang', lang); }
      history.replaceState(null, '', url.toString());
    }

    document.dispatchEvent(new CustomEvent('languagechange', { detail: { lang: lang } }));
  }

  function current() {
    return root.getAttribute('data-lang') || DEFAULT;
  }

  // Initial application — the inline head script already picked the language.
  apply(current(), false);

  document.querySelectorAll('.lang button[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      apply(btn.getAttribute('data-lang'), true);
    });
  });

  window.I18N = { apply: apply, current: current, langs: LANGS, dict: DICT };
})();
