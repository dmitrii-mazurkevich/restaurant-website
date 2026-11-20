/* ==========================================================================
   Kvali - menu data in three languages, plus simple SVG dish illustrations.
   In a WordPress build this is a "Dish" custom post type with ACF fields
   (price, allergens, diet) and WPML / Polylang translations.
   ========================================================================== */

(function () {
  'use strict';

  var CATS = [
    { id: 'starters',   en: 'Starters',    ru: 'Закуски',      ka: 'წასახემსებელი' },
    { id: 'khachapuri', en: 'Khachapuri & bread', ru: 'Хачапури и хлеб', ka: 'ხაჭაპური და პური' },
    { id: 'mains',      en: 'Khinkali & mains', ru: 'Хинкали и горячее', ka: 'ხინკალი და ცხელი კერძები' },
    { id: 'desserts',   en: 'Desserts',    ru: 'Десерты',      ka: 'დესერტი' },
    { id: 'drinks',     en: 'Wine & drinks', ru: 'Вино и напитки', ka: 'ღვინო და სასმელი' }
  ];

  var ALLERGENS = {
    gluten: { en: 'Gluten', ru: 'Глютен', ka: 'გლუტენი', short: 'G' },
    dairy:  { en: 'Dairy',  ru: 'Молоко', ka: 'რძე', short: 'D' },
    egg:    { en: 'Egg',    ru: 'Яйцо',   ka: 'კვერცხი', short: 'E' },
    nuts:   { en: 'Nuts',   ru: 'Орехи',  ka: 'თხილეული', short: 'N' },
    fish:   { en: 'Fish',   ru: 'Рыба',   ka: 'თევზი', short: 'F' }
  };

  var DIETS = {
    veg:   { en: 'Vegetarian', ru: 'Вегетарианское', ka: 'ვეგეტარიანული' },
    vegan: { en: 'Vegan',      ru: 'Веганское',      ka: 'ვეგანური' },
    spicy: { en: 'Spicy',      ru: 'Острое',         ka: 'ცხარე' }
  };

  function d(id, cat, price, art, al, diet, en, ru, ka, sig) {
    return { id: id, cat: cat, price: price, art: art, allergens: al, diet: diet, en: en, ru: ru, ka: ka, signature: !!sig };
  }

  var DISHES = [
    d('pkhali', 'starters', 18, 'board', ['nuts'], ['veg', 'vegan'],
      { name: 'Pkhali trio', desc: 'Spinach, beetroot and leek pâtés with walnut, garlic and blue fenugreek.' },
      { name: 'Пхали ассорти', desc: 'Шпинат, свёкла и лук-порей с грецким орехом, чесноком и уцхо-сунели.' },
      { name: 'ფხალის ასორტი', desc: 'ისპანახი, ჭარხალი და პრასი ნიგვზით, ნიორით და უცხო სუნელით.' }, true),
    d('badrijani', 'starters', 16, 'rolls', ['nuts'], ['veg', 'vegan'],
      { name: 'Aubergine rolls with walnut', desc: 'Fried aubergine with walnut paste and pomegranate seeds.' },
      { name: 'Баклажаны с орехами', desc: 'Жареные баклажаны с ореховой пастой и зёрнами граната.' },
      { name: 'ბადრიჯანი ნიგვზით', desc: 'შემწვარი ბადრიჯანი ნიგვზის პასტით და ბროწეულის მარცვლებით.' }),
    d('salad', 'starters', 14, 'salad', ['nuts'], ['veg', 'vegan'],
      { name: 'Tomato and cucumber salad', desc: 'Summer tomatoes, cucumber, red onion and herbs with walnut dressing.' },
      { name: 'Салат из помидоров и огурцов', desc: 'Помидоры, огурцы, красный лук и зелень с ореховой заправкой.' },
      { name: 'პომიდვრისა და კიტრის სალათი', desc: 'პომიდორი, კიტრი, წითელი ხახვი და მწვანილი ნიგვზის სოუსით.' }),
    d('sulguni', 'starters', 17, 'cheese', ['dairy'], ['veg'],
      { name: 'Sulguni and herbs', desc: 'Young sulguni cheese, fresh tarragon, basil and radish.' },
      { name: 'Сулугуни с зеленью', desc: 'Молодой сулугуни, свежий тархун, базилик и редис.' },
      { name: 'სულგუნი მწვანილით', desc: 'ახალი სულგუნი, ტარხუნა, რეჰანი და ბოლოკი.' }),

    d('adjaruli', 'khachapuri', 22, 'boat', ['gluten', 'dairy', 'egg'], ['veg'],
      { name: 'Adjarian khachapuri', desc: 'Boat-shaped bread with sulguni, butter and an egg yolk. Stir it together while hot.' },
      { name: 'Хачапури по-аджарски', desc: 'Лодочка с сулугуни, сливочным маслом и желтком. Перемешать, пока горячий.' },
      { name: 'აჭარული ხაჭაპური', desc: 'ნავის ფორმის ხაჭაპური სულგუნით, კარაქით და კვერცხის გულით.' }, true),
    d('imeruli', 'khachapuri', 19, 'round', ['gluten', 'dairy'], ['veg'],
      { name: 'Imeretian khachapuri', desc: 'Round bread filled with Imeretian cheese, baked to order.' },
      { name: 'Хачапури по-имеретински', desc: 'Круглый хачапури с имеретинским сыром, печём под заказ.' },
      { name: 'იმერული ხაჭაპური', desc: 'მრგვალი ხაჭაპური იმერული ყველით, ცხვება შეკვეთისთანავე.' }),
    d('lobiani', 'khachapuri', 15, 'round', ['gluten'], ['veg', 'vegan'],
      { name: 'Lobiani', desc: 'Flatbread filled with spiced red beans.' },
      { name: 'Лобиани', desc: 'Лепёшка с начинкой из пряной красной фасоли.' },
      { name: 'ლობიანი', desc: 'ცომეული სუნელებიანი წითელი ლობიოთი.' }),

    d('khinkali', 'mains', 15, 'khinkali', ['gluten'], [],
      { name: 'Khinkali, beef and pork (5 pcs)', desc: 'Hand-pleated dumplings with a juicy filling. Hold by the top, sip the broth first.' },
      { name: 'Хинкали, говядина и свинина (5 шт.)', desc: 'Хинкали ручной лепки с сочной начинкой. Держать за хвостик, сначала выпить бульон.' },
      { name: 'ხინკალი, საქონლის და ღორის (5 ც)', desc: 'ხელით დამზადებული წვნიანი ხინკალი.' }, true),
    d('khinkali-mush', 'mains', 14, 'khinkali', ['gluten'], ['veg', 'vegan'],
      { name: 'Mushroom khinkali (5 pcs)', desc: 'Forest mushrooms, onion and herbs.' },
      { name: 'Хинкали с грибами (5 шт.)', desc: 'Лесные грибы, лук и зелень.' },
      { name: 'სოკოს ხინკალი (5 ც)', desc: 'ტყის სოკო, ხახვი და მწვანილი.' }),
    d('mtsvadi', 'mains', 28, 'skewer', [], [],
      { name: 'Pork mtsvadi', desc: 'Pork neck grilled over vine wood, with raw onion and pomegranate.' },
      { name: 'Мцвади из свинины', desc: 'Свиная шея на углях из виноградной лозы, с луком и гранатом.' },
      { name: 'ღორის მწვადი', desc: 'ღორის კისერი ვაზის ნაკვერჩხალზე, ხახვით და ბროწეულით.' }),
    d('chkmeruli', 'mains', 29, 'pan', ['dairy'], [],
      { name: 'Chkmeruli', desc: 'Roast chicken in a garlic and cream sauce, served in a clay pan.' },
      { name: 'Чкмерули', desc: 'Цыплёнок в сливочно-чесночном соусе, подаётся в глиняной кеци.' },
      { name: 'შქმერული', desc: 'შემწვარი წიწილა ნივრის და ნაღების სოუსში, კეცზე.' }),
    d('seabass', 'mains', 34, 'fish', ['fish'], [],
      { name: 'Grilled sea bass with tkemali', desc: 'Whole Black Sea fish from the grill with sour plum sauce.' },
      { name: 'Лаврак на гриле с ткемали', desc: 'Рыба целиком с гриля с соусом из кислой сливы.' },
      { name: 'შემწვარი ლავრაკი ტყემლით', desc: 'მთლიანი თევზი გრილზე ტყემლის სოუსით.' }),
    d('lobio', 'mains', 14, 'pot', [], ['veg', 'vegan', 'spicy'],
      { name: 'Lobio in a clay pot', desc: 'Slow-cooked red beans with coriander and chilli, with mchadi corn bread.' },
      { name: 'Лобио в горшочке', desc: 'Томлёная красная фасоль с кинзой и перцем, с кукурузной лепёшкой мчади.' },
      { name: 'ლობიო ქოთანში', desc: 'ქინძით და წიწაკით მოხარშული წითელი ლობიო, მჭადით.' }),

    d('churchkhela', 'desserts', 9, 'churchkhela', ['nuts'], ['veg', 'vegan'],
      { name: 'Churchkhela', desc: 'Walnuts dipped in thickened grape juice, made in autumn.' },
      { name: 'Чурчхела', desc: 'Грецкий орех в загущённом виноградном соке, делаем осенью.' },
      { name: 'ჩურჩხელა', desc: 'ნიგოზი ბადაგში, შემოდგომაზე დამზადებული.' }),
    d('pelamushi', 'desserts', 11, 'pudding', ['gluten'], ['veg', 'vegan'],
      { name: 'Pelamushi', desc: 'Grape pudding with walnut crumble.' },
      { name: 'Пеламуши', desc: 'Виноградный пудинг с ореховой крошкой.' },
      { name: 'ფელამუში', desc: 'ყურძნის ფაფა ნიგვზით.' }),
    d('gozinaki', 'desserts', 8, 'gozinaki', ['nuts'], ['veg'],
      { name: 'Gozinaki', desc: 'Walnuts in honey, the New Year sweet. Served with tea.' },
      { name: 'Гозинаки', desc: 'Грецкие орехи в мёде, новогодняя сладость. Подаём к чаю.' },
      { name: 'გოზინაყი', desc: 'ნიგოზი თაფლში, საახალწლო ტკბილეული.' }),

    d('saperavi', 'drinks', 14, 'wine-red', [], ['veg', 'vegan'],
      { name: 'Saperavi from qvevri, glass', desc: 'Dry red from Kakheti, aged in clay. Dark berries and a firm finish.' },
      { name: 'Саперави из квеври, бокал', desc: 'Сухое красное из Кахетии, выдержано в глине. Тёмные ягоды и плотное послевкусие.' },
      { name: 'საფერავი ქვევრიდან, ჭიქა', desc: 'მშრალი წითელი კახეთიდან, დავარგებული ქვევრში.' }, true),
    d('rkatsiteli', 'drinks', 13, 'wine-amber', [], ['veg', 'vegan'],
      { name: 'Amber rkatsiteli, glass', desc: 'Skin-contact white with notes of dried apricot and tea.' },
      { name: 'Янтарное ркацители, бокал', desc: 'Белое на мезге с нотами кураги и чая.' },
      { name: 'ქარვისფერი რქაწითელი, ჭიქა', desc: 'ჭაჭაზე დაყენებული თეთრი ღვინო.' }),
    d('tarkhuna', 'drinks', 7, 'lemonade', [], ['veg', 'vegan'],
      { name: 'Tarragon lemonade', desc: 'House-made from fresh tarragon, not too sweet.' },
      { name: 'Тархун', desc: 'Домашний лимонад из свежего тархуна, не приторный.' },
      { name: 'ტარხუნის ლიმონათი', desc: 'სახლში დამზადებული ახალი ტარხუნიდან.' })
  ];

  /* ---------- illustrations -------------------------------------------- */

  var C = { plate: '#EFE6D8', rim: '#D9CBB5', bread: '#D9A15B', crust: '#B97B3A', cheese: '#F2D27A', yolk: '#E9A825',
            green: '#5F7D45', beet: '#8E2A3F', red: '#A4302B', walnut: '#8A6A4A', clay: '#9C5B3B', wine: '#5B1424', amber: '#C9892B', bg: '#3B2A22' };

  function plate(inner) {
    return '<ellipse cx="200" cy="160" rx="150" ry="118" fill="' + C.rim + '"/><ellipse cx="200" cy="156" rx="132" ry="102" fill="' + C.plate + '"/>' + inner;
  }

  var SHAPES = {
    board: plate('<circle cx="140" cy="150" r="30" fill="' + C.green + '"/><circle cx="210" cy="130" r="30" fill="' + C.beet + '"/><circle cx="250" cy="185" r="30" fill="#7E8F4C"/><circle cx="140" cy="150" r="5" fill="' + C.red + '"/><circle cx="210" cy="130" r="5" fill="#F2E6D8"/>'),
    rolls: plate('<g fill="#5B3A52"><rect x="110" y="120" width="60" height="70" rx="28"/><rect x="175" y="112" width="60" height="70" rx="28"/><rect x="240" y="124" width="60" height="70" rx="28"/></g><g fill="#E7D6BE"><rect x="122" y="136" width="36" height="12" rx="6"/><rect x="187" y="128" width="36" height="12" rx="6"/><rect x="252" y="140" width="36" height="12" rx="6"/></g><g fill="' + C.red + '"><circle cx="140" cy="180" r="4"/><circle cx="205" cy="172" r="4"/><circle cx="270" cy="184" r="4"/><circle cx="230" cy="200" r="4"/></g>'),
    salad: plate('<g fill="' + C.red + '"><circle cx="150" cy="140" r="26"/><circle cx="235" cy="128" r="24"/><circle cx="200" cy="190" r="26"/></g><g fill="#8DB36A"><circle cx="190" cy="140" r="18"/><circle cx="255" cy="180" r="18"/><circle cx="140" cy="190" r="16"/></g><path d="M120 160c40-10 100-10 160 6" stroke="#E8D8E8" stroke-width="5" fill="none"/>'),
    cheese: plate('<g fill="#F4EBD2" stroke="#E0D3B0"><rect x="120" y="120" width="70" height="60" rx="8"/><rect x="200" y="130" width="70" height="56" rx="8"/></g><g fill="' + C.green + '"><path d="M140 200c20-30 40-30 60 0z"/><path d="M220 210c15-26 35-26 50 0z"/></g><circle cx="290" cy="150" r="12" fill="#C5466A"/>'),
    boat: plate('<path d="M70 160c40-60 220-60 260 0-40 60-220 60-260 0z" fill="' + C.crust + '"/><path d="M110 160c34-34 146-34 180 0-34 34-146 34-180 0z" fill="' + C.cheese + '"/><circle cx="200" cy="160" r="22" fill="' + C.yolk + '"/><rect x="236" y="150" width="22" height="16" rx="3" fill="#FFF3C9"/>'),
    round: plate('<circle cx="200" cy="158" r="92" fill="' + C.bread + '"/><circle cx="200" cy="158" r="92" fill="none" stroke="' + C.crust + '" stroke-width="10"/><path d="M200 66v184M108 158h184M135 93l130 130M265 93 135 223" stroke="' + C.crust + '" stroke-width="3" opacity=".4"/>'),
    khinkali: plate('<g fill="#F1E4CC" stroke="#D8C6A6" stroke-width="2"><path d="M110 190c0-40 20-60 40-60s40 20 40 60z"/><path d="M190 180c0-40 20-60 40-60s40 20 40 60z"/><path d="M150 214c0-40 20-60 40-60s40 20 40 60z"/></g><g fill="#E2D0AE"><rect x="144" y="118" width="12" height="18" rx="4"/><rect x="224" y="108" width="12" height="18" rx="4"/><rect x="184" y="142" width="12" height="18" rx="4"/></g><g fill="#3B2A22"><circle cx="280" cy="210" r="3"/><circle cx="290" cy="202" r="3"/><circle cx="296" cy="214" r="3"/></g>'),
    skewer: plate('<path d="M80 200 320 110" stroke="#8A8A8A" stroke-width="5"/><g fill="#9A4E2E"><rect x="110" y="160" width="40" height="34" rx="10" transform="rotate(-20 130 177)"/><rect x="160" y="142" width="40" height="34" rx="10" transform="rotate(-20 180 159)"/><rect x="210" y="124" width="40" height="34" rx="10" transform="rotate(-20 230 141)"/><rect x="258" y="106" width="40" height="34" rx="10" transform="rotate(-20 278 123)"/></g><g fill="#E8D8E8"><circle cx="150" cy="226" r="14"/><circle cx="240" cy="214" r="12"/></g><g fill="' + C.red + '"><circle cx="270" cy="200" r="4"/><circle cx="282" cy="194" r="4"/></g>'),
    pan: '<ellipse cx="200" cy="170" rx="150" ry="108" fill="' + C.clay + '"/><ellipse cx="200" cy="162" rx="128" ry="88" fill="#F1E5CF"/><g fill="#C98B4B"><ellipse cx="170" cy="150" rx="46" ry="30"/><ellipse cx="240" cy="172" rx="42" ry="28"/></g><g fill="' + C.green + '"><circle cx="150" cy="190" r="5"/><circle cx="260" cy="140" r="5"/><circle cx="210" cy="120" r="5"/></g>',
    fish: plate('<path d="M90 160c50-50 150-50 190 0-40 50-140 50-190 0z" fill="#9AA6AA"/><path d="M280 160l40-34v68z" fill="#7F8B8F"/><circle cx="120" cy="150" r="6" fill="#2B2A28"/><path d="M160 130v60M200 128v64M240 132v56" stroke="#7B5A3A" stroke-width="4" opacity=".5"/><ellipse cx="160" cy="220" rx="30" ry="12" fill="#B5432E"/>'),
    pot: '<ellipse cx="200" cy="232" rx="120" ry="18" fill="#000" opacity=".2"/><path d="M90 130h220l-20 100a20 20 0 0 1-20 16H130a20 20 0 0 1-20-16z" fill="' + C.clay + '"/><ellipse cx="200" cy="130" rx="110" ry="24" fill="#7E4630"/><ellipse cx="200" cy="130" rx="92" ry="17" fill="#7A2E23"/><g fill="' + C.green + '"><circle cx="180" cy="126" r="5"/><circle cx="215" cy="132" r="5"/><circle cx="235" cy="124" r="4"/></g><rect x="272" y="170" width="70" height="44" rx="8" fill="#E6C46B"/>',
    churchkhela: '<rect x="0" y="0" width="400" height="320" fill="none"/><path d="M60 60h280" stroke="#6B4C34" stroke-width="6"/><g fill="#7A2E2E"><rect x="100" y="64" width="34" height="200" rx="17"/><rect x="183" y="64" width="34" height="220" rx="17"/><rect x="266" y="64" width="34" height="190" rx="17"/></g><g fill="#93403B" opacity=".6"><circle cx="117" cy="110" r="10"/><circle cx="117" cy="160" r="10"/><circle cx="117" cy="210" r="10"/><circle cx="200" cy="120" r="10"/><circle cx="200" cy="180" r="10"/><circle cx="200" cy="240" r="10"/><circle cx="283" cy="110" r="10"/><circle cx="283" cy="170" r="10"/></g>',
    pudding: plate('<path d="M130 170c0-50 30-70 70-70s70 20 70 70z" fill="#6E1E33"/><ellipse cx="200" cy="170" rx="70" ry="16" fill="#5A1729"/><g fill="' + C.walnut + '"><circle cx="180" cy="108" r="7"/><circle cx="205" cy="102" r="7"/><circle cx="222" cy="112" r="6"/></g>'),
    gozinaki: plate('<g fill="#C48A3A" stroke="#9E6A27" stroke-width="2"><path d="M120 130l50-20 30 50-50 20z"/><path d="M200 120l60-6 6 56-60 6z"/><path d="M160 190l60-10 10 40-60 10z"/></g><g fill="#7E5A36" opacity=".6"><circle cx="160" cy="140" r="6"/><circle cx="230" cy="140" r="6"/><circle cx="196" cy="208" r="6"/></g>'),
    'wine-red': '<path d="M160 70h80c0 60-10 110-40 110s-40-50-40-110z" fill="rgba(255,255,255,.18)" stroke="#E9DCCB" stroke-width="3"/><path d="M164 110h72c-4 40-14 66-36 66s-32-26-36-66z" fill="' + C.wine + '"/><path d="M200 180v70M160 252h80" stroke="#E9DCCB" stroke-width="4" stroke-linecap="round"/>',
    'wine-amber': '<path d="M160 70h80c0 60-10 110-40 110s-40-50-40-110z" fill="rgba(255,255,255,.18)" stroke="#E9DCCB" stroke-width="3"/><path d="M164 110h72c-4 40-14 66-36 66s-32-26-36-66z" fill="' + C.amber + '"/><path d="M200 180v70M160 252h80" stroke="#E9DCCB" stroke-width="4" stroke-linecap="round"/>',
    lemonade: '<path d="M150 70h100l-12 180h-76z" fill="rgba(255,255,255,.18)" stroke="#E9DCCB" stroke-width="3"/><path d="M156 120h88l-9 126h-70z" fill="#7FB04A"/><g fill="#E9F2D8" opacity=".7"><circle cx="185" cy="160" r="6"/><circle cx="210" cy="200" r="5"/><circle cx="196" cy="226" r="4"/></g><path d="M226 56l-10 120" stroke="#E9DCCB" stroke-width="4"/>'
  };

  function dishArt(type, dark) {
    var bg = dark ? '#3B2A22' : '#E9DFD0';
    return '<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="400" height="320" fill="' + bg + '"/>' + (SHAPES[type] || SHAPES.board) + '</svg>';
  }

  window.KV = { cats: CATS, allergens: ALLERGENS, diets: DIETS, dishes: DISHES, art: dishArt };
})();
