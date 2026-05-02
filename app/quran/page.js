'use client';
import { useState, useEffect } from 'react';
import { useLang } from '../../components/LangProvider';

const SURAHS = [
  {n:1,name:'Al-Fatihah',bn:'আল-ফাতিহা',ar:'الفاتحة',m:'The Opening',bm:'সূচনা',v:7},
  {n:2,name:'Al-Baqarah',bn:'আল-বাকারা',ar:'البقرة',m:'The Cow',bm:'গাভী',v:286},
  {n:3,name:"Ali 'Imran",bn:'আলে-ইমরান',ar:'آل عمران',m:'Family of Imran',bm:'ইমরানের পরিবার',v:200},
  {n:4,name:"An-Nisa",bn:'আন-নিসা',ar:'النساء',m:'The Women',bm:'নারী',v:176},
  {n:5,name:"Al-Ma'idah",bn:'আল-মায়িদা',ar:'المائدة',m:'The Table Spread',bm:'খাদ্য পরিবেশিত',v:120},
  {n:6,name:"Al-An'am",bn:'আল-আনআম',ar:'الأنعام',m:'The Cattle',bm:'গবাদিপশু',v:165},
  {n:7,name:"Al-A'raf",bn:'আল-আরাফ',ar:'الأعراف',m:'The Heights',bm:'উচ্চভূমি',v:206},
  {n:8,name:'Al-Anfal',bn:'আল-আনফাল',ar:'الأنفال',m:'The Spoils of War',bm:'যুদ্ধের গনিমত',v:75},
  {n:9,name:'At-Tawbah',bn:'আত-তাওবা',ar:'التوبة',m:'The Repentance',bm:'তওবা',v:129},
  {n:10,name:'Yunus',bn:'ইউনুস',ar:'يونس',m:'Jonah',bm:'ইউনুস',v:109},
  {n:11,name:'Hud',bn:'হুদ',ar:'هود',m:'Hud',bm:'হুদ',v:123},
  {n:12,name:'Yusuf',bn:'ইউসুফ',ar:'يوسف',m:'Joseph',bm:'ইউসুফ',v:111},
  {n:13,name:"Ar-Ra'd",bn:'আর-রাদ',ar:'الرعد',m:'The Thunder',bm:'বজ্রপাত',v:43},
  {n:14,name:'Ibrahim',bn:'ইবরাহীম',ar:'إبراهيم',m:'Abraham',bm:'ইবরাহীম',v:52},
  {n:15,name:'Al-Hijr',bn:'আল-হিজর',ar:'الحجر',m:'The Rocky Tract',bm:'পাথুরে ভূমি',v:99},
  {n:16,name:'An-Nahl',bn:'আন-নাহল',ar:'النحل',m:'The Bee',bm:'মৌমাছি',v:128},
  {n:17,name:"Al-Isra",bn:'আল-ইসরা',ar:'الإسراء',m:'The Night Journey',bm:'রাত্রিকালীন ভ্রমণ',v:111},
  {n:18,name:'Al-Kahf',bn:'আল-কাহফ',ar:'الكهف',m:'The Cave',bm:'গুহা',v:110},
  {n:19,name:'Maryam',bn:'মারিয়াম',ar:'مريم',m:'Mary',bm:'মারিয়াম',v:98},
  {n:20,name:'Ta-Ha',bn:'তা-হা',ar:'طه',m:'Ta-Ha',bm:'তা-হা',v:135},
  {n:21,name:"Al-Anbiya",bn:'আল-আম্বিয়া',ar:'الأنبياء',m:'The Prophets',bm:'নবীগণ',v:112},
  {n:22,name:'Al-Hajj',bn:'আল-হজ্জ',ar:'الحج',m:'The Pilgrimage',bm:'হজ্জ',v:78},
  {n:23,name:"Al-Mu'minun",bn:'আল-মুমিনুন',ar:'المؤمنون',m:'The Believers',bm:'মুমিনগণ',v:118},
  {n:24,name:'An-Nur',bn:'আন-নূর',ar:'النور',m:'The Light',bm:'আলো',v:64},
  {n:25,name:'Al-Furqan',bn:'আল-ফুরকান',ar:'الفرقان',m:'The Criterion',bm:'পার্থক্যকারী',v:77},
  {n:26,name:"Ash-Shu'ara",bn:'আশ-শুআরা',ar:'الشعراء',m:'The Poets',bm:'কবিগণ',v:227},
  {n:27,name:'An-Naml',bn:'আন-নামল',ar:'النمل',m:'The Ant',bm:'পিঁপড়া',v:93},
  {n:28,name:'Al-Qasas',bn:'আল-কাসাস',ar:'القصص',m:'The Stories',bm:'কাহিনী',v:88},
  {n:29,name:'Al-Ankabut',bn:'আল-আনকাবুত',ar:'العنكبوت',m:'The Spider',bm:'মাকড়সা',v:69},
  {n:30,name:'Ar-Rum',bn:'আর-রুম',ar:'الروم',m:'The Romans',bm:'রোমানগণ',v:60},
  {n:31,name:'Luqman',bn:'লুকমান',ar:'لقمان',m:'Luqman',bm:'লুকমান',v:34},
  {n:32,name:'As-Sajdah',bn:'আস-সাজদা',ar:'السجدة',m:'The Prostration',bm:'সিজদা',v:30},
  {n:33,name:'Al-Ahzab',bn:'আল-আহযাব',ar:'الأحزاب',m:'The Combined Forces',bm:'মিলিত বাহিনী',v:73},
  {n:34,name:"Saba",bn:'সাবা',ar:'سبأ',m:'Sheba',bm:'সাবা',v:54},
  {n:35,name:'Fatir',bn:'ফাতির',ar:'فاطر',m:'Originator',bm:'সৃষ্টিকর্তা',v:45},
  {n:36,name:'Ya-Sin',bn:'ইয়াসিন',ar:'يس',m:'Ya Sin',bm:'ইয়া সিন',v:83},
  {n:37,name:'As-Saffat',bn:'আস-সাফফাত',ar:'الصافات',m:'Those who set the Ranks',bm:'সারিবদ্ধগণ',v:182},
  {n:38,name:'Sad',bn:'সাদ',ar:'ص',m:'The Letter Sad',bm:'হরফ সাদ',v:88},
  {n:39,name:'Az-Zumar',bn:'আয-যুমার',ar:'الزمر',m:'The Troops',bm:'দলসমূহ',v:75},
  {n:40,name:'Ghafir',bn:'গাফির',ar:'غافر',m:'The Forgiver',bm:'ক্ষমাকারী',v:85},
  {n:41,name:'Fussilat',bn:'ফুসসিলাত',ar:'فصلت',m:'Explained in Detail',bm:'বিশদ ব্যাখ্যা',v:54},
  {n:42,name:'Ash-Shura',bn:'আশ-শূরা',ar:'الشورى',m:'The Consultation',bm:'পরামর্শ',v:53},
  {n:43,name:'Az-Zukhruf',bn:'আয-যুখরুফ',ar:'الزخرف',m:'The Gold Adornments',bm:'সোনার অলংকার',v:89},
  {n:44,name:'Ad-Dukhan',bn:'আদ-দুখান',ar:'الدخان',m:'The Smoke',bm:'ধোঁয়া',v:59},
  {n:45,name:'Al-Jathiyah',bn:'আল-জাসিয়া',ar:'الجاثية',m:'The Crouching',bm:'নতজানু',v:37},
  {n:46,name:'Al-Ahqaf',bn:'আল-আহকাফ',ar:'الأحقاف',m:'The Wind-Curved Sandhills',bm:'বালিয়াড়ি',v:35},
  {n:47,name:'Muhammad',bn:'মুহাম্মাদ',ar:'محمد',m:'Muhammad',bm:'মুহাম্মাদ',v:38},
  {n:48,name:'Al-Fath',bn:'আল-ফাতহ',ar:'الفتح',m:'The Victory',bm:'বিজয়',v:29},
  {n:49,name:'Al-Hujurat',bn:'আল-হুজুরাত',ar:'الحجرات',m:'The Rooms',bm:'কামরাসমূহ',v:18},
  {n:50,name:'Qaf',bn:'ক্বাফ',ar:'ق',m:'Qaf',bm:'ক্বাফ',v:45},
  {n:51,name:'Adh-Dhariyat',bn:'আয-যারিয়াত',ar:'الذاريات',m:'The Winnowing Winds',bm:'বিক্ষিপ্তকারী বায়ু',v:60},
  {n:52,name:'At-Tur',bn:'আত-তুর',ar:'الطور',m:'The Mount',bm:'পাহাড়',v:49},
  {n:53,name:'An-Najm',bn:'আন-নাজম',ar:'النجم',m:'The Star',bm:'তারা',v:62},
  {n:54,name:'Al-Qamar',bn:'আল-কামার',ar:'القمر',m:'The Moon',bm:'চাঁদ',v:55},
  {n:55,name:'Ar-Rahman',bn:'আর-রাহমান',ar:'الرحمن',m:'The Beneficent',bm:'পরম করুণাময়',v:78},
  {n:56,name:"Al-Waqi'ah",bn:'আল-ওয়াকিয়া',ar:'الواقعة',m:"The Inevitable",bm:'অবশ্যম্ভাবী',v:96},
  {n:57,name:'Al-Hadid',bn:'আল-হাদীদ',ar:'الحديد',m:'The Iron',bm:'লোহা',v:29},
  {n:58,name:'Al-Mujadila',bn:'আল-মুজাদালা',ar:'المجادلة',m:'The Pleading Woman',bm:'বিতর্ককারিণী',v:22},
  {n:59,name:'Al-Hashr',bn:'আল-হাশর',ar:'الحشر',m:'The Exile',bm:'নির্বাসন',v:24},
  {n:60,name:'Al-Mumtahanah',bn:'আল-মুমতাহানা',ar:'الممتحنة',m:'The Woman to be Examined',bm:'পরীক্ষিতা',v:13},
  {n:61,name:'As-Saf',bn:'আস-সাফ',ar:'الصف',m:'The Ranks',bm:'সারিবদ্ধ',v:14},
  {n:62,name:"Al-Jumu'ah",bn:'আল-জুমুআ',ar:'الجمعة',m:'Friday',bm:'জুমুআ',v:11},
  {n:63,name:'Al-Munafiqun',bn:'আল-মুনাফিকুন',ar:'المنافقون',m:'The Hypocrites',bm:'মুনাফিকগণ',v:11},
  {n:64,name:'At-Taghabun',bn:'আত-তাগাবুন',ar:'التغابن',m:'The Mutual Disillusion',bm:'পারস্পরিক প্রতারণা',v:18},
  {n:65,name:'At-Talaq',bn:'আত-তালাক',ar:'الطلاق',m:'The Divorce',bm:'তালাক',v:12},
  {n:66,name:'At-Tahrim',bn:'আত-তাহরীম',ar:'التحريم',m:'The Prohibition',bm:'নিষেধ',v:12},
  {n:67,name:'Al-Mulk',bn:'আল-মুলক',ar:'الملك',m:'The Sovereignty',bm:'রাজত্ব',v:30},
  {n:68,name:'Al-Qalam',bn:'আল-কালাম',ar:'القلم',m:'The Pen',bm:'কলম',v:52},
  {n:69,name:"Al-Haqqah",bn:'আল-হাক্কা',ar:'الحاقة',m:'The Reality',bm:'বাস্তবতা',v:52},
  {n:70,name:"Al-Ma'arij",bn:'আল-মাআরিজ',ar:'المعارج',m:'The Ascending Stairways',bm:'উর্ধ্বারোহণের পথ',v:44},
  {n:71,name:'Nuh',bn:'নূহ',ar:'نوح',m:'Noah',bm:'নূহ',v:28},
  {n:72,name:'Al-Jinn',bn:'আল-জিন',ar:'الجن',m:'The Jinn',bm:'জিন',v:28},
  {n:73,name:'Al-Muzzammil',bn:'আল-মুযযাম্মিল',ar:'المزمل',m:'The Enshrouded One',bm:'চাদরাবৃত',v:20},
  {n:74,name:'Al-Muddaththir',bn:'আল-মুদ্দাসির',ar:'المدثر',m:'The Cloaked One',bm:'বস্ত্রাবৃত',v:56},
  {n:75,name:'Al-Qiyamah',bn:'আল-কিয়ামা',ar:'القيامة',m:'The Resurrection',bm:'পুনরুত্থান',v:40},
  {n:76,name:'Al-Insan',bn:'আল-ইনসান',ar:'الإنسان',m:'The Man',bm:'মানুষ',v:31},
  {n:77,name:'Al-Mursalat',bn:'আল-মুরসালাত',ar:'المرسلات',m:'The Emissaries',bm:'প্রেরিত দূতগণ',v:50},
  {n:78,name:"An-Naba",bn:'আন-নাবা',ar:'النبأ',m:'The Tidings',bm:'সংবাদ',v:40},
  {n:79,name:"An-Nazi'at",bn:"আন-নাযিআত",ar:'النازعات',m:"Those who drag forth",bm:'আকর্ষণকারীগণ',v:46},
  {n:80,name:'Abasa',bn:'আবাসা',ar:'عبس',m:'He Frowned',bm:'ভ্রুকুটি করলেন',v:42},
  {n:81,name:'At-Takwir',bn:'আত-তাকভীর',ar:'التكوير',m:'The Overthrowing',bm:'আচ্ছাদন',v:29},
  {n:82,name:'Al-Infitar',bn:'আল-ইনফিতার',ar:'الانفطار',m:'The Cleaving',bm:'বিদীর্ণ',v:19},
  {n:83,name:'Al-Mutaffifin',bn:'আল-মুতাফফিফীন',ar:'المطففين',m:'The Defrauding',bm:'প্রতারকগণ',v:36},
  {n:84,name:'Al-Inshiqaq',bn:'আল-ইনশিকাক',ar:'الانشقاق',m:'The Sundering',bm:'বিভক্তকরণ',v:25},
  {n:85,name:'Al-Buruj',bn:'আল-বুরুজ',ar:'البروج',m:'The Mansions of the Stars',bm:'নক্ষত্রপুঞ্জ',v:22},
  {n:86,name:'At-Tariq',bn:'আত-তারিক',ar:'الطارق',m:'The Morning Star',bm:'ভোরের তারা',v:17},
  {n:87,name:"Al-A'la",bn:'আল-আলা',ar:'الأعلى',m:'The Most High',bm:'সর্বোচ্চ',v:19},
  {n:88,name:'Al-Ghashiyah',bn:'আল-গাশিয়া',ar:'الغاشية',m:'The Overwhelming',bm:'আচ্ছাদনকারী',v:26},
  {n:89,name:'Al-Fajr',bn:'আল-ফাজর',ar:'الفجر',m:'The Dawn',bm:'ভোর',v:30},
  {n:90,name:'Al-Balad',bn:'আল-বালাদ',ar:'البلد',m:'The City',bm:'নগর',v:20},
  {n:91,name:'Ash-Shams',bn:'আশ-শামস',ar:'الشمس',m:'The Sun',bm:'সূর্য',v:15},
  {n:92,name:'Al-Layl',bn:'আল-লাইল',ar:'الليل',m:'The Night',bm:'রাত',v:21},
  {n:93,name:'Ad-Duha',bn:'আদ-দুহা',ar:'الضحى',m:'The Morning Hours',bm:'পূর্বাহ্ণ',v:11},
  {n:94,name:'Ash-Sharh',bn:'আশ-শারহ',ar:'الشرح',m:'The Relief',bm:'প্রশান্তি',v:8},
  {n:95,name:'At-Tin',bn:'আত-তীন',ar:'التين',m:'The Fig',bm:'ডুমুর',v:8},
  {n:96,name:'Al-Alaq',bn:'আল-আলাক',ar:'العلق',m:'The Clot',bm:'রক্তপিণ্ড',v:19},
  {n:97,name:'Al-Qadr',bn:'আল-কদর',ar:'القدر',m:'The Power',bm:'মহিমান্বিত রাত',v:5},
  {n:98,name:'Al-Bayyinah',bn:'আল-বায়্যিনা',ar:'البينة',m:'The Clear Proof',bm:'স্পষ্ট প্রমাণ',v:8},
  {n:99,name:'Az-Zalzalah',bn:'আয-যালযালা',ar:'الزلزلة',m:'The Earthquake',bm:'ভূমিকম্প',v:8},
  {n:100,name:"Al-Adiyat",bn:'আল-আদিয়াত',ar:'العاديات',m:'The Coursers',bm:'দ্রুতগামী অশ্ব',v:11},
  {n:101,name:"Al-Qari'ah",bn:'আল-কারিআ',ar:'القارعة',m:'The Calamity',bm:'মহাবিপদ',v:11},
  {n:102,name:'At-Takathur',bn:'আত-তাকাসুর',ar:'التكاثر',m:'The Rivalry',bm:'প্রাচুর্যের প্রতিযোগিতা',v:8},
  {n:103,name:'Al-Asr',bn:'আল-আসর',ar:'العصر',m:'The Declining Day',bm:'যুগ',v:3},
  {n:104,name:'Al-Humazah',bn:'আল-হুমাযা',ar:'الهمزة',m:'The Traducer',bm:'পরনিন্দাকারী',v:9},
  {n:105,name:'Al-Fil',bn:'আল-ফীল',ar:'الفيل',m:'The Elephant',bm:'হাতি',v:5},
  {n:106,name:'Quraysh',bn:'কুরাইশ',ar:'قريش',m:'Quraysh',bm:'কুরাইশ',v:4},
  {n:107,name:"Al-Ma'un",bn:'আল-মাউন',ar:'الماعون',m:'The Small Kindnesses',bm:'ক্ষুদ্র সাহায্য',v:7},
  {n:108,name:'Al-Kawthar',bn:'আল-কাউসার',ar:'الكوثر',m:'The Abundance',bm:'প্রাচুর্য',v:3},
  {n:109,name:'Al-Kafirun',bn:'আল-কাফিরুন',ar:'الكافرون',m:'The Disbelievers',bm:'কাফিরগণ',v:6},
  {n:110,name:'An-Nasr',bn:'আন-নাসর',ar:'النصر',m:'The Divine Support',bm:'আল্লাহর সাহায্য',v:3},
  {n:111,name:'Al-Masad',bn:'আল-মাসাদ',ar:'المسد',m:'The Palm Fiber',bm:'খেজুরের আঁশ',v:5},
  {n:112,name:'Al-Ikhlas',bn:'আল-ইখলাস',ar:'الإخلاص',m:'The Sincerity',bm:'একনিষ্ঠতা',v:4},
  {n:113,name:'Al-Falaq',bn:'আল-ফালাক',ar:'الفلق',m:'The Daybreak',bm:'ভোরের আলো',v:5},
  {n:114,name:'An-Nas',bn:'আন-নাস',ar:'الناس',m:'Mankind',bm:'মানবজাতি',v:6},
];

export default function QuranPage(){
  const{t,lang}=useLang();
  const[sel,setSel]=useState(null);
  const[ayahs,setAyahs]=useState([]);
  const[loading,setLoading]=useState(false);
  const[bk,setBk]=useState([]);
  const[search,setSearch]=useState('');
  const[showBk,setShowBk]=useState(false);
  const[err,setErr]=useState(null);

  useEffect(()=>{setBk(JSON.parse(localStorage.getItem('np_bookmarks')||'[]'))},[]);

  async function loadSurah(s){
    setSel(s);setLoading(true);setErr(null);setAyahs([]);
    try{
      const edition = lang==='bn' ? 'bn.bengali' : 'en.asad';
      const[ar,tr]=await Promise.all([
        fetch('https://api.alquran.cloud/v1/surah/'+s.n),
        fetch('https://api.alquran.cloud/v1/surah/'+s.n+'/'+edition)
      ]);
      const[ad,td]=await Promise.all([ar.json(),tr.json()]);
      const aa=ad.data?.ayahs||[];
      const ta=td.data?.ayahs||[];
      setAyahs(aa.map((a,i)=>({...a,tr:ta[i]?.text||''})));
    }catch{setErr(lang==='bn'?'লোড করতে ব্যর্থ — ইন্টারনেট সংযোগ পরীক্ষা করুন':'Failed to load — check your connection')}
    setLoading(false);
  }

  function toggleBk(a){
    const k=sel.n+':'+a.numberInSurah;
    const ex=bk.find(b=>b.key===k);
    const u=ex?bk.filter(b=>b.key!==k):[...bk,{key:k,surah:lang==='bn'?sel.bn:sel.name,ayah:a.numberInSurah,arabic:a.text,tr:a.tr}];
    setBk(u);localStorage.setItem('np_bookmarks',JSON.stringify(u));
  }

  const filtered=SURAHS.filter(s=>
    s.name.toLowerCase().includes(search.toLowerCase())||
    s.bn.includes(search)||
    s.ar.includes(search)||
    String(s.n).includes(search)
  );

  return(<div style={{maxWidth:500,margin:'0 auto',padding:'0 16px'}}>
    <div style={{paddingTop:56,paddingBottom:16}}>
      <h1 className="text-gold" style={{fontSize:28,fontWeight:800}}>{t('quran.title')}</h1>
      <p style={{color:'#6a7a8a',fontSize:14,marginTop:4}}>{t('quran.subtitle')}</p>
    </div>

    {!sel&&!showBk&&(<div>
      <div style={{display:'flex',gap:8,marginBottom:12}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t('quran.search')} style={{flex:1,background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:12,padding:'10px 14px',color:'#fff',fontSize:14,outline:'none'}}/>
        <button onClick={()=>setShowBk(true)} style={{background:'rgba(201,162,39,0.12)',border:'1px solid rgba(201,162,39,0.25)',borderRadius:12,padding:'10px 14px',cursor:'pointer',fontSize:16}}>🔖</button>
      </div>
      <div style={{fontSize:11,color:'#5a6a7a',marginBottom:10,textAlign:'center'}}>{filtered.length} {lang==='bn'?'টি সূরা':'surahs'}</div>
      <div className="card-gold" style={{padding:'10px 16px',marginBottom:12,textAlign:'center'}}>
        <div style={{fontFamily:'Amiri,serif',fontSize:16,color:'#f0d060'}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
      </div>
      {filtered.map(s=>(<div key={s.n} className="card" onClick={()=>loadSurah(s)} style={{marginBottom:7,padding:'12px 14px',cursor:'pointer',display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:34,height:34,borderRadius:9,background:'rgba(201,162,39,0.12)',border:'1px solid rgba(201,162,39,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#c9a227',flexShrink:0}}>{s.n}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontWeight:700,color:'#fff',fontSize:14}}>{lang==='bn'?s.bn:s.name}</div>
          <div style={{fontSize:11,color:'#5a6a7a',marginTop:1}}>{lang==='bn'?s.bm:s.m} · {s.v} {t('quran.verses')}</div>
        </div>
        <div style={{fontFamily:'Amiri,serif',fontSize:17,color:'#c9a227',flexShrink:0}}>{s.ar}</div>
      </div>))}
      <div style={{textAlign:'center',padding:12,fontSize:12,color:'#4a5a6a'}}>{t('quran.tap')}</div>
    </div>)}

    {showBk&&(<div>
      <button onClick={()=>setShowBk(false)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#aaa',borderRadius:10,padding:'8px 14px',cursor:'pointer',marginBottom:16,fontSize:13}}>{t('quran.surah.back')}</button>
      <div style={{fontSize:14,fontWeight:700,color:'#c9a227',marginBottom:12}}>🔖 {t('quran.bookmarks')} ({bk.length})</div>
      {bk.length===0
        ?(<div className="card" style={{padding:'30px',textAlign:'center',color:'#5a6a7a',fontSize:13}}>{t('quran.no.bk')}</div>)
        :bk.map(b=>(<div key={b.key} className="ayah-card" style={{marginBottom:10}}>
          <div style={{fontSize:11,color:'#c9a227',fontWeight:600,marginBottom:6}}>{b.surah} · {t('quran.verse')} {b.ayah}</div>
          <div style={{fontFamily:'Amiri,serif',fontSize:22,color:'#f0d060',textAlign:'right',lineHeight:2,marginBottom:8}}>{b.arabic}</div>
          <div style={{fontSize:13,color:'#7a8a9a',lineHeight:1.7}}>{b.tr}</div>
        </div>))}
    </div>)}

    {sel&&(<div>
      <button onClick={()=>{setSel(null);setAyahs([])}} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',color:'#aaa',borderRadius:10,padding:'8px 14px',cursor:'pointer',marginBottom:16,fontSize:13}}>{t('quran.surah.back')}</button>
      <div className="card-gold" style={{padding:'16px',marginBottom:16,textAlign:'center'}}>
        <div style={{fontFamily:'Amiri,serif',fontSize:26,color:'#f0d060'}}>{sel.ar}</div>
        <div style={{fontSize:18,fontWeight:800,color:'#fff',marginTop:4}}>{lang==='bn'?sel.bn:sel.name}</div>
        <div style={{fontSize:12,color:'#8a9aaa'}}>{lang==='bn'?sel.bm:sel.m} · {sel.v} {t('quran.verses')}</div>
        {sel.n!==9&&<div style={{fontFamily:'Amiri,serif',fontSize:14,color:'#c9a227',marginTop:8}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>}
      </div>
      {loading&&Array(5).fill(0).map((_,i)=>(<div key={i} className="ayah-card" style={{marginBottom:10}}>
        <div className="skeleton" style={{height:50,marginBottom:8}}/>
        <div className="skeleton" style={{height:14,width:'75%'}}/>
      </div>))}
      {err&&<div style={{color:'#e07070',textAlign:'center',padding:20,fontSize:13}}>{err}</div>}
      {ayahs.map(a=>{
        const k=sel.n+':'+a.numberInSurah;
        const bked=bk.find(b=>b.key===k);
        return(<div key={a.numberInSurah} className="ayah-card" style={{marginBottom:10}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:'linear-gradient(135deg,#c9a227,#a07d1a)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#040d1a'}}>{a.numberInSurah}</div>
            <button onClick={()=>toggleBk(a)} style={{background:'none',border:'none',cursor:'pointer',fontSize:16,opacity:bked?1:0.4}}>🔖</button>
          </div>
          <div style={{fontFamily:'Amiri,serif',fontSize:22,color:'#f0d060',textAlign:'right',lineHeight:2,marginBottom:12}}>{a.text}</div>
          <div style={{fontSize:13,color:'#7a8a9a',lineHeight:1.7,borderTop:'1px solid rgba(255,255,255,0.05)',paddingTop:10}}>{a.tr}</div>
        </div>);
      })}
    </div>)}
    <div style={{height:20}}/>
  </div>);
}