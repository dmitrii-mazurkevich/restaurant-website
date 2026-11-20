/* ==========================================================================
   Kvali - menu with allergen filters, signature dishes, table booking.
   Dynamic parts re-render on language change (EN / RU / KA).
   ========================================================================== */

(function () {
  'use strict';

  var K = window.KV;
  var root = document.documentElement;
  var page = document.body.getAttribute('data-page');

  var STR = {
    en: {
      gel: '₾', contains: 'Contains', hidden: '{n} dishes hidden by your filters', reset: 'Show everything',
      none: 'No dishes match. Try fewer filters.', guests: 'guests', guest: 'guest',
      full: 'full', closed: 'Closed', pickTime: 'Choose a time', big: 'For 9 or more guests we will call you to confirm the table and the menu.',
      cellarMax: 'The wine cellar seats up to 6.', required: 'Please fill this in.', phone: 'Please enter a phone number we can call.',
      consent: 'Please agree to continue.', noTime: 'Please choose a time.',
      doneT: 'Table requested', doneD: 'We will confirm by message within 15 minutes during opening hours.',
      ics: 'Add to calendar', another: 'Make another booking', at: 'at',
      seat: { hall: 'Main hall', terrace: 'Terrace', cellar: 'Wine cellar' }, today: 'Today', tomorrow: 'Tomorrow'
    },
    ru: {
      gel: '₾', contains: 'Содержит', hidden: 'Скрыто фильтрами: {n}', reset: 'Показать всё',
      none: 'Нет подходящих блюд. Попробуйте убрать часть фильтров.', guests: 'гостей', guest: 'гость',
      full: 'занято', closed: 'Выходной', pickTime: 'Выберите время', big: 'Для компании от 9 человек мы перезвоним, чтобы подтвердить стол и меню.',
      cellarMax: 'В винном погребе до 6 мест.', required: 'Заполните это поле.', phone: 'Укажите телефон, по которому можно позвонить.',
      consent: 'Нужно согласие, чтобы продолжить.', noTime: 'Выберите время.',
      doneT: 'Заявка на стол отправлена', doneD: 'Подтвердим сообщением в течение 15 минут в часы работы.',
      ics: 'Добавить в календарь', another: 'Забронировать ещё', at: 'в',
      seat: { hall: 'Основной зал', terrace: 'Терраса', cellar: 'Винный погреб' }, today: 'Сегодня', tomorrow: 'Завтра'
    },
    ka: {
      gel: '₾', contains: 'შეიცავს', hidden: 'ფილტრით დამალულია: {n}', reset: 'ყველას ჩვენება',
      none: 'შესაფერისი კერძი ვერ მოიძებნა.', guests: 'სტუმარი', guest: 'სტუმარი',
      full: 'დაკავებულია', closed: 'დაკეტილია', pickTime: 'აირჩიეთ დრო', big: '9 და მეტი სტუმრისთვის დაგირეკავთ დასადასტურებლად.',
      cellarMax: 'ღვინის მარანში 6 ადგილამდეა.', required: 'შეავსეთ ეს ველი.', phone: 'მიუთითეთ ტელეფონის ნომერი.',
      consent: 'გასაგრძელებლად საჭიროა თანხმობა.', noTime: 'აირჩიეთ დრო.',
      doneT: 'მოთხოვნა გაგზავნილია', doneD: 'სამუშაო საათებში 15 წუთში დაგიდასტურებთ.',
      ics: 'კალენდარში დამატება', another: 'კიდევ ერთი ჯავშანი', at: '',
      seat: { hall: 'მთავარი დარბაზი', terrace: 'ტერასა', cellar: 'ღვინის მარანი' }, today: 'დღეს', tomorrow: 'ხვალ'
    }
  };
  var LOCALE = { en: 'en-GB', ru: 'ru-RU', ka: 'ka-GE' };

  function lang() { var l = root.getAttribute('data-lang'); return STR[l] ? l : 'en'; }
  function s(k, n) { var v = STR[lang()][k]; if (v === undefined) v = STR.en[k]; return n !== undefined ? String(v).replace('{n}', n) : v; }
  function guestWord(n) {
    if (lang() === 'ru') { var a = n % 10, b = n % 100; return a === 1 && b !== 11 ? 'гость' : a >= 2 && a <= 4 && (b < 12 || b > 14) ? 'гостя' : 'гостей'; }
    return n === 1 ? s('guest') : s('guests');
  }
  function L(o) { return o[lang()] || o.en; }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(q, c) { return (c || document).querySelector(q); }
  function $$(q, c) { return Array.prototype.slice.call((c || document).querySelectorAll(q)); }

  /* ---------- dish card --------------------------------------------------- */

  function tags(dish) {
    var t = dish.diet.map(function (k) { return '<span class="dtag dtag--' + k + '">' + esc(L(K.diets[k])) + '</span>'; });
    var a = dish.allergens.map(function (k) {
      return '<abbr class="al" title="' + esc(L(K.allergens[k])) + '">' + K.allergens[k].short + '</abbr>';
    });
    return (t.length ? '<span class="dtags">' + t.join('') + '</span>' : '') +
      (a.length ? '<span class="als"><span class="visually-hidden">' + s('contains') + ': ' + dish.allergens.map(function (k) { return L(K.allergens[k]); }).join(', ') + '</span><span aria-hidden="true">' + a.join('') + '</span></span>' : '');
  }

  function dishRow(dish) {
    var t = L(dish);
    return '<li class="dish">' +
      '<div class="dish__art">' + K.art(dish.art, false) + '</div>' +
      '<div class="dish__body">' +
        '<div class="dish__head"><h3 class="dish__name">' + esc(t.name) + '</h3><span class="dish__dots" aria-hidden="true"></span><span class="dish__price">' + dish.price + ' ' + s('gel') + '</span></div>' +
        '<p class="dish__desc">' + esc(t.desc) + '</p>' +
        '<div class="dish__meta">' + tags(dish) + '</div>' +
      '</div></li>';
  }

  /* ---------- home: signature dishes ---------------------------------- */

  function renderSignature() {
    var box = $('[data-signature]');
    if (!box) return;
    box.innerHTML = K.dishes.filter(function (d) { return d.signature; }).map(function (d) {
      var t = L(d);
      return '<article class="sig">' + '<div class="sig__art">' + K.art(d.art, true) + '</div>' +
        '<div class="sig__body"><h3 class="sig__name">' + esc(t.name) + '</h3><p>' + esc(t.desc) + '</p>' +
        '<span class="sig__price">' + d.price + ' ' + s('gel') + '</span></div></article>';
    }).join('');
  }

  /* ---------- menu page ------------------------------------------------- */

  var filt = { no: [], diet: '' };
  try { var saved = JSON.parse(sessionStorage.getItem('kv-filters')); if (saved && Array.isArray(saved.no)) filt = saved; } catch (e) {}

  function passes(d) {
    if (filt.no.some(function (a) { return d.allergens.indexOf(a) > -1; })) return false;
    if (filt.diet && d.diet.indexOf(filt.diet) === -1) return false;
    return true;
  }

  function renderMenuFilters() {
    var box = $('[data-menu-filters]');
    if (!box) return;
    var noLabel = { en: 'Without', ru: 'Без', ka: 'გარეშე' }[lang()];
    var dietLabel = { en: 'Diet', ru: 'Питание', ka: 'კვება' }[lang()];
    var anyLabel = { en: 'Everything', ru: 'Всё', ka: 'ყველა' }[lang()];
    box.innerHTML = '<fieldset><legend>' + noLabel + '</legend><div class="chips">' +
      Object.keys(K.allergens).map(function (k) {
        return '<label class="chip"><input type="checkbox" name="no" value="' + k + '"' + (filt.no.indexOf(k) > -1 ? ' checked' : '') + '><span>' + esc(L(K.allergens[k])) + '</span></label>';
      }).join('') + '</div></fieldset>' +
      '<fieldset><legend>' + dietLabel + '</legend><div class="chips">' +
      [['', anyLabel], ['veg', L(K.diets.veg)], ['vegan', L(K.diets.vegan)]].map(function (o) {
        return '<label class="chip"><input type="radio" name="diet" value="' + o[0] + '"' + (filt.diet === o[0] ? ' checked' : '') + '><span>' + esc(o[1]) + '</span></label>';
      }).join('') + '</div></fieldset>';
  }

  function renderMenu() {
    var box = $('[data-menu]');
    if (!box) return;
    var hiddenCount = 0;
    var html = K.cats.map(function (c) {
      var all = K.dishes.filter(function (d) { return d.cat === c.id; });
      var shown = all.filter(passes);
      hiddenCount += all.length - shown.length;
      if (!shown.length) return '';
      return '<section class="mcat" id="' + c.id + '" aria-labelledby="h-' + c.id + '"><h2 class="mcat__title" id="h-' + c.id + '">' + esc(L(c)) + '</h2>' +
        '<ul class="dishes">' + shown.map(dishRow).join('') + '</ul></section>';
    }).join('');
    box.innerHTML = html || '<p class="empty">' + s('none') + '</p>';
    var note = $('[data-hidden-note]');
    if (note) {
      note.hidden = !hiddenCount;
      note.innerHTML = hiddenCount ? s('hidden', hiddenCount) + ' <button type="button" class="linkbtn" data-reset-filters>' + s('reset') + '</button>' : '';
    }
    var nav = $('[data-cat-nav]');
    if (nav) {
      nav.innerHTML = K.cats.map(function (c) {
        var any = K.dishes.some(function (d) { return d.cat === c.id && passes(d); });
        return '<a href="#' + c.id + '"' + (any ? '' : ' aria-disabled="true" tabindex="-1"') + '>' + esc(L(c)) + '</a>';
      }).join('');
    }
    var legend = $('[data-legend]');
    if (legend) {
      legend.innerHTML = Object.keys(K.allergens).map(function (k) {
        return '<span><abbr class="al" aria-hidden="true">' + K.allergens[k].short + '</abbr> ' + esc(L(K.allergens[k])) + '</span>';
      }).join('');
    }
  }

  function initMenu() {
    renderMenuFilters(); renderMenu();
    var box = $('[data-menu-filters]');
    box.addEventListener('change', function () {
      filt.no = $$('input[name="no"]:checked', box).map(function (i) { return i.value; });
      var r = $('input[name="diet"]:checked', box); filt.diet = r ? r.value : '';
      try { sessionStorage.setItem('kv-filters', JSON.stringify(filt)); } catch (e) {}
      renderMenu();
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('[data-reset-filters]')) return;
      filt = { no: [], diet: '' };
      try { sessionStorage.removeItem('kv-filters'); } catch (err) {}
      renderMenuFilters(); renderMenu();
    });
  }

  /* ---------- booking --------------------------------------------------- */

  var bk = { day: 0, time: '', guests: 2, seat: 'hall' };

  function days() {
    var out = [], base = new Date(); base.setHours(0, 0, 0, 0);
    for (var i = 0; i < 14; i++) { var d = new Date(base); d.setDate(base.getDate() + i); out.push(d); }
    return out;
  }
  function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0; return h; }

  function slotsFor(date) {
    var open = date.getDay() === 1 ? 17 : 12; // Monday: evenings only
    var list = [], now = new Date();
    for (var m = open * 60; m <= 21 * 60 + 30; m += 30) {
      var t = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
      var dt = new Date(date); dt.setHours(Math.floor(m / 60), m % 60, 0, 0);
      var past = dt.getTime() < now.getTime() + 60 * 60 * 1000;
      var full = hash(iso(date) + t) % 5 === 0 || (bk.guests > 6 && hash(t + iso(date)) % 3 === 0);
      list.push({ t: t, ok: !past && !full, past: past });
    }
    return list;
  }

  function renderBooking() {
    var form = $('[data-booking]');
    if (!form) return;
    var ds = days(), loc = LOCALE[lang()];
    var wd = new Intl.DateTimeFormat(loc, { weekday: 'short' }), dm = new Intl.DateTimeFormat(loc, { day: 'numeric', month: 'short' });
    $('[data-days]').innerHTML = ds.map(function (d, i) {
      var label = i === 0 ? s('today') : i === 1 ? s('tomorrow') : wd.format(d);
      var anyOpen = slotsFor(d).some(function (x) { return x.ok; });
      return '<label class="day"><input type="radio" name="day" value="' + i + '"' + (i === bk.day ? ' checked' : '') + (anyOpen ? '' : ' disabled') + '>' +
        '<span><b>' + esc(label) + '</b><small>' + esc(dm.format(d)) + '</small></span></label>';
    }).join('');
    var sl = slotsFor(ds[bk.day]);
    if (bk.time && !sl.some(function (x) { return x.t === bk.time && x.ok; })) bk.time = '';
    var visible = sl.filter(function (x) { return !x.past; });
    $('[data-slots]').innerHTML = visible.length ? visible.map(function (x) {
      return '<label class="slot' + (x.ok ? '' : ' is-full') + '"><input type="radio" name="time" value="' + x.t + '"' + (x.t === bk.time ? ' checked' : '') + (x.ok ? '' : ' disabled') + '>' +
        '<span>' + x.t + (x.ok ? '' : '<small>' + s('full') + '</small>') + '</span></label>';
    }).join('') : '<p class="muted">' + s('closed') + '</p>';
    $('[data-guests]').textContent = String(bk.guests);
    $('[data-guests-minus]').disabled = bk.guests <= 1;
    $('[data-guests-plus]').disabled = bk.guests >= 12;
    var big = $('[data-big]'); big.hidden = bk.guests < 9; big.textContent = s('big');
    var cellar = $('input[name="seat"][value="cellar"]', form);
    cellar.disabled = bk.guests > 6;
    if (cellar.disabled && bk.seat === 'cellar') { bk.seat = 'hall'; $('input[name="seat"][value="hall"]', form).checked = true; }
    $('[data-cellar-note]').textContent = bk.guests > 6 ? s('cellarMax') : '';
    renderBkSummary();
  }

  function renderBkSummary() {
    var box = $('[data-bk-summary]');
    if (!box) return;
    var d = days()[bk.day];
    var df = new Intl.DateTimeFormat(LOCALE[lang()], { weekday: 'long', day: 'numeric', month: 'long' });
    box.innerHTML = '<b>' + esc(df.format(d)) + '</b>' + (bk.time ? ' ' + s('at') + ' <b>' + bk.time + '</b>' : ' · <span class="muted">' + s('pickTime') + '</span>') +
      ' · ' + bk.guests + ' ' + guestWord(bk.guests) + ' · ' + esc(s('seat')[bk.seat]);
  }

  function fieldError(input, msg) {
    var wrap = input.closest('.field') || input.closest('.consent');
    var e = wrap && wrap.querySelector('.error');
    if (e) e.textContent = msg || '';
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function makeIcs() {
    var d = days()[bk.day], hm = bk.time.split(':');
    var st = new Date(d); st.setHours(+hm[0], +hm[1], 0, 0);
    var en = new Date(st.getTime() + 2 * 60 * 60 * 1000);
    var f = function (x) { return iso(x).replace(/-/g, '') + 'T' + String(x.getHours()).padStart(2, '0') + String(x.getMinutes()).padStart(2, '0') + '00'; };
    var body = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kvali//Booking//EN', 'BEGIN:VEVENT',
      'UID:' + Date.now() + '@kvali.example.com', 'DTSTART:' + f(st), 'DTEND:' + f(en),
      'SUMMARY:Kvali - table for ' + bk.guests, 'LOCATION:Kvali, Batumi', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    return URL.createObjectURL(new Blob([body], { type: 'text/calendar' }));
  }

  function initBooking() {
    var form = $('[data-booking]');
    if (!form) return;
    // Late in the evening today may be fully past: start from the first open day.
    var firstOpen = days().map(slotsFor).findIndex(function (l) { return l.some(function (x) { return x.ok; }); });
    bk.day = firstOpen > -1 ? firstOpen : 0;
    renderBooking();
    form.addEventListener('change', function (e) {
      var n = e.target.name;
      if (n === 'day') { bk.day = parseInt(e.target.value, 10); renderBooking(); var x = $('input[name="day"][value="' + bk.day + '"]'); if (x) x.focus(); }
      if (n === 'time') { bk.time = e.target.value; fieldError(e.target, ''); $('[data-time-error]').textContent = ''; renderBkSummary(); }
      if (n === 'seat') { bk.seat = e.target.value; renderBkSummary(); }
    });
    $('[data-guests-minus]').addEventListener('click', function () { bk.guests = Math.max(1, bk.guests - 1); renderBooking(); });
    $('[data-guests-plus]').addEventListener('click', function () { bk.guests = Math.min(12, bk.guests + 1); renderBooking(); });
    form.addEventListener('input', function (e) { if (e.target.getAttribute('aria-invalid') === 'true') fieldError(e.target, ''); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true, first = null;
      if (!bk.time) { $('[data-time-error]').textContent = s('noTime'); ok = false; first = first || $('input[name="time"]:not([disabled])'); }
      var nm = form.elements.name, ph = form.elements.phone, cs = form.elements.consent;
      if (!fieldError(nm, nm.value.trim() ? '' : s('required'))) { ok = false; first = first || nm; }
      var digits = ph.value.replace(/\D/g, '');
      if (!fieldError(ph, digits.length >= 7 ? '' : s('phone'))) { ok = false; first = first || ph; }
      if (!fieldError(cs, cs.checked ? '' : s('consent'))) { ok = false; first = first || cs; }
      if (!ok) { if (first) first.focus(); return; }

      var done = $('[data-bk-done]');
      var df = new Intl.DateTimeFormat(LOCALE[lang()], { weekday: 'long', day: 'numeric', month: 'long' });
      $('[data-done-title]', done).textContent = s('doneT');
      $('[data-done-text]', done).innerHTML = '<b>' + esc(df.format(days()[bk.day])) + ', ' + bk.time + '</b> · ' + bk.guests + ' ' + guestWord(bk.guests) + ' · ' + esc(s('seat')[bk.seat]) + '<br>' + s('doneD');
      var a = $('[data-ics]', done); a.href = makeIcs(); a.textContent = s('ics');
      $('[data-again]', done).textContent = s('another');
      form.hidden = true; done.hidden = false;
      var h = $('[data-done-title]', done); h.setAttribute('tabindex', '-1'); h.focus();
    });
    var again = $('[data-again]');
    if (again) again.addEventListener('click', function () {
      form.reset(); bk = { day: 0, time: '', guests: 2, seat: 'hall' };
      $('[data-bk-done]').hidden = true; form.hidden = false; renderBooking();
    });
  }

  /* ---------- boot ------------------------------------------------------- */

  function renderAll() {
    renderSignature();
    if (page === 'menu') { renderMenuFilters(); renderMenu(); }
    if (page === 'booking') renderBooking();
  }
  if (page === 'menu') initMenu();
  if (page === 'booking') initBooking();
  renderAll();
  document.addEventListener('languagechange', renderAll);

  // Mobile menu
  var tg = $('.menu-toggle'), mn = $('#menu');
  if (tg && mn) {
    tg.addEventListener('click', function () { var o = !mn.classList.contains('is-open'); mn.classList.toggle('is-open', o); tg.setAttribute('aria-expanded', String(o)); });
    mn.addEventListener('click', function (e) { if (e.target.tagName === 'A') { mn.classList.remove('is-open'); tg.setAttribute('aria-expanded', 'false'); } });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { mn.classList.remove('is-open'); tg.setAttribute('aria-expanded', 'false'); } });
  }
})();
