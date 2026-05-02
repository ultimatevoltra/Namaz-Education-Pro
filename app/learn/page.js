'use client';
import { useState } from 'react';
import { useLang } from '../../components/LangProvider';

const WUDU_EN=[
  {n:1,t:'Intention (Niyyah)',d:'Make the intention in your heart to perform wudu for the sake of Allah. It is not necessary to say it aloud.',a:'نِيَّة'},
  {n:2,t:'Say Bismillah',d:'Say "Bismillah ir-Rahman ir-Raheem" before starting. This is Sunnah.',a:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'},
  {n:3,t:'Wash Hands',d:'Wash both hands up to and including the wrists three times, starting with the right hand.',a:'غَسْل اليَدَين'},
  {n:4,t:'Rinse Mouth',d:'Take water into your mouth and rinse it thoroughly three times, making sure water reaches all areas.',a:'المَضْمَضَة'},
  {n:5,t:'Rinse Nose',d:'Sniff water into the nostrils and blow it out three times, using the left hand to blow.',a:'الاسْتِنْشَاق'},
  {n:6,t:'Wash Face',d:'Wash the entire face three times — from the hairline to the chin, and from one ear to the other.',a:'غَسْل الوَجْه'},
  {n:7,t:'Wash Arms to Elbows',d:'Wash both arms up to and including the elbows three times, starting with the right arm.',a:'غَسْل الذِّرَاعَين'},
  {n:8,t:'Wipe Head',d:'Pass wet hands over the entire head once — from front to back and back to front.',a:'مَسْح الرَّأْس'},
  {n:9,t:'Wipe Ears',d:'With wet index fingers, wipe the inside of both ears. With wet thumbs, wipe the outside once.',a:'مَسْح الأُذُنَين'},
  {n:10,t:'Wash Feet',d:'Wash both feet including the ankles three times, starting with the right foot. Rub between the toes.',a:'غَسْل القَدَمَين'},
];

const WUDU_BN=[
  {n:1,t:'নিয়্যত করা',d:'মনে মনে আল্লাহর জন্য ওযু করার নিয়্যত করুন। মুখে বলা জরুরি নয়, তবে বলা যায়। নিয়্যত হলো মনের ইচ্ছা।',a:'نِيَّة'},
  {n:2,t:'বিসমিল্লাহ বলা',d:'"বিসমিল্লাহির রাহমানির রাহিম" বলে ওযু শুরু করুন। এটি সুন্নত। বিসমিল্লাহ ছাড়া ওযু হবে তবে সওয়াব কম।',a:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ'},
  {n:3,t:'উভয় হাত ধোয়া',d:'ডান হাত দিয়ে শুরু করুন। কব্জি পর্যন্ত উভয় হাত তিনবার ভালোভাবে ধুয়ে নিন। আঙুলের ফাঁকে ফাঁকে পানি পৌঁছান।',a:'غَسْل اليَدَين'},
  {n:4,t:'কুলি করা',d:'তিনবার মুখে পানি নিয়ে ভালোভাবে কুলি করুন। সম্পূর্ণ মুখের ভেতরে পানি পৌঁছানো দরকার।',a:'المَضْمَضَة'},
  {n:5,t:'নাকে পানি দেওয়া',d:'তিনবার নাকে পানি দিন এবং বাম হাত দিয়ে নাক পরিষ্কার করুন। নাকের ভেতরে পানি পৌঁছানো ফরজ।',a:'الاسْتِنْشَاق'},
  {n:6,t:'মুখমণ্ডল ধোয়া',d:'কপালের চুলের গোড়া থেকে থুতনির নিচ পর্যন্ত, এক কান থেকে আরেক কান পর্যন্ত তিনবার ধুয়ে নিন।',a:'غَسْل الوَجْه'},
  {n:7,t:'হাত ও বাহু ধোয়া',d:'ডান হাত কনুইসহ তিনবার ধুয়ে তারপর বাম হাত কনুইসহ তিনবার ধুয়ে নিন। কনুই পর্যন্ত ধোয়া ফরজ।',a:'غَسْل الذِّرَاعَين'},
  {n:8,t:'মাথা মাসেহ করা',d:'দুই হাত ভিজিয়ে মাথার সামনে থেকে পেছন পর্যন্ত একবার মাসেহ করুন। সম্পূর্ণ মাথা একবার মাসেহ করা ফরজ।',a:'مَسْح الرَّأْس'},
  {n:9,t:'কান মাসেহ করা',d:'শাহাদাত আঙুল দিয়ে কানের ভেতরে এবং বুড়ো আঙুল দিয়ে কানের বাইরে একবার মাসেহ করুন।',a:'مَسْح الأُذُنَين'},
  {n:10,t:'পা ধোয়া',d:'ডান পা গোড়ালিসহ তিনবার ধুয়ে তারপর বাম পা তিনবার ধুয়ে নিন। পায়ের আঙুলের ফাঁকে পানি পৌঁছানো জরুরি।',a:'غَسْل القَدَمَين'},
];

const PRAYERS = [
  {
    name:'Fajr', bnName:'ফজর', arabic:'الفجر', emoji:'🌙', rakaat:2, time:'Before sunrise', bnTime:'সূর্যোদয়ের আগে',
    bnDesc:'ফজরের নামাজ ২ রাকাত ফরজ। ফজরের নামাজ ভোরের আলো ফোটার আগে পড়তে হয়।',
    steps:[
      {t:'Takbeer-e-Tahreema',d:'Stand upright facing the Qibla. Raise both hands to the earlobes and say "Allahu Akbar". This begins the prayer. Fold your right hand over your left below the navel.',a:'اللَّهُ أَكْبَر',
        bnT:'তাকবীরে তাহরীমা',bnD:'কিবলামুখী হয়ে সোজা দাঁড়ান। উভয় হাত কানের লতি পর্যন্ত উঠিয়ে "আল্লাহু আকবার" বলুন। এরপর ডান হাত বাম হাতের উপর রেখে নাভির নিচে বাঁধুন।'},
      {t:'Sana (Opening Supplication)',d:'Recite silently: "Subhanakallahumma wa bihamdika wa tabarakasmuka wa ta'ala jadduka wa la ilaha ghairuk."',a:'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ',
        bnT:'সানা পড়া',bnD:'মনে মনে সানা পড়ুন: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা ওয়া তাবারাকাস্মুকা ওয়া তাআলা জাদ্দুকা ওয়া লা ইলাহা গাইরুক।"'},
      {t:'A'udhu & Bismillah',d:'Seek refuge from Shaytan silently: "A'udhu billahi minash shaitanir rajim", then say "Bismillahir rahmanir raheem."',a:'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
        bnT:'আউযু ও বিসমিল্লাহ',bnD:'মনে মনে আউযু পড়ুন: "আউযু বিল্লাহি মিনাশ শাইতানির রাজিম।" তারপর বিসমিল্লাহ বলুন।'},
      {t:'Surah Al-Fatihah',d:'Recite Surah Al-Fatihah clearly (silently in Dhuhr & Asr, aloud in Fajr, Maghrib & Isha): "Alhamdu lillahi rabbil 'alamin, ar-rahmanir rahim..." After finishing say Ameen.',a:'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        bnT:'সূরা আল-ফাতিহা',bnD:'সূরা ফাতিহা পড়ুন — ফজরে উচ্চস্বরে: "আলহামদু লিল্লাহি রাব্বিল আলামীন, আর-রাহমানির রাহীম, মালিকি ইয়াওমিদ্দীন, ইয়্যাকা নাবুদু ওয়া ইয়্যাকা নাসতাইন, ইহদিনাস সিরাতাল মুসতাকিম, সিরাতাল লাযিনা আনআমতা আলাইহিম, গাইরিল মাগদুবি আলাইহিম ওয়ালাদ দ্বাল্লিন।" শেষে আমীন বলুন।'},
      {t:'Additional Surah',d:'Recite any surah from the Quran. For Fajr, it is Sunnah to recite longer surahs. Common choices: Al-Ikhlas, Al-Falaq, An-Nas, or longer surahs.',a:'قُلْ هُوَ اللَّهُ أَحَدٌ',
        bnT:'অতিরিক্ত সূরা',bnD:'ফাতিহার পর যেকোনো সূরা পড়ুন। ফজরে বড় সূরা পড়া সুন্নত। সহজ সূরা: সূরা ইখলাস — "কুল হুওয়াল্লাহু আহাদ, আল্লাহুস সামাদ, লাম ইয়ালিদ ওয়া লাম ইউলাদ, ওয়া লাম ইয়াকুল্লাহু কুফুওয়ান আহাদ।"'},
      {t:'Ruku (Bowing)',d:'Say "Allahu Akbar" and bow down, placing hands on knees with fingers spread. Keep back straight and horizontal. Recite "Subhana Rabbiyal Azeem" at least 3 times.',a:'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        bnT:'রুকু করা',bnD:'"আল্লাহু আকবার" বলে কোমর পর্যন্ত ঝুঁকুন। হাঁটুতে হাত রাখুন, পিঠ সমান রাখুন। ন্যূনতম ৩ বার পড়ুন: "সুবহানা রাব্বিয়াল আযীম।" (আমার মহান রবের পবিত্রতা ঘোষণা করছি)'},
      {t:'Rising from Ruku',d:'Rise saying "Sami Allahu liman hamidah" (Allah hears those who praise Him). Stand upright then say "Rabbana lakal hamd" (Our Lord, to You is all praise).',a:'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ',
        bnT:'রুকু থেকে উঠা',bnD:'"সামিআল্লাহু লিমান হামিদাহ" বলে সোজা হয়ে দাঁড়ান। তারপর বলুন: "রাব্বানা লাকাল হামদ।" (আমাদের রব, সমস্ত প্রশংসা আপনার জন্য)'},
      {t:'First Sajdah (Prostration)',d:'Say "Allahu Akbar" and prostrate on 7 bones: forehead+nose, both palms, both knees, toes of both feet. Recite "Subhana Rabbiyal A'la" at least 3 times.',a:'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        bnT:'প্রথম সিজদা',bnD:'"আল্লাহু আকবার" বলে সিজদায় যান। ৭টি অঙ্গ মাটিতে রাখুন: কপাল ও নাক, উভয় হাতের তালু, উভয় হাঁটু, উভয় পায়ের আঙুল। ৩ বার পড়ুন: "সুবহানা রাব্বিয়াল আলা।" (আমার সর্বোচ্চ রবের পবিত্রতা)'},
      {t:'Sitting Between Sajdahs',d:'Rise saying "Allahu Akbar" and sit on your left foot, keeping right foot upright. Recite "Rabbighfirli" (My Lord, forgive me) twice.',a:'رَبِّ اغْفِرْ لِي',
        bnT:'দুই সিজদার মাঝে বসা',bnD:'"আল্লাহু আকবার" বলে উঠে বসুন। বাম পায়ের উপর বসুন, ডান পা খাড়া রাখুন। দুইবার বলুন: "রাব্বিগফিরলি।" (হে আমার রব, আমাকে ক্ষমা করুন)'},
      {t:'Second Sajdah',d:'Say "Allahu Akbar" and prostrate again, exactly as the first sajdah. Recite "Subhana Rabbiyal A'la" at least 3 times. This completes one Rakah.',a:'سُبْحَانَ رَبِّيَ الْأَعْلَى',
        bnT:'দ্বিতীয় সিজদা',bnD:'"আল্লাহু আকবার" বলে আবার সিজদায় যান। প্রথম সিজদার মতোই করুন। ৩ বার পড়ুন: "সুবহানা রাব্বিয়াল আলা।" এটি শেষে প্রথম রাকাত সম্পন্ন হলো।'},
      {t:'Second Rakah',d:'Rise for the second Rakah saying "Allahu Akbar". Recite Bismillah, Al-Fatihah, and an additional Surah (same as first Rakah but no Sana).',a:'الرَّكْعَة الثَّانِيَة',
        bnT:'দ্বিতীয় রাকাত',bnD:'"আল্লাহু আকবার" বলে দ্বিতীয় রাকাতের জন্য উঠে দাঁড়ান। বিসমিল্লাহ, সূরা ফাতিহা, তারপর অতিরিক্ত সূরা পড়ুন। (এই রাকাতে সানা পড়তে হবে না)'},
      {t:'Final Tashahhud (At-Tahiyyat)',d:'After the second sajdah of the last rakah, sit in qa'dah position. Recite At-Tahiyyat: "At-tahiyyatu lillahi was-salawatu wattayyibatu, assalamu alaika ayyuhan nabiyyu..."',a:'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ',
        bnT:'তাশাহহুদ (আত-তাহিয়্যাত)',bnD:'শেষ রাকাতের দ্বিতীয় সিজদার পর বসুন। আত্তাহিয়্যাতু পড়ুন: "আত্তাহিয়্যাতু লিল্লাহি ওয়াস সালাওয়াতু ওয়াত ত্বাইয়িবাত, আস-সালামু আলাইকা আইয়্যুহান নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহ, আস-সালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস সালিহীন, আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহ।" "আল্লাহ" শব্দে শাহাদাত আঙুল উঠান।'},
      {t:'Durood Ibrahim (Salawat)',d:'After Tashahhud, recite Durood Ibrahim: "Allahumma salli ala Muhammadin wa ala ali Muhammadin, kama sallayta ala Ibrahima..."',a:'اللَّهُمَّ صَلِّ عَلَى مُحَمَّد',
        bnT:'দরুদ ইবরাহীম',bnD:'তাশাহহুদের পর দরুদ পড়ুন: "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ, কামা সাল্লাইতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ। আল্লাহুম্মা বারিক আলা মুহাম্মাদিন ওয়া আলা আলি মুহাম্মাদ, কামা বারাকতা আলা ইবরাহীমা ওয়া আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ।"'},
      {t:'Dua Masura (Final Supplication)',d:'Recite any dua from the Sunnah, such as: "Allahumma inni zalamtu nafsi zulman kathiran..." or "Rabbij'alni muqimas salati wa min dhurriyyati..."',a:'اللَّهُمَّ إِنِّي ظَلَمْتُ',
        bnT:'দোয়া মাসুরা',bnD:'দরুদের পর দোয়া পড়ুন: "আল্লাহুম্মা ইন্নি যালামতু নাফসি যুলমান কাসিরা, ওয়া লা ইয়াগফিরুয যুনুবা ইল্লা আনতা, ফাগফিরলি মাগফিরাতাম মিন ইন্দিকা ওয়ার হামনি, ইন্নাকা আনতাল গাফুরুর রাহীম।"'},
      {t:'Salaam (Ending the Prayer)',d:'Turn your head to the right and say "Assalamu alaikum wa rahmatullah", then turn left and say the same. This ends the prayer.',a:'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ',
        bnT:'সালাম ফেরানো',bnD:'ডানে মুখ ফিরিয়ে বলুন: "আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ।" তারপর বামে মুখ ফিরিয়ে আবার বলুন: "আস-সালামু আলাইকুম ওয়া রাহমাতুল্লাহ।" এর মাধ্যমে নামাজ শেষ হলো।'},
    ]
  },
  {
    name:'Dhuhr', bnName:'যোহর', arabic:'الظهر', emoji:'☀️', rakaat:4, time:'Midday', bnTime:'দুপুরবেলা',
    bnDesc:'যোহরের নামাজ ৪ রাকাত ফরজ। এটি সূর্য মাথার উপর থেকে পশ্চিম দিকে হেলতে শুরু করলে শুরু হয়। চুপে চুপে পড়তে হয়।',
    steps:[
      {t:'First Two Rakaat',d:'Perform exactly like Fajr but silently (no audible recitation). Recite Takbeer, Sana, Auzubillah, Bismillah, Al-Fatihah, an additional Surah, then Ruku, Sajdahs.',a:'',
        bnT:'প্রথম দুই রাকাত',bnD:'ফজরের মতোই করুন, পার্থক্য হলো যোহরে সব কিরাত মনে মনে পড়তে হয় (চুপে চুপে)। তাকবীর, সানা, আউযু, বিসমিল্লাহ, সূরা ফাতিহা, অতিরিক্ত সূরা, রুকু, সিজদা।'},
      {t:'Middle Tashahhud (Qa'dah Ula)',d:'After the second sajdah of the 2nd rakah, sit and recite At-Tahiyyat only (no Durood). Then stand for the 3rd rakah saying "Allahu Akbar".',a:'التَّحِيَّاتُ',
        bnT:'মধ্যবর্তী তাশাহহুদ (প্রথম বৈঠক)',bnD:'দ্বিতীয় রাকাতের পর বসুন এবং শুধু আত্তাহিয়্যাতু পড়ুন (দরুদ পড়বেন না)। তারপর "আল্লাহু আকবার" বলে ৩য় রাকাতের জন্য উঠে দাঁড়ান।'},
      {t:'3rd Rakaat — Fatihah Only',d:'In the 3rd and 4th rakaats, recite only Bismillah and Al-Fatihah silently. No additional Surah. Then perform Ruku and Sajdahs normally.',a:'الفَاتِحَة فَقَط',
        bnT:'৩য় রাকাত — শুধু ফাতিহা',bnD:'৩য় ও ৪র্থ রাকাতে শুধু বিসমিল্লাহ ও সূরা ফাতিহা চুপে চুপে পড়ুন। অতিরিক্ত সূরা নেই। তারপর স্বাভাবিকভাবে রুকু ও সিজদা করুন।'},
      {t:'4th Rakaat — Fatihah Only',d:'Perform the 4th rakah exactly like the 3rd. After the second sajdah, sit for the final Tashahhud.',a:'',
        bnT:'৪র্থ রাকাত — শুধু ফাতিহা',bnD:'৪র্থ রাকাত ৩য় রাকাতের মতোই করুন। দ্বিতীয় সিজদার পর চূড়ান্ত তাশাহহুদের জন্য বসুন।'},
      {t:'Final Tashahhud, Durood & Dua',d:'Recite At-Tahiyyat, then Durood Ibrahim, then Dua Masura, then give Salaam on both sides to end the prayer.',a:'السَّلَام',
        bnT:'চূড়ান্ত তাশাহহুদ, দরুদ ও দোয়া',bnD:'আত্তাহিয়্যাতু, তারপর দরুদ ইবরাহীম, তারপর দোয়া মাসুরা পড়ুন। তারপর ডানে ও বামে সালাম ফিরিয়ে নামাজ শেষ করুন।'},
    ]
  },
  {
    name:'Asr', bnName:'আসর', arabic:'العصر', emoji:'🌤️', rakaat:4, time:'Afternoon', bnTime:'বিকেলবেলা',
    bnDesc:'আসরের নামাজ ৪ রাকাত ফরজ। এটি কোনো বস্তুর ছায়া তার দ্বিগুণ হলে শুরু হয়। সূর্যাস্তের আগে পড়তে হবে। যোহরের মতোই পড়তে হয়।',
    steps:[
      {t:'Same Structure as Dhuhr',d:'Asr is performed identically to Dhuhr: 4 rakaats, silent recitation, middle Tashahhud after 2nd rakah, only Fatihah in 3rd and 4th rakaats.',a:'',
        bnT:'যোহরের মতো কাঠামো',bnD:'আসর নামাজ যোহরের মতোই: ৪ রাকাত, মনে মনে কিরাত, ২য় রাকাতের পর মধ্যবর্তী বৈঠক, ৩য় ও ৪র্থ রাকাতে শুধু সূরা ফাতিহা।'},
      {t:'1st & 2nd Rakaat — with Surah',d:'Recite Bismillah, Al-Fatihah, and an additional Surah silently in the first two rakaats. Perform Ruku and two Sajdahs. Sit for middle Tashahhud after 2nd rakah.',a:'',
        bnT:'১ম ও ২য় রাকাত — সূরাসহ',bnD:'প্রথম দুই রাকাতে বিসমিল্লাহ, সূরা ফাতিহা ও অতিরিক্ত সূরা চুপে চুপে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।'},
      {t:'3rd & 4th Rakaat — Fatihah Only',d:'In the 3rd and 4th rakaats, recite Bismillah and Fatihah only, silently. Perform Ruku and two Sajdahs. Then final Tashahhud, Durood, Dua, and Salaam.',a:'',
        bnT:'৩য় ও ৪র্থ রাকাত — শুধু ফাতিহা',bnD:'৩য় ও ৪র্থ রাকাতে বিসমিল্লাহ ও ফাতিহা চুপে চুপে পড়ুন। রুকু ও দুটি সিজদা করুন। চূড়ান্ত তাশাহহুদ, দরুদ, দোয়া, তারপর সালাম ফেরান।'},
      {t:'Timing Note',d:'Asr time begins when the shadow of an object equals twice its height (Hanafi) or once its height (Shafi'i). It ends at sunset. Never delay Asr until the sun turns yellow.',a:'وَقْتُ العَصْر',
        bnT:'সময় সংক্রান্ত বিশেষ নোট',bnD:'হানাফি মতে আসরের ওয়াক্ত শুরু হয় যখন কোনো বস্তুর ছায়া তার দ্বিগুণ হয়। শাফেয়ি মতে সমান হলেই। সূর্য হলুদ হওয়ার আগেই আসর পড়ুন। সূর্যাস্ত পর্যন্ত ওয়াক্ত থাকে তবে মাকরূহ।'},
    ]
  },
  {
    name:'Maghrib', bnName:'মাগরিব', arabic:'المغرب', emoji:'🌇', rakaat:3, time:'After sunset', bnTime:'সূর্যাস্তের পর',
    bnDesc:'মাগরিবের নামাজ ৩ রাকাত ফরজ। সূর্যাস্তের সাথে সাথে শুরু হয়। এটি উচ্চস্বরে পড়তে হয়।',
    steps:[
      {t:'First Two Rakaat — Aloud',d:'Recite Al-Fatihah and an additional Surah aloud (like Fajr). Perform Ruku and two Sajdahs for each rakah. After the 2nd rakah, sit for middle Tashahhud.',a:'',
        bnT:'প্রথম দুই রাকাত — উচ্চস্বরে',bnD:'ফজরের মতো সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। প্রতিটি রাকাতে রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।'},
      {t:'Third Rakaat — Fatihah Only (Aloud)',d:'Stand for the 3rd rakah. Recite only Bismillah and Al-Fatihah aloud (no additional Surah). Perform Ruku and two Sajdahs.',a:'الفَاتِحَة فَقَط',
        bnT:'তৃতীয় রাকাত — শুধু ফাতিহা',bnD:'"আল্লাহু আকবার" বলে উঠে দাঁড়ান। শুধু বিসমিল্লাহ ও সূরা ফাতিহা উচ্চস্বরে পড়ুন (অতিরিক্ত সূরা নেই)। রুকু ও দুটি সিজদা করুন।'},
      {t:'Final Tashahhud, Durood & Salaam',d:'After the second Sajdah of the 3rd rakah, sit for the final Tashahhud. Recite At-Tahiyyat, Durood Ibrahim, Dua Masura, then give Salaam.',a:'السَّلَام',
        bnT:'চূড়ান্ত তাশাহহুদ ও সালাম',bnD:'৩য় রাকাতের দ্বিতীয় সিজদার পর বসুন। আত্তাহিয়্যাতু, দরুদ ইবরাহীম, দোয়া মাসুরা পড়ে ডানে ও বামে সালাম ফেরান।'},
    ]
  },
  {
    name:'Isha', bnName:'ইশা', arabic:'العشاء', emoji:'🌃', rakaat:4, time:'Night', bnTime:'রাতে',
    bnDesc:'ইশার নামাজ ৪ রাকাত ফরজ। রাতের অন্ধকার ঘন হলে ওয়াক্ত শুরু হয়। প্রথম দুই রাকাত উচ্চস্বরে, শেষ দুই রাকাত চুপে পড়তে হয়।',
    steps:[
      {t:'First Two Rakaat — Aloud',d:'Recite Al-Fatihah and an additional Surah aloud in the first two rakaats. Perform Ruku and two Sajdahs. Sit for middle Tashahhud after 2nd rakah.',a:'',
        bnT:'প্রথম দুই রাকাত — উচ্চস্বরে',bnD:'প্রথম দুই রাকাতে সূরা ফাতিহা ও অতিরিক্ত সূরা উচ্চস্বরে পড়ুন। রুকু ও দুটি সিজদা করুন। ২য় রাকাতের পর মধ্যবর্তী বৈঠকে শুধু আত্তাহিয়্যাতু পড়ুন।'},
      {t:'3rd & 4th Rakaat — Silent, Fatihah Only',d:'In the 3rd and 4th rakaats, recite only Bismillah and Al-Fatihah silently. No additional Surah. Perform Ruku and Sajdahs. Then final Tashahhud and Salaam.',a:'',
        bnT:'৩য় ও ৪র্থ রাকাত — চুপে, শুধু ফাতিহা',bnD:'৩য় ও ৪র্থ রাকাতে শুধু বিসমিল্লাহ ও সূরা ফাতিহা চুপে পড়ুন। রুকু ও দুটি সিজদা করুন। চূড়ান্ত তাশাহহুদ, দরুদ, দোয়া পড়ে সালাম ফেরান।'},
      {t:'Witr Prayer (Wajib Sunnah)',d:'After Isha fard, pray 3 rakaat Witr. In the 3rd rakah, after Al-Fatihah and additional Surah, stand and say "Allahu Akbar" then recite Dua Qunoot before Ruku.',a:'صَلَاة الوِتْر',
        bnT:'বিতর নামাজ (ওয়াজিব)',bnD:'ইশার ফরজের পর ৩ রাকাত বিতর পড়ুন। ৩য় রাকাতে ফাতিহা ও সূরার পর রুকুর আগে "আল্লাহু আকবার" বলে হাত বেঁধে দোয়া কুনুত পড়ুন: "আল্লাহুম্মা ইন্না নাসতাইনুকা ওয়া নাসতাগফিরুকা ওয়া নুমিনু বিকা ওয়া নাতাওয়াক্কালু আলাইকা..."'},
    ]
  },
];

export default function LearnPage(){
  const{t,lang}=useLang();
  const[tab,setTab]=useState('wudu');
  const[sel,setSel]=useState(null);
  const[exp,setExp]=useState(null);
  const WUDU = lang==='bn' ? WUDU_BN : WUDU_EN;

  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px'}}>
    <div style={{paddingTop:56,paddingBottom:16}}>
      <h1 className="text-gold" style={{fontSize:28,fontWeight:800}}>{t('learn.title')}</h1>
      <p style={{color:'#6a7a8a',fontSize:14,marginTop:4}}>{t('learn.subtitle')}</p>
    </div>

    <div style={{display:'flex',gap:8,marginBottom:20}}>
      {['wudu','prayers'].map(tk=>(<button key={tk} onClick={()=>{setTab(tk);setSel(null);setExp(null)}} style={{flex:1,padding:'10px',borderRadius:12,border:'1px solid',cursor:'pointer',fontWeight:600,fontSize:13,transition:'all 0.2s',background:tab===tk?'linear-gradient(135deg,#1a6b4a,#0a3622)':'rgba(255,255,255,0.04)',color:tab===tk?'#f0d060':'#6a7a8a',borderColor:tab===tk?'rgba(201,162,39,0.4)':'rgba(255,255,255,0.08)'}}>{t('learn.tab.'+tk)}</button>))}
    </div>

    {tab==='wudu'&&(<div>
      <div className="card-gold" style={{padding:'14px 16px',marginBottom:16,textAlign:'center'}}>
        <div style={{fontFamily:'Amiri,serif',fontSize:18,color:'#f0d060',marginBottom:4}}>الوُضُوء</div>
        <div style={{fontSize:13,color:'#8a9aaa'}}>{t('learn.wudu.sub')}</div>
      </div>
      {WUDU.map(({n,t:title,d,a})=>(<div key={n} className="card" style={{marginBottom:10,padding:'14px 16px',display:'flex',gap:14,alignItems:'flex-start'}}>
        <div style={{width:32,height:32,borderRadius:'50%',background:'linear-gradient(135deg,#c9a227,#a07d1a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#040d1a',flexShrink:0}}>{n}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,color:'#fff',fontSize:14,marginBottom:3}}>{title}</div>
          <div style={{fontSize:12,color:'#8a9aaa',lineHeight:1.6}}>{d}</div>
          {a&&<div style={{fontFamily:'Amiri,serif',fontSize:16,color:'#c9a227',marginTop:6,textAlign:'right'}}>{a}</div>}
        </div>
      </div>))}
    </div>)}

    {tab==='prayers'&&!sel&&(<div>
      <div style={{fontSize:13,color:'#6a7a8a',marginBottom:12}}>{t('learn.select')}</div>
      {PRAYERS.map(p=>(<div key={p.name} className="card" onClick={()=>{setSel(p);setExp(null)}} style={{marginBottom:12,padding:'16px',cursor:'pointer',display:'flex',alignItems:'center',gap:14}}>
        <div style={{fontSize:32}}>{p.emoji}</div>
        <div style={{flex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <span style={{fontWeight:700,color:'#fff',fontSize:16}}>{lang==='bn'?p.bnName:p.name}</span>
            <span style={{fontFamily:'Amiri,serif',fontSize:18,color:'#c9a227'}}>{p.arabic}</span>
          </div>
          <div style={{fontSize:12,color:'#6a7a8a',marginTop:2}}>{p.rakaat} {t('learn.rakaat')} · {lang==='bn'?p.bnTime:p.time}</div>
          {lang==='bn'&&<div style={{fontSize:11,color:'#4a5a6a',marginTop:3,lineHeight:1.5}}>{p.bnDesc}</div>}
        </div>
        <div style={{color:'#c9a227',fontSize:18}}>›</div>
      </div>))}
    </div>)}

    {tab==='prayers'&&sel&&(<div>
      <button onClick={()=>{setSel(null);setExp(null)}} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#aaa',borderRadius:10,padding:'8px 14px',cursor:'pointer',marginBottom:16,fontSize:13}}>{t('learn.back')}</button>
      <div className="card-gold" style={{padding:'16px',marginBottom:16,textAlign:'center'}}>
        <div style={{fontSize:36}}>{sel.emoji}</div>
        <div style={{fontSize:22,fontWeight:800,color:'#fff',marginTop:4}}>{lang==='bn'?sel.bnName:sel.name}</div>
        <div style={{fontFamily:'Amiri,serif',fontSize:20,color:'#c9a227'}}>{sel.arabic}</div>
        <div style={{fontSize:13,color:'#8a9aaa'}}>{sel.rakaat} {t('learn.rakaat')} · {lang==='bn'?sel.bnTime:sel.time}</div>
        {lang==='bn'&&<div style={{fontSize:12,color:'#6a7a5a',marginTop:6,lineHeight:1.5}}>{sel.bnDesc}</div>}
      </div>

      {sel.steps.map((s,i)=>(<div key={i} className="card" style={{marginBottom:10,padding:'14px 16px',cursor:'pointer'}} onClick={()=>setExp(exp===i?null:i)}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:28,height:28,borderRadius:'50%',background:'rgba(201,162,39,0.15)',border:'1px solid rgba(201,162,39,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:700,color:'#c9a227',flexShrink:0}}>{i+1}</div>
          <div style={{flex:1,fontWeight:600,color:'#ddd',fontSize:14}}>{lang==='bn'?(s.bnT||s.t):s.t}</div>
          <div style={{color:'#c9a227',transition:'transform 0.2s',transform:exp===i?'rotate(90deg)':'none',fontSize:18}}>›</div>
        </div>
        {exp===i&&(<div style={{marginTop:12,paddingLeft:40}}>
          <div style={{fontSize:13,color:'#9aaa9a',lineHeight:1.7}}>{lang==='bn'?(s.bnD||s.d):s.d}</div>
          {s.a&&<div style={{fontFamily:'Amiri,serif',fontSize:20,color:'#c9a227',marginTop:10,textAlign:'right',lineHeight:2,padding:'8px 12px',background:'rgba(201,162,39,0.05)',borderRadius:10,borderRight:'3px solid rgba(201,162,39,0.3)'}}>{s.a}</div>}
        </div>)}
      </div>))}
    </div>)}
    <div style={{height:20}}/>
  </div>);
}