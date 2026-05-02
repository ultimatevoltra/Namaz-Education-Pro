'use client';
import { useState } from 'react';
import { useLang } from '../../components/LangProvider';

const WUDU_EN = [
  {n:1,title:'Intention (Niyyah)',desc:'Make the intention in your heart to perform wudu for the sake of Allah. Saying it aloud is not required.',arabic:'نِيَّة'},
  {n:2,title:'Say Bismillah',desc:'Say "Bismillahir Rahmanir Raheem" before starting. This is Sunnah and earns extra reward.',arabic:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'},
  {n:3,title:'Wash Both Hands',desc:'Wash both hands up to and including the wrists three times. Start with the right hand, rubbing between the fingers.',arabic:'غَسْل اليَدَين'},
  {n:4,title:'Rinse Mouth (Madmadah)',desc:'Take water in your mouth and rinse it thoroughly three times. Reach all parts of the mouth.',arabic:'المَضْمَضَة'},
  {n:5,title:'Rinse Nose (Istinshaq)',desc:'Sniff water into both nostrils three times, then blow out gently using the left hand.',arabic:'الاسْتِنْشَاق'},
  {n:6,title:'Wash the Face',desc:'Wash the entire face three times — from the hairline to the chin, ear to ear. This is Fard (obligatory).',arabic:'غَسْل الوَجْه'},
  {n:7,title:'Wash Arms to Elbows',desc:'Wash both arms including the elbows three times. Start with the right arm, then left.',arabic:'غَسْل الذِّرَاعَين'},
  {n:8,title:'Wipe the Head (Masah)',desc:'With wet hands, wipe the entire head from front to back and back to front — once only. This is Fard.',arabic:'مَسْح الرَّأْس'},
  {n:9,title:'Wipe the Ears',desc:'Insert wet index fingers into ear canals and wipe outer ears with thumbs. Do this once.',arabic:'مَسْح الأُذُنَين'},
  {n:10,title:'Wash Both Feet',desc:'Wash both feet including the ankles three times. Start with the right foot. Rub between each toe.',arabic:'غَسْل القَدَمَين'},
];

const WUDU_BN = [
  {n:1,title:'নিয়্যত করা',desc:'মনে মনে আল্লাহর সন্তুষ্টির জন্য ওযু করার নিয়্যত করুন। মুখে বলার দরকার নেই, তবে বলা যায়: "নাওয়াইতু আন আতাওয়াযযাআ"।',arabic:'نِيَّة'},
  {n:2,title:'বিসমিল্লাহ বলা',desc:'শুরুতে বলুন: "বিসমিল্লাহির রাহমানির রাহিম।" এটি সুন্নত। বিসমিল্লাহ বলে ওযু শুরু করলে সওয়াব বেশি।',arabic:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'},
  {n:3,title:'উভয় হাত ধোয়া',desc:'প্রথমে ডান হাত, তারপর বাম হাত — কব্জি পর্যন্ত তিনবার করে ধুয়ে নিন। আঙুলের ফাঁকে ভালোভাবে পানি পৌঁছান।',arabic:'غَسْل اليَدَين'},
  {n:4,title:'কুলি করা (মাদমাদাহ)',desc:'তিনবার মুখে পানি নিয়ে ভালোভাবে কুলি করুন। মুখের সব অংশে পানি পৌঁছানো জরুরি।',arabic:'المَضْمَضَة'},
  {n:5,title:'নাকে পানি দেওয়া (ইস্তিনশাক)',desc:'তিনবার নাকে পানি দিন এবং বাম হাত দিয়ে আস্তে আস্তে নাক পরিষ্কার করুন। নাকের ভেতরে পানি পৌঁছানো ফরজ।',arabic:'الاسْتِنْشَاق'},
  {n:6,title:'মুখমণ্ডল ধোয়া',desc:'কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কান থেকে আরেক কান পর্যন্ত সম্পূর্ণ মুখ তিনবার ধুয়ে নিন। এটি ফরজ।',arabic:'غَسْل الوَجْه'},
  {n:7,title:'হাত কনুইসহ ধোয়া',desc:'ডান হাত কনুইসহ তিনবার ধুয়ে তারপর বাম হাত তিনবার ধুয়ে নিন। কনুই পর্যন্ত ধোয়া ফরজ।',arabic:'غَسْل الذِّرَاعَين'},
  {n:8,title:'মাথা মাসেহ করা',desc:'দুই হাত ভিজিয়ে সামনে থেকে পেছনে ও পেছন থেকে সামনে একবার মাথা মাসেহ করুন। পুরো মাথা একবার মাসেহ করা ফরজ।',arabic:'مَسْح الرَّأْس'},
  {n:9,title:'কান মাসেহ করা',desc:'শাহাদাত আঙুল দিয়ে কানের ভেতরে এবং বুড়ো আঙুল দিয়ে বাইরে একবার মাসেহ করুন।',arabic:'مَسْح الأُذُنَين'},
  {n:10,title:'পা ধোয়া',desc:'ডান পা গোড়ালিসহ তিনবার, তারপর বাম পা তিনবার ধুয়ে নিন। পায়ের আঙুলের ফাঁকে ভালোভাবে পানি পৌঁছান।',arabic:'غَسْل القَدَمَين'},
];

const PRAYERS_EN = [
  {
    name:'Fajr', arabic:'الفجر', emoji:'🌙', rakaat:2, time:'Before sunrise',
    desc:'Fajr is 2 obligatory rakaats. It is performed after the true dawn appears and before sunrise. The recitation is done aloud.',
    steps:[
      {title:'Niyyah & Takbeer-e-Tahreema',desc:'Face the Qibla and stand upright. Raise both hands to the earlobes and say "Allahu Akbar." Fold your right hand over your left just below the navel. This act begins the prayer.',arabic:'اللَّهُ أَكْبَر'},
      {title:'Thana (Opening Supplication)',desc:'Recite silently: "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghairuk." (Glory be to You O Allah, and praise. Blessed is Your name and exalted is Your majesty. There is no god but You.)',arabic:'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ'},
      {title:'Ta'awwudh & Tasmiyah',desc:'Say silently: "A'udhu billahi minash-shaitanir rajim" (I seek refuge in Allah from the accursed Shaytan), then "Bismillahir Rahmanir Raheem" before each rakah.',arabic:'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'},
      {title:'Surah Al-Fatihah (Aloud)',desc:'Recite Surah Al-Fatihah aloud: "Alhamdu lillahi rabbil 'alamin, ar-rahmanir rahim, maliki yawmiddin, iyyaka na'budu wa iyyaka nasta'in, ihdinas siratal mustaqim, siratal ladhina an'amta 'alaihim, ghairil maghdubi 'alaihim waladdallin." Then say Ameen.',arabic:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ'},
      {title:'Additional Surah (Aloud)',desc:'Recite any surah. For Fajr, longer surahs are recommended (Sunnah). Common choice: Al-Ikhlas: "Qul huwallahu ahad, Allahus samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad."',arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ'},
      {title:'Ruku (Bowing)',desc:'Say "Allahu Akbar" and bow with your hands on your knees, fingers spread, back straight and horizontal. Recite at least 3 times: "Subhana Rabbiyal Azeem" (Glory be to my Lord, the Magnificent).',arabic:'سُبْحَانَ رَبِّيَ الْعَظِيمِ'},
      {title:'Qiyam after Ruku',desc:'Rise from ruku saying "Sami Allahu liman hamidah" (Allah hears whoever praises Him). Stand upright, then say: "Rabbana lakal hamd" (Our Lord, to You is all praise).',arabic:'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ'},
      {title:'First Sajdah (Prostration)',desc:'Say "Allahu Akbar" and prostrate, placing 7 body parts on the ground: forehead + nose, both palms, both knees, and toes of both feet. Recite 3 times: "Subhana Rabbiyal A'la" (Glory to my Lord, the Most High).',arabic:'سُبْحَانَ رَبِّيَ الْأَعْلَى'},
      {title:'Sitting Between Sajdahs',desc:'Rise saying "Allahu Akbar." Sit on your left foot, right foot upright. Say twice: "Rabbighfirli" (O my Lord, forgive me).',arabic:'رَبِّ اغْفِرْ لِي'},
      {title:'Second Sajdah',desc:'Say "Allahu Akbar" and prostrate again exactly as before. Recite "Subhana Rabbiyal A'la" 3 times. This completes the first rakah. Rise for the second rakah.',arabic:'سُبْحَانَ رَبِّيَ الْأَعْلَى'},
      {title:'Second Rakah (Al-Fatihah + Surah)',desc:'For the second rakah: recite Bismillah, Al-Fatihah aloud, then an additional Surah aloud. Perform ruku and two sajdahs (no Thana in 2nd rakah).',arabic:'الرَّكْعَة الثَّانِيَة'},
      {title:'At-Tahiyyat (Tashahhud)',desc:'After the second sajdah of the 2nd rakah, sit for At-Tahiyyat: "At-tahiyyatu lillahi was-salawatu wattayyibatu, assalamu alaika ayyuhan-nabiyyu wa rahmatullahi wa barakatuh, assalamu 'alaina wa 'ala 'ibadillahis-salihin, ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan 'abduhu wa rasuluh." Raise index finger on "illa".',arabic:'التَّحِيَّاتُ لِلَّهِ'},
      {title:'Durood Ibrahim (Salawat)',desc:'After Tashahhud, recite: "Allahumma salli 'ala Muhammadin wa 'ala ali Muhammadin kama sallayta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidum Majid. Allahumma barik 'ala Muhammadin wa 'ala ali Muhammadin kama barakta 'ala Ibrahima wa 'ala ali Ibrahim, innaka Hamidum Majid."',arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد'},
      {title:'Dua Masura (Final Supplication)',desc:'Recite: "Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta, faghfirli maghfiratan min 'indika war-hamni, innaka antal Ghafurur Rahim." (O Allah, I have wronged myself greatly and none forgives sins but You, so grant me forgiveness and have mercy on me.)',arabic:'اللَّهُمَّ إِنِّي ظَلَمْتُ'},
      {title:'Salam (Ending Prayer)',desc:'Turn head to the right: "Assalamu alaikum wa rahmatullah." Then turn left: "Assalamu alaikum wa rahmatullah." The prayer is now complete. Make dua (supplication) after.',arabic:'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ'},
    ]
  },
  {
    name:'Dhuhr', arabic:'الظهر', emoji:'☀️', rakaat:4, time:'Midday',
    desc:'Dhuhr is 4 obligatory rakaats. It begins when the sun passes its zenith. All recitation is done silently.',
    steps:[
      {title:'1st & 2nd Rakaat — Silent with Surah',desc:'Perform Takbeer, Thana, Ta'awwudh, Bismillah silently. Recite Al-Fatihah and an additional Surah silently. Perform Ruku and two Sajdahs for each rakah. After the 2nd Sajdah of the 2nd rakah, sit for the middle Tashahhud.',arabic:''},
      {title:'Middle Tashahhud (Qa'dah Ula)',desc:'After the 2nd rakah, sit and recite At-Tahiyyat only — do NOT recite Durood Ibrahim here. After finishing Tashahhud, stand for the 3rd rakah saying "Allahu Akbar."',arabic:'التَّحِيَّاتُ فَقَط'},
      {title:'3rd Rakaat — Fatihah Only (Silent)',desc:'In the 3rd rakah, recite Bismillah and Surah Al-Fatihah only — silently. No additional Surah. Perform Ruku and two Sajdahs as normal.',arabic:'الفَاتِحَة فَقَط'},
      {title:'4th Rakaat — Fatihah Only (Silent)',desc:'Same as the 3rd rakah. Recite Bismillah and Surah Al-Fatihah silently, no additional Surah. After the two Sajdahs, sit for the Final Tashahhud.',arabic:'الفَاتِحَة فَقَط'},
      {title:'Final Tashahhud → Durood → Dua → Salam',desc:'Recite At-Tahiyyat in full, then Durood Ibrahim, then Dua Masura. Finally give Salam to the right and left to end the prayer.',arabic:'السَّلَام'},
    ]
  },
  {
    name:'Asr', arabic:'العصر', emoji:'🌤️', rakaat:4, time:'Afternoon',
    desc:'Asr is 4 obligatory rakaats. It begins when the shadow of an object equals twice its height (Hanafi). All recitation is silent. Never delay Asr until the sun turns yellow.',
    steps:[
      {title:'Structure Identical to Dhuhr',desc:'Asr has exactly the same structure as Dhuhr: 4 rakaats, all recitation silent, middle Tashahhud after 2nd rakah, only Fatihah in 3rd and 4th rakaats.',arabic:''},
      {title:'1st & 2nd Rakaat — Silent with Surah',desc:'Recite Bismillah, Al-Fatihah, and an additional Surah silently in each of the first two rakaats. Perform Ruku and two Sajdahs. Sit for middle Tashahhud after the 2nd rakah (At-Tahiyyat only).',arabic:''},
      {title:'3rd & 4th Rakaat — Fatihah Only',desc:'In the 3rd and 4th rakaats, recite Bismillah and Fatihah only silently. No additional Surah. After the final Sajdah of the 4th rakah, sit for the full Final Tashahhud, Durood Ibrahim, Dua Masura, then Salam.',arabic:''},
      {title:'Asr Timing — Important',desc:'(Hanafi): Asr begins when the shadow equals twice the height + the midday shadow. Do NOT delay until the sun becomes yellow. Performing Asr when the sun is yellow is Makruh (disliked). (Shafi'i): Asr begins when shadow equals the height of the object.',arabic:'وَقْتُ العَصْر'},
    ]
  },
  {
    name:'Maghrib', arabic:'المغرب', emoji:'🌇', rakaat:3, time:'After sunset',
    desc:'Maghrib is 3 obligatory rakaats. It begins immediately at sunset. The first two rakaats have audible recitation.',
    steps:[
      {title:'1st & 2nd Rakaat — Aloud with Surah',desc:'Perform Takbeer, Thana, Ta'awwudh, Bismillah. Recite Al-Fatihah and an additional Surah aloud in each of the first two rakaats. Perform Ruku and two Sajdahs each. After the 2nd rakah, sit for middle Tashahhud (At-Tahiyyat only).',arabic:''},
      {title:'3rd Rakaat — Fatihah Only (Aloud)',desc:'Stand for the 3rd rakah saying "Allahu Akbar." Recite Bismillah and Surah Al-Fatihah aloud — no additional Surah in this rakah. Perform Ruku and two Sajdahs.',arabic:'الفَاتِحَة فَقَط'},
      {title:'Final Tashahhud → Durood → Dua → Salam',desc:'After the 2nd Sajdah of the 3rd rakah, sit for the Full Tashahhud. Recite At-Tahiyyat, Durood Ibrahim, Dua Masura, then give Salam to the right and left.',arabic:'السَّلَام'},
    ]
  },
  {
    name:'Isha', arabic:'العشاء', emoji:'🌃', rakaat:4, time:'Night',
    desc:'Isha is 4 obligatory rakaats. It begins when the twilight disappears. The first two rakaats have audible recitation; the last two are silent.',
    steps:[
      {title:'1st & 2nd Rakaat — Aloud with Surah',desc:'Perform Takbeer, Thana, Ta'awwudh, Bismillah. Recite Al-Fatihah and additional Surah aloud. Perform Ruku and two Sajdahs. After 2nd rakah, sit for middle Tashahhud (At-Tahiyyat only).',arabic:''},
      {title:'3rd & 4th Rakaat — Silent, Fatihah Only',desc:'In the 3rd and 4th rakaats, recite Bismillah and Fatihah silently only — no additional Surah. After the final Sajdah, sit for Full Tashahhud, Durood, Dua, then Salam.',arabic:''},
      {title:'Witr Prayer — 3 Rakaats (Wajib)',desc:'After Isha fard, pray 3 rakaat Witr. In the 3rd rakah, after Al-Fatihah and additional Surah, before Ruku say "Allahu Akbar" and recite Dua Qunoot: "Allahumma inna nasta'inuka wa nastaghfiruk wa nu'minu bika wa natawakkalu 'alaik, wa nuthni 'alaik al-khair..."',arabic:'صَلَاة الوِتْر'},
    ]
  },
];

const PRAYERS_BN = [
  {
    name:'ফজর', arabic:'الفجر', emoji:'🌙', rakaat:2, time:'সূর্যোদয়ের আগে',
    desc:'ফজরের নামাজ ২ রাকাত ফরজ। সত্যিকারের ফজর (সুবহে সাদিক) থেকে সূর্যোদয়ের আগ পর্যন্ত এই নামাজের সময়। কিরাত উচ্চস্বরে পড়তে হয়।',
    steps:[
      {title:'নিয়্যত ও তাকবীরে তাহরীমা',desc:'কিবলামুখী হয়ে সোজা দাঁড়ান। উভয় হাত কানের লতি পর্যন্ত উঠিয়ে বলুন: "আল্লাহু আকবার।" তারপর ডান হাত বাম হাতের উপর রেখে নাভির নিচে বাঁধুন। এর মাধ্যমে নামাজ শুরু হলো — এখন থেকে কথা বলা, খাওয়া ও দুনিয়ার কোনো কাজ করা যাবে না।',arabic:'اللَّهُ أَكْبَر'},
      {title:'সানা পড়া',desc:'মনে মনে পড়ুন: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারাকাস্মুকা ওয়া তাআলা জাদ্দুকা ওয়া লা ইলাহা গাইরুক।" অর্থ: হে আল্লাহ, আপনার পবিত্রতা ও প্রশংসা করছি, আপনার নাম বরকতময়, আপনার মর্যাদা অতি উচ্চ, আপনি ছাড়া কোনো উপাস্য নেই।',arabic:'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ'},
      {title:'আউযু ও বিসমিল্লাহ পড়া',desc:'মনে মনে পড়ুন: "আউযু বিল্লাহি মিনাশ শাইতানির রাজিম।" (আমি বিতাড়িত শয়তান থেকে আল্লাহর আশ্রয় চাই।) তারপর বলুন: "বিসমিল্লাহির রাহমানির রাহিম।" প্রতিটি রাকাতের শুরুতে বিসমিল্লাহ পড়তে হয়।',arabic:'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ'},
      {title:'সূরা আল-ফাতিহা (উচ্চস্বরে)',desc:'উচ্চস্বরে পড়ুন: "আলহামদু লিল্লাহি রাব্বিল আলামীন। আর-রাহমানির রাহীম। মালিকি ইয়াওমিদ্দীন। ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাসতাইন। ইহদিনাস সিরাতাল মুসতাকিম। সিরাতাল্লাযিনা আনআমতা আলাইহিম, গাইরিল মাগদুবি আলাইহিম ওয়ালাদ দ্বাল্লিন।" শেষে আমীন বলুন।',arabic:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ'},
      {title:'অতিরিক্ত সূরা (উচ্চস্বরে)',desc:'যেকোনো একটি সূরা উচ্চস্বরে পড়ুন। ফজরে বড় সূরা পড়া সুন্নত। সহজ সূরা আল-ইখলাস: "কুল হুওয়াল্লাহু আহাদ। আল্লাহুস সামাদ। লাম ইয়ালিদ ওয়া লাম ইউলাদ। ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ।"',arabic:'قُلْ هُوَ اللَّهُ أَحَدٌ'},
      {title:'রুকু করা',desc:'"আল্লাহু আকবার" বলে কোমর পর্যন্ত ঝুঁকুন। দুই হাত হাঁটুতে রাখুন, আঙুল ছড়ানো থাকবে, পিঠ সমান রাখুন। কমপক্ষে ৩ বার পড়ুন: "সুবহানা রাব্বিয়াল আযীম।" অর্থ: আমার মহান রবের পবিত্রতা ঘোষণা করছি।',arabic:'سُبْحَانَ رَبِّيَ الْعَظِيمِ'},
      {title:'রুকু থেকে উঠে দাঁড়ানো',desc:'"সামিআল্লাহু লিমান হামিদাহ" বলতে বলতে সোজা হয়ে দাঁড়ান। পুরোপুরি সোজা হলে বলুন: "রাব্বানা লাকাল হামদ।" অর্থ: হে আমাদের রব, সমস্ত প্রশংসা আপনার জন্য।',arabic:'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ'},
      {title:'প্রথম সিজদা',desc:'"আল্লাহু আকবার" বলে সিজদায় যান। ৭টি অঙ্গ মাটিতে রাখুন: কপাল ও নাক, দুই হাতের তালু, দুই হাঁটু, দুই পায়ের আঙুলের মাথা। কমপক্ষে ৩ বার পড়ুন: "সুবহানা রাব্বিয়াল আলা।" অর্থ: আমার সর্বোচ্চ রবের পবিত্রতা।',arabic:'سُبْحَانَ رَبِّيَ الْأَعْلَى'},
      {title:'দুই সিজদার মাঝে বসা',desc:'"আল্লাহু আকবার" বলে মাথা উঠান এবং বাম পায়ের উপর বসুন (ডান পা খাড়া থাকবে)। এই অবস্থায় দুইবার বলুন: "রাব্বিগফিরলি।" অর্থ: হে আমার রব, আমাকে ক্ষমা করুন।',arabic:'رَبِّ اغْفِرْ لِي'},
      {title:'দ্বিতীয় সিজদা',desc:'আবার "আল্লাহু আকবার" বলে সিজদায় যান। ঠিক প্রথম সিজদার মতো করুন। "সুবহানা রাব্বিয়াল আলা" ৩ বার পড়ুন। এর মাধ্যমে প্রথম রাকাত সম্পন্ন হলো।',arabic:'سُبْحَانَ رَبِّيَ الْأَعْلَى'},
      {title:'দ্বিতীয় রাকাত শুরু',desc:'"আল্লাহু আকবার" বলে দ্বিতীয় রাকাতের জন্য উঠে দাঁড়ান। এই রাকাতে সানা পড়তে হবে না। বিসমিল্লাহ বলে সূরা ফাতিহা উচ্চস্বরে পড়ুন, তারপর অতিরিক্ত সূরা পড়ুন। রুকু ও দুটি সিজদা করুন।',arabic:'الرَّكْعَة الثَّانِيَة'},
      {title:'তাশাহহুদ (আত্তাহিয়্যাতু)',desc:'শেষ রাকাতের দ্বিতীয় সিজদার পর বসুন। মনে মনে পড়ুন: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত ত্বাইয়িবাত। আস-সালামু আলাইকা আইয়্যুহান নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ। আস-সালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহীন। আশহাদু আল-লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহ।" "ইল্লাল্লাহু" পড়ার সময় শাহাদাত আঙুল উঠান।',arabic:'التَّحِيَّاتُ لِلَّهِ'},
      {title:'দরুদ ইবরাহীম',desc:'তাশাহহুদের পর পড়ুন: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ।"',arabic:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد'},
      {title:'দোয়া মাসুরা',desc:'দরুদের পর যেকোনো দোয়া পড়ুন। সুন্নত দোয়া: "আল্লাহুম্মা ইন্নি যালামতু নাফসি যুলমান কাসিরা, ওয়া লা ইয়াগফিরুয যুনুবা ইল্লা আনতা, ফাগফিরলি মাগফিরাতাম মিন ইন্দিকা ওয়ারহামনি, ইন্নাকা আনতাল গাফুরুর রাহীম।" অর্থ: হে আল্লাহ, আমি আমার নিজের উপর অনেক বেশি যুলম করেছি, আপনি ছাড়া কেউ গুনাহ মাফ করতে পারে না, সুতরাং আপনার পক্ষ থেকে আমাকে ক্ষমা করুন ও দয়া করুন।',arabic:'اللَّهُمَّ إِنِّي ظَلَمْتُ'},
      {title:'সালাম ফেরানো',desc:'ডানদিকে মাথা ঘুরিয়ে বলুন: "আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ।" তারপর বামদিকে মাথা ঘুরিয়ে আবার বলুন: "আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ।" এর মাধ্যমে নামাজ সম্পন্ন হলো। এখন দোয়া করুন।',arabic:'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ'},
    ]
  },
  {
    name:'যোহর', arabic:'الظهر', emoji:'☀️', rakaat:4, time:'দুপুরবেলা',
    desc:'যোহরের নামাজ ৪ রাকাত ফরজ। সূর্য মাথার উপর থেকে পশ্চিম দিকে হেলতে শুরু করলে ওয়াক্ত শুরু হয়। সব কিরাত মনে মনে (চুপে চুপে) পড়তে হয়।',
    steps:[
      {title:'১ম ও ২য় রাকাত — সূরাসহ (চুপে চুপে)',desc:'তাকবীরে তাহরীমা, সানা, আউযু, বিসমিল্লাহ মনে মনে পড়ুন। সূরা ফাতিহা ও অতিরিক্ত সূরা চুপে পড়ুন। রুকু করুন (সুবহানা রাব্বিয়াল আযীম ৩বার), উঠুন (সামিআল্লাহু লিমান হামিদাহ / রাব্বানা লাকাল হামদ), দুটি সিজদা করুন। প্রতি সিজদায় "সুবহানা রাব্বিয়াল আলা" ৩বার পড়ুন।',arabic:''},
      {title:'মধ্যবর্তী বৈঠক — শুধু আত্তাহিয়্যাতু',desc:'২য় রাকাতের দ্বিতীয় সিজদার পর বসুন এবং শুধু আত্তাহিয়্যাতু পড়ুন। এখানে দরুদ পড়বেন না। তাশাহহুদ শেষ হলে "আল্লাহু আকবার" বলে ৩য় রাকাতের জন্য উঠে দাঁড়ান।',arabic:'التَّحِيَّاتُ فَقَط'},
      {title:'৩য় রাকাত — শুধু ফাতিহা (চুপে চুপে)',desc:'৩য় রাকাতে শুধু বিসমিল্লাহ ও সূরা ফাতিহা চুপে পড়ুন। কোনো অতিরিক্ত সূরা নেই। রুকু, রুকু থেকে উঠা ও দুটি সিজদা স্বাভাবিকভাবে করুন। সিজদার পর উঠে ৪র্থ রাকাতের জন্য দাঁড়ান।',arabic:'الفَاتِحَة فَقَط'},
      {title:'৪র্থ রাকাত — শুধু ফাতিহা (চুপে চুপে)',desc:'৩য় রাকাতের মতোই করুন — শুধু বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। রুকু ও দুটি সিজদার পর চূড়ান্ত তাশাহহুদের জন্য বসুন।',arabic:'الفَاتِحَة فَقَط'},
      {title:'চূড়ান্ত তাশাহহুদ → দরুদ → দোয়া → সালাম',desc:'সম্পূর্ণ আত্তাহিয়্যাতু পড়ুন, তারপর দরুদ ইবরাহীম পড়ুন, তারপর দোয়া মাসুরা পড়ুন। তারপর ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।',arabic:'السَّلَام'},
    ]
  },
  {
    name:'আসর', arabic:'العصر', emoji:'🌤️', rakaat:4, time:'বিকেলবেলা',
    desc:'আসরের নামাজ ৪ রাকাত ফরজ। হানাফি মতে কোনো বস্তুর ছায়া তার দ্বিগুণ হলে ওয়াক্ত শুরু হয়। সব কিরাত চুপে চুপে পড়তে হয়। সূর্য হলুদ হওয়ার আগেই আসর পড়ুন।',
    steps:[
      {title:'গঠন যোহরের মতোই',desc:'আসর নামাজের গঠন যোহরের মতোই: ৪ রাকাত, সব কিরাত চুপে চুপে, ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু, ৩য় ও ৪র্থ রাকাতে শুধু বিসমিল্লাহ ও ফাতিহা।',arabic:''},
      {title:'১ম ও ২য় রাকাত — সূরাসহ (চুপে চুপে)',desc:'তাকবীর, সানা, আউযু, বিসমিল্লাহ, সূরা ফাতিহা ও অতিরিক্ত সূরা সব চুপে পড়ুন। রুকু, রুকু থেকে উঠা, দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।',arabic:''},
      {title:'৩য় ও ৪র্থ রাকাত — শুধু ফাতিহা (চুপে চুপে)',desc:'৩য় ও ৪র্থ রাকাতে শুধু বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। রুকু ও দুটি সিজদার পর ৪র্থ রাকাত শেষে চূড়ান্ত তাশাহহুদ, দরুদ ইবরাহীম, দোয়া মাসুরা পড়ে সালাম ফেরান।',arabic:''},
      {title:'আসরের সময় — গুরুত্বপূর্ণ নোট',desc:'হানাফি মতে: ছায়া দ্বিগুণ হলে আসরের ওয়াক্ত শুরু। শাফেয়ি মতে: ছায়া সমান হলেই শুরু। সূর্য হলদে বা লাল হওয়ার আগেই পড়ুন — দেরি করা মাকরূহ। সূর্যাস্ত পর্যন্ত ওয়াক্ত থাকে।',arabic:'وَقْتُ العَصْر'},
    ]
  },
  {
    name:'মাগরিব', arabic:'المغرب', emoji:'🌇', rakaat:3, time:'সূর্যাস্তের পর',
    desc:'মাগরিবের নামাজ ৩ রাকাত ফরজ। সূর্যাস্তের সাথে সাথে ওয়াক্ত শুরু হয়। প্রথম দুই রাকাতে কিরাত উচ্চস্বরে পড়তে হয়।',
    steps:[
      {title:'১ম ও ২য় রাকাত — সূরাসহ (উচ্চস্বরে)',desc:'তাকবীর, সানা, আউযু, বিসমিল্লাহ পড়ুন। সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু, রুকু থেকে উঠা, দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।',arabic:''},
      {title:'৩য় রাকাত — শুধু ফাতিহা (উচ্চস্বরে)',desc:'"আল্লাহু আকবার" বলে উঠে দাঁড়ান। বিসমিল্লাহ ও সূরা ফাতিহা উচ্চস্বরে পড়ুন — কোনো অতিরিক্ত সূরা নেই। রুকু ও দুটি সিজদা করুন।',arabic:'الفَاتِحَة فَقَط'},
      {title:'চূড়ান্ত তাশাহহুদ → দরুদ → দোয়া → সালাম',desc:'৩য় রাকাতের দ্বিতীয় সিজদার পর বসুন। সম্পূর্ণ আত্তাহিয়্যাতু, দরুদ ইবরাহীম, দোয়া মাসুরা পড়ুন। ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।',arabic:'السَّلَام'},
    ]
  },
  {
    name:'ইশা', arabic:'العشاء', emoji:'🌃', rakaat:4, time:'রাতে',
    desc:'ইশার নামাজ ৪ রাকাত ফরজ। রাতের অন্ধকার গাঢ় হলে ওয়াক্ত শুরু হয়। প্রথম দুই রাকাতে উচ্চস্বরে, শেষ দুই রাকাতে চুপে কিরাত পড়তে হয়।',
    steps:[
      {title:'১ম ও ২য় রাকাত — সূরাসহ (উচ্চস্বরে)',desc:'তাকবীর, সানা, আউযু, বিসমিল্লাহ পড়ুন। সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।',arabic:''},
      {title:'৩য় ও ৪র্থ রাকাত — শুধু ফাতিহা (চুপে চুপে)',desc:'৩য় ও ৪র্থ রাকাতে শুধু বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। কোনো অতিরিক্ত সূরা নেই। রুকু ও দুটি সিজদার পর চূড়ান্ত তাশাহহুদ, দরুদ ইবরাহীম, দোয়া মাসুরা পড়ে সালাম ফেরান।',arabic:''},
      {title:'বিতর নামাজ — ৩ রাকাত (ওয়াজিব)',desc:'ইশার ফরজের পর ৩ রাকাত বিতর পড়ুন। ৩য় রাকাতে ফাতিহা ও অতিরিক্ত সূরার পর রুকুর আগে "আল্লাহু আকবার" বলে হাত বেঁধে দোয়া কুনুত পড়ুন: "আল্লাহুম্মা ইন্না নাসতাইনুকা ওয়া নাসতাগফিরুকা ওয়া নুমিনু বিকা ওয়া নাতাওয়াক্কালু আলাইক, ওয়া নুসনি আলাইকাল খাইরা, ওয়া নাশকুরুকা ওয়া লা নাকফুরুক..."',arabic:'صَلَاة الوِتْر'},
    ]
  },
];

export default function LearnPage(){
  const { t, lang } = useLang();
  const [tab, setTab] = useState('wudu');
  const [sel, setSel] = useState(null);
  const [exp, setExp] = useState(null);

  const WUDU = lang === 'bn' ? WUDU_BN : WUDU_EN;
  const PRAYERS = lang === 'bn' ? PRAYERS_BN : PRAYERS_EN;

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: '0 16px' }}>
      <div style={{ paddingTop: 56, paddingBottom: 16 }}>
        <h1 className="text-gold" style={{ fontSize: 28, fontWeight: 800 }}>{t('learn.title')}</h1>
        <p style={{ color: '#6a7a8a', fontSize: 14, marginTop: 4 }}>{t('learn.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
        {['wudu','prayers'].map(tk => (
          <button key={tk} onClick={() => { setTab(tk); setSel(null); setExp(null); }} style={{
            flex: 1, padding: '10px', borderRadius: 12, border: '1px solid', cursor: 'pointer',
            fontWeight: 600, fontSize: 13, transition: 'all 0.2s',
            background: tab === tk ? 'linear-gradient(135deg,#1a6b4a,#0a3622)' : 'rgba(255,255,255,0.04)',
            color: tab === tk ? '#f0d060' : '#6a7a8a',
            borderColor: tab === tk ? 'rgba(201,162,39,0.4)' : 'rgba(255,255,255,0.08)',
          }}>{t('learn.tab.' + tk)}</button>
        ))}
      </div>

      {/* Wudu Tab */}
      {tab === 'wudu' && (
        <div>
          <div className="card-gold" style={{ padding: '14px 16px', marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Amiri,serif', fontSize: 18, color: '#f0d060', marginBottom: 4 }}>الوُضُوء</div>
            <div style={{ fontSize: 13, color: '#8a9aaa' }}>{t('learn.wudu.sub')}</div>
          </div>
          {WUDU.map(({ n, title, desc, arabic }) => (
            <div key={n} className="card" style={{ marginBottom: 10, padding: '14px 16px', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#c9a227,#a07d1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#040d1a', flexShrink: 0 }}>{n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: '#8a9aaa', lineHeight: 1.7 }}>{desc}</div>
                {arabic && <div style={{ fontFamily: 'Amiri,serif', fontSize: 17, color: '#c9a227', marginTop: 8, textAlign: 'right' }}>{arabic}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prayer List */}
      {tab === 'prayers' && !sel && (
        <div>
          <div style={{ fontSize: 13, color: '#6a7a8a', marginBottom: 12 }}>{t('learn.select')}</div>
          {PRAYERS.map(p => (
            <div key={p.name} className="card" onClick={() => { setSel(p); setExp(null); }} style={{ marginBottom: 12, padding: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ fontSize: 32 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: '#fff', fontSize: 17 }}>{p.name}</span>
                  <span style={{ fontFamily: 'Amiri,serif', fontSize: 18, color: '#c9a227' }}>{p.arabic}</span>
                </div>
                <div style={{ fontSize: 12, color: '#6a7a8a', marginTop: 2 }}>{p.rakaat} {t('learn.rakaat')} · {p.time}</div>
                <div style={{ fontSize: 11, color: '#4a5a6a', marginTop: 4, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              <div style={{ color: '#c9a227', fontSize: 18 }}>›</div>
            </div>
          ))}
        </div>
      )}

      {/* Prayer Detail */}
      {tab === 'prayers' && sel && (
        <div>
          <button onClick={() => { setSel(null); setExp(null); }} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#aaa', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', marginBottom: 16, fontSize: 13 }}>
            {t('learn.back')}
          </button>

          <div className="card-gold" style={{ padding: '18px 16px', marginBottom: 16, textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>{sel.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginTop: 6 }}>{sel.name}</div>
            <div style={{ fontFamily: 'Amiri,serif', fontSize: 20, color: '#c9a227' }}>{sel.arabic}</div>
            <div style={{ fontSize: 12, color: '#8a9aaa', marginTop: 4 }}>{sel.rakaat} {t('learn.rakaat')} · {sel.time}</div>
            <div style={{ fontSize: 12, color: '#6a7a5a', marginTop: 8, lineHeight: 1.6, padding: '0 8px' }}>{sel.desc}</div>
          </div>

          {sel.steps.map((s, i) => (
            <div key={i} className="card" style={{ marginBottom: 10, padding: '14px 16px', cursor: 'pointer' }} onClick={() => setExp(exp === i ? null : i)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(201,162,39,0.15)', border: '1px solid rgba(201,162,39,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#c9a227', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, fontWeight: 600, color: '#e0e0e0', fontSize: 14 }}>{s.title}</div>
                <div style={{ color: '#c9a227', fontSize: 18, transition: 'transform 0.2s', transform: exp === i ? 'rotate(90deg)' : 'none' }}>›</div>
              </div>
              {exp === i && (
                <div style={{ marginTop: 12, paddingLeft: 40 }}>
                  <div style={{ fontSize: 13, color: '#9aaa9a', lineHeight: 1.75 }}>{s.desc}</div>
                  {s.arabic && (
                    <div style={{ fontFamily: 'Amiri,serif', fontSize: 20, color: '#c9a227', marginTop: 12, textAlign: 'right', lineHeight: 2, padding: '10px 14px', background: 'rgba(201,162,39,0.06)', borderRadius: 10, borderRight: '3px solid rgba(201,162,39,0.35)' }}>
                      {s.arabic}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ height: 20 }} />
    </div>
  );
}