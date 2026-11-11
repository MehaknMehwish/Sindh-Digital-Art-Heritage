/*
  Language switcher: English / اردو (Urdu) / سنڌي (Sindhi)

  How it works
  - English is the text already written in index.html.
  - Every translatable element has a data-i18n="some.key" attribute.
    Urdu and Sindhi for that key live in TEXT below.
  - Image captions and alt texts are looked up by their English text (CAPTIONS, ALTS).
  - To add a new sentence: give the element data-i18n="your.key" in index.html,
    then add "your.key" under both TEXT.ur and TEXT.sd.
    If a key is missing, the English text is shown, so nothing breaks.
  - The chosen language is remembered in the browser. You can also share a link
    such as  ...?lang=ur  or  ...?lang=sd
*/
(function () {
  'use strict';

  var STORE = 'sdah-lang';
  var DIRS = { en: 'ltr', ur: 'rtl', sd: 'rtl' };
  var current = 'en';

  /* ---------- small interface labels (also used by script.js) ---------- */
  var UI = {
    en: { menu: 'Menu', language: 'Language', prev: 'Previous photo', next: 'Next photo', photo: 'Photo ' },
    ur: { menu: 'مینیو', language: 'زبان', prev: 'پچھلی تصویر', next: 'اگلی تصویر', photo: 'تصویر ' },
    sd: { menu: 'مينيو', language: 'ٻولي', prev: 'اڳئين تصوير', next: 'ايندڙ تصوير', photo: 'تصوير ' }
  };

  /* ---------- page text ---------- */
  var TEXT = {
    /* =============================== URDU =============================== */
    ur: {
      'meta.title': 'سندھ ڈیجیٹل آرٹ ہیریٹیج | سندھ کے معدوم ہوتے ہنر',
      'meta.desc': 'سندھ ڈیجیٹل آرٹ ہیریٹیج: گورنمنٹ گرلز ہائی اسکول (GGHS) بیراج کالونی، سکھر کی جماعت 6A کا اسٹریم (STREAM) منصوبہ، جس میں سندھ کے معدوم ہوتے روایتی ہنر — مٹی کے برتن، کڑھائی اور شیشے کا کام، اور چمڑے کا کام — محفوظ کیے گئے ہیں۔',

      'brand': 'سندھ ڈیجیٹل آرٹ ہیریٹیج',
      'nav.about': 'تعارف',
      'nav.pottery': 'مٹی کے برتن',
      'nav.embroidery': 'کڑھائی',
      'nav.leather': 'چمڑا',
      'nav.more': 'مزید ہنر',
      'nav.models': 'ہمارے ماڈل',
      'nav.gallery': 'گیلری',
      'nav.team': 'پیش کنندگان',
      'nav.credits': 'حوالہ جات',

      'hero.eyebrow': 'اسٹریم (STREAM) آرٹ منصوبہ',
      'hero.title': 'یاد رکھنے والے ہاتھ',
      'hero.lead': 'قدیم سندھ کے ہنر، جو ہزاروں سال پرانے ہیں، آہستہ آہستہ بھلائے جا رہے ہیں۔ یہ انہیں یاد رکھنے کی ہماری ایک کوشش ہے۔',
      'hero.btn': 'سفر شروع کریں',
      'hero.scroll': 'نیچے سکرول کریں &darr;',

      'logo.stream': 'سندھ اسٹریم جرنی',
      'logo.ilm': 'علم اسٹوڈیو',
      'logo.govt': 'حکومتِ سندھ',
      'vision': 'حکومتِ سندھ کے محترم وزیرِ تعلیم و خواندگی کے وژن کے تحت، اور محکمۂ اسکول ایجوکیشن و لٹریسی (SELD) کے قابلِ احترام سیکریٹری کی سرپرستی میں۔',

      'intro.h': 'ہنر مندوں کی سرزمین',
      'intro.p1': 'سندھ دنیا کی قدیم ترین تہذیبوں میں سے ایک کا گھر ہے۔ چار ہزار سال سے بھی زیادہ پہلے موئن جو دڑو کے لوگ مٹی کو شکل دینا، کپڑا بُننا اور چمڑے پر کام کرنا جانتے تھے۔ یہ ہنر ماں سے بیٹی اور باپ سے بیٹے کو، گاؤں گاؤں منتقل ہوتے ہوئے آج تک پہنچے ہیں۔',
      'intro.p2': 'اب مشینیں، سستی نقلیں اور بدلتا ہوا طرزِ زندگی ان ہنروں کو معدومی کے دہانے پر لے آئے ہیں۔ بہت سے کاریگر بوڑھے ہو چکے ہیں اور کم نوجوان یہ سیکھ رہے ہیں۔ یہ منصوبہ تین ہنروں کی تصاویر اور کہانیاں پیش کرتا ہے تاکہ یہ ضائع نہ ہوں۔',

      'pottery.h': 'مٹی کے برتن',
      'pottery.sub': 'کمہار · کمہار کا فن',
      'pottery.p1': 'مٹی کے برتن بنانا سندھ کے قدیم ترین فنون میں سے ہے۔ موئن جو دڑو اور وادیٔ سندھ کے دیگر مقامات سے چاک پر بنے اور رنگین نقش و نگار والے برتن ملے ہیں، جو 4,500 سال سے بھی زیادہ پرانے ہیں۔',
      'pottery.p2': 'بعد کی صدیوں میں سندھ اپنے نیلے چمکدار (گلیزڈ) برتنوں اور ٹائلوں کے کام کے لیے مشہور ہوا، جو ہالا جیسے مقامات اور ٹھٹھہ کی یادگاروں کو سجانے والی ٹائلوں میں نظر آتا ہے۔ سفید مٹی پر کوبالٹ نیلی اور فیروزی گلیز اس کی پہچان ہے۔',
      'pottery.fade': '<strong>یہ کیوں ختم ہو رہا ہے:</strong> اکثر گھروں میں مٹی کے برتنوں کی جگہ پلاسٹک اور اسٹیل نے لے لی ہے، اور کم خاندان کمہار کا چاک چلاتے ہیں۔',

      'embroidery.h': 'کڑھائی اور شیشے کا کام',
      'embroidery.sub': 'سوئی دھاگہ · بھرت · ابھلا',
      'embroidery.p1': 'سندھی کڑھائی دھاگے سے کہی گئی ایک زبان ہے۔ خواتین لباس، چولیوں، گاؤ تکیوں، اونٹ کی سجاوٹ اور شادی کے جہیز کی اشیا پر گھنے جیومیٹری اور پھولوں کے نقش بناتی ہیں۔ چھوٹے گول شیشے، جنہیں <em>ابھلا</em> کہا جاتا ہے، روشنی کو منعکس کرنے کے لیے اور، مانا جاتا ہے کہ، بُری نظر سے بچانے کے لیے ٹانکے جاتے ہیں۔',
      'embroidery.p2': 'تھرپارکر سے لے کر میدانِ سندھ تک، ہر برادری کے اپنے ٹانکے، رنگ اور نقش ہیں۔ ایک ہی ٹکڑا مکمل کرنے میں ہفتے بلکہ مہینوں کی صبر آزما محنت لگ سکتی ہے۔',
      'embroidery.fade': '<strong>یہ کیوں ختم ہو رہا ہے:</strong> مشینی کڑھائی تیز اور سستی ہے، اور نوجوان خواتین کے پاس ہاتھ کے ٹانکے سیکھنے کے لیے اکثر وقت یا حوصلہ افزائی کم ہوتی ہے۔',

      'leather.h': 'چمڑے کا کام',
      'leather.sub': 'چمڑا · کھسہ · ہاتھ سے سِلا چمڑا',
      'leather.p1': 'چمڑے کا کام نسلوں سے سندھ کے کسانوں، چرواہوں اور مسافروں کے کام آتا رہا ہے۔ کاریگر ہاتھ سے کھالوں کو پکاتے اور کاٹتے ہیں تاکہ کڑھائی والے جوتے، پیٹیاں، تھیلے، زینیں اور صحرائی سفر کے لیے اونٹ کا سازوسامان تیار کر سکیں۔',
      'leather.p2': 'عمدہ ٹکڑوں کو ہاتھ کی سلائی، رنگین دھاگوں اور چھوٹے کٹے ہوئے نقش سے سجایا جاتا ہے۔ جوتوں کا ہر جوڑا ہاتھ سے شکل دے کر سِیا جاتا ہے، مشینی لائن پر نہیں۔',
      'leather.fade': '<strong>یہ کیوں ختم ہو رہا ہے:</strong> فیکٹری کے بنے جوتے اور مصنوعی چمڑا سستے ہیں، اور اس ہنر کو اکثر سخت محنت اور کم اجرت والا کام سمجھا جاتا ہے۔',
      'leather.cap': 'ہاتھ سے سلا ہوا چمڑا',

      'more.h': 'سندھ کے مزید ہنر',
      'more.sub': 'اس سرزمین کے بہت سے دیگر ہنر بھی خاموش ہوتے جا رہے ہیں',

      'ajrak.h': 'اجرک',
      'ajrak.tag': 'بلاک پرنٹ شال',
      'ajrak.p': 'گہرے نیل اور مجیٹھ کے سرخ رنگ میں تراشے ہوئے لکڑی کے ٹھپوں سے چھپی ہوئی چادر۔ قدرتی اور معدنی رنگ استعمال ہوتے ہیں، اور خیال ہے کہ یہ چھپائی وادیٔ سندھ کے زمانے سے چلی آ رہی ہے۔ سندھ میں اجرک عزت کی علامت کے طور پر تحفے میں دی جاتی ہے۔',
      'ralli.h': 'رلی',
      'ralli.tag': 'اپلیک اور پیوند کاری',
      'ralli.p': 'خواتین کپڑے کی کئی تہوں کو سادہ ٹانکوں سے جوڑ کر چمکدار جیومیٹری نقوش والی رضائیاں بناتی ہیں۔ نام سندھی لفظ سے لیا گیا ہے جس کا مطلب “ملانا اور جوڑنا” ہے۔ رلیاں بیٹیوں کو جہیز میں بھی دی جاتی ہیں۔',
      'bandhani.h': 'بندھنی',
      'bandhani.tag': 'ٹائی ڈائی',
      'bandhani.p': 'رنگنے سے پہلے کپڑے میں چھوٹی چھوٹی گرہیں باندھی جاتی ہیں، جن سے نقطوں کے نقش بنتے ہیں۔ مانا جاتا ہے کہ اس کی ابتدا سندھ میں ہوئی، اور لاڑ کا علاقہ اور صحرائے تھر اس کے لیے مشہور ہیں۔',
      'weaving.h': 'ہاتھ کی بُنائی',
      'weaving.tag': 'لنگی، سوسی، کھیس اور کھدر',
      'weaving.p': 'سندھ سنہری دھاگے کے کناروں والی ریشمی اور سوتی لنگیوں، ہالا، حیدرآباد اور ٹھٹھہ کے دھاری دار سوسی کپڑے، اور گرم کھدر کی شالوں کے لیے مشہور ہے۔ سوسی تو اٹھارہویں صدی میں انگلینڈ بھی برآمد کیا جاتا تھا۔',
      'lacquer.h': 'لاکھ کا کام',
      'lacquer.tag': 'جنڈی کا کام',
      'lacquer.p': 'دریائے سندھ کے کنارے اگنے والے درختوں کی لکڑی کو خراد پر تراشا جاتا ہے، اس پر رنگین لاکھ چڑھائی جاتی ہے، پھر نقاشی اور وارنش کی جاتی ہے۔ یہ روایتی جھولے (<em>پینگھو</em>)، پلنگ، کرسیوں اور چراغوں میں استعمال ہوتی ہے۔',
      'wood.h': 'لکڑی کی نقاشی',
      'wood.tag': 'شکارپور',
      'wood.p': 'شکارپور کے کاریگر دروازوں، کھڑکیوں اور پلنگوں پر باریک نقش تراشتے ہیں۔ ہر منقش تختہ ہاتھ سے بنتا ہے، اور اوزار خاندانوں میں نسل در نسل چلے آتے ہیں۔',
      'basketry.h': 'کھجور کے پتوں کی ٹوکری سازی',
      'basketry.tag': 'خیرپور اور سکھر',
      'basketry.p': 'خواتین کھجور کے پتوں سے ٹوکریاں، چٹائیاں، ہاتھ کے پنکھے اور روٹی کے چھابے بُنتی ہیں۔ انہیں اکثر رنگین پھندنوں، دھاتی دھاگوں اور چھوٹے شیشوں سے سجایا جاتا ہے۔',
      'camel.h': 'اونٹ کی بال تراشی کا فن',
      'camel.tag': 'صحرائی سندھ',
      'camel.p': 'حجام اونٹ کے بال کاٹ کر پھول اور جیومیٹری نقوش بناتے ہیں، کبھی کبھی مہندی یا رنگ بھی لگاتے ہیں۔ یہ زیادہ تر صحرائی علاقوں میں کیا جاتا ہے اور عید جیسے تہواروں کے موقع پر نظر آتا ہے۔',
      'jewelry.h': 'زیورات اور چوڑیاں',
      'jewelry.tag': 'چاندی، سونا، شیشہ',
      'jewelry.p': 'سندھ میں زیور سازی کی تاریخ وادیٔ سندھ تک جاتی ہے۔ ہار، نتھ، پازیب اور سر کے زیورات چاندی اور سونے سے بنتے ہیں، اور حیدرآباد اپنی کانچ کی چوڑیوں کے لیے مشہور ہے۔',
      'beadwork.h': 'منکوں کا کام اور ساگی',
      'beadwork.tag': 'موتیوں کا کام',
      'beadwork.p': 'منکے، سیپیاں، شیشے اور پھندنے بالوں کی چوٹیوں کے زیور (<em>ساگی</em>)، تھیلوں، ازاربند کی ڈوریوں اور بسوں اور رکشوں کی سجاوٹ میں ٹانکے جاتے ہیں۔',
      'shell.h': 'سیپ اور ہاتھی دانت کا کام',
      'shell.tag': 'تقریباً ناپید',
      'shell.p': 'قدیم بندرگاہ بھنبھور میں ہاتھی دانت کا بہت بڑا کارخانہ تھا۔ ہاتھی دانت کی کندہ کاری تقریباً ختم ہو چکی ہے، لیکن زیریں سندھ میں سیپ کی چوڑیاں اور سیپ کی مصنوعات اب بھی بنتی ہیں۔',
      'bells.h': 'تانبے کی گھنٹیاں',
      'bells.tag': 'دھات کا ہنر',
      'bells.p': 'مویشیوں اور دوسرے جانوروں کے لیے ہاتھ سے بنی تانبے کی گھنٹیاں دیہی سندھ بھر میں بجتی ہیں۔ بڑی گھنٹیاں بزرگوں کے مزاروں پر بھی لٹکی نظر آتی ہیں۔',

      'models.h': 'ہمارے ہاتھ سے بنے ماڈل',
      'models.sub': 'گاؤں کی زندگی اور شہر کی زندگی، ہاتھ سے تیار کردہ',
      'village.h': 'گاؤں کی زندگی',
      'village.tag': 'دیہی سندھ',
      'village.p': 'گھاس پھوس کی چھت والی جھونپڑیاں، گتے کی دیواریں، چارپائی، بیل گاڑی، ہینڈ پمپ، رنگین مٹی کے برتن اور پانی کے کنارے اونٹ اور گائے۔ ہمارا گاؤں اس ماحول کو دکھاتا ہے جہاں مٹی کے برتن جیسے روایتی ہنر آج بھی روزمرہ زندگی کا حصہ ہیں۔',
      'city.h': 'شہر کی زندگی',
      'city.tag': 'جدید سندھ',
      'city.p': 'ہسپتال، بینک، اسکول، مسجد، اونچی رہائشی عمارت، ٹریفک سگنل، اور گاڑیوں اور ایک سجے ہوئے ٹرک سے بھری سڑکیں۔ شہر کی دکانیں کارخانوں کی بنی چیزوں سے بھری ہوتی ہیں، اور یہی ہاتھ کے ہنر کے آہستہ آہستہ ماند پڑنے کی ایک وجہ ہے۔',

      'gallery.h': 'گیلری',
      'gallery.sub': 'ورکشاپس اور کام کے یادگار لمحات',
      'gallery.archive': 'آرکائیو سے',

      'team.h': 'پیش کنندگان',
      'team.m1': 'مہک لاشاری',
      'team.m2': 'مہوش بدر',
      'team.role': 'پیش کار',
      'team.avatar': 'م',
      'team.students': 'جماعت 6A کی طالبات',
      'st.dua': 'دعا نور',
      'st.zainab': 'زینب',
      'st.malala': 'ملالہ',
      'team.school': '<strong>گورنمنٹ گرلز ہائی اسکول (GGHS)، بیراج کالونی، سکھر</strong><br>سیمس (SEMIS) سی ایم ایس کوڈ: 4130072',

      'credits.h': 'حوالہ جات',
      'credits.sub': 'اس منصوبے میں استعمال ہونے والی تصاویر اور معلومات',
      'credits.photos': '<strong>تصاویر:</strong> اس منصوبے کی تصاویر عوامی طور پر دستیاب آن لائن ذرائع سے لی گئی ہیں اور غیر تجارتی، تعلیمی مقاصد کے لیے استعمال کی گئی ہیں۔ کریڈٹ اصل فوٹوگرافرز اور تخلیق کاروں کا ہے۔',
      'credits.info': "<strong>معلومات:</strong> عمومی تاریخ ویکی پیڈیا کے مضامین <a href='https://en.wikipedia.org/wiki/The_Crafts_of_Sindh' target='_blank' rel='noopener'><bdi>The Crafts of Sindh</bdi></a>، <a href='https://en.wikipedia.org/wiki/Sindhi_embroidery' target='_blank' rel='noopener'><bdi>Sindhi embroidery</bdi></a>، <a href='https://en.wikipedia.org/wiki/Khussa_(footwear)' target='_blank' rel='noopener'><bdi>Khussa (footwear)</bdi></a> اور <a href='https://en.wikipedia.org/wiki/Kashi_Kari' target='_blank' rel='noopener'><bdi>Kashi Kari</bdi></a> سے؛ ڈان، <bdi>“The ancient art of Kashigars”</bdi>۔",
      'credits.models': '<strong>ماڈل:</strong> گاؤں کی زندگی اور شہر کی زندگی کے ماڈل اور ان کی تصاویر ہمارا اپنا اصل، ہاتھ سے بنا کام ہیں۔',
      'credits.fonts': '<strong>فونٹس:</strong> <bdi>Cormorant Garamond</bdi>، <bdi>Mulish</bdi>، <bdi>Noto Naskh Arabic</bdi> اور <bdi>Noto Nastaliq Urdu</bdi>، گوگل فونٹس (اوپن فونٹ لائسنس)۔',
      'credits.small': 'تصاویر اپنے اپنے تخلیق کاروں کی ملکیت رہتی ہیں اور ان کے بیان کردہ لائسنسوں کے تحت استعمال کی گئی ہیں۔',
      'cr': '[حوالہ]',

      'footer.p': 'سندھ ڈیجیٹل آرٹ ہیریٹیج · گورنمنٹ گرلز ہائی اسکول بیراج کالونی، سکھر کی جماعت 6A کا اسٹریم (STREAM) منصوبہ',
      'footer.c': '&copy; 2026 مہک لاشاری، مہوش بدر اور طالبات',
      'footer.collab': 'علم اسٹوڈیو اور محکمۂ اسکول ایجوکیشن و لٹریسی، حکومتِ سندھ کے اشتراک سے'
    },

    /* =============================== SINDHI =============================== */
    sd: {
      'meta.title': 'سنڌ ڊجيٽل آرٽ ورثو | سنڌ جا ختم ٿيندڙ هنر',
      'meta.desc': 'سنڌ ڊجيٽل آرٽ ورثو: گورنمينٽ گرلز هاءِ اسڪول (GGHS) بئراج ڪالوني، سکر جي ڪلاس 6A جو اسٽريم (STREAM) پراجيڪٽ، جنهن ۾ سنڌ جي ختم ٿيندڙ روايتي هنرن — مٽيءَ جا ٿانو، ڀرت ۽ آرسيءَ جو ڪم، ۽ چمڙي جو ڪم — کي محفوظ ڪيو ويو آهي.',

      'brand': 'سنڌ ڊجيٽل آرٽ ورثو',
      'nav.about': 'تعارف',
      'nav.pottery': 'ڪنڀاري',
      'nav.embroidery': 'ڀرت',
      'nav.leather': 'چمڙو',
      'nav.more': 'ٻيا هنر',
      'nav.models': 'اسان جا ماڊل',
      'nav.gallery': 'گيلري',
      'nav.team': 'پيش ڪندڙ',
      'nav.credits': 'حوالا',

      'hero.eyebrow': 'اسٽريم (STREAM) آرٽ پراجيڪٽ',
      'hero.title': 'ياد رکندڙ هٿ',
      'hero.lead': 'قديم سنڌ جا هنر، جيڪي هزارين سال پراڻا آهن، آهستي آهستي وسري رهيا آهن. هي انهن کي ياد رکڻ جي اسان جي هڪ ڪوشش آهي.',
      'hero.btn': 'سفر شروع ڪريو',
      'hero.scroll': 'هيٺ سڪرول ڪريو &darr;',

      'logo.stream': 'سنڌ اسٽريم جرني',
      'logo.ilm': 'علم اسٽوڊيو',
      'logo.govt': 'حڪومتِ سنڌ',
      'vision': 'حڪومتِ سنڌ جي محترم وزيرِ تعليم ۽ خواندگيءَ جي ويزن تحت، ۽ اسڪول ايجوڪيشن اينڊ لٽريسي ڊپارٽمينٽ (SELD) جي قابلِ احترام سيڪريٽريءَ جي سرپرستيءَ ۾.',

      'intro.h': 'هنرمندن جي ڌرتي',
      'intro.p1': 'سنڌ دنيا جي قديم ترين تهذيبن مان هڪ جو گهر آهي. چار هزار سالن کان به وڌيڪ اڳ موئن جو دڙو جا ماڻهو مٽيءَ کي شڪل ڏيڻ، ڪپڙو اڻڻ ۽ چمڙي تي ڪم ڪرڻ ڄاڻندا هئا. اهي هنر ماءُ کان ڌيءَ ۽ پيءُ کان پٽ ڏانهن، ڳوٺ کان ڳوٺ ٿيندا، اڄ تائين پهتا آهن.',
      'intro.p2': 'هاڻي مشينون، سستيون نقلون ۽ بدلجندڙ طرزِ زندگي انهن هنرن کي ختم ٿيڻ جي ڪناري تي آڻي بيٺيون آهن. ڪيترائي ڪاريگر پوڙها آهن ۽ ٿورا نوجوان سکي رهيا آهن. هي پراجيڪٽ ٽن هنرن جون تصويرون ۽ ڪهاڻيون پيش ڪري ٿو ته جيئن اهي گم نه ٿين.',

      'pottery.h': 'ڪنڀاري',
      'pottery.sub': 'ڪنڀر · ڪنڀر جو فن',
      'pottery.p1': 'مٽيءَ جا ٿانو ٺاهڻ سنڌ جي قديم ترين فنن مان آهي. موئن جو دڙو ۽ سنڌو ماٿريءَ جي ٻين ماڳن تان چاڪ تي ٺهيل ۽ رنگين نقش نگار وارا ٿانو مليا آهن، جيڪي 4,500 سالن کان به وڌيڪ پراڻا آهن.',
      'pottery.p2': 'پوئين صدين ۾ سنڌ نيرن چمڪندڙ (گليزڊ) ٿانون ۽ ٽائيلن جي ڪم ڪري مشهور ٿي، جيڪو هالا جهڙن هنڌن ۽ ٺٽي جي يادگارن کي سينگارڻ واري ٽائيلن ۾ نظر اچي ٿو. اڇي مٽيءَ تي ڪوبالٽ نيرو ۽ فيروزي گليز ان جي سڃاڻپ آهي.',
      'pottery.fade': '<strong>اهو ڇو ختم ٿي رهيو آهي:</strong> گهڻن گهرن ۾ مٽيءَ جي ٿانون جي جاءِ پلاسٽڪ ۽ اسٽيل ورتي آهي، ۽ ٿورا ڪٽنب ڪنڀر جو چاڪ ڦيرائين ٿا.',

      'embroidery.h': 'ڀرت ۽ آرسيءَ جو ڪم',
      'embroidery.sub': 'سئي ڌاڳو · ڀرت · آڀلا',
      'embroidery.p1': 'سنڌي ڀرت ڌاڳي سان چيل هڪ ٻولي آهي. عورتون ڪپڙن، چولين، ڪشنن، اٺن جي سينگار ۽ شاديءَ جي ڏاج جي شين تي گهاٽا جاميٽريائي ۽ گلن وارا نقش ڀرينديون آهن. ننڍا گول شيشا، جن کي <em>آڀلا</em> چئبو آهي، روشنيءَ کي منعڪس ڪرڻ لاءِ ۽، مڃيو وڃي ٿو ته، بڇڙي نظر کان بچائڻ لاءِ ٽاڪيا ويندا آهن.',
      'embroidery.p2': 'ٿرپارڪر کان وٺي سنڌوءَ جي ميدانن تائين، هر برادريءَ جا پنهنجا ٽاڪا، رنگ ۽ نقش آهن. هڪ ئي ٽڪرو مڪمل ڪرڻ ۾ هفتا بلڪه مهينا صبر آزما محنت لڳي سگهي ٿي.',
      'embroidery.fade': '<strong>اهو ڇو ختم ٿي رهيو آهي:</strong> مشيني ڀرت تيز ۽ سستي آهي، ۽ نوجوان عورتن وٽ هٿ جا ٽاڪا سکڻ لاءِ اڪثر وقت يا همٿ افزائي گهٽ هوندي آهي.',

      'leather.h': 'چمڙي جو ڪم',
      'leather.sub': 'چمڙو · کسا · هٿ سان سبيل چمڙو',
      'leather.p1': 'چمڙي جو ڪم نسلن کان سنڌ جي هارين، ڌنارن ۽ مسافرن جي ڪم ايندو رهيو آهي. ڪاريگر هٿ سان کلون پچائيندا ۽ ڪٽيندا آهن ته جيئن ڀرت وارا بوٽ، پٽا، ٿيلها، زينون ۽ ريگستاني سفر لاءِ اٺن جو سامان تيار ڪري سگهن.',
      'leather.p2': 'عمدن ٽڪرن کي هٿ جي سبائي، رنگين ڌاڳن ۽ ننڍن ڪٽيل نقشن سان سينگاريو ويندو آهي. بوٽن جو هر جوڙو هٿ سان شڪل ڏئي سبيو ويندو آهي، مشيني لائن تي نه.',
      'leather.fade': '<strong>اهو ڇو ختم ٿي رهيو آهي:</strong> ڪارخاني ۾ ٺهيل بوٽ ۽ مصنوعي چمڙو سستا آهن، ۽ هن هنر کي اڪثر سخت محنت ۽ گهٽ اجري وارو ڪم سمجهيو ويندو آهي.',
      'leather.cap': 'هٿ سان سبيل چمڙو',

      'more.h': 'سنڌ جا ٻيا هنر',
      'more.sub': 'هن ڌرتيءَ جا ڪيترائي ٻيا هنر به خاموش ٿيندا پيا وڃن',

      'ajrak.h': 'اجرڪ',
      'ajrak.tag': 'ٺپن سان ڇپيل چادر',
      'ajrak.p': 'گهاٽي نيري (نيل) ۽ مجيٺ جي ڳاڙهي رنگ ۾ ڪوريل ڪاٺ جي ٺپن سان ڇپيل چادر. قدرتي ۽ معدني رنگ استعمال ڪيا ويندا آهن، ۽ مڃيو وڃي ٿو ته اها ڇپائي سنڌو ماٿريءَ جي دور کان هلندي اچي ٿي. سنڌ ۾ اجرڪ عزت جي نشاني طور تحفي ۾ ڏني ويندي آهي.',
      'ralli.h': 'رلي',
      'ralli.tag': 'ايپلڪ ۽ ٽڪرن جو ڪم',
      'ralli.p': 'عورتون ڪپڙي جا ڪيترائي تهه سادن ٽاڪن سان ڳنڍي چمڪدار جاميٽريائي نقشن وارا رلي ٺاهينديون آهن. نالو سنڌي لفظ “رلڻ” (ملڻ، گڏجڻ) مان آيو آهي. رليون ڌيئرن کي ڏاج ۾ به ڏنيون وينديون آهن.',
      'bandhani.h': 'بندهڻي',
      'bandhani.tag': 'ٽائي ڊائي',
      'bandhani.p': 'رڱڻ کان اڳ ڪپڙي ۾ ننڍيون ننڍيون ڳنڍون ٻڌيون وينديون آهن، جن سان نقطن جا نقش ٺهندا آهن. مڃيو وڃي ٿو ته ان جي شروعات سنڌ ۾ ٿي، ۽ لاڙ وارو علائقو ۽ ٿر جو ريگستان ان لاءِ مشهور آهن.',
      'weaving.h': 'هٿ جي اڻت',
      'weaving.tag': 'لنگي، سوسي، کهيس ۽ کڏي',
      'weaving.p': 'سنڌ سونهري ڌاڳي جي ڪنارن وارين ريشمي ۽ سوتي لنگين، هالا، حيدرآباد ۽ ٺٽي جي ڌاريدار سوسي ڪپڙي، ۽ گرم کڏيءَ جي چادرن لاءِ مشهور آهي. سوسي ته ارڙهين صديءَ ۾ انگلنڊ به موڪليو ويندو هو.',
      'lacquer.h': 'لاک جو ڪم',
      'lacquer.tag': 'جنڊيءَ جو ڪم',
      'lacquer.p': 'سنڌو درياءَ جي ڪپن تي اڀرندڙ وڻن جي ڪاٺ کي خراد تي ڦيرائي، ان تي رنگين لاک چاڙهيو ويندو آهي، پوءِ نقاشي ۽ وارنش ڪئي ويندي آهي. اهو روايتي جهولي (<em>پينگهو</em>)، پلنگن، ڪرسين ۽ ڏيئن ۾ استعمال ٿيندو آهي.',
      'wood.h': 'ڪاٺ جي ڪوري',
      'wood.tag': 'شڪارپور',
      'wood.p': 'شڪارپور جا ڪاريگر دروازن، دريون ۽ پلنگن تي باريڪ نقش ڪوريندا آهن. هر ڪوريل تختو هٿ سان ٺهندو آهي، ۽ اوزار خاندانن ۾ نسل در نسل هلندا اچن ٿا.',
      'basketry.h': 'کجهور جي پنن جي ٽوڪرين جو ڪم',
      'basketry.tag': 'خيرپور ۽ سکر',
      'basketry.p': 'عورتون کجهور جي پنن مان ٽوڪريون، چٽايون، هٿ جا پکا ۽ ماني جا ڇابا اڻينديون آهن. انهن کي اڪثر رنگين ڦندڻن، ڌاتوءَ جي ڌاڳن ۽ ننڍن شيشن سان سينگاريو ويندو آهي.',
      'camel.h': 'اٺ جا وار ڪترڻ جو فن',
      'camel.tag': 'ريگستاني سنڌ',
      'camel.p': 'حجام اٺ جا وار ڪتري گل ۽ جاميٽريائي نقش ٺاهيندا آهن، ڪڏهن ڪڏهن مهندي يا رنگ به لڳائيندا آهن. اهو گهڻو ڪري ريگستاني علائقن ۾ ڪيو ويندو آهي ۽ عيد جهڙن ٽهوارن جي موقعي تي نظر ايندو آهي.',
      'jewelry.h': 'زيور ۽ چوڙيون',
      'jewelry.tag': 'چانديءَ، سون، شيشي',
      'jewelry.p': 'سنڌ ۾ زيور سازي جي تاريخ سنڌو ماٿريءَ تائين وڃي ٿي. هار، نٿ، پازيب ۽ مٿي جا زيور چانديءَ ۽ سون مان ٺهندا آهن، ۽ حيدرآباد پنهنجين شيشي جي چوڙين لاءِ مشهور آهي.',
      'beadwork.h': 'مڻين جو ڪم ۽ ساگي',
      'beadwork.tag': 'موتين جو ڪم',
      'beadwork.p': 'مڻيا، سپيون، شيشا ۽ ڦندڻ وارن جي چوٽين جي سينگار (<em>ساگي</em>)، ٿيلهن، ازار بند جي ڊورين ۽ بسن ۽ رڪشن جي سينگار ۾ ٽاڪيا ويندا آهن.',
      'shell.h': 'سپ ۽ هاٿيءَ جي ڏندن جو ڪم',
      'shell.tag': 'تقريبن ناپيد',
      'shell.p': 'قديم بندرگاهه ڀنڀور ۾ هاٿيءَ جي ڏندن جو تمام وڏو ڪارخانو هو. هاٿيءَ جي ڏندن تي ڪوري جو ڪم تقريبن ختم ٿي چڪو آهي، پر هيٺينءَ سنڌ ۾ سپن جون چوڙيون ۽ سپن جون شيون اڃا به ٺهن ٿيون.',
      'bells.h': 'ٽامي جون گهنڊيون',
      'bells.tag': 'ڌاتوءَ جو هنر',
      'bells.p': 'ڍورن ۽ ٻين جانورن لاءِ هٿ سان ٺهيل ٽامي جون گهنڊيون ڳوٺاڻي سنڌ ۾ وڄنديون رهن ٿيون. وڏيون گهنڊيون بزرگن جي درگاهن تي به ٽنگيل نظر اچن ٿيون.',

      'models.h': 'اسان جا هٿ سان ٺهيل ماڊل',
      'models.sub': 'ڳوٺ جي زندگي ۽ شهر جي زندگي، هٿ سان ٺاهيل',
      'village.h': 'ڳوٺ جي زندگي',
      'village.tag': 'ڳوٺاڻي سنڌ',
      'village.p': 'ڪکن جي ڇت وارا جهوپڙا، گتي جون ڀتيون، کٽ، بيل گاڏي، هٿ وارو نلڪو، مٽيءَ جا رنگين ٿانو ۽ پاڻيءَ جي ڪناري تي اُٺ ۽ ڳئون. اسان جو ڳوٺ اهو ماحول ڏيکاري ٿو جتي ٿانون ٺاهڻ جهڙا روايتي هنر اڄ به روزمره زندگيءَ جو حصو آهن.',
      'city.h': 'شهر جي زندگي',
      'city.tag': 'جديد سنڌ',
      'city.p': 'اسپتال، بئنڪ، اسڪول، مسجد، بلند رهائشي عمارت، ٽريفڪ سگنل، ۽ گاڏين ۽ هڪ سينگاريل ٽرڪ سان ڀريل رستا. شهر جون دڪانون ڪارخانن جي ٺهيل شين سان ڀريل هونديون آهن، ۽ اها ئي هڪ سبب آهي جو هٿ جا هنر آهستي آهستي ماند ٿي رهيا آهن.',

      'gallery.h': 'گيلري',
      'gallery.sub': 'ورڪشاپن ۽ ڪم جا ياديگار لمحا',
      'gallery.archive': 'آرڪائيو مان',

      'team.h': 'پيش ڪندڙ',
      'team.m1': 'مهڪ لاشاري',
      'team.m2': 'مهوش بدر',
      'team.role': 'پيش ڪندڙ',
      'team.avatar': 'م',
      'team.students': 'ڇهين ڪلاس (6A) جون شاگردياڻيون',
      'st.dua': 'دعا نور',
      'st.zainab': 'زينب',
      'st.malala': 'ملاله',
      'team.school': '<strong>گورنمينٽ گرلز هاءِ اسڪول (GGHS)، بئراج ڪالوني، سکر</strong><br>سيمس (SEMIS) سي ايم ايس ڪوڊ: 4130072',

      'credits.h': 'حوالا',
      'credits.sub': 'هن پراجيڪٽ ۾ استعمال ٿيل تصويرون ۽ معلومات',
      'credits.photos': '<strong>تصويرون:</strong> هن پراجيڪٽ جون تصويرون عام طور تي دستياب آن لائن ذريعن مان ورتيون ويون آهن ۽ غير تجارتي، تعليمي مقصدن لاءِ استعمال ڪيون ويون آهن. ڪريڊٽ اصل فوٽوگرافرن ۽ تخليقڪارن جو آهي.',
      'credits.info': "<strong>معلومات:</strong> عام تاريخ وڪيپيڊيا جي مضمونن <a href='https://en.wikipedia.org/wiki/The_Crafts_of_Sindh' target='_blank' rel='noopener'><bdi>The Crafts of Sindh</bdi></a>، <a href='https://en.wikipedia.org/wiki/Sindhi_embroidery' target='_blank' rel='noopener'><bdi>Sindhi embroidery</bdi></a>، <a href='https://en.wikipedia.org/wiki/Khussa_(footwear)' target='_blank' rel='noopener'><bdi>Khussa (footwear)</bdi></a> ۽ <a href='https://en.wikipedia.org/wiki/Kashi_Kari' target='_blank' rel='noopener'><bdi>Kashi Kari</bdi></a> مان؛ ڊان، <bdi>“The ancient art of Kashigars”</bdi>.",
      'credits.models': '<strong>ماڊل:</strong> ڳوٺ جي زندگي ۽ شهر جي زندگي جا ماڊل ۽ سندن تصويرون اسان جو پنهنجو اصل، هٿ سان ٺهيل ڪم آهن.',
      'credits.fonts': '<strong>فانٽس:</strong> <bdi>Cormorant Garamond</bdi>، <bdi>Mulish</bdi>، <bdi>Noto Naskh Arabic</bdi> ۽ <bdi>Noto Nastaliq Urdu</bdi>، گوگل فانٽس (اوپن فانٽ لائسنس).',
      'credits.small': 'تصويرون پنهنجن پنهنجن تخليقڪارن جي ملڪيت رهن ٿيون ۽ انهن جي بيان ڪيل لائسنسن تحت استعمال ڪيون ويون آهن.',
      'cr': '[حوالو]',

      'footer.p': 'سنڌ ڊجيٽل آرٽ ورثو · گورنمينٽ گرلز هاءِ اسڪول بئراج ڪالوني، سکر جي ڪلاس 6A جو اسٽريم (STREAM) پراجيڪٽ',
      'footer.c': '&copy; 2026 مهڪ لاشاري، مهوش بدر ۽ شاگردياڻيون',
      'footer.collab': 'علم اسٽوڊيو ۽ اسڪول ايجوڪيشن اينڊ لٽريسي ڊپارٽمينٽ، حڪومتِ سنڌ جي اشتراڪ سان'
    }
  };

  /* ---------- photo captions (looked up by the English caption) ---------- */
  var CAPTIONS = {
    ur: {
      'A potter shaping clay on the wheel': 'کمہار چاک پر مٹی کو شکل دیتے ہوئے',
      'Large glazed jars in a museum display': 'عجائب گھر میں نمائش کے لیے رکھے بڑے گلیزڈ مرتبان',
      'Decorated pottery fragments': 'سجے ہوئے مٹی کے برتنوں کے ٹکڑے',
      'Sindhi mirror-work embroidery with shell tassels': 'سیپ کے پھندنوں والی سندھی شیشے کی کڑھائی',
      'Embroidered Sindhi caps (topi)': 'کڑھائی والی سندھی ٹوپیاں',
      'Bags decorated with mirror work': 'شیشے کے کام سے سجے تھیلے',
      "Mohenjo-daro, one of the world's oldest cities": 'موئن جو دڑو، دنیا کے قدیم ترین شہروں میں سے ایک',
      'Carved sandstone tombs of Sindh': 'سندھ کے تراشے ہوئے ریتیلے پتھر کے مقبرے',
      'Artifacts from the Indus Valley civilization': 'وادیٔ سندھ کی تہذیب کے آثار',
      'A handmade village: huts, a river and a courtyard': 'ہاتھ سے بنا گاؤں: جھونپڑیاں، دریا اور صحن',
      'A bullock cart, a hand pump and painted clay pots': 'بیل گاڑی، ہینڈ پمپ اور رنگین مٹی کے برتن',
      'A thatched hut with a camel and a cow': 'اونٹ اور گائے کے ساتھ گھاس پھوس کی جھونپڑی',
      'A handmade city: hospital, bank, school and busy roads': 'ہاتھ سے بنا شہر: ہسپتال، بینک، اسکول اور مصروف سڑکیں'
    },
    sd: {
      'A potter shaping clay on the wheel': 'ڪنڀر چاڪ تي مٽيءَ کي شڪل ڏيندي',
      'Large glazed jars in a museum display': 'عجائب گهر ۾ نمائش لاءِ رکيل وڏا گليزڊ مرتبان',
      'Decorated pottery fragments': 'سينگاريل ٿانون جا ٽڪرا',
      'Sindhi mirror-work embroidery with shell tassels': 'سپن جي ڦندڻن واري سنڌي آرسيءَ جي ڀرت',
      'Embroidered Sindhi caps (topi)': 'ڀرت واريون سنڌي ٽوپيون',
      'Bags decorated with mirror work': 'آرسيءَ جي ڪم سان سينگاريل ٿيلها',
      "Mohenjo-daro, one of the world's oldest cities": 'موئن جو دڙو، دنيا جي قديم ترين شهرن مان هڪ',
      'Carved sandstone tombs of Sindh': 'سنڌ جا ڪوريل ريتيلي پٿر جا مقبرا',
      'Artifacts from the Indus Valley civilization': 'سنڌو ماٿريءَ جي تهذيب جا آثار',
      'A handmade village: huts, a river and a courtyard': 'هٿ سان ٺهيل ڳوٺ: جهوپڙا، ندي ۽ اڱڻ',
      'A bullock cart, a hand pump and painted clay pots': 'بيل گاڏي، هٿ وارو نلڪو ۽ مٽيءَ جا رنگين ٿانو',
      'A thatched hut with a camel and a cow': 'اُٺ ۽ ڳئون سان گڏ ڪکن جي ڇت وارو جهوپڙو',
      'A handmade city: hospital, bank, school and busy roads': 'هٿ سان ٺهيل شهر: اسپتال، بئنڪ، اسڪول ۽ مصروف رستا'
    }
  };

  /* ---------- image descriptions for screen readers (by English alt text) ---------- */
  var ALTS = {
    ur: {
      'Sindh STREAM Journey logo': 'سندھ اسٹریم جرنی کا لوگو',
      'ILM Studio logo': 'علم اسٹوڈیو کا لوگو',
      'Government of Sindh logo': 'حکومتِ سندھ کا لوگو',
      'A potter shaping a clay pot on the wheel': 'کمہار چاک پر مٹی کا برتن بناتے ہوئے',
      'Large glazed jars in a museum display case': 'عجائب گھر کے شوکیس میں رکھے بڑے گلیزڈ مرتبان',
      'Decorated pieces of ancient broken pottery': 'قدیم ٹوٹے ہوئے برتنوں کے سجے ہوئے ٹکڑے',
      'Sindhi mirror-work embroidery with shell tassels': 'سیپ کے پھندنوں والی سندھی شیشے کی کڑھائی',
      'Embroidered Sindhi caps (topi)': 'کڑھائی والی سندھی ٹوپیاں',
      'Bags decorated with mirror work and embroidery': 'شیشے کے کام اور کڑھائی سے سجے تھیلے',
      'Handmade Sindhi leather work': 'ہاتھ سے بنا سندھی چمڑے کا کام',
      'Ajrak block printing': 'اجرک کی بلاک پرنٹنگ',
      'A man wearing an Ajrak vest and turban': 'اجرک کی صدری اور پگڑی پہنے ایک آدمی',
      'Ralli quilt': 'رلی',
      'Bandhani tie-dye': 'بندھنی ٹائی ڈائی',
      'A weaver working at a hand loom': 'ہاتھ کی کھڈی پر کام کرتا ہوا جولاہا',
      'A hand-woven shawl with patterned borders': 'نقش دار کناروں والی ہاتھ سے بُنی ہوئی شال',
      'Woven textile with colourful patterns': 'رنگ برنگے نقوش والا بُنا ہوا کپڑا',
      'Jandi lacquer work': 'جنڈی کا لاکھ کا کام',
      'Sindhi wood carving': 'سندھی لکڑی کی نقاشی',
      'Date palm basketry': 'کھجور کے پتوں کی ٹوکریاں',
      'Camel hair art': 'اونٹ کے بالوں کا فن',
      'Sindhi jewelry and bangles': 'سندھی زیورات اور چوڑیاں',
      'Sindhi beadwork': 'سندھی منکوں کا کام',
      'Shell and ivory craft': 'سیپ اور ہاتھی دانت کا ہنر',
      'Copper bells': 'تانبے کی گھنٹیاں',
      'Embroidered Sindhi caps': 'کڑھائی والی سندھی ٹوپیاں',
      'Illustrated map of Sindh with its landmarks and crafts': 'سندھ کا مصور نقشہ، اس کے مقامات اور ہنروں کے ساتھ',
      'Man in a traditional Sindhi turban and Ajrak vest': 'روایتی سندھی پگڑی اور اجرک کی صدری میں ایک آدمی',
      'Sindhi music, dance and traditional dress': 'سندھی موسیقی، رقص اور روایتی لباس',
      'Museum display of a traditional Sindhi home': 'روایتی سندھی گھر کی عجائب گھر میں نمائش',
      'Woman in a traditional headpiece holding embroidered cloth': 'روایتی سر کے زیور میں ملبوس خاتون، ہاتھ میں کڑھائی والا کپڑا',
      'Handmade Sindhi khussa shoes': 'ہاتھ سے بنے سندھی کھسے',
      'Ruins of Mohenjo-daro': 'موئن جو دڑو کے کھنڈرات',
      'Carved sandstone tombs': 'تراشے ہوئے ریتیلے پتھر کے مقبرے',
      'Artifacts from the Indus Valley civilization': 'وادیٔ سندھ کی تہذیب کے آثار',
      'Handmade model of a Sindh village with thatched huts and a river': 'گھاس پھوس کی جھونپڑیوں اور دریا والے سندھی گاؤں کا ہاتھ سے بنا ماڈل',
      'Village model with a bullock cart, hand pump and painted pots': 'بیل گاڑی، ہینڈ پمپ اور رنگین برتنوں والا گاؤں کا ماڈل',
      'Village model with a thatched hut, a camel and a cow': 'گھاس پھوس کی جھونپڑی، اونٹ اور گائے والا گاؤں کا ماڈل',
      'Handmade city model with a hospital, apartment block, school and roads': 'ہسپتال، رہائشی عمارت، اسکول اور سڑکوں والے شہر کا ہاتھ سے بنا ماڈل'
    },
    sd: {
      'Sindh STREAM Journey logo': 'سنڌ اسٽريم جرني جو لوگو',
      'ILM Studio logo': 'علم اسٽوڊيو جو لوگو',
      'Government of Sindh logo': 'حڪومتِ سنڌ جو لوگو',
      'A potter shaping a clay pot on the wheel': 'ڪنڀر چاڪ تي مٽيءَ جو ٿانو ٺاهيندي',
      'Large glazed jars in a museum display case': 'عجائب گهر جي شوڪيس ۾ رکيل وڏا گليزڊ مرتبان',
      'Decorated pieces of ancient broken pottery': 'قديم ٽٽل ٿانون جا سينگاريل ٽڪرا',
      'Sindhi mirror-work embroidery with shell tassels': 'سپن جي ڦندڻن واري سنڌي آرسيءَ جي ڀرت',
      'Embroidered Sindhi caps (topi)': 'ڀرت واريون سنڌي ٽوپيون',
      'Bags decorated with mirror work and embroidery': 'آرسيءَ جي ڪم ۽ ڀرت سان سينگاريل ٿيلها',
      'Handmade Sindhi leather work': 'هٿ جو ٺهيل سنڌي چمڙي جو ڪم',
      'Ajrak block printing': 'اجرڪ جي بلاڪ پرنٽنگ',
      'A man wearing an Ajrak vest and turban': 'اجرڪ جي واسڪٽ ۽ پڳڙي پاتل هڪ ماڻهو',
      'Ralli quilt': 'رلي',
      'Bandhani tie-dye': 'بندهڻي ٽائي ڊائي',
      'A weaver working at a hand loom': 'هٿ جي کڏيءَ تي ڪم ڪندڙ جولاهو',
      'A hand-woven shawl with patterned borders': 'نقشي وارن ڪنارن سان هٿ سان اڻيل چادر',
      'Woven textile with colourful patterns': 'رنگارنگي نقشن وارو اڻيل ڪپڙو',
      'Jandi lacquer work': 'جنڊيءَ جو لاک جو ڪم',
      'Sindhi wood carving': 'سنڌي ڪاٺ جي ڪوري',
      'Date palm basketry': 'کجهور جي پنن جون ٽوڪريون',
      'Camel hair art': 'اٺ جي وارن جو فن',
      'Sindhi jewelry and bangles': 'سنڌي زيور ۽ چوڙيون',
      'Sindhi beadwork': 'سنڌي مڻين جو ڪم',
      'Shell and ivory craft': 'سپ ۽ هاٿيءَ جي ڏندن جو هنر',
      'Copper bells': 'ٽامي جون گهنڊيون',
      'Embroidered Sindhi caps': 'ڀرت واريون سنڌي ٽوپيون',
      'Illustrated map of Sindh with its landmarks and crafts': 'سنڌ جو مصور نقشو، ان جي ماڳن ۽ هنرن سان',
      'Man in a traditional Sindhi turban and Ajrak vest': 'روايتي سنڌي پڳڙي ۽ اجرڪ واري واسڪٽ ۾ هڪ ماڻهو',
      'Sindhi music, dance and traditional dress': 'سنڌي موسيقي، ناچ ۽ روايتي پوشاڪ',
      'Museum display of a traditional Sindhi home': 'روايتي سنڌي گهر جي عجائب گهر ۾ نمائش',
      'Woman in a traditional headpiece holding embroidered cloth': 'روايتي مٿي جي زيور سان هڪ عورت، هٿ ۾ ڀرت وارو ڪپڙو',
      'Handmade Sindhi khussa shoes': 'هٿ جا ٺهيل سنڌي کسا',
      'Ruins of Mohenjo-daro': 'موئن جو دڙو جا آثار',
      'Carved sandstone tombs': 'ڪوريل ريتيلي پٿر جا مقبرا',
      'Artifacts from the Indus Valley civilization': 'سنڌو ماٿريءَ جي تهذيب جا آثار',
      'Handmade model of a Sindh village with thatched huts and a river': 'ڪکن جي ڇت وارن جهوپڙن ۽ نديءَ وارو سنڌي ڳوٺ جو هٿ سان ٺهيل ماڊل',
      'Village model with a bullock cart, hand pump and painted pots': 'بيل گاڏي، هٿ وارو نلڪو ۽ رنگين ٿانون وارو ڳوٺ جو ماڊل',
      'Village model with a thatched hut, a camel and a cow': 'ڪکن جي ڇت وارو جهوپڙو، اُٺ ۽ ڳئون وارو ڳوٺ جو ماڊل',
      'Handmade city model with a hospital, apartment block, school and roads': 'اسپتال، رهائشي عمارت، اسڪول ۽ رستن وارو شهر جو هٿ سان ٺهيل ماڊل'
    }
  };

  /* ---------- helpers ---------- */
  function storedLang() {
    try { return localStorage.getItem(STORE); } catch (e) { return null; }
  }
  function saveLang(l) {
    try { localStorage.setItem(STORE, l); } catch (e) { /* private mode: ignore */ }
  }
  function validLang(l) { return l === 'en' || l === 'ur' || l === 'sd'; }

  function startLang() {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(window.location.search).get('lang'); } catch (e) {}
    if (validLang(fromUrl)) return fromUrl;
    var saved = storedLang();
    return validLang(saved) ? saved : 'en';
  }

  /* Remember the English text the first time we see an element */
  function rememberEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;
    });
    document.querySelectorAll('img').forEach(function (img) {
      if (img.dataset.altEn === undefined) img.dataset.altEn = img.getAttribute('alt') || '';
      if (img.dataset.caption !== undefined && img.dataset.captionEn === undefined) {
        img.dataset.captionEn = img.dataset.caption;
      }
    });
    var desc = document.querySelector('meta[name="description"]');
    if (desc && desc.dataset.en === undefined) desc.dataset.en = desc.getAttribute('content') || '';
    if (document.documentElement.dataset.titleEn === undefined) {
      document.documentElement.dataset.titleEn = document.title;
    }
  }

  function refreshSliderLabels() {
    var ui = UI[current];
    document.querySelectorAll('.s-btn.prev').forEach(function (b) { b.setAttribute('aria-label', ui.prev); });
    document.querySelectorAll('.s-btn.next').forEach(function (b) { b.setAttribute('aria-label', ui.next); });
    document.querySelectorAll('.s-dots').forEach(function (dots) {
      Array.prototype.forEach.call(dots.children, function (d, k) {
        d.setAttribute('aria-label', ui.photo + (k + 1));
      });
    });
  }

  function refreshCaptions() {
    document.querySelectorAll('.cap-text').forEach(function (cap) {
      var box = cap.closest('.photo');
      if (!box) return;
      var img = box.querySelector('img.active') || box.querySelector('img');
      if (img && img.dataset.caption) cap.textContent = img.dataset.caption;
    });
  }

  function apply(lang) {
    if (!validLang(lang)) lang = 'en';
    current = lang;
    rememberEnglish();

    var root = document.documentElement;
    root.setAttribute('lang', lang);
    root.setAttribute('dir', DIRS[lang]);

    var text = TEXT[lang] || {};
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      el.innerHTML = (lang !== 'en' && text[key] !== undefined) ? text[key] : el.dataset.en;
    });

    document.title = (lang !== 'en' && text['meta.title']) ? text['meta.title'] : root.dataset.titleEn;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', (lang !== 'en' && text['meta.desc']) ? text['meta.desc'] : desc.dataset.en);

    var alts = ALTS[lang] || {};
    var caps = CAPTIONS[lang] || {};
    document.querySelectorAll('img').forEach(function (img) {
      var en = img.dataset.altEn;
      img.setAttribute('alt', (lang !== 'en' && alts[en]) ? alts[en] : en);
      if (img.dataset.captionEn !== undefined) {
        var c = img.dataset.captionEn;
        img.dataset.caption = (lang !== 'en' && caps[c]) ? caps[c] : c;
      }
    });
    refreshCaptions();

    var ui = UI[lang];
    var menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.setAttribute('aria-label', ui.menu);
    var group = document.querySelector('.lang');
    if (group) group.setAttribute('aria-label', ui.language);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.lang === lang ? 'true' : 'false');
    });
    refreshSliderLabels();
  }

  function setLanguage(lang) {
    apply(lang);
    saveLang(current);
  }

  /* public bits used by script.js */
  window.I18N = {
    ui: function (key, n) {
      var v = UI[current][key];
      return key === 'photo' ? v + n : v;
    },
    set: setLanguage,
    get: function () { return current; }
  };

  function init() {
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () { setLanguage(b.dataset.lang); });
    });
    apply(startLang());
  }

  /* script.js runs first (it is a plain script at the end of <body>); DOMContentLoaded
     fires after it, so sliders already exist when we translate captions and labels. */
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
