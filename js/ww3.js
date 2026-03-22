// NukeMap - WW3 Simulation Module
// Full-scale nuclear war simulation with phased escalation, missile arcs, and target databases
window.NM = window.NM || {};

// ---- TARGET DATABASES ----

// US targets (what Russia/China would hit)
NM.WW3_TARGETS_US = [
  // ICBM Fields (highest priority counterforce)
  {name:'Malmstrom AFB',lat:47.506,lng:-111.183,type:'icbm',warheads:8,yieldKt:800,cat:'Minuteman III silos'},
  {name:'Minot AFB',lat:48.416,lng:-101.358,type:'icbm',warheads:8,yieldKt:800,cat:'Minuteman III silos'},
  {name:'F.E. Warren AFB',lat:41.145,lng:-104.862,type:'icbm',warheads:8,yieldKt:800,cat:'Minuteman III silos'},
  // Bomber Bases
  {name:'Barksdale AFB',lat:32.501,lng:-93.663,type:'bomber',warheads:2,yieldKt:800,cat:'B-52 base'},
  {name:'Whiteman AFB',lat:38.730,lng:-93.548,type:'bomber',warheads:2,yieldKt:800,cat:'B-2 base'},
  {name:'Dyess AFB',lat:32.421,lng:-99.855,type:'bomber',warheads:1,yieldKt:800,cat:'B-1B base'},
  {name:'Ellsworth AFB',lat:44.145,lng:-103.104,type:'bomber',warheads:1,yieldKt:800,cat:'B-1B base'},
  {name:'Tinker AFB',lat:35.415,lng:-97.396,type:'bomber',warheads:1,yieldKt:800,cat:'E-6B TACAMO'},
  // Submarine Bases
  {name:'Naval Base Kitsap (Bangor)',lat:47.729,lng:-122.714,type:'sub',warheads:3,yieldKt:800,cat:'Trident SSBN base'},
  {name:'Kings Bay Naval Base',lat:30.796,lng:-81.564,type:'sub',warheads:3,yieldKt:800,cat:'Trident SSBN base'},
  // Command & Control
  {name:'Pentagon',lat:38.871,lng:-77.056,type:'c2',warheads:2,yieldKt:800,cat:'DoD HQ'},
  {name:'NORAD (Cheyenne Mountain)',lat:38.744,lng:-104.846,type:'c2',warheads:2,yieldKt:800,cat:'Aerospace defense'},
  {name:'Offutt AFB (STRATCOM)',lat:41.118,lng:-95.913,type:'c2',warheads:2,yieldKt:800,cat:'Strategic Command'},
  {name:'Raven Rock (Site R)',lat:39.727,lng:-77.434,type:'c2',warheads:1,yieldKt:800,cat:'Alternate NCA'},
  {name:'Camp David',lat:39.648,lng:-77.465,type:'c2',warheads:1,yieldKt:300,cat:'Presidential retreat'},
  {name:'Peterson SFB',lat:38.823,lng:-104.700,type:'c2',warheads:1,yieldKt:800,cat:'Space Command'},
  {name:'Fort Meade (NSA)',lat:39.109,lng:-76.771,type:'c2',warheads:1,yieldKt:300,cat:'Intelligence HQ'},
  // Nuclear Infrastructure
  {name:'Pantex Plant (Amarillo)',lat:35.313,lng:-101.955,type:'nuclear',warheads:1,yieldKt:800,cat:'Warhead assembly'},
  {name:'Oak Ridge Y-12',lat:35.985,lng:-84.252,type:'nuclear',warheads:1,yieldKt:300,cat:'Uranium processing'},
  {name:'Los Alamos National Lab',lat:35.844,lng:-106.287,type:'nuclear',warheads:1,yieldKt:300,cat:'Weapons lab'},
  {name:'Savannah River Site',lat:33.340,lng:-81.740,type:'nuclear',warheads:1,yieldKt:300,cat:'Tritium production'},
  {name:'Lawrence Livermore',lat:37.687,lng:-121.707,type:'nuclear',warheads:1,yieldKt:300,cat:'Weapons lab'},
  {name:'Sandia National Lab',lat:35.058,lng:-106.541,type:'nuclear',warheads:1,yieldKt:300,cat:'Weapons engineering'},
  // Major Naval Installations
  {name:'Naval Station Norfolk',lat:36.946,lng:-76.312,type:'military',warheads:2,yieldKt:800,cat:'Largest naval base'},
  {name:'Naval Station San Diego',lat:32.684,lng:-117.129,type:'military',warheads:1,yieldKt:800,cat:'Pacific Fleet'},
  {name:'Pearl Harbor',lat:21.345,lng:-157.972,type:'military',warheads:1,yieldKt:800,cat:'Pacific Command'},
  {name:'Naval Station Mayport',lat:30.392,lng:-81.418,type:'military',warheads:1,yieldKt:300,cat:'Atlantic Fleet'},
  // Major Air Bases
  {name:'Nellis AFB',lat:36.236,lng:-115.034,type:'military',warheads:1,yieldKt:300,cat:'Air combat center'},
  {name:'Edwards AFB',lat:34.905,lng:-117.884,type:'military',warheads:1,yieldKt:300,cat:'Test & eval'},
  {name:'Wright-Patterson AFB',lat:39.826,lng:-84.048,type:'military',warheads:1,yieldKt:300,cat:'Air Force R&D'},
  // Top 30 Cities (countervalue)
  {name:'New York City',lat:40.713,lng:-74.006,type:'city',warheads:6,yieldKt:800,cat:'Pop: 8.3M'},
  {name:'Los Angeles',lat:34.052,lng:-118.244,type:'city',warheads:4,yieldKt:800,cat:'Pop: 3.9M'},
  {name:'Chicago',lat:41.878,lng:-87.630,type:'city',warheads:4,yieldKt:800,cat:'Pop: 2.7M'},
  {name:'Houston',lat:29.760,lng:-95.370,type:'city',warheads:3,yieldKt:800,cat:'Pop: 2.3M'},
  {name:'Phoenix',lat:33.449,lng:-112.074,type:'city',warheads:2,yieldKt:800,cat:'Pop: 1.6M'},
  {name:'Philadelphia',lat:39.953,lng:-75.164,type:'city',warheads:3,yieldKt:800,cat:'Pop: 1.6M'},
  {name:'San Antonio',lat:29.424,lng:-98.494,type:'city',warheads:2,yieldKt:800,cat:'Pop: 1.4M'},
  {name:'San Diego',lat:32.716,lng:-117.161,type:'city',warheads:2,yieldKt:800,cat:'Pop: 1.4M'},
  {name:'Dallas',lat:32.777,lng:-96.797,type:'city',warheads:3,yieldKt:800,cat:'Pop: 1.3M'},
  {name:'San Jose',lat:37.338,lng:-121.886,type:'city',warheads:2,yieldKt:800,cat:'Pop: 1.0M'},
  {name:'Austin',lat:30.267,lng:-97.743,type:'city',warheads:1,yieldKt:800,cat:'Pop: 979K'},
  {name:'Jacksonville',lat:30.332,lng:-81.656,type:'city',warheads:1,yieldKt:300,cat:'Pop: 950K'},
  {name:'San Francisco',lat:37.775,lng:-122.419,type:'city',warheads:3,yieldKt:800,cat:'Pop: 874K'},
  {name:'Columbus',lat:39.961,lng:-83.003,type:'city',warheads:1,yieldKt:300,cat:'Pop: 906K'},
  {name:'Indianapolis',lat:39.768,lng:-86.158,type:'city',warheads:1,yieldKt:300,cat:'Pop: 887K'},
  {name:'Seattle',lat:47.606,lng:-122.332,type:'city',warheads:2,yieldKt:800,cat:'Pop: 737K'},
  {name:'Denver',lat:39.739,lng:-104.990,type:'city',warheads:2,yieldKt:800,cat:'Pop: 716K'},
  {name:'Washington DC',lat:38.907,lng:-77.037,type:'city',warheads:4,yieldKt:800,cat:'Capital'},
  {name:'Nashville',lat:36.163,lng:-86.781,type:'city',warheads:1,yieldKt:300,cat:'Pop: 689K'},
  {name:'Boston',lat:42.360,lng:-71.059,type:'city',warheads:2,yieldKt:800,cat:'Pop: 675K'},
  {name:'Atlanta',lat:33.749,lng:-84.388,type:'city',warheads:2,yieldKt:800,cat:'Pop: 499K'},
  {name:'Miami',lat:25.762,lng:-80.192,type:'city',warheads:2,yieldKt:800,cat:'Pop: 442K'},
  {name:'Minneapolis',lat:44.978,lng:-93.265,type:'city',warheads:1,yieldKt:300,cat:'Pop: 429K'},
  {name:'Detroit',lat:42.331,lng:-83.046,type:'city',warheads:2,yieldKt:800,cat:'Pop: 639K'},
  {name:'Portland',lat:45.523,lng:-122.677,type:'city',warheads:1,yieldKt:300,cat:'Pop: 653K'},
  {name:'Las Vegas',lat:36.170,lng:-115.139,type:'city',warheads:1,yieldKt:300,cat:'Pop: 641K'},
  {name:'Baltimore',lat:39.290,lng:-76.612,type:'city',warheads:1,yieldKt:300,cat:'Pop: 586K'},
  {name:'St. Louis',lat:38.627,lng:-90.199,type:'city',warheads:1,yieldKt:300,cat:'Pop: 301K'},
  {name:'Pittsburgh',lat:40.441,lng:-79.996,type:'city',warheads:1,yieldKt:300,cat:'Pop: 303K'},
  {name:'Honolulu',lat:21.307,lng:-157.858,type:'city',warheads:1,yieldKt:300,cat:'Pop: 350K'},
];

// Russian targets (what US/NATO would hit)
NM.WW3_TARGETS_RU = [
  // ICBM Fields
  {name:'Kozelsk (Yars silos)',lat:54.035,lng:36.013,type:'icbm',warheads:6,yieldKt:455,cat:'SS-27 Mod 2'},
  {name:'Tatishchevo (Topol-M)',lat:51.700,lng:45.537,type:'icbm',warheads:6,yieldKt:455,cat:'SS-27 Mod 1'},
  {name:'Dombarovsky (Avangard)',lat:51.049,lng:59.853,type:'icbm',warheads:6,yieldKt:455,cat:'SS-19 Mod 4'},
  {name:'Uzhur (Sarmat)',lat:55.114,lng:89.634,type:'icbm',warheads:6,yieldKt:455,cat:'RS-28 Sarmat'},
  {name:'Kartaly',lat:53.033,lng:60.650,type:'icbm',warheads:4,yieldKt:455,cat:'SS-18 silos'},
  {name:'Aleysk',lat:52.483,lng:82.783,type:'icbm',warheads:4,yieldKt:455,cat:'SS-18 silos'},
  // Mobile ICBM Bases
  {name:'Teykovo (Yars mobile)',lat:56.883,lng:40.517,type:'icbm',warheads:3,yieldKt:455,cat:'SS-27 mobile'},
  {name:'Yoshkar-Ola (Yars)',lat:56.633,lng:47.867,type:'icbm',warheads:3,yieldKt:455,cat:'SS-27 mobile'},
  {name:'Novosibirsk (Yars)',lat:55.033,lng:82.917,type:'icbm',warheads:3,yieldKt:455,cat:'SS-27 mobile'},
  {name:'Nizhny Tagil (Yars)',lat:57.917,lng:60.067,type:'icbm',warheads:3,yieldKt:455,cat:'SS-27 mobile'},
  {name:'Irkutsk (Yars)',lat:52.267,lng:104.267,type:'icbm',warheads:2,yieldKt:455,cat:'SS-27 mobile'},
  {name:'Barnaul (Yars)',lat:53.350,lng:83.767,type:'icbm',warheads:2,yieldKt:455,cat:'SS-27 mobile'},
  // Submarine Bases
  {name:'Gadzhiyevo (Northern Fleet)',lat:69.250,lng:33.317,type:'sub',warheads:3,yieldKt:455,cat:'Delta IV / Borei SSBN'},
  {name:'Vilyuchinsk (Pacific Fleet)',lat:52.927,lng:158.400,type:'sub',warheads:3,yieldKt:455,cat:'Borei SSBN'},
  // Bomber Bases
  {name:'Engels-2 AFB',lat:51.483,lng:46.200,type:'bomber',warheads:3,yieldKt:455,cat:'Tu-160 / Tu-95MS'},
  {name:'Ukrainka AFB',lat:51.167,lng:128.417,type:'bomber',warheads:2,yieldKt:455,cat:'Tu-95MS'},
  // Command & Control
  {name:'Kremlin (Moscow)',lat:55.752,lng:37.617,type:'c2',warheads:4,yieldKt:455,cat:'National command'},
  {name:'Kosvinsky Mountain',lat:59.533,lng:59.067,type:'c2',warheads:2,yieldKt:455,cat:'Dead Hand backup'},
  {name:'Yamantau Mountain',lat:54.750,lng:58.100,type:'c2',warheads:2,yieldKt:455,cat:'Strategic bunker'},
  {name:'General Staff (Moscow)',lat:55.753,lng:37.609,type:'c2',warheads:1,yieldKt:455,cat:'Military HQ'},
  // Major Military
  {name:'Plesetsk Cosmodrome',lat:62.928,lng:40.577,type:'military',warheads:2,yieldKt:455,cat:'Space/missile test'},
  {name:'Kaliningrad (Iskander)',lat:54.714,lng:20.452,type:'military',warheads:2,yieldKt:455,cat:'Western exclave'},
  {name:'Severomorsk (N. Fleet HQ)',lat:69.067,lng:33.417,type:'military',warheads:2,yieldKt:455,cat:'Northern Fleet'},
  {name:'Vladivostok (Pac. Fleet)',lat:43.116,lng:131.887,type:'military',warheads:2,yieldKt:455,cat:'Pacific Fleet'},
  {name:'Murmansk',lat:68.958,lng:33.083,type:'military',warheads:1,yieldKt:300,cat:'Naval complex'},
  // Top 15 Cities
  {name:'Moscow',lat:55.756,lng:37.617,type:'city',warheads:8,yieldKt:455,cat:'Pop: 12.6M'},
  {name:'Saint Petersburg',lat:59.934,lng:30.336,type:'city',warheads:5,yieldKt:455,cat:'Pop: 5.4M'},
  {name:'Novosibirsk',lat:55.008,lng:82.935,type:'city',warheads:2,yieldKt:455,cat:'Pop: 1.6M'},
  {name:'Yekaterinburg',lat:56.839,lng:60.607,type:'city',warheads:2,yieldKt:455,cat:'Pop: 1.5M'},
  {name:'Nizhny Novgorod',lat:56.296,lng:43.936,type:'city',warheads:2,yieldKt:455,cat:'Pop: 1.3M'},
  {name:'Kazan',lat:55.796,lng:49.106,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.3M'},
  {name:'Chelyabinsk',lat:55.160,lng:61.403,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.2M'},
  {name:'Samara',lat:53.196,lng:50.101,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.2M'},
  {name:'Omsk',lat:54.990,lng:73.369,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.2M'},
  {name:'Rostov-on-Don',lat:47.222,lng:39.718,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.1M'},
  {name:'Ufa',lat:54.735,lng:55.959,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.1M'},
  {name:'Krasnoyarsk',lat:56.010,lng:92.852,type:'city',warheads:1,yieldKt:455,cat:'Pop: 1.1M'},
  {name:'Perm',lat:58.010,lng:56.229,type:'city',warheads:1,yieldKt:300,cat:'Pop: 1.0M'},
  {name:'Voronezh',lat:51.672,lng:39.184,type:'city',warheads:1,yieldKt:300,cat:'Pop: 1.0M'},
  {name:'Volgograd',lat:48.708,lng:44.514,type:'city',warheads:1,yieldKt:300,cat:'Pop: 1.0M'},
];

// NATO Europe targets (what Russia would hit)
NM.WW3_TARGETS_NATO = [
  // Nuclear sharing bases
  {name:'Buchel AB (Germany)',lat:50.174,lng:7.063,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  {name:'Kleine Brogel AB (Belgium)',lat:51.168,lng:5.470,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  {name:'Volkel AB (Netherlands)',lat:51.657,lng:5.708,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  {name:'Aviano AB (Italy)',lat:46.032,lng:12.597,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  {name:'Ghedi AB (Italy)',lat:45.432,lng:10.277,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  {name:'Incirlik AB (Turkey)',lat:37.002,lng:35.426,type:'nuclear',warheads:2,yieldKt:300,cat:'B61 storage'},
  // NATO military HQ
  {name:'SHAPE (Mons)',lat:50.504,lng:3.860,type:'c2',warheads:2,yieldKt:300,cat:'NATO military HQ'},
  {name:'Ramstein AB (Germany)',lat:49.437,lng:7.600,type:'military',warheads:2,yieldKt:300,cat:'USAFE HQ'},
  {name:'RAF Lakenheath (UK)',lat:52.409,lng:0.561,type:'military',warheads:2,yieldKt:300,cat:'USAF F-35 base'},
  {name:'RAF Fairford (UK)',lat:51.682,lng:-1.790,type:'bomber',warheads:1,yieldKt:300,cat:'B-52 forward base'},
  // UK nuclear
  {name:'HMNB Clyde (Faslane)',lat:56.063,lng:-4.819,type:'sub',warheads:3,yieldKt:300,cat:'Vanguard SSBN'},
  {name:'AWE Aldermaston (UK)',lat:51.356,lng:-1.147,type:'nuclear',warheads:1,yieldKt:300,cat:'UK warhead facility'},
  // French nuclear
  {name:'Ile Longue (France)',lat:48.284,lng:-4.521,type:'sub',warheads:3,yieldKt:300,cat:'Triomphant SSBN'},
  {name:'BA 113 Saint-Dizier',lat:48.636,lng:4.900,type:'bomber',warheads:1,yieldKt:300,cat:'ASMP-A Rafales'},
  // European capitals / cities
  {name:'London',lat:51.507,lng:-0.128,type:'city',warheads:4,yieldKt:800,cat:'Pop: 9.0M'},
  {name:'Paris',lat:48.857,lng:2.352,type:'city',warheads:3,yieldKt:800,cat:'Pop: 2.2M'},
  {name:'Berlin',lat:52.520,lng:13.405,type:'city',warheads:2,yieldKt:800,cat:'Pop: 3.6M'},
  {name:'Warsaw',lat:52.230,lng:21.012,type:'city',warheads:2,yieldKt:800,cat:'Pop: 1.8M'},
  {name:'Rome',lat:41.902,lng:12.496,type:'city',warheads:2,yieldKt:800,cat:'Pop: 2.9M'},
  {name:'Madrid',lat:40.417,lng:-3.704,type:'city',warheads:1,yieldKt:800,cat:'Pop: 3.2M'},
  {name:'Bucharest',lat:44.426,lng:26.103,type:'city',warheads:1,yieldKt:300,cat:'Pop: 1.8M'},
  {name:'Amsterdam',lat:52.370,lng:4.895,type:'city',warheads:1,yieldKt:300,cat:'Pop: 872K'},
  {name:'Brussels',lat:50.850,lng:4.352,type:'city',warheads:1,yieldKt:300,cat:'Pop: 1.2M'},
  {name:'Oslo',lat:59.914,lng:10.752,type:'city',warheads:1,yieldKt:300,cat:'Pop: 697K'},
  {name:'Copenhagen',lat:55.676,lng:12.569,type:'city',warheads:1,yieldKt:300,cat:'Pop: 794K'},
];

// Chinese targets (what US would hit)
NM.WW3_TARGETS_CN = [
  {name:'Beijing',lat:39.904,lng:116.407,type:'city',warheads:5,yieldKt:455,cat:'Capital, pop: 21M'},
  {name:'Shanghai',lat:31.230,lng:121.474,type:'city',warheads:4,yieldKt:455,cat:'Pop: 24M'},
  {name:'Guangzhou',lat:23.130,lng:113.264,type:'city',warheads:2,yieldKt:455,cat:'Pop: 15M'},
  {name:'Shenzhen',lat:22.543,lng:114.058,type:'city',warheads:2,yieldKt:455,cat:'Pop: 12M'},
  {name:'Chengdu',lat:30.573,lng:104.066,type:'city',warheads:2,yieldKt:455,cat:'Pop: 16M'},
  {name:'Wuhan',lat:30.593,lng:114.306,type:'city',warheads:2,yieldKt:455,cat:'Pop: 12M'},
  {name:'Tianjin',lat:39.084,lng:117.201,type:'city',warheads:2,yieldKt:455,cat:'Pop: 14M'},
  {name:'Xian',lat:34.264,lng:108.943,type:'city',warheads:1,yieldKt:455,cat:'Pop: 13M'},
  {name:'Nanjing',lat:32.061,lng:118.797,type:'city',warheads:1,yieldKt:455,cat:'Pop: 9M'},
  {name:'Chongqing',lat:29.563,lng:106.552,type:'city',warheads:2,yieldKt:455,cat:'Pop: 32M metro'},
  // Chinese ICBM/military
  {name:'Jianshui ICBM (Yunnan)',lat:23.633,lng:102.850,type:'icbm',warheads:3,yieldKt:455,cat:'DF-31AG silos'},
  {name:'Yumen ICBM field',lat:40.283,lng:97.033,type:'icbm',warheads:4,yieldKt:455,cat:'DF-41 silos (120 new)'},
  {name:'Hami ICBM field',lat:42.800,lng:93.500,type:'icbm',warheads:4,yieldKt:455,cat:'DF-41 silos (110 new)'},
  {name:'Sundian ICBM field',lat:39.717,lng:101.750,type:'icbm',warheads:3,yieldKt:455,cat:'DF-41 silos'},
  {name:'Yulin Naval Base (Hainan)',lat:18.226,lng:109.531,type:'sub',warheads:3,yieldKt:455,cat:'Jin-class SSBN'},
  {name:'Qingdao Naval Base',lat:36.067,lng:120.383,type:'military',warheads:2,yieldKt:455,cat:'North Sea Fleet'},
  {name:'Zhanjiang Naval Base',lat:21.200,lng:110.383,type:'military',warheads:1,yieldKt:300,cat:'South Sea Fleet'},
];

// Launch origins (for missile arcs)
NM.WW3_LAUNCHERS = {
  us_icbm: [{lat:47.506,lng:-111.183,name:'Malmstrom'},{lat:48.416,lng:-101.358,name:'Minot'},{lat:41.145,lng:-104.862,name:'Warren'}],
  us_slbm: [{lat:58.0,lng:-30.0,name:'Atlantic SSBN'},{lat:35.0,lng:160.0,name:'Pacific SSBN'}],
  ru_icbm: [{lat:54.035,lng:36.013,name:'Kozelsk'},{lat:51.700,lng:45.537,name:'Tatishchevo'},{lat:51.049,lng:59.853,name:'Dombarovsky'},{lat:55.114,lng:89.634,name:'Uzhur'}],
  ru_slbm: [{lat:72.0,lng:35.0,name:'Barents SSBN'},{lat:50.0,lng:155.0,name:'Pacific SSBN'}],
  cn_icbm: [{lat:40.283,lng:97.033,name:'Yumen'},{lat:42.800,lng:93.500,name:'Hami'}],
};

// ---- SCENARIO DEFINITIONS ----
NM.WW3_SCENARIOS = [
  {
    id: 'us_ru_full',
    name: 'US vs Russia (Full Exchange)',
    desc: 'Princeton Plan A-style escalation: counterforce then countervalue',
    phases: [
      {name:'Phase 1: Counterforce',delay:0,duration:20000,side:'both',filter:t=>t.type!=='city',color:'#f38ba8'},
      {name:'Phase 2: Countervalue',delay:35000,duration:25000,side:'both',filter:t=>t.type==='city',color:'#fab387'},
    ],
    targetSets: {us: NM.WW3_TARGETS_US, ru: NM.WW3_TARGETS_RU},
    launchSets: {us: ['us_icbm','us_slbm'], ru: ['ru_icbm','ru_slbm']},
  },
  {
    id: 'ru_nato',
    name: 'Russia vs NATO Europe',
    desc: 'Russian strike on NATO bases and European capitals',
    phases: [
      {name:'Phase 1: NATO bases',delay:0,duration:18000,side:'ru',filter:t=>t.type!=='city',color:'#f38ba8'},
      {name:'Phase 2: European cities',delay:30000,duration:20000,side:'ru',filter:t=>t.type==='city',color:'#fab387'},
    ],
    targetSets: {nato: NM.WW3_TARGETS_NATO},
    launchSets: {ru: ['ru_icbm','ru_slbm']},
  },
  {
    id: 'us_cn',
    name: 'US vs China',
    desc: 'US counterforce strike on Chinese nuclear assets + cities',
    phases: [
      {name:'Phase 1: Chinese nuclear forces',delay:0,duration:18000,side:'us',filter:t=>t.type!=='city',color:'#89b4fa'},
      {name:'Phase 2: Chinese cities',delay:30000,duration:20000,side:'us',filter:t=>t.type==='city',color:'#fab387'},
    ],
    targetSets: {cn: NM.WW3_TARGETS_CN},
    launchSets: {us: ['us_icbm','us_slbm']},
  },
  {
    id: 'counterforce_only',
    name: 'Counterforce Only (US-Russia)',
    desc: 'Military targets only - no cities struck',
    phases: [
      {name:'Counterforce exchange',delay:0,duration:25000,side:'both',filter:t=>t.type!=='city',color:'#cba6f7'},
    ],
    targetSets: {us: NM.WW3_TARGETS_US, ru: NM.WW3_TARGETS_RU},
    launchSets: {us: ['us_icbm','us_slbm'], ru: ['ru_icbm','ru_slbm']},
  },
  {
    id: 'global',
    name: 'Global Thermonuclear War',
    desc: 'All nuclear powers launch everything. Worst case.',
    phases: [
      {name:'Phase 1: Counterforce',delay:0,duration:25000,side:'both',filter:t=>t.type!=='city',color:'#f38ba8'},
      {name:'Phase 2: All cities',delay:40000,duration:30000,side:'both',filter:t=>t.type==='city',color:'#fab387'},
    ],
    targetSets: {us: NM.WW3_TARGETS_US, ru: NM.WW3_TARGETS_RU, nato: NM.WW3_TARGETS_NATO, cn: NM.WW3_TARGETS_CN},
    launchSets: {us: ['us_icbm','us_slbm'], ru: ['ru_icbm','ru_slbm'], cn: ['cn_icbm']},
  },
];

// ---- GREAT CIRCLE MATH ----
function gcInterpolate(lat1, lng1, lat2, lng2, steps) {
  const toRad = d => d * Math.PI / 180, toDeg = r => r * 180 / Math.PI;
  const f1 = toRad(lat1), l1 = toRad(lng1), f2 = toRad(lat2), l2 = toRad(lng2);
  const d = 2 * Math.asin(Math.sqrt(
    Math.pow(Math.sin((f2 - f1) / 2), 2) + Math.cos(f1) * Math.cos(f2) * Math.pow(Math.sin((l2 - l1) / 2), 2)
  ));
  if (d < 0.0001) return [[lat1, lng1], [lat2, lng2]];
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const a = Math.sin((1 - f) * d) / Math.sin(d);
    const b = Math.sin(f * d) / Math.sin(d);
    const x = a * Math.cos(f1) * Math.cos(l1) + b * Math.cos(f2) * Math.cos(l2);
    const y = a * Math.cos(f1) * Math.sin(l1) + b * Math.cos(f2) * Math.sin(l2);
    const z = a * Math.sin(f1) + b * Math.sin(f2);
    pts.push([toDeg(Math.atan2(z, Math.sqrt(x * x + y * y))), toDeg(Math.atan2(y, x))]);
  }
  return pts;
}

function gcDistance(lat1, lng1, lat2, lng2) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dF = toRad(lat2 - lat1), dL = toRad(lng2 - lng1);
  const a = Math.sin(dF / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dL / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---- SIMULATION ENGINE ----
NM.WW3 = {
  active: false,
  paused: false,
  layers: [],
  markers: [],
  arcs: [],
  timers: [],
  casualties: {deaths: 0, injuries: 0},
  startTime: 0,
  statsInterval: null,
  _scenario: null,

  start(map, scenarioId) {
    this.stop(map);
    const scenario = NM.WW3_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return;
    this._scenario = scenario;
    this.active = true;
    this.paused = false;
    this.casualties = {deaths: 0, injuries: 0};
    this.startTime = performance.now();

    // Place all target markers first
    this._placeTargetMarkers(map, scenario);

    // Zoom to fit
    if (scenarioId === 'global' || scenarioId === 'us_ru_full') map.flyTo([35, 0], 3, {duration: 1.5});
    else if (scenarioId === 'ru_nato') map.flyTo([52, 10], 4, {duration: 1.5});
    else if (scenarioId === 'us_cn') map.flyTo([30, 140], 3, {duration: 1.5});
    else if (scenarioId === 'counterforce_only') map.flyTo([50, -20], 3, {duration: 1.5});

    // Start phases
    for (const phase of scenario.phases) {
      const tid = setTimeout(() => {
        if (!this.active) return;
        this._executePhase(map, scenario, phase);
      }, phase.delay + 2000); // +2s for zoom
      this.timers.push(tid);
    }

    // Live stats update
    this.statsInterval = setInterval(() => this._updateStats(), 250);
    this._updateStatus(scenario.phases[0].name);
  },

  _placeTargetMarkers(map, scenario) {
    const typeColors = {icbm:'#f38ba8',sub:'#89b4fa',bomber:'#cba6f7',c2:'#f9e2af',nuclear:'#fab387',military:'#94e2d5',city:'#f5c2e7'};

    for (const [, targets] of Object.entries(scenario.targetSets)) {
      for (const t of targets) {
        const r = t.type === 'city' ? 4 : 3;
        const color = typeColors[t.type] || '#cdd6f4';
        const m = L.circleMarker([t.lat, t.lng], {
          radius: r, color, fillColor: color, fillOpacity: 0.3, weight: 1, opacity: 0.5,
          className: 'ww3-target'
        }).bindTooltip(`<b>${t.name}</b><br>${t.cat}<br>${t.warheads} warhead${t.warheads>1?'s':''} x ${NM.fmtYield(t.yieldKt)}`, {
          className: 'test-tooltip'
        }).addTo(map);
        this.markers.push(m);
      }
    }
  },

  _executePhase(map, scenario, phase) {
    if (!this.active) return;
    this._updateStatus(phase.name);

    // Collect targets for this phase from ALL sides simultaneously
    const allTargets = [];
    for (const [side, targets] of Object.entries(scenario.targetSets)) {
      const filtered = targets.filter(phase.filter);
      let attackerKeys;
      if (side === 'us') attackerKeys = scenario.launchSets.ru ? ['ru'] : (scenario.launchSets.cn ? ['cn'] : []);
      else if (side === 'ru') attackerKeys = scenario.launchSets.us ? ['us'] : [];
      else if (side === 'nato') attackerKeys = scenario.launchSets.ru ? ['ru'] : [];
      else if (side === 'cn') attackerKeys = scenario.launchSets.us ? ['us'] : [];
      else attackerKeys = Object.keys(scenario.launchSets);

      for (const t of filtered) {
        const attackerKey = attackerKeys[Math.floor(Math.random() * attackerKeys.length)];
        const launcherSets = scenario.launchSets[attackerKey];
        if (!launcherSets) continue;
        const launcherSetKey = launcherSets[Math.floor(Math.random() * launcherSets.length)];
        const launchers = NM.WW3_LAUNCHERS[launcherSetKey];
        if (!launchers || !launchers.length) continue;
        const launcher = launchers[Math.floor(Math.random() * launchers.length)];

        for (let w = 0; w < t.warheads; w++) {
          const offLat = t.warheads > 1 ? (Math.random() - 0.5) * 0.1 : 0;
          const offLng = t.warheads > 1 ? (Math.random() - 0.5) * 0.1 : 0;
          allTargets.push({
            target: t, launcher, side,
            tLat: t.lat + offLat, tLng: t.lng + offLng,
            yieldKt: t.yieldKt
          });
        }
      }
    }

    // Shuffle so both sides' missiles interleave (simultaneous launch)
    for (let i = allTargets.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTargets[i], allTargets[j]] = [allTargets[j], allTargets[i]];
    }

    // Stagger launches across the phase - all sides launch within the first ~40% of phase
    const launchWindow = phase.duration * 0.4;
    allTargets.forEach((at, i) => {
      const delay = (i / allTargets.length) * launchWindow + Math.random() * 600;
      const tid = setTimeout(() => {
        if (!this.active) return;
        this._launchMissile(map, at, phase.color);
      }, delay);
      this.timers.push(tid);
    });
  },

  _launchMissile(map, at, color) {
    const dist = gcDistance(at.launcher.lat, at.launcher.lng, at.tLat, at.tLng);
    const isSlbm = at.launcher.name.includes('SSBN') || at.launcher.name.includes('Atlantic') || at.launcher.name.includes('Pacific');
    // Much slower: ICBM 10-14s, SLBM 7-10s so you can watch them fly
    const flightMs = isSlbm
      ? 7000 + Math.min(dist / 2, 3000)
      : 10000 + Math.min(dist / 2, 4000);
    const steps = 60;
    const pts = gcInterpolate(at.launcher.lat, at.launcher.lng, at.tLat, at.tLng, steps);

    // Arc with altitude bulge proportional to distance
    const bulgeFactor = Math.min(4, dist / 3000);
    const arcPts = pts.map((p, i) => {
      const f = i / steps;
      const alt = Math.sin(f * Math.PI) * bulgeFactor;
      return [p[0] + alt, p[1]];
    });

    // Glowing trail that persists behind the warhead
    const trail = L.polyline([], {
      color, weight: 2, opacity: 0.7, className: 'ww3-arc'
    }).addTo(map);
    this.layers.push(trail);

    // Bright warhead dot - bigger and glowing
    const dot = L.circleMarker(pts[0], {
      radius: 4, color: '#fff', fillColor: color, fillOpacity: 1, weight: 2, opacity: 1
    }).addTo(map);
    this.layers.push(dot);

    const start = performance.now();
    const tick = (now) => {
      if (!this.active) return;
      const p = Math.min(1, (now - start) / flightMs);
      // Ease-in-out for more realistic flight (accelerate, coast, descend)
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      const idx = Math.floor(eased * steps);
      const pos = arcPts[Math.min(idx, steps)];
      dot.setLatLng(pos);

      // Trail shows full path so far
      trail.setLatLngs(arcPts.slice(0, idx + 1));

      // Fade trail as it lengthens
      trail.setStyle({opacity: Math.max(0.2, 0.7 - p * 0.4), weight: Math.max(1, 2 - p)});

      if (p < 1) requestAnimationFrame(tick);
      else {
        // Impact
        map.removeLayer(dot);
        // Fade out the trail over 3 seconds
        const fadeStart = performance.now();
        const fadeTick = (now2) => {
          const fp = Math.min(1, (now2 - fadeStart) / 3000);
          trail.setStyle({opacity: 0.3 * (1 - fp)});
          if (fp < 1 && this.active) requestAnimationFrame(fadeTick);
          else { try { map.removeLayer(trail); } catch(e) {} }
        };
        requestAnimationFrame(fadeTick);
        this._detonate(map, at.tLat, at.tLng, at.yieldKt, color);
      }
    };
    requestAnimationFrame(tick);
  },

  _detonate(map, lat, lng, yieldKt, color) {
    if (!this.active) return;

    // Calculate real effects
    const effects = NM.calcEffects(yieldKt, 'airburst', 0, 50);

    // Draw actual effect rings (fireball, blast, thermal, etc.)
    const det = {
      id: Date.now() + Math.random(), lat, lng, yieldKt, burstType: 'airburst',
      heightM: 0, fission: 50, effects, casualties: {deaths: 0, injuries: 0}, layers: []
    };
    const ringLayers = NM.Effects.drawRings(map, det);
    ringLayers.forEach(l => this.layers.push(l));

    // Animated flash expanding outward (white -> orange -> red)
    const flashR = Math.max(effects.fireball * 1000, 1000);
    const flash = L.circle([lat, lng], {
      radius: flashR * 0.3, color: '#fff', fillColor: '#fff', fillOpacity: 0.9,
      weight: 0, opacity: 0
    }).addTo(map);
    this.layers.push(flash);

    const start = performance.now();
    const flashDur = 2000;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / flashDur);
      flash.setRadius(flashR * (0.3 + p * 1.5));
      flash.setStyle({
        fillOpacity: Math.max(0, 0.9 * (1 - p * p)),
        fillColor: p < 0.15 ? '#fff' : p < 0.4 ? '#f9e2af' : p < 0.7 ? '#fab387' : '#f38ba8',
      });
      if (p < 1 && this.active) requestAnimationFrame(tick);
      else {
        try { map.removeLayer(flash); } catch(e) {}
      }
    };
    requestAnimationFrame(tick);

    // GZ marker
    const gzIcon = L.divIcon({
      className: '', iconSize: [16, 16], iconAnchor: [8, 8],
      html: '<div style="width:16px;height:16px;border-radius:50%;background:rgba(243,139,168,0.6);border:1px solid #f38ba8;box-shadow:0 0 8px rgba(243,139,168,0.4)"></div>'
    });
    const gzMarker = L.marker([lat, lng], {icon: gzIcon, interactive: false}).addTo(map);
    this.layers.push(gzMarker);

    // Estimate casualties
    const cas = NM.estimateCasualties(lat, lng, effects);
    this.casualties.deaths += cas.deaths;
    this.casualties.injuries += cas.injuries;
  },

  _updateStats() {
    const el = document.getElementById('ww3-stats');
    if (!el || !this.active) return;
    const elapsed = ((performance.now() - this.startTime) / 1000).toFixed(0);
    el.innerHTML = `
      <div class="ww3-stat"><span class="ww3-stat-val" style="color:var(--red)">${NM.fmtNum(this.casualties.deaths)}</span><span class="ww3-stat-lbl">Fatalities</span></div>
      <div class="ww3-stat"><span class="ww3-stat-val" style="color:var(--peach)">${NM.fmtNum(this.casualties.injuries)}</span><span class="ww3-stat-lbl">Injuries</span></div>
      <div class="ww3-stat"><span class="ww3-stat-val" style="color:var(--yellow)">${NM.fmtNum(this.casualties.deaths + this.casualties.injuries)}</span><span class="ww3-stat-lbl">Total</span></div>
      <div class="ww3-stat"><span class="ww3-stat-val" style="color:var(--overlay1)">${elapsed}s</span><span class="ww3-stat-lbl">Elapsed</span></div>`;
  },

  _updateStatus(text) {
    const el = document.getElementById('ww3-phase');
    if (el) el.textContent = text;
  },

  stop(map) {
    this.active = false;
    this.paused = false;
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
    if (this.statsInterval) { clearInterval(this.statsInterval); this.statsInterval = null; }
    this.layers.forEach(l => { try { map.removeLayer(l); } catch(e) {} });
    this.markers.forEach(m => { try { map.removeLayer(m); } catch(e) {} });
    this.layers = [];
    this.markers = [];
    this.arcs = [];
    this.casualties = {deaths: 0, injuries: 0};
    this._scenario = null;
    const el = document.getElementById('ww3-stats');
    if (el) el.innerHTML = '';
    const ph = document.getElementById('ww3-phase');
    if (ph) ph.textContent = 'Simulation idle';
  },

  // Count total warheads across all targets in a scenario
  countWarheads(scenarioId) {
    const scenario = NM.WW3_SCENARIOS.find(s => s.id === scenarioId);
    if (!scenario) return 0;
    let total = 0;
    for (const targets of Object.values(scenario.targetSets)) {
      for (const t of targets) total += t.warheads;
    }
    return total;
  }
};
