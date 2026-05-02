'use client';
import { useState } from 'react';
import { useLang } from '../../components/LangProvider';

const WUDU_EN = [
  {n:1,title:"Intention (Niyyah)",desc:"Make the intention in your heart to perform wudu for the sake of Allah. Saying it aloud is not required.",arabic:"نِيَّة"},
  {n:2,title:"Say Bismillah",desc:"Say Bismillahir Rahmanir Raheem before starting. This is Sunnah and earns extra reward.",arabic:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"},
  {n:3,title:"Wash Both Hands",desc:"Wash both hands up to the wrists three times. Start with the right hand, rubbing between the fingers.",arabic:"غَسْل اليَدَين"},
  {n:4,title:"Rinse Mouth",desc:"Take water in your mouth and rinse thoroughly three times. Reach all parts of the mouth.",arabic:"المَضْمَضَة"},
  {n:5,title:"Rinse Nose",desc:"Sniff water into both nostrils three times, then blow out gently using the left hand.",arabic:"الاسْتِنْشَاق"},
  {n:6,title:"Wash the Face",desc:"Wash the entire face three times from the hairline to the chin, ear to ear. This is obligatory.",arabic:"غَسْل الوَجْه"},
  {n:7,title:"Wash Arms to Elbows",desc:"Wash both arms including the elbows three times. Start with the right arm, then left.",arabic:"غَسْل الذِّرَاعَين"},
  {n:8,title:"Wipe the Head",desc:"With wet hands, wipe the entire head from front to back and back to front once only. Obligatory.",arabic:"مَسْح الرَّأْس"},
  {n:9,title:"Wipe the Ears",desc:"Insert wet index fingers into ear canals and wipe outer ears with thumbs. Do this once.",arabic:"مَسْح الأُذُنَين"},
  {n:10,title:"Wash Both Feet",desc:"Wash both feet including the ankles three times. Start with the right foot. Rub between each toe.",arabic:"غَسْل القَدَمَين"},
];

const WUDU_BN = [
  {n:1,title:"নিয়্যত করা",desc:"মনে মনে আল্লাহর সন্তুষ্টির জন্য ওযু করার নিয়্যত করুন। মুখে বলার দরকার নেই, তবে বলা যায়।",arabic:"نِيَّة"},
  {n:2,title:"বিসমিল্লাহ বলা",desc:"শুরুতে বলুন: বিসমিল্লাহির রাহমানির রাহিম। এটি সুন্নত। বিসমিল্লাহ বলে শুরু করলে সওয়াব বেশি।",arabic:"بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"},
  {n:3,title:"উভয় হাত ধোয়া",desc:"ডান হাত, তারপর বাম হাত — কব্জি পর্যন্ত তিনবার করে ধুয়ে নিন। আঙুলের ফাঁকে ভালোভাবে পানি পৌঁছান।",arabic:"غَسْل اليَدَين"},
  {n:4,title:"কুলি করা",desc:"তিনবার মুখে পানি নিয়ে ভালোভাবে কুলি করুন। মুখের সব অংশে পানি পৌঁছানো জরুরি।",arabic:"المَضْمَضَة"},
  {n:5,title:"নাকে পানি দেওয়া",desc:"তিনবার নাকে পানি দিন এবং বাম হাত দিয়ে নাক পরিষ্কার করুন। নাকের ভেতরে পানি পৌঁছানো ফরজ।",arabic:"الاسْتِنْشَاق"},
  {n:6,title:"মুখমণ্ডল ধোয়া",desc:"কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত এবং এক কান থেকে আরেক কান পর্যন্ত তিনবার ধুয়ে নিন। এটি ফরজ।",arabic:"غَسْل الوَجْه"},
  {n:7,title:"হাত কনুইসহ ধোয়া",desc:"ডান হাত কনুইসহ তিনবার, তারপর বাম হাত তিনবার ধুয়ে নিন। কনুই পর্যন্ত ধোয়া ফরজ।",arabic:"غَسْل الذِّرَاعَين"},
  {n:8,title:"মাথা মাসেহ করা",desc:"দুই হাত ভিজিয়ে সামনে থেকে পেছনে এবং পেছন থেকে সামনে একবার মাসেহ করুন। পুরো মাথা একবার মাসেহ করা ফরজ।",arabic:"مَسْح الرَّأْس"},
  {n:9,title:"কান মাসেহ করা",desc:"শাহাদাত আঙুল দিয়ে কানের ভেতরে এবং বুড়ো আঙুল দিয়ে বাইরে একবার মাসেহ করুন।",arabic:"مَسْح الأُذُنَين"},
  {n:10,title:"পা ধোয়া",desc:"ডান পা গোড়ালিসহ তিনবার, তারপর বাম পা তিনবার ধুয়ে নিন। পায়ের আঙুলের ফাঁকে পানি পৌঁছান।",arabic:"غَسْل القَدَمَين"},
];

const PRAYERS_EN = [
  {
    key:"fajr", name:"Fajr", arabic:"الفجر", emoji:"🌙", rakaat:2, time:"Before sunrise",
    desc:"Fajr is 2 obligatory rakaats performed after true dawn and before sunrise. Recitation is done aloud.",
    steps:[
      {title:"Niyyah and Takbeer",desc:"Face the Qibla and stand upright. Raise both hands to the earlobes and say Allahu Akbar. Fold right hand over left below the navel. The prayer has now begun.",arabic:"اللَّهُ أَكْبَر"},
      {title:"Thana — Opening Supplication",desc:"Recite silently: Subhanakallahumma wa bihamdika wa tabarakasmuka wa taala jadduka wa la ilaha ghairuk. Glory be to You O Allah, Blessed is Your name and exalted is Your majesty.",arabic:"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ"},
      {title:"Taawwudh and Tasmiyah",desc:"Say silently: Audhu billahi minash-shaitanir rajim. I seek refuge in Allah from the accursed Shaytan. Then say: Bismillahir Rahmanir Raheem.",arabic:"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"},
      {title:"Surah Al-Fatihah — Aloud",desc:"Recite aloud: Alhamdu lillahi rabbil alamin, ar-rahmanir rahim, maliki yawmiddin, iyyaka nabudu wa iyyaka nastain, ihdinas siratal mustaqim, siratal ladhina anamta alaihim, ghairil maghdubi alaihim waladdallin. Then say Ameen.",arabic:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"},
      {title:"Additional Surah — Aloud",desc:"Recite any surah aloud. Surah Al-Ikhlas: Qul huwallahu ahad, Allahus samad, lam yalid wa lam yulad, wa lam yakun lahu kufuwan ahad.",arabic:"قُلْ هُوَ اللَّهُ أَحَدٌ"},
      {title:"Ruku — Bowing",desc:"Say Allahu Akbar and bow with hands on knees, back horizontal. Recite at least 3 times: Subhana Rabbiyal Azeem — Glory be to my Lord the Magnificent.",arabic:"سُبْحَانَ رَبِّيَ الْعَظِيمِ"},
      {title:"Rising from Ruku",desc:"Rise saying Sami Allahu liman hamidah — Allah hears whoever praises Him. Stand upright then say: Rabbana lakal hamd — Our Lord, to You is all praise.",arabic:"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ"},
      {title:"First Sajdah — Prostration",desc:"Say Allahu Akbar and prostrate on 7 body parts: forehead and nose, both palms, both knees, toes of both feet. Recite 3 times: Subhana Rabbiyal Ala — Glory to my Lord the Most High.",arabic:"سُبْحَانَ رَبِّيَ الْأَعْلَى"},
      {title:"Sitting Between Sajdahs",desc:"Rise saying Allahu Akbar, sit on left foot with right foot upright. Say twice: Rabbighfirli — O Lord, forgive me.",arabic:"رَبِّ اغْفِرْ لِي"},
      {title:"Second Sajdah",desc:"Say Allahu Akbar and prostrate again exactly as before. Recite Subhana Rabbiyal Ala 3 times. First rakah is now complete. Rise for the second.",arabic:"سُبْحَانَ رَبِّيَ الْأَعْلَى"},
      {title:"Second Rakah",desc:"Rise with Allahu Akbar. No Thana this time. Recite Bismillah, Al-Fatihah aloud, additional Surah aloud, then Ruku and two Sajdahs.",arabic:"الرَّكْعَة الثَّانِيَة"},
      {title:"At-Tahiyyat — Tashahhud",desc:"Sit after 2nd Sajdah. Recite: At-tahiyyatu lillahi was-salawatu wattayyibatu, assalamu alaika ayyuhan-nabiyyu wa rahmatullahi wa barakatuh, assalamu alaina wa ala ibadillahis-salihin, ash-hadu alla ilaha illallahu wa ash-hadu anna Muhammadan abduhu wa rasuluh. Raise index finger on illa.",arabic:"التَّحِيَّاتُ لِلَّهِ"},
      {title:"Durood Ibrahim",desc:"After Tashahhud recite: Allahumma salli ala Muhammadin wa ala ali Muhammadin kama sallayta ala Ibrahima wa ala ali Ibrahim innaka Hamidum Majid. Allahumma barik ala Muhammadin wa ala ali Muhammadin kama barakta ala Ibrahima wa ala ali Ibrahim innaka Hamidum Majid.",arabic:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّد"},
      {title:"Dua Masura",desc:"Recite: Allahumma inni zalamtu nafsi zulman kathiran wa la yaghfirudh-dhunuba illa anta, faghfirli maghfiratan min indika war-hamni, innaka antal Ghafurur Rahim. O Allah I have wronged myself greatly, none forgives but You — forgive me and have mercy on me.",arabic:"اللَّهُمَّ إِنِّي ظَلَمْتُ"},
      {title:"Salam — Ending the Prayer",desc:"Turn right and say: Assalamu alaikum wa rahmatullah. Then turn left and say: Assalamu alaikum wa rahmatullah. The prayer is now complete.",arabic:"السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ"},
    ]
  },
  {
    key:"dhuhr", name:"Dhuhr", arabic:"الظهر", emoji:"☀️", rakaat:4, time:"Midday",
    desc:"Dhuhr is 4 obligatory rakaats. Begins when the sun passes its zenith. All recitation is silent.",
    steps:[
      {title:"1st and 2nd Rakaat — Silent with Surah",desc:"Perform Takbeer, Thana, Taawwudh, Bismillah silently. Recite Al-Fatihah and an additional Surah silently. Ruku and two Sajdahs each. After 2nd Rakah sit for middle Tashahhud.",arabic:""},
      {title:"Middle Tashahhud — Qadah Ula",desc:"After 2nd Rakah sit and recite At-Tahiyyat only. Do NOT recite Durood here. After finishing stand for 3rd Rakah saying Allahu Akbar.",arabic:"التَّحِيَّاتُ فَقَط"},
      {title:"3rd Rakaat — Fatihah Only — Silent",desc:"Recite Bismillah and Surah Al-Fatihah only silently. No additional Surah. Perform Ruku and two Sajdahs.",arabic:"الفَاتِحَة فَقَط"},
      {title:"4th Rakaat — Fatihah Only — Silent",desc:"Same as 3rd Rakah. Recite Bismillah and Al-Fatihah silently only. After Sajdahs sit for Final Tashahhud.",arabic:"الفَاتِحَة فَقَط"},
      {title:"Final Tashahhud then Durood then Dua then Salam",desc:"Recite full At-Tahiyyat, then Durood Ibrahim, then Dua Masura. Give Salam right and left to end the prayer.",arabic:"السَّلَام"},
    ]
  },
  {
    key:"asr", name:"Asr", arabic:"العصر", emoji:"🌤️", rakaat:4, time:"Afternoon",
    desc:"Asr is 4 obligatory rakaats. Begins when shadow equals twice the object height. All recitation is silent.",
    steps:[
      {title:"Same Structure as Dhuhr",desc:"Asr has exactly the same structure as Dhuhr: 4 rakaats, all silent, middle Tashahhud after 2nd Rakah, only Fatihah in 3rd and 4th rakaats.",arabic:""},
      {title:"1st and 2nd Rakaat — Silent with Surah",desc:"Recite Bismillah, Al-Fatihah and additional Surah silently. Ruku and two Sajdahs. Middle Tashahhud after 2nd Rakah.",arabic:""},
      {title:"3rd and 4th Rakaat — Fatihah Only",desc:"Recite Bismillah and Fatihah silently only. After 4th Rakah final Sajdah: full Tashahhud, Durood Ibrahim, Dua Masura, then Salam.",arabic:""},
      {title:"Asr Timing Note",desc:"Hanafi: Asr begins when shadow equals twice the height. Do NOT delay until sun turns yellow — that is Makruh. Shafi'i: begins when shadow equals the height.",arabic:"وَقْتُ العَصْر"},
    ]
  },
  {
    key:"maghrib", name:"Maghrib", arabic:"المغرب", emoji:"🌇", rakaat:3, time:"After sunset",
    desc:"Maghrib is 3 obligatory rakaats. Begins immediately at sunset. First two rakaats have audible recitation.",
    steps:[
      {title:"1st and 2nd Rakaat — Aloud with Surah",desc:"Recite Bismillah, Al-Fatihah and additional Surah aloud. Ruku and two Sajdahs each. After 2nd Rakah sit for middle Tashahhud — At-Tahiyyat only.",arabic:""},
      {title:"3rd Rakaat — Fatihah Only — Aloud",desc:"Stand for 3rd Rakah. Recite Bismillah and Al-Fatihah aloud — no additional Surah. Perform Ruku and two Sajdahs.",arabic:"الفَاتِحَة فَقَط"},
      {title:"Final Tashahhud then Durood then Dua then Salam",desc:"After 2nd Sajdah of 3rd Rakah sit for full Tashahhud. Recite At-Tahiyyat, Durood Ibrahim, Dua Masura, then give Salam right and left.",arabic:"السَّلَام"},
    ]
  },
  {
    key:"isha", name:"Isha", arabic:"العشاء", emoji:"🌃", rakaat:4, time:"Night",
    desc:"Isha is 4 obligatory rakaats. Begins when twilight disappears. First two rakaats aloud, last two silent.",
    steps:[
      {title:"1st and 2nd Rakaat — Aloud with Surah",desc:"Recite Bismillah, Al-Fatihah and additional Surah aloud. Ruku and two Sajdahs. Middle Tashahhud after 2nd Rakah.",arabic:""},
      {title:"3rd and 4th Rakaat — Silent Fatihah Only",desc:"Recite Bismillah and Fatihah silently. No additional Surah. After 4th Rakah final Sajdah: full Tashahhud, Durood, Dua, then Salam.",arabic:""},
      {title:"Witr Prayer — 3 Rakaats — Wajib",desc:"After Isha fard pray 3 rakaat Witr. In the 3rd Rakah after Al-Fatihah and Surah say Allahu Akbar before Ruku and recite Dua Qunoot: Allahumma inna nastainuka wa nastaghfiruka wa numinu bika wa natawakkalu alaik.",arabic:"صَلَاة الوِتْر"},
    ]
  },
];

const PRAYERS_BN = [
  {
    key:"fajr", name:"ফজর", arabic:"الفجر", emoji:"🌙", rakaat:2, time:"সূর্যোদয়ের আগে",
    desc:"ফজরের নামাজ ২ রাকাত ফরজ। সুবহে সাদিক থেকে সূর্যোদয়ের আগ পর্যন্ত সময়। কিরাত উচ্চস্বরে পড়তে হয়।",
    steps:[
      {title:"নিয়্যত ও তাকবীরে তাহরীমা",desc:"কিবলামুখী হয়ে সোজা দাঁড়ান। উভয় হাত কানের লতি পর্যন্ত তুলে বলুন: আল্লাহু আকবার। ডান হাত বাম হাতের উপর রেখে নাভির নিচে বাঁধুন। নামাজ শুরু হলো।",arabic:"اللَّهُ أَكْبَر"},
      {title:"সানা পড়া",desc:"মনে মনে পড়ুন: সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারাকাস্মুকা ওয়া তাআলা জাদ্দুকা ওয়া লা ইলাহা গাইরুক। অর্থ: হে আল্লাহ আপনার পবিত্রতা ও প্রশংসা করছি আপনার নাম বরকতময়।",arabic:"سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ"},
      {title:"আউযু ও বিসমিল্লাহ",desc:"মনে মনে পড়ুন: আউযু বিল্লাহি মিনাশ শাইতানির রাজিম। তারপর: বিসমিল্লাহির রাহমানির রাহিম। প্রতিটি রাকাতের শুরুতে বিসমিল্লাহ পড়তে হয়।",arabic:"أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ"},
      {title:"সূরা আল-ফাতিহা — উচ্চস্বরে",desc:"উচ্চস্বরে পড়ুন: আলহামদু লিল্লাহি রাব্বিল আলামীন, আর-রাহমানির রাহীম, মালিকি ইয়াওমিদ্দীন, ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাসতাইন, ইহদিনাস সিরাতাল মুসতাকিম, সিরাতাল্লাযিনা আনআমতা আলাইহিম, গাইরিল মাগদুবি আলাইহিম ওয়ালাদ দ্বাল্লিন। শেষে আমীন বলুন।",arabic:"الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ"},
      {title:"অতিরিক্ত সূরা — উচ্চস্বরে",desc:"যেকোনো সূরা উচ্চস্বরে পড়ুন। সূরা আল-ইখলাস: কুল হুওয়াল্লাহু আহাদ, আল্লাহুস সামাদ, লাম ইয়ালিদ ওয়া লাম ইউলাদ, ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ।",arabic:"قُلْ هُوَ اللَّهُ أَحَدٌ"},
      {title:"রুকু করা",desc:"আল্লাহু আকবার বলে কোমর পর্যন্ত ঝুঁকুন। হাঁটুতে হাত রাখুন পিঠ সমান রাখুন। কমপক্ষে ৩ বার পড়ুন: সুবহানা রাব্বিয়াল আযীম — আমার মহান রবের পবিত্রতা।",arabic:"سُبْحَانَ رَبِّيَ الْعَظِيمِ"},
      {title:"রুকু থেকে উঠা",desc:"সামিআল্লাহু লিমান হামিদাহ বলতে বলতে সোজা দাঁড়ান। তারপর বলুন: রাব্বানা লাকাল হামদ — হে আমাদের রব সমস্ত প্রশংসা আপনার।",arabic:"سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ"},
      {title:"প্রথম সিজদা",desc:"আল্লাহু আকবার বলে সিজদায় যান। ৭টি অঙ্গ মাটিতে রাখুন: কপাল ও নাক, দুই তালু, দুই হাঁটু, দুই পায়ের আঙুলের মাথা। ৩ বার পড়ুন: সুবহানা রাব্বিয়াল আলা — আমার সর্বোচ্চ রবের পবিত্রতা।",arabic:"سُبْحَانَ رَبِّيَ الْأَعْلَى"},
      {title:"দুই সিজদার মাঝে বসা",desc:"আল্লাহু আকবার বলে বাম পায়ের উপর বসুন ডান পা খাড়া রাখুন। দুইবার বলুন: রাব্বিগফিরলি — হে আমার রব আমাকে ক্ষমা করুন।",arabic:"رَبِّ اغْفِرْ لِي"},
      {title:"দ্বিতীয় সিজদা",desc:"আবার আল্লাহু আকবার বলে সিজদায় যান। সুবহানা রাব্বিয়াল আলা ৩ বার পড়ুন। প্রথম রাকাত সম্পন্ন।",arabic:"سُبْحَانَ رَبِّيَ الْأَعْلَى"},
      {title:"দ্বিতীয় রাকাত",desc:"আল্লাহু আকবার বলে উঠুন। এ রাকাতে সানা নেই। বিসমিল্লাহ, সূরা ফাতিহা উচ্চস্বরে, অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু ও দুটি সিজদা করুন।",arabic:"الرَّكْعَة الثَّانِيَة"},
      {title:"তাশাহহুদ — আত্তাহিয়্যাতু",desc:"২য় রাকাতের সিজদার পর বসুন। পড়ুন: আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত ত্বাইয়িবাত, আস-সালামু আলাইকা আইয়্যুহান নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ, আস-সালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহীন, আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহ। ইল্লাল্লাহু পড়ার সময় শাহাদাত আঙুল উঠান।",arabic:"التَّحِيَّاتُ لِلَّهِ"},
      {title:"দরুদ ইবরাহীম",desc:"তাশাহহুদের পর পড়ুন: আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ কামা সাল্লাইতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম ইন্নাকা হামীদুম মাজীদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ কামা বারাকতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম ইন্নাকা হামীদুম মাজীদ।",arabic:"اللَّهُمَّ صَلِّ عَلَى مُحَمَّد"},
      {title:"দোয়া মাসুরা",desc:"পড়ুন: আল্লাহুম্মা ইন্নি যালামতু নাফসি যুলমান কাসিরা ওয়া লা ইয়াগফিরুয যুনুবা ইল্লা আনতা ফাগফিরলি মাগফিরাতাম মিন ইন্দিকা ওয়ারহামনি ইন্নাকা আনতাল গাফুরুর রাহীম। অর্থ: হে আল্লাহ আমি অনেক যুলম করেছি আপনি ছাড়া কেউ ক্ষমা করতে পারে না — ক্ষমা করুন ও দয়া করুন।",arabic:"اللَّهُمَّ إِنِّي ظَلَمْتُ"},
      {title:"সালাম ফেরানো",desc:"ডানদিকে বলুন: আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ। তারপর বামদিকে বলুন: আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ। নামাজ সম্পন্ন হলো।",arabic:"السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ"},
    ]
  },
  {
    key:"dhuhr", name:"যোহর", arabic:"الظهر", emoji:"☀️", rakaat:4, time:"দুপুরবেলা",
    desc:"যোহরের নামাজ ৪ রাকাত ফরজ। সূর্য পশ্চিম দিকে হেলতে শুরু করলে ওয়াক্ত শুরু। সব কিরাত চুপে পড়তে হয়।",
    steps:[
      {title:"১ম ও ২য় রাকাত — সূরাসহ চুপে চুপে",desc:"তাকবীর সানা আউযু বিসমিল্লাহ চুপে পড়ুন। সূরা ফাতিহা ও অতিরিক্ত সূরা চুপে পড়ুন। রুকু করুন — সুবহানা রাব্বিয়াল আযীম ৩ বার। উঠুন — সামিআল্লাহু লিমান হামিদাহ — রাব্বানা লাকাল হামদ। দুটি সিজদা করুন।",arabic:""},
      {title:"মধ্যবর্তী বৈঠক — শুধু আত্তাহিয়্যাতু",desc:"২য় রাকাতের সিজদার পর বসুন এবং শুধু আত্তাহিয়্যাতু পড়ুন। এখানে দরুদ পড়বেন না। শেষে আল্লাহু আকবার বলে ৩য় রাকাতের জন্য উঠুন।",arabic:"التَّحِيَّاتُ فَقَط"},
      {title:"৩য় রাকাত — শুধু ফাতিহা চুপে",desc:"শুধু বিসমিল্লাহ ও সূরা ফাতিহা চুপে পড়ুন। কোনো অতিরিক্ত সূরা নেই। রুকু ও দুটি সিজদা করুন।",arabic:"الفَاتِحَة فَقَط"},
      {title:"৪র্থ রাকাত — শুধু ফাতিহা চুপে",desc:"৩য় রাকাতের মতোই করুন। বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। সিজদার পর চূড়ান্ত তাশাহহুদের জন্য বসুন।",arabic:"الفَاتِحَة فَقَط"},
      {title:"চূড়ান্ত তাশাহহুদ তারপর দরুদ তারপর দোয়া তারপর সালাম",desc:"সম্পূর্ণ আত্তাহিয়্যাতু পড়ুন তারপর দরুদ ইবরাহীম তারপর দোয়া মাসুরা। ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।",arabic:"السَّلَام"},
    ]
  },
  {
    key:"asr", name:"আসর", arabic:"العصر", emoji:"🌤️", rakaat:4, time:"বিকেলবেলা",
    desc:"আসরের নামাজ ৪ রাকাত ফরজ। হানাফি মতে ছায়া দ্বিগুণ হলে ওয়াক্ত শুরু। সব কিরাত চুপে চুপে।",
    steps:[
      {title:"গঠন যোহরের মতোই",desc:"আসর নামাজ যোহরের মতোই: ৪ রাকাত, সব কিরাত চুপে, ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু, ৩য় ও ৪র্থ রাকাতে শুধু ফাতিহা।",arabic:""},
      {title:"১ম ও ২য় রাকাত — সূরাসহ চুপে",desc:"বিসমিল্লাহ সূরা ফাতিহা ও অতিরিক্ত সূরা চুপে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।",arabic:""},
      {title:"৩য় ও ৪র্থ রাকাত — শুধু ফাতিহা",desc:"শুধু বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। ৪র্থ রাকাতের সিজদার পর চূড়ান্ত তাশাহহুদ দরুদ ইবরাহীম দোয়া মাসুরা পড়ে সালাম ফেরান।",arabic:""},
      {title:"আসরের সময় — গুরুত্বপূর্ণ",desc:"হানাফি মতে ছায়া দ্বিগুণ হলে ওয়াক্ত শুরু। সূর্য হলদে বা লাল হওয়ার আগেই পড়ুন — দেরি করা মাকরূহ। সূর্যাস্ত পর্যন্ত ওয়াক্ত থাকে।",arabic:"وَقْتُ العَصْر"},
    ]
  },
  {
    key:"maghrib", name:"মাগরিব", arabic:"المغرب", emoji:"🌇", rakaat:3, time:"সূর্যাস্তের পর",
    desc:"মাগরিবের নামাজ ৩ রাকাত ফরজ। সূর্যাস্তের সাথে সাথে ওয়াক্ত শুরু। প্রথম দুই রাকাত উচ্চস্বরে।",
    steps:[
      {title:"১ম ও ২য় রাকাত — সূরাসহ উচ্চস্বরে",desc:"সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।",arabic:""},
      {title:"৩য় রাকাত — শুধু ফাতিহা উচ্চস্বরে",desc:"আল্লাহু আকবার বলে উঠুন। বিসমিল্লাহ ও সূরা ফাতিহা উচ্চস্বরে পড়ুন — কোনো অতিরিক্ত সূরা নেই। রুকু ও দুটি সিজদা করুন।",arabic:"الفَاتِحَة فَقَط"},
      {title:"চূড়ান্ত তাশাহহুদ তারপর দরুদ তারপর দোয়া তারপর সালাম",desc:"৩য় রাকাতের সিজদার পর বসুন। আত্তাহিয়্যাতু দরুদ ইবরাহীম দোয়া মাসুরা পড়ুন। ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।",arabic:"السَّلَام"},
    ]
  },
  {
    key:"isha", name:"ইশা", arabic:"العشاء", emoji:"🌃", rakaat:4, time:"রাতে",
    desc:"ইশার নামাজ ৪ রাকাত ফরজ। রাতের অন্ধকার গাঢ় হলে ওয়াক্ত শুরু। প্রথম দুই রাকাত উচ্চস্বরে শেষ দুই চুপে।",
    steps:[
      {title:"১ম ও ২য় রাকাত — সূরাসহ উচ্চস্বরে",desc:"সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।",arabic:""},
      {title:"৩য় ও ৪র্থ রাকাত — শুধু ফাতিহা চুপে",desc:"শুধু বিসমিল্লাহ ও ফাতিহা চুপে পড়ুন। ৪র্থ রাকাতের সিজদার পর চূড়ান্ত তাশাহহুদ দরুদ ইবরাহীম দোয়া মাসুরা পড়ে সালাম ফেরান।",arabic:""},
      {title:"বিতর নামাজ — ৩ রাকাত — ওয়াজিব",desc:"ইশার ফরজের পর ৩ রাকাত বিতর পড়ুন। ৩য় রাকাতে ফাতিহা ও সূরার পর রুকুর আগে আল্লাহু আকবার বলে হাত বেঁধে দোয়া কুনুত পড়ুন: আল্লাহুম্মা ইন্না নাসতাইনুকা ওয়া নাসতাগফিরুকা ওয়া নুমিনু বিকা ওয়া নাতাওয়াক্কালু আলাইক।",arabic:"صَلَاة الوِتْر"},
    ]
  },
];

export default function LearnPage() {
  const { t, lang } = useLang();
  const [tab, setTab] = useState("wudu");
  const [selIdx, setSelIdx] = useState(null);
  const [exp, setExp] = useState(null);

  const WUDU = lang === "bn" ? WUDU_BN : WUDU_EN;
  const PRAYERS = lang === "bn" ? PRAYERS_BN : PRAYERS_EN;
  const sel = selIdx !== null ? PRAYERS[selIdx] : null;

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: "0 16px" }}>
      <div style={{ paddingTop: 56, paddingBottom: 16 }}>
        <h1 className="text-gold" style={{ fontSize: 28, fontWeight: 800 }}>{t("learn.title")}</h1>
        <p style={{ color: "#6a7a8a", fontSize: 14, marginTop: 4 }}>{t("learn.subtitle")}</p>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["wudu", "prayers"].map(tk => (
          <button key={tk} onClick={() => { setTab(tk); setSelIdx(null); setExp(null); }} style={{
            flex: 1, padding: "10px", borderRadius: 12, border: "1px solid", cursor: "pointer",
            fontWeight: 600, fontSize: 13,
            background: tab === tk ? "linear-gradient(135deg,#1a6b4a,#0a3622)" : "rgba(255,255,255,0.04)",
            color: tab === tk ? "#f0d060" : "#6a7a8a",
            borderColor: tab === tk ? "rgba(201,162,39,0.4)" : "rgba(255,255,255,0.08)",
          }}>{t("learn.tab." + tk)}</button>
        ))}
      </div>

      {tab === "wudu" && (
        <div>
          <div className="card-gold" style={{ padding: "14px 16px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontFamily: "Amiri,serif", fontSize: 18, color: "#f0d060", marginBottom: 4 }}>الوُضُوء</div>
            <div style={{ fontSize: 13, color: "#8a9aaa" }}>{t("learn.wudu.sub")}</div>
          </div>
          {WUDU.map(({ n, title, desc, arabic }) => (
            <div key={n} className="card" style={{ marginBottom: 10, padding: "14px 16px", display: "flex", gap: 14 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#a07d1a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "#040d1a", flexShrink: 0 }}>{n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4 }}>{title}</div>
                <div style={{ fontSize: 12, color: "#8a9aaa", lineHeight: 1.7 }}>{desc}</div>
                {arabic && <div style={{ fontFamily: "Amiri,serif", fontSize: 17, color: "#c9a227", marginTop: 8, textAlign: "right" }}>{arabic}</div>}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "prayers" && selIdx === null && (
        <div>
          <div style={{ fontSize: 13, color: "#6a7a8a", marginBottom: 12 }}>{t("learn.select")}</div>
          {PRAYERS.map((p, i) => (
            <div key={p.key} className="card" onClick={() => { setSelIdx(i); setExp(null); }}
              style={{ marginBottom: 12, padding: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: 32 }}>{p.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 17 }}>{p.name}</span>
                  <span style={{ fontFamily: "Amiri,serif", fontSize: 18, color: "#c9a227" }}>{p.arabic}</span>
                </div>
                <div style={{ fontSize: 12, color: "#6a7a8a", marginTop: 2 }}>{p.rakaat} {t("learn.rakaat")} · {p.time}</div>
                <div style={{ fontSize: 11, color: "#4a5a6a", marginTop: 4, lineHeight: 1.5 }}>{p.desc}</div>
              </div>
              <div style={{ color: "#c9a227", fontSize: 18 }}>›</div>
            </div>
          ))}
        </div>
      )}

      {tab === "prayers" && sel !== null && (
        <div>
          <button onClick={() => { setSelIdx(null); setExp(null); }} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#aaa", borderRadius: 10, padding: "8px 14px", cursor: "pointer", marginBottom: 16, fontSize: 13 }}>
            {t("learn.back")}
          </button>
          <div className="card-gold" style={{ padding: "18px 16px", marginBottom: 16, textAlign: "center" }}>
            <div style={{ fontSize: 36 }}>{sel.emoji}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginTop: 6 }}>{sel.name}</div>
            <div style={{ fontFamily: "Amiri,serif", fontSize: 20, color: "#c9a227" }}>{sel.arabic}</div>
            <div style={{ fontSize: 12, color: "#8a9aaa", marginTop: 4 }}>{sel.rakaat} {t("learn.rakaat")} · {sel.time}</div>
            <div style={{ fontSize: 12, color: "#6a7a5a", marginTop: 8, lineHeight: 1.6, padding: "0 8px" }}>{sel.desc}</div>
          </div>
          {sel.steps.map((s, i) => (
            <div key={i} className="card" style={{ marginBottom: 10, padding: "14px 16px", cursor: "pointer" }} onClick={() => setExp(exp === i ? null : i)}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(201,162,39,0.15)", border: "1px solid rgba(201,162,39,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#c9a227", flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1, fontWeight: 600, color: "#e0e0e0", fontSize: 14 }}>{s.title}</div>
                <div style={{ color: "#c9a227", fontSize: 18, transform: exp === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</div>
              </div>
              {exp === i && (
                <div style={{ marginTop: 12, paddingLeft: 40 }}>
                  <div style={{ fontSize: 13, color: "#9aaa9a", lineHeight: 1.75 }}>{s.desc}</div>
                  {s.arabic && (
                    <div style={{ fontFamily: "Amiri,serif", fontSize: 20, color: "#c9a227", marginTop: 12, textAlign: "right", lineHeight: 2, padding: "10px 14px", background: "rgba(201,162,39,0.06)", borderRadius: 10, borderRight: "3px solid rgba(201,162,39,0.35)" }}>
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
