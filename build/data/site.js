// Kings Hill Dental — site content data
// Source: aspectratiodigitial.wixstudio.com/kingshilldental (unpublished draft) + client vision brief.

const site = {
  name: "Kings Hill Dental",
  tagline: "Dentistry & Aesthetics",
  phone: "01732 523 500",
  phoneHref: "tel:01732523500",
  email: "reception@kingshilldental.co.uk",
  whatsapp: "https://api.whatsapp.com/send/?phone=447414104409&text&type=phone_number&app_absent=0",
  bookingUrl: "https://kings-hill-dental.portal.dental",
  address: {
    line1: "Kings Hill Clinic",
    line2: "Suite 14, 10 Churchill Square",
    line3: "Kings Hill",
    line4: "West Malling, Kent",
    postcode: "ME19 4YU",
    mapUrl: "https://share.google/nbIuslfrwmR400lkT",
  },
  hours: [
    ["Monday", "09:30 – 17:30"],
    ["Tuesday", "09:30 – 18:30"],
    ["Wednesday", "09:30 – 18:30"],
    ["Thursday", "09:30 – 18:30"],
    ["Friday", "09:30 – 14:30"],
    ["Saturday", "By appointment"],
    ["Sunday", "Closed"],
  ],
  social: {
    facebook: "https://www.facebook.com/kingshilldental/",
    instagram: "https://www.instagram.com/kingshilldental/?hl=en",
  },
};

// ---------------------------------------------------------------------------
// Navigation
// ---------------------------------------------------------------------------

const nav = [
  { label: "About", href: "/about/" },
  {
    label: "Dentistry",
    href: "/dentistry/",
    children: [
      {
        label: "General & Preventative",
        href: "/dentistry/general-preventative/",
        children: [
          { label: "Dental Examinations", href: "/dentistry/general-preventative/dental-examinations/" },
          { label: "Hygiene & Gum Health", href: "/dentistry/general-preventative/hygiene-gum-health/" },
          { label: "Children's Dentistry", href: "/dentistry/general-preventative/childrens-dentistry/" },
          { label: "Bruxism", href: "/dentistry/general-preventative/bruxism/" },
        ],
      },
      {
        label: "Restorative Dentistry",
        href: "/dentistry/restorative/",
        children: [
          { label: "Fillings", href: "/dentistry/restorative/fillings/" },
          { label: "Crowns & Bridges", href: "/dentistry/restorative/crowns-bridges/" },
          { label: "Root Canal Treatment", href: "/dentistry/restorative/root-canals/" },
          { label: "Dentures", href: "/dentistry/restorative/dentures/" },
          { label: "Implants", href: "/dentistry/restorative/implants/" },
        ],
      },
      {
        label: "Cosmetic Dentistry",
        href: "/dentistry/cosmetic/",
        children: [
          { label: "Teeth Whitening", href: "/dentistry/cosmetic/teeth-whitening/" },
          { label: "Composite Bonding", href: "/dentistry/cosmetic/composite-bonding/" },
          { label: "Veneers", href: "/dentistry/cosmetic/veneers/" },
        ],
      },
      {
        label: "Orthodontic Dentistry",
        href: "/dentistry/orthodontic/",
        children: [
          { label: "Invisalign", href: "/dentistry/orthodontic/invisalign/" },
          { label: "Invisalign Go", href: "/dentistry/orthodontic/invisalign-go/" },
          { label: "Fixed Braces", href: "/dentistry/orthodontic/fixed-braces/" },
          { label: "Spark Aligners", href: "/dentistry/orthodontic/spark-aligners/" },
        ],
      },
    ],
  },
  {
    label: "Aesthetics",
    href: "/aesthetics/",
    children: [
      { label: "Anti-Wrinkle Treatments", href: "/aesthetics/anti-wrinkle-treatments/" },
      { label: "Skin Care", href: "/aesthetics/skin-care/" },
      { label: "Profhilo", href: "/aesthetics/profhilo/" },
      { label: "Dermal Fillers", href: "/aesthetics/dermal-fillers/" },
    ],
  },
  {
    label: "Fees",
    href: "/fees/",
    children: [{ label: "Membership Plan", href: "/fees/membership-plan/" }],
  },
  { label: "Referrals", href: "/referrals/" },
  { label: "Contact", href: "/contact/" },
];

// ---------------------------------------------------------------------------
// Team
// ---------------------------------------------------------------------------

const team = [
  {
    slug: "amelia-madan-dumper",
    name: "Amelia Madan-Dumper",
    role: "Principal Dentist",
    gdc: "76371",
    quals: ["BDS, Barts and Royal London, 1999", "Oris Medical & Avanti Aesthetic training"],
    img: "/assets/img/team/amelia-madan-dumper.png",
    homeImg: "/assets/img/team/amelia-madan-dumper.png",
    bio: [
      "Amelia sees many patients, helping them to achieve a perfect standard of oral health, as well as supporting and educating families. Her care and attention has helped more nervous and anxious patients to become more confident and relaxed over time.",
      "Amelia's passion for promoting healthy skin has grown from a personal interest to running a skincare clinic every month, alongside offering aesthetic treatments such as anti-wrinkle therapies. We now offer fantastic skincare treatments, allowing Amelia to share her passion and knowledge for healthy skin.",
    ],
    homeBlurb: "I trained in Aesthetics 6 years ago, with Oris Medical and then later up-levelled my skills with Avanti Aesthetics. I introduced Obagi medical skincare to my practice at this time.",
  },
  {
    slug: "simon-dumper",
    name: "Simon Dumper",
    role: "Principal Dentist",
    gdc: "79861",
    quals: ["BDS, Barts and Royal London, 2001", "Implant diploma, International Team for Implantology"],
    img: "/assets/img/team/simon-dumper.png",
    homeImg: "/assets/img/team/simon-dumper.png",
    bio: [
      "Simon enjoys helping patients to restore their confidence with life-changing implants and aesthetic dentistry. As an implant dentist, Simon has extensive experience in restoring smiles and has helped many patients to get their confidence back on track. He is always committed to staying up-to-date and attends many courses on implantology.",
      "Simon first joined Kings Hill Clinic in 2007 and then, along with his wife Amelia, bought the practice in 2009.",
    ],
  },
  {
    slug: "mohammed-lalji",
    name: "Mohammed Lalji",
    role: "Dentist",
    gdc: "229307",
    quals: ["BDS, Cardiff University, 2012", "MSc Endodontic Practice, Queen Mary University, 2022"],
    img: "/assets/img/team/mohammed-lalji.png",
    homeImg: "/assets/img/team/mohammed-lalji.png",
    bio: [
      "Mohammed places a great emphasis on post-graduate education, having completed a certificate in minor oral surgery in 2016. More recently, Mohammed has developed a special interest in root canal treatments, achieving a Master's degree with merit in Endodontic practice from Queen Mary University in 2022.",
      "Mohammed prides himself on offering patients a calm, relaxing environment alongside a high standard of care. He is confident undertaking all aspects of restorative dentistry, including complex root canal treatment, and believes in a patient-centred approach — communicating and educating patients to help them feel at ease and maintain their smiles for years to come.",
    ],
    homeBlurb: "Mohammed has developed a special interest in root canal treatments, achieving a Master's degree with merit in Endodontic practice from Queen Mary University in 2022.",
  },
  {
    slug: "dr-furqan-jamal",
    name: "Dr Furqan Jamal",
    role: "Specialist Orthodontist",
    gdc: "",
    quals: ["BDS, LDS RCSEng", "MFDS and MOrth RCSEd"],
    img: "/assets/img/team/furqan-jamal.png",
    bio: [
      "Dr Jamal is a compassionate and growth-oriented clinician with an immense desire to practise state-of-the-art, evidence-based orthodontics. Furqan's practice philosophy emphasises education, transparency and comfort, ensuring every patient understands their treatment options and feels supported throughout their orthodontic journey.",
      "Dr Furqan Jamal specialises in fixed braces as well as clear aligners. Combining clinical expertise with patient-centred care, he creates customised treatment plans that help patients achieve an aesthetic smile and a healthy bite.",
    ],
  },
  {
    slug: "lucy-hicks",
    name: "Lucy Hicks",
    role: "Dental Hygienist",
    gdc: "277548",
    quals: ["BSc (Hons) Oral Health Science", "Qualified Dental Hygiene Therapist"],
    img: "/assets/img/team/lucy-hicks.png",
    bio: [],
  },
  {
    slug: "gemma-abbott",
    name: "Gemma Abbott",
    role: "Orthodontic Coordinator",
    gdc: "169416",
    quals: ["National Certificate NEBDN, 2008"],
    img: "/assets/img/team/gemma-abbott.png",
    bio: [
      "As our Orthodontic Coordinator, Gemma supports all of our dentists — especially our orthodontist — helping to deliver healthy, straight smiles. She focuses on patient care, making sure everyone receives the best standard of care from the moment they arrive to when they leave. She also particularly enjoys seeing the results of cosmetic cases.",
      "Gemma has been a valuable member of the Kings Hill Clinic team since 2012, and her support has helped our orthodontic services to really grow. Her friendly approach to straightening smiles is a huge hit with our patients, young and adult alike.",
    ],
  },
  {
    slug: "carly-marinelli",
    name: "Carly Marinelli",
    role: "Practice Coordinator",
    gdc: "175183",
    quals: ["National Certificate, 2002", "Qualified Dental Nurse"],
    img: "/assets/img/team/carly-marinelli.png",
    bio: [
      "As our Practice Coordinator, Carly ensures every patient has the best possible experience each time they visit us. She manages reception and our dedicated team of nurses, alongside all administrative tasks at the practice.",
      "Her knowledge of dentistry is vast, and she provides exceptional support for the team of dentists — often still assisting Simon and Amelia in surgery. Carly is very proud of the friendly, welcoming environment at the clinic, helping nervous patients relax and receive the care they need.",
    ],
  },
  {
    slug: "chelsea-white",
    name: "Chelsea White",
    role: "Qualified Dental Nurse",
    gdc: "228406",
    quals: ["Level 3 Diploma in Dental Nursing, 2012"],
    img: "/assets/img/team/chelsea-white.png",
    bio: [
      "Chelsea helps our dental team, supporting our dentists in the surgery and helping patients to relax if they are particularly nervous. Her favourite part of the job is when patients leave feeling great about their smile and full of confidence.",
      "On top of her experience in the surgery, Chelsea has vast experience in implant dentistry, often supporting Simon as part of an efficient team delivering the standard of care we expect at our clinic.",
    ],
  },
  {
    slug: "vicky-mayne",
    name: "Vicky Mayne",
    role: "Qualified Dental Nurse",
    gdc: "160384",
    quals: ["National Certificate NEBDN, 2005"],
    img: "/assets/img/team/vicky-mayne.png",
    bio: [],
  },
];

// ---------------------------------------------------------------------------
// Practice gallery (About page)
// ---------------------------------------------------------------------------

const practiceGallery = [
  { file: "/assets/img/practice/practice-1.jpg", label: "Exterior" },
  { file: "/assets/img/practice/practice-2.jpg", label: "Entrance" },
  { file: "/assets/img/practice/practice-3.jpg", label: "Reception" },
  { file: "/assets/img/practice/practice-4.jpg", label: "Reception, close-up" },
  { file: "/assets/img/practice/practice-5.jpg", label: "Waiting Room" },
  { file: "/assets/img/practice/practice-6.jpg", label: "Waiting Room, close-up" },
  { file: "/assets/img/practice/practice-7.jpg", label: "Consultation" },
  { file: "/assets/img/practice/practice-8.jpg", label: "The Practice" },
  { file: "/assets/img/practice/practice-9.jpg", label: "The Practice" },
  { file: "/assets/img/practice/practice-10.jpg", label: "The Practice" },
  { file: "/assets/img/practice/practice-11.jpg", label: "The Practice" },
  { file: "/assets/img/practice/practice-12.jpg", label: "Children's Area" },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

const testimonials = [
  {
    quote: "I have had such professional, friendly advice and care for myself and my family at Kings Hill Dental. I am a bit nervous when going to the dentist, but both Simon and Amelia have been really patient with all my concerns. I have been a number of times now, once in an emergency situation and the work has been outstanding and I always feel fully informed and consulted. I can't rate them highly enough.",
    name: "Victoria Hampson",
  },
  {
    quote: "Would highly recommend Kings Hill Dental. The level of care we receive as a family is fantastic and the staff are always warm and welcoming. Simon is so friendly and approachable and very patient with all my children during their check ups.",
    name: "Lucy Machen",
  },
  {
    quote: "Exceptionally good. I had a front tooth that had suffered damage some forty five years ago. At Kings Hill Dental I was able to make a short notice appointment, the dentist put me completely at ease and his work is astonishing. To cap it all, the fee was not impossibly more than I would have had to pay for NHS treatment, if, of course, I could have had the work done under the NHS.",
    name: "Dave Gilbert",
  },
  {
    quote: "I have been with Kings Hill Dental for around 15 years and couldn't be happier. The service is friendly & professional. Whether it's a routine visit or being fitted in for an emergency appointment, I couldn't fault them. Highly recommend.",
    name: "Elaine Terry",
  },
  {
    quote: "Kings Hill Dental is by far the best dental practice I've ever had treatment at. I couldn't be more grateful to Simon, Lacey, Simran and the team for the treatment I've received — Invisalign, whitening and composite bonding — and for squeezing in last-minute appointments whenever I needed a slight adjustment. The results are perfect. Highly recommend!",
    name: "Ellis Gemmel",
  },
  {
    quote: "Our caring team of dental professionals are dedicated to looking after your little ones and ensuring they feel safe and happy throughout their visit.",
    name: "Fiona Gillard",
  },
];

// ---------------------------------------------------------------------------
// Fees
// ---------------------------------------------------------------------------

const fees = [
  {
    category: "Examination Services",
    items: [
      ["Out of hours emergency appointment, new patient", "£250"],
      ["Emergency appointment for new patients", "£150"],
      ["Digital X-rays", "£15.75"],
      ["Student dental examination, 18+", "£35"],
      ["Routine dental examination", "£55"],
      ["New patient consultation", "from £85"],
    ],
  },
  {
    category: "Hygienist Services",
    items: [
      ["Periodontal treatment with dentist", "£245"],
      ["Routine hygiene with dentist", "£120"],
      ["New patient hygiene with dentist", "£130"],
      ["Direct access extensive hygienist session (full payment on booking)", "£180"],
      ["First visit hygienist session (after initial consultation, full payment on booking)", "£95"],
      ["Routine hygienist session (deposit £30)", "£85"],
    ],
  },
  {
    category: "Dental Treatments",
    items: [
      ["Extraction, 3rd molar", "From £315"],
      ["Extraction, simple", "From £209"],
      ["Extraction, complex", "From £262.50"],
      ["Tooth-coloured filling, anterior tooth", "From £189"],
      ["Silver amalgam filling", "£120"],
      ["Tooth-coloured filling, posterior tooth", "From £189 – £262.50"],
    ],
  },
  {
    category: "Crowns & Bridges",
    items: [
      ["Bridges (per tooth)", "From £880"],
      ["Full gold crown", "From £1,000"],
      ["All-porcelain crown", "From £880"],
      ["Porcelain bonded to precious metal", "From £880"],
    ],
  },
  {
    category: "Dentures",
    items: [
      ["Full acrylic denture", "From £880"],
      ["Cobalt chrome denture", "From £650"],
      ["Partial acrylic denture", "From £650"],
    ],
  },
  {
    category: "Implant Services",
    items: [
      ["CBCT scan", "£200"],
      ["Dental implant", "From £3,000"],
      ["Dental implant consultation", "£95"],
    ],
  },
  {
    category: "Children's Services",
    items: [
      ["Tooth-coloured filling, children (non-adult tooth)", "£85"],
      ["Children's hygienist, over 12 years", "£85"],
      ["Children's hygienist, under 12 years", "£42.50"],
      ["Children's examination (age 12–17)", "£30"],
      ["Children's examination (age 8–12)", "£25"],
      ["Children's examination (age 0–7)", "£20"],
      ["New patient children's examination", "£30"],
    ],
  },
  {
    category: "Cosmetic Treatments",
    items: [
      ["Enlighten tooth whitening", "From £650"],
      ["Veneers", "From £880"],
      ["Anterior composite bonding", "From £300"],
    ],
  },
  {
    category: "Orthodontic Services",
    items: [
      ["Spark aligners", "From £3,900"],
      ["Children's fixed braces, under 18 (dual arch)", "From £3,500–4,500"],
      ["Adult fixed braces (dual arch)", "From £3,800–5,300"],
      ["Invisalign Lite / Full", "From £3,100–5,000"],
      ["Invisalign Go with dentist, dual arch", "From £3,900"],
      ["Orthodontic consultation (consultant)", "From £95"],
      ["Invisalign Go with dentist, single arch", "From £3,000"],
      ["Invisalign Go consult (redeemable against Invisalign Go)", "From £55"],
    ],
  },
  {
    category: "Root Canal Treatment",
    items: [
      ["Consultation (redeemable if you proceed with treatment)", "£75"],
      ["CBCT", "£250"],
      ["RCT, incisor", "From £630"],
      ["RCT, pre-molar", "From £740"],
      ["RCT, molar", "From £850"],
      ["Re-RCT", "From an additional £265 per tooth"],
      ["Core restoration", "From £180"],
    ],
  },
  {
    category: "Facial Aesthetics",
    items: [
      ["Skin consultation (redeemable against skincare product)", "£50"],
      ["Obagi Blue Peel Radiance chemical peel", "£120"],
      ["Profhilo (per treatment)", "From £300"],
      ["Dermal fillers, 2 areas", "From £280"],
      ["Dermal fillers, 3 areas", "From £325"],
      ["Dermal fillers", "From £350"],
      ["Anti-wrinkle treatment consultation (redeemable against treatment)", "£95"],
    ],
  },
];

module.exports = { site, nav, team, practiceGallery, testimonials, fees };
