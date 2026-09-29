// Treatment hub + detail page content

// Each hub has: slug, title, intro, cards[{title, href, blurb}]
const hubs = {
  dentistry: {
    slug: "dentistry",
    title: "Dentistry",
    eyebrow: "Dentistry",
    intro:
      "At Kings Hill Dental our number one priority is our patients. Our warm and skilled team endeavour to provide the highest quality of advice and care, whilst ensuring you feel comfortable, safe and informed. We never push our patients towards treatments or cosmetic work — instead we work with you to find the best approach to improve your confidence and create the natural, beautiful smile you deserve. Discover our range of dentistry options below, or book an appointment with one of our dentists to find the right treatment for you.",
    cards: [
      {
        title: "General & Preventative",
        href: "/dentistry/general-preventative/",
        blurb: "Protecting oral health with routine dentistry and general dental care. Regular visits to the dentist and hygienist help you take the very best care of your natural smile.",
      },
      {
        title: "Restorative Dentistry",
        href: "/dentistry/restorative/",
        blurb: "Teeth go through a lot during our lifetime. Restorative dentistry allows us to fix problems such as cavities, chips, and broken or missing teeth, restoring your beautiful smile.",
      },
      {
        title: "Cosmetic Dentistry",
        href: "/dentistry/cosmetic/",
        blurb: "An expansive range of cosmetic treatments that can correct minor issues, straighten smiles and whiten teeth — helping you build a natural-looking smile.",
      },
      {
        title: "Orthodontic Dentistry",
        href: "/dentistry/orthodontic/",
        blurb: "Creating beautifully straight and healthy smiles. Orthodontics corrects irregularities of the teeth and jaws for a healthier, more confident bite.",
      },
    ],
  },

  "general-preventative": {
    slug: "general-preventative",
    parent: "dentistry",
    title: "General & Preventative",
    eyebrow: "Dentistry",
    intro:
      "We focus on helping patients maintain healthy teeth and gums through regular examinations and preventative care. We understand the dentist can seem daunting, so our team of kind, professional dentists are here to make your visit as relaxing and informative as possible.",
    cards: [
      {
        title: "Dental Examinations",
        href: "/dentistry/general-preventative/dental-examinations/",
        blurb: "Routine examinations are the foundation of your oral health care. Regular check-ups allow us to keep an eye on your oral health and spot any problems early.",
      },
      {
        title: "Hygiene & Gum Health",
        href: "/dentistry/general-preventative/hygiene-gum-health/",
        blurb: "Defending your oral health from gum disease with hygiene and periodontal treatments, from trained experts in assessing, tracking and treating gum disease.",
      },
      {
        title: "Children's Dentistry",
        href: "/dentistry/general-preventative/childrens-dentistry/",
        blurb: "Dental visits from a young age help identify developmental issues early, protecting your child from long-term damage and expensive treatment.",
      },
      {
        title: "Bruxism",
        href: "/dentistry/general-preventative/bruxism/",
        blurb: "If you are suffering with consistent grinding and clenching of your teeth, our experts can help diagnose and treat it, leaving you discomfort-free.",
      },
    ],
  },

  restorative: {
    slug: "restorative",
    parent: "dentistry",
    title: "Restorative Dentistry",
    eyebrow: "Dentistry",
    intro:
      "Teeth go through a lot during our lifetime. Restorative dentistry allows us to fix any problems such as cavities, chips, and broken or missing teeth. Discover our range of restorative dental care below.",
    cards: [
      {
        title: "Fillings",
        href: "/dentistry/restorative/fillings/",
        blurb: "A well-established and inexpensive way to repair tooth damage, and often the first method we recommend for dental restoration.",
      },
      {
        title: "Crowns & Bridges",
        href: "/dentistry/restorative/crowns-bridges/",
        blurb: "Restore and repair teeth with crowns, or replace a missing tooth with a natural-looking bridge.",
      },
      {
        title: "Root Canal Treatment",
        href: "/dentistry/restorative/root-canals/",
        blurb: "When the internal tissues of a tooth become infected, root canal treatment can save the tooth from needing to be extracted.",
      },
      {
        title: "Dentures",
        href: "/dentistry/restorative/dentures/",
        blurb: "Giving you a complete smile with removable dentures, which come with a host of benefits for eating, speaking and confidence.",
      },
      {
        title: "Implants",
        href: "/dentistry/restorative/implants/",
        blurb: "One of the most effective and long-lasting ways to replace one or more missing teeth, while protecting your jawbone and existing dental structure.",
      },
    ],
  },

  cosmetic: {
    slug: "cosmetic",
    parent: "dentistry",
    title: "Cosmetic Dentistry",
    eyebrow: "Dentistry",
    intro:
      "We are committed to providing pressure-free, professional and supportive advice about cosmetic dentistry. We want to ensure all of our patients pick the right procedures for them, so they feel confident and happy in their smile.",
    cards: [
      {
        title: "Teeth Whitening",
        href: "/dentistry/cosmetic/teeth-whitening/",
        blurb: "Creating beautifully bright, show-stopping smiles with revolutionary teeth whitening. We offer in-practice and at-home treatments.",
      },
      {
        title: "Composite Bonding",
        href: "/dentistry/cosmetic/composite-bonding/",
        blurb: "For light damage to your front teeth or contouring your bite surfaces, we can use composite bonding to rebuild teeth.",
      },
      {
        title: "Veneers",
        href: "/dentistry/cosmetic/veneers/",
        blurb: "A thin, tooth-coloured shell fixed to the front of a tooth to mask discolouration, an irregular shape, damage or small gaps.",
      },
    ],
  },

  orthodontic: {
    slug: "orthodontic",
    parent: "dentistry",
    title: "Orthodontic Dentistry",
    eyebrow: "Dentistry",
    intro:
      "Orthodontics is the branch of dentistry that corrects irregularities of the teeth and jaws. At Kings Hill Dental, we can create beautifully straight and healthy smiles through our range of orthodontic procedures.",
    cards: [
      {
        title: "Invisalign",
        href: "/dentistry/orthodontic/invisalign/",
        blurb: "A popular treatment with adults after a straight smile — Invisalign moves teeth to a more even position without impacting day-to-day life.",
      },
      {
        title: "Invisalign Go",
        href: "/dentistry/orthodontic/invisalign-go/",
        blurb: "A streamlined alternative to Invisalign, specifically designed to fix minor crowding or spacing in the front teeth.",
      },
      {
        title: "Fixed Braces",
        href: "/dentistry/orthodontic/fixed-braces/",
        blurb: "Conventional fixed braces can address a broad range of alignment problems, correcting overbites, underbites, gaps and crooked teeth.",
      },
      {
        title: "Spark Aligners",
        href: "/dentistry/orthodontic/spark-aligners/",
        blurb: "Virtually invisible when worn, Spark aligners are a simple and effective way for many people to achieve their dream straighter smile.",
      },
    ],
  },

  aesthetics: {
    slug: "aesthetics",
    title: "Aesthetics",
    eyebrow: "Aesthetics",
    intro:
      "We are able to help reverse the signs of ageing with confidence-boosting facial aesthetic treatments. Non-surgical treatments such as anti-wrinkle injections and dermal fillers can restore lost volume and reduce noticeable lines. We believe natural is beautiful, and our aesthetics procedures exist to help reduce small imperfections and boost your confidence — always matching patients with the treatment that's genuinely right for them.",
    cards: [
      {
        title: "Anti-Wrinkle Treatments",
        href: "/aesthetics/anti-wrinkle-treatments/",
        blurb: "We combat wrinkles and lines with non-invasive anti-ageing injections, using a purified protein that relaxes specific muscles under the skin.",
      },
      {
        title: "Skin Care",
        href: "/aesthetics/skin-care/",
        blurb: "Obagi Blue Peel Radiance facial, a salicylic acid-based peel that addresses fine lines and wrinkles, rough skin and blemishes.",
      },
      {
        title: "Profhilo",
        href: "/aesthetics/profhilo/",
        blurb: "Using a unique hyaluronic acid gel, Profhilo intensely moisturises and hydrates ageing skin, smoothing lines and creating a tightening effect.",
      },
      {
        title: "Dermal Fillers",
        href: "/aesthetics/dermal-fillers/",
        blurb: "Using hyaluronic acid, a substance found naturally in the body, to replenish lost volume and hydration in the skin.",
      },
    ],
  },
};

// Each detail page: slug, hub, title, lead, benefitsLabel, benefits[], sections[{heading, body[]}]
const details = {
  "dental-examinations": {
    hub: "general-preventative",
    title: "Dental Examinations",
    lead: "Routine examinations are the foundation of your oral health care. Regular check-ups allow us to spot and address any problems early.",
    intro: "During your appointment, we will examine and assess your teeth, gums and mouth, as well as look at your overall health.",
    benefitsLabel: "Our dental examination includes",
    benefits: [
      "Check teeth and gums for any signs of wear, decay or gum disease",
      "Soft tissues and tongue, ensuring they are all looking healthy",
      "Face, neck and jaw, checking for any issues or abnormalities",
      "Bite, making sure your teeth mesh together properly",
      "Oral cancer check",
    ],
    sections: [
      {
        heading: "What happens during the check-up?",
        body: [
          "We carry out a thorough examination that covers every aspect of your oral health. As well as assessing your teeth, we will ask some questions about your general health and medical history, in case this is affecting your dental wellbeing.",
          "We will also check any previous treatment you have had, including crowns, bridges and implants, to make sure they are still working correctly. We may need to take x-rays of your mouth, and will discuss any concerns you may have, or any cosmetic treatments you wish to know more about.",
          "If necessary, we can provide advice and tips for your oral hygiene routine at home, and if we find anything that requires further treatment, we will set out your treatment plan and discuss the next steps and expected costs.",
        ],
      },
      {
        heading: "How often do I need to see a dentist?",
        body: [
          "You may not need to see us every six months — your dentist will let you know when you need to come back for your next check-up. If you have any problems between check-ups, please phone us to arrange an earlier appointment.",
        ],
      },
    ],
  },

  "hygiene-gum-health": {
    hub: "general-preventative",
    title: "Hygiene & Gum Health",
    lead: "Defending your oral health from gum disease with hygiene and periodontal treatments. Hygienists are trained in assessing, tracking and treating gum disease.",
    intro: "It's important to see a hygienist and have your teeth professionally cleaned to prevent gum disease from developing and affecting your smile.",
    benefitsLabel: "Reasons to visit the hygienist",
    benefits: [
      "Visits every 6 months drastically reduce the chance of developing gum disease or teeth damage",
      "Frequent visits are crucial if there's a family history of gum issues",
      "Helps prevent future, more expensive dental treatment",
      "Poor gum health is also linked to conditions such as heart disease, respiratory infections, diabetes and dementia",
    ],
    sections: [
      {
        heading: "What happens during the appointment?",
        body: [
          "Hygiene appointments are designed around assessing and treating gum disease, so the first step is to check for signs of the condition. Following this examination, your hygienist will carry out a scale and polish — a thorough clean that removes tartar and plaque from the tooth surfaces and around the gum line, reaching areas a toothbrush can't.",
          "The clean will leave your teeth smooth and clean, and will also remove some staining. Once the polish is finished, your hygienist will provide advice on how to keep your gums bacteria-free.",
        ],
      },
      {
        heading: "Guided Biofilm Therapy",
        body: [
          "At Kings Hill Dental we are proud to offer the revolutionary EMS GBT 'Dental Spa' treatment — helping us provide hygiene treatment in a calm, relaxing new way.",
          "Biofilm is a layer of bacteria that accumulates on your teeth and can lead to gum disease if good oral hygiene isn't maintained. Guided Biofilm Therapy (GBT) is based on clinically proven technologies developed with respected periodontologists, caries specialists and dental hygienists. It is minimally invasive, safe, effective and gentle on teeth, soft tissue, implants and restorations — and works especially well for nervous patients, as it's more comfortable than a traditional scale and polish.",
          "We begin by assessing your mouth and gum health, then apply a disclosing solution that makes any dental biofilm easier to detect, showing you any problem areas and tips to improve your oral health. The Dental Spa treatment then combines air, fine powder and warm water to gently and comfortably exfoliate and remove staining, before any remaining tartar is removed with our no-pain instrument. A final check ensures everything has been removed, and we'll set a date for your next treatment.",
        ],
      },
    ],
  },

  "childrens-dentistry": {
    hub: "general-preventative",
    title: "Children's Dentistry",
    lead: "Regular visits to the dentist give your child's teeth the best chance of lasting a lifetime.",
    intro: "During an appointment, we will assess your child's oral health — checking their teeth, gums, bite and jaw — and provide helpful advice about tooth care at home, including dietary advice.",
    benefitsLabel: "Reasons to bring your children to the dentist",
    benefits: [
      "We can assess your child's teeth, gums, bite and jaw",
      "Regular check-ups can identify issues early and help fix them",
      "Prolongs your child's dental health into adulthood",
      "Regular cleanings prevent cavities missed by normal brushing",
      "Reduces dental anxiety through frequent, positive exposure to the environment and procedures",
    ],
    sections: [
      {
        heading: "Providing preventative care for your kids",
        body: [
          "We offer treatments that give young teeth the best chance of lasting a long time. Fluoride varnishes strengthen the enamel, making teeth more resistant to decay. We can also add fissure sealants to your child's permanent teeth as they emerge (usually from around age six to seven) — a clear plastic coating that covers the narrow grooves on the chewing surfaces of the back teeth, stopping bacteria from entering and helping to prevent tooth decay.",
        ],
      },
      {
        heading: "Children's orthodontics",
        body: [
          "We have our own consultant orthodontist at the practice and offer a full range of orthodontic treatment for children. The purpose of orthodontic treatment is to correct the alignment of the teeth and jaws, giving a healthy, functional bite — making cleaning easier and helping to prevent tooth decay and gum problems.",
          "Straighter teeth can also help with speech, by bringing the teeth into correct alignment with the jaws, and have a positive effect on facial proportions and injury prevention. Children also feel the benefit in self-confidence that comes from a straight, healthy smile.",
        ],
      },
    ],
  },

  bruxism: {
    hub: "general-preventative",
    title: "Bruxism",
    lead: "Bruxism affects over 80% of the population at some stage in their life, and can be debilitating for many sufferers.",
    intro: "Despite being prevalent throughout the UK and worryingly on the rise, bruxism often remains overlooked and underdiagnosed. Whilst bruxing doesn't always cause serious symptoms, for many the side effects are painful and persistent.",
    benefitsLabel: "Symptoms of bruxism",
    benefits: [
      "Tooth indentations along the sides of your tongue or cheeks",
      "Morning jaw soreness or stiffness",
      "Worn-down or cracked teeth",
      "Unexplained tooth sensitivity",
      "Dull temple headaches or migraines",
    ],
    sections: [
      {
        heading: "Sleep Clench Inhibitor (SCi & SCi+)",
        body: [
          "Previously known as NTI-tss, the SCi is an FDA-approved treatment for TMD, bruxism, and medically diagnosed migraines, with excellent clinical results proven to relieve patient symptoms.",
          "The SCi reduces parafunctional intensity of the temporalis, masseters and lateral pterygoids — the small muscles at your jaw joints that open your jaw — eliminating posterior and canine contact and thereby reducing temporalis clenching.",
        ],
      },
      {
        heading: "Indications for SCi",
        body: [
          "All cases requiring a disconnection of the occlusion and/or relaxation of the masticatory musculature, such as the prevention of symptoms associated with bruxism, the treatment of certain types of TMD, the prevention of occlusal trauma (for example protecting restorations and implants in cases of severe bruxism), and the prevention and treatment of chronic tension-type headache and migraine pain.",
        ],
      },
      {
        heading: "Advantages of the SCi",
        body: [
          "Excellent clinical results with an extremely simple and fast chairside procedure — fabrication takes around 20 minutes, with no delays or lab fees. Patients report excellent acceptance and compliance, with high diagnostic value and scientifically proven efficacy.",
        ],
      },
    ],
  },

  fillings: {
    hub: "restorative",
    title: "Fillings",
    lead: "Treating cavities and dental decay with reliable fillings — a well-established and inexpensive way to repair tooth damage.",
    intro: "Fillings can also be used to replace cracked or broken teeth, which can occur due to tooth grinding, trauma and loss of tooth tissue such as erosion or abrasion. White fillings can also be used as a more aesthetic solution.",
    benefitsLabel: "Benefits of fillings",
    benefits: [
      "Prevents the decay growing deeper and damaging the root",
      "Relieves pain and sensitivity",
      "Restores functionality",
      "Repairs general damage to the tooth",
      "Seamlessly aesthetic",
    ],
    sections: [
      {
        heading: "Why do I need a filling?",
        body: [
          "Your dentist will inform you if you need a tooth filled. The most common reason for a filling is to restore a part of a tooth that has been under attack from dental decay. Fillings replace the part of the tooth that needs to be removed and provide effective support.",
          "Fillings will also stop any tooth pain caused by the cavity, and are resistant to bacteria.",
        ],
      },
      {
        heading: "Looking after your filling",
        body: [
          "If looked after properly, fillings can last for years and are particularly suitable for teeth that are subjected to lots of wear and tear, such as those at the back of the mouth.",
        ],
      },
    ],
  },

  "crowns-bridges": {
    hub: "restorative",
    title: "Crowns & Bridges",
    lead: "Restore and repair teeth with crowns, or replace a missing tooth with a natural-looking bridge.",
    intro: "Crowns and bridges provide very effective solutions for transforming the overall appearance of your smile, and can be used for teeth that need a full restoration.",
    benefitsLabel: "Benefits of either",
    benefits: [
      "Restored functionality of the tooth",
      "Enhanced aesthetics to match your teeth",
      "Durable",
      "Prevents further damage",
      "Improved speech",
    ],
    sections: [
      {
        heading: "Crowns",
        body: [
          "For heavily filled or broken teeth that won't withstand the effects of biting and chewing, we can offer a natural-coloured crown. Crowns improve the appearance of the tooth, especially those with large fillings, and protect it so it can better withstand the forces of biting and chewing. The crown is placed over the existing tooth but looks, feels and functions just like a natural tooth.",
          "There are several options when it comes to choosing the best type of crown for you — we are happy to provide advice and detailed information to help you make the best choice.",
        ],
      },
      {
        heading: "Bridges",
        body: [
          "We can join crowns together to replace lost or missing teeth — known as a dental bridge. If you feel embarrassed about gaps in your smile, a natural-looking dental bridge can successfully fill those spaces and help restore your confidence.",
          "Bridges are an excellent solution for replacing missing teeth. They are laboratory-made from ceramics and some metals, and look and feel like a natural tooth.",
        ],
      },
    ],
  },

  "root-canals": {
    hub: "restorative",
    title: "Root Canal Treatment",
    lead: "Protecting your mouth from infection and saving teeth from extraction.",
    intro: "Root canal therapy (or endodontics) involves removing the infected pulp from the innermost part of the tooth. This prevents the infection from spreading and can help save a tooth that may otherwise have to be extracted.",
    benefitsLabel: "Signs of infection",
    benefits: [
      "Pain when biting",
      "Tenderness or sensitivity",
      "Swelling or an abscess in the gum",
      "Fever",
      "Discolouration or increased mobility of the tooth",
    ],
    sections: [
      {
        heading: "Why is root canal treatment necessary?",
        body: [
          "If the hard external structure of the tooth is breached, bacteria can easily reach the soft tissues inside — the pulp. You may not get any symptoms of infection within the tooth, but this can mean the infection worsens and ultimately leads to tooth loss.",
          "Root canal treatment removes the infected pulp from the tooth, leaving the external part of the tooth untouched and bacteria-free. The cavity is sealed with a filling, and full function of the tooth is maintained. This treatment prevents further infection and is also less expensive than replacing a missing tooth.",
        ],
      },
      {
        heading: "What does root canal treatment involve?",
        body: [
          "Root canal treatments often require two or more appointments to ensure the tooth is free from bacteria. Between appointments, the tooth is protected and temporarily restored.",
          "We first take x-rays to assess the root canals and check for any other signs of infection, always using a local anaesthetic before treating the tooth and removing the infected pulp. Once the internal tissues are removed, the root canals are shaped and cleaned, then sealed with a filling or a crown.",
          "Many people who have a root canal are surprised by how easy and pain-free the treatment is. If well looked after, a treated tooth will last a long time.",
        ],
      },
      {
        heading: "A special interest in endodontics",
        body: [
          "Mohammed Lalji has developed a special interest in root canal treatments, achieving a Master's degree with merit in Endodontic practice from Queen Mary University in 2022.",
        ],
      },
    ],
  },

  dentures: {
    hub: "restorative",
    title: "Dentures",
    lead: "Dentures come with a host of benefits, including helping to improve how you eat and speak and boosting your confidence by restoring your smile.",
    intro: "Dentures can also enhance facial shape, especially around the lips and cheek area. You can have partial dentures for a few missing teeth, or full dentures to replace a whole set of teeth on the upper or lower jaw.",
    benefitsLabel: "Benefits of dentures",
    benefits: [
      "Natural-looking appearance",
      "Can enhance facial shape",
      "Can improve eating and speaking ability",
      "An effective and affordable way to restore your smile",
    ],
    sections: [
      {
        heading: "What are dentures?",
        body: [
          "Dentures are usually made from acrylic, or a combination of acrylic and cobalt chrome. Modern materials mean partial dentures blend in beautifully with existing teeth, and complete dentures can pass for the real thing.",
        ],
      },
      {
        heading: "After fitting",
        body: [
          "It can take a little while to get used to your new dentures, especially if they are a complete set. They may feel odd at first, and eating can be tricky, so it's a good idea to start with softer foods and slowly introduce more challenging items. Speaking may also be difficult initially, but this improves with practice — reading aloud can help — and any sore spots can usually be eased with a small adjustment.",
        ],
      },
      {
        heading: "Aftercare",
        body: [
          "Dentures are designed to be hardwearing, but will last longer if treated with care. Remove them before bed so your gums can rest, but store them in water or denture fluid so they don't lose their shape. Clean your dentures with a toothbrush or special denture brush, keep your gums and any remaining teeth clean, and attend regular check-ups so your dentist and hygienist can keep an eye on your oral health.",
        ],
      },
    ],
  },

  implants: {
    hub: "restorative",
    title: "Implants",
    lead: "Dental implants offer one of the most effective and long-lasting ways to replace one or more missing teeth.",
    intro: "Implants provide a fixed alternative to removable dentures by implanting titanium posts into the jawbone that act like tooth roots. They can improve how you eat and speak, prevent shrinkage of the jawbone, and keep existing teeth firmly in place.",
    benefitsLabel: "Benefits of implants",
    benefits: [
      "Sturdy positioning",
      "Protects the jawbone and natural surrounding teeth",
      "Restores speaking and chewing ability",
      "Avoids adhesives or daily soaking routines",
    ],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "We carry out a full assessment of your general health, how your teeth fit together, your oral health and the density of your jawbone. If we discover insufficient bone volume, you may need a grafting procedure to allow for successful placement of implants.",
          "The titanium posts are placed in the bone under a local anaesthetic, using a relatively simple surgical procedure. Titanium is very well tolerated by the body, so over a few months the implants bond with the bone — a process known as osseointegration. Once settled in and fully healed, we can fit replacement teeth to the now firmly positioned implants.",
        ],
      },
      {
        heading: "Aftercare",
        body: [
          "You need to maintain good oral hygiene following treatment to keep your implants trouble-free. With regular brushing and interdental cleaning, they can last for over 15 years. You should also attend regular check-ups so your dentist can make sure your implants stay in great condition.",
        ],
      },
    ],
  },

  "teeth-whitening": {
    hub: "cosmetic",
    title: "Teeth Whitening",
    lead: "For the best, most brilliant smile, at-home whitening treatments create a show-stopping look.",
    intro: "Whitening uses a safe chemical reaction to lighten the teeth enamel and dentine to a whiter shade, breaking down stain molecules and restoring your teeth to a whiter, more youthful shade.",
    benefitsLabel: "Benefits of at-home whitening",
    benefits: [
      "Gradual control of teeth colour",
      "Gentle on your teeth",
      "Easily fits into your daily or nightly routine",
      "Custom-fit tray provides a comfortable process",
    ],
    sections: [
      {
        heading: "What is Enlighten Whitening?",
        body: [
          "A popular choice for teeth whitening, Enlighten home kits allow you to take control of your treatment and achieve a brighter smile in the comfort of your home.",
          "We take 3D scans of your teeth to create custom mouth trays, designed to be used with a specially formulated whitening gel. The trays can be worn at night or for a shorter period during the day — whichever suits your lifestyle. Treatment lasts for 14 days at home and is completed with one in-surgery appointment to ensure you achieve the best results.",
          "Although this treatment is carried out at home, we also keep a close eye on your teeth to lessen any gum irritation and sensitivity. With simple maintenance at home, your brighter smile should last many years.",
        ],
      },
    ],
  },

  "composite-bonding": {
    hub: "cosmetic",
    title: "Composite Bonding",
    lead: "For light damage to your front teeth or contouring your bite surfaces on the back teeth, we can use composite bonding to rebuild teeth.",
    intro: "Composite is a special dental resin made from a combination of plastic and glass. It can perfectly mimic tooth enamel, and we can colour-match it to your tooth colour so it looks just like your own tooth.",
    benefitsLabel: "Benefits of composite bonding",
    benefits: [
      "No need to remove any tooth to restore",
      "Quick treatment that occurs in our practice",
      "We can easily match the composite to your tooth colour",
      "Easy to remove if you choose to do so later on",
    ],
    sections: [
      {
        heading: "What is involved in the treatment?",
        body: [
          "We first dry the tooth and prepare the surface with a special acidic gel, creating a rough surface for the composite to properly bond to. We then apply the composite in layers, gradually building up the shape, and use a blue light to harden the resin. Finally, we polish the composite so it looks just like a natural tooth.",
        ],
      },
      {
        heading: "Looking after your restored tooth",
        body: [
          "Composite is invulnerable to bacteria and decay, but the natural tooth underneath isn't, so great oral hygiene at home will keep your tooth lasting for as long as possible.",
          "You may require maintenance on these restorations, particularly if you enjoy tea, coffee or other food and drinks that stain teeth — this can easily be monitored at your regular check-ups.",
        ],
      },
    ],
  },

  veneers: {
    hub: "cosmetic",
    title: "Veneers",
    lead: "A veneer is a thin, tooth-coloured shell fixed to the front of a tooth to mask discolouration, an irregular shape, damage or small gaps.",
    intro: "Veneers are usually fitted to the front upper and lower teeth and are made from ceramic, porcelain or composite material. They can be used to enhance your smile and help protect an affected tooth from further damage.",
    benefitsLabel: "Benefits of veneers",
    benefits: [
      "More of the healthy tooth can be retained",
      "Natural-looking and colour-matched to your teeth",
      "Durable and stain-resistant",
      "Can correct a number of flaws",
    ],
    sections: [
      {
        heading: "What is involved in the treatment?",
        body: [
          "If necessary, a thin layer of enamel is removed from the surface of the tooth to accommodate the veneer. Impressions are then taken so a customised veneer can be produced in a laboratory, with the colour of your teeth noted so it will blend in perfectly. When ready, the veneer is bonded to the tooth using a strong dental adhesive.",
        ],
      },
      {
        heading: "Looking after your restored tooth",
        body: [
          "After fitting, it's important to keep your veneer well-maintained with regular brushing and interdental cleaning — your dentist and hygienist will show you how. Although veneers are resilient, treat them with care: try not to bite your fingernails, chew pen tops, or open anything with your teeth, and steer clear of very hard foods that could cause damage.",
        ],
      },
    ],
  },

  invisalign: {
    hub: "orthodontic",
    title: "Invisalign",
    lead: "A popular treatment with adults after a straight smile, Invisalign moves teeth to a more even position without impacting day-to-day life.",
    intro: "Virtually invisible when you smile, these clear aligners are designed to be comfortable and unobtrusive. As they are removable, you can brush your teeth as normal and eat whatever you choose, though it's recommended you wear them for 20 out of 24 hours a day.",
    benefitsLabel: "Benefits of Invisalign",
    benefits: [
      "Virtually invisible",
      "Custom-made, comfort-first fit",
      "Easy to maintain good oral hygiene",
      "Versatile — fixes lots of different teeth structure issues",
    ],
    sections: [
      {
        heading: "What types of Invisalign are there?",
        body: [
          "We offer a range of Invisalign treatments, and our qualified team can help advise you on the best option for your teeth:",
          "Invisalign Full — often the most common choice, giving the best results for more complex cases, with an unlimited number of clear aligners given during treatment.",
          "Invisalign Lite — better suited to more moderate cases, needing fewer aligners and a shorter treatment time.",
          "Invisalign Go — a very popular treatment offering a simplified, fast way to straighten teeth, taking approximately 6–9 months.",
        ],
      },
      {
        heading: "What does the treatment involve?",
        body: [
          "If you are a suitable candidate for this adult-friendly treatment, we take impressions and photos and collect other information about your teeth. We then use special 3D technology to create a personalised plan, showing how your teeth will move and how they'll look after treatment.",
          "When the aligners are ready, you'll wear a different one every two weeks until the carefully controlled force shifts your teeth into a better position. You may feel minor discomfort when a new aligner is fitted, but this is usually just a feeling of pressure and a good indicator that the treatment is working.",
          "Treatment times vary depending on your individual case, but most are completed in 6–12 months. As the aligners only work while worn, we recommend keeping them in place for 20–22 hours per day.",
        ],
      },
    ],
  },

  "invisalign-go": {
    hub: "orthodontic",
    title: "Invisalign Go",
    lead: "Invisalign Go aligners are a discreet and more efficient way to transform your smile, specifically designed for crowding or spacing in the front teeth.",
    intro: "Invisalign Go is ideal for adults with minor alignment issues, or those who want to straighten their front six to eight teeth before undergoing cosmetic procedures like composite bonding or teeth whitening.",
    benefitsLabel: "Benefits of Invisalign Go",
    benefits: [
      "Much faster treatment than traditional Invisalign",
      "Virtually invisible and custom-made for a comfort-first fit",
      "Easy to maintain good oral hygiene",
      "Cost-effective, with lower lab fees",
    ],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "If you are a suitable candidate for Invisalign Go, we use advanced 3D imaging to create a personalised plan and treatment journey. From these images, a series of aligners is made specifically for your teeth, gradually guiding them into a straighter position — we'll also show you a projected image of how your teeth will look after treatment.",
        ],
      },
      {
        heading: "What are the other benefits?",
        body: [
          "Invisalign Go is also a perfect first step before further cosmetic or general dental treatments, providing a solid basis for long-lasting results. It particularly helps patients who struggle to keep certain areas clean due to the position of their teeth, supporting excellent oral health.",
          "It's especially effective for simple corrections and mild crowding or spacing, with treatment usually taking less than 12 months. After treatment, we can look at other procedures such as teeth whitening or composite bonding to fully bring back that flawless smile.",
        ],
      },
    ],
  },

  "fixed-braces": {
    hub: "orthodontic",
    title: "Fixed Braces",
    lead: "Conventional fixed braces can address a broad range of alignment problems, correcting overbites, underbites, gaps and crooked teeth.",
    intro: "Fixed braces produce the most precise results, as they are constantly moving teeth to the desired position. While orthodontic treatment does last over a year, it creates results that last a lifetime.",
    benefitsLabel: "Benefits of fixed braces",
    benefits: [
      "Unmatched precision",
      "Corrects bigger issues, such as a misaligned bite",
      "Built for your specific needs",
      "Guaranteed to work, as they can't be easily removed",
    ],
    sections: [
      {
        heading: "What are fixed braces?",
        body: [
          "Fixed braces consist of metal brackets attached to the front surface of the teeth and thin metal wires held in place with elastics. Brackets are now generally smaller than they once were and can be customised with coloured elastics — more discreet options are also available, featuring ceramic brackets and tooth-coloured wires.",
        ],
      },
      {
        heading: "What does the treatment involve?",
        body: [
          "If your teeth are overcrowded, it may be necessary to remove one or more teeth prior to fitting, or bands can be inserted to create sufficient gaps. After your teeth are cleaned and dried, brackets are fixed in place with a strong dental adhesive and wires attached.",
          "The wire is shaped to encourage the teeth to move and, as it slowly returns to its original shape, it pulls the teeth with it — first moving the crown of the tooth, then the root. Adjustments are needed every 4–6 weeks.",
          "Some people experience a little discomfort during treatment, particularly in the first few days after fitting or a tightening appointment. Paracetamol or ibuprofen can ease any soreness, and a soft diet may help during this time. Treatment normally takes 12–24 months, after which you'll need to wear a retainer to keep your teeth in their new position.",
        ],
      },
    ],
  },

  "spark-aligners": {
    hub: "orthodontic",
    title: "Spark Aligners",
    lead: "Spark aligners are virtually invisible when worn, and a simple, effective way for many people to achieve their dream straighter smile.",
    intro: "Discreet orthodontic treatments are more popular than ever, with clear aligners giving you the chance to achieve the straight smile you've always wanted without the need for fixed metal braces.",
    benefitsLabel: "Benefits of Spark aligners",
    benefits: [
      "Enhanced transparency thanks to TruGEN™ material",
      "Built-in scalloped edge to prevent rubbing your gums",
      "Versatile option for multiple treatments",
      "Easily removable and hygienic",
    ],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "We first see you for a consultation appointment, making sure you are a suitable candidate for Spark clear aligners. If you are happy to go ahead, we use our advanced digital equipment to take highly accurate scans and images and create your bespoke treatment plan.",
          "Your Spark clear aligners are completely custom-made for a comfortable, precise fit. When ready, we show you how to fit them correctly and give you personalised tips and advice for your treatment.",
          "You need to wear your clear aligners for at least 22 hours per day, allowing gentle, carefully controlled forces to work on straightening your teeth. We see you in the practice for regular appointments to check treatment is going to plan and give you your next set of aligners.",
          "When you have worn the last aligner, your newly straight and confident smile is complete — we give you a final retainer to help maintain your results for the long term.",
        ],
      },
      {
        heading: "How long does the treatment take?",
        body: [
          "The length of your clear aligner treatment varies depending on your individual case and how far your teeth have to move. On average, Spark clear aligner cases are completed in 6–18 months, and we'll give you an idea of your timeframe during your initial consultation.",
        ],
      },
    ],
  },

  "anti-wrinkle-treatments": {
    hub: "aesthetics",
    title: "Anti-Wrinkle Treatments",
    lead: "We can combat wrinkles and lines with non-invasive anti-ageing injections, such as Botox.",
    intro: "These treatments involve using a purified protein that relaxes specific muscles under the skin. This eliminates lines that appear through excessive movements, such as frowning and laughing.",
    benefitsLabel: "Reasons to have anti-wrinkle treatment",
    benefits: [
      "Forehead lines",
      "Frown lines",
      "Vertical lip lines",
      "Crow's feet",
      "Non-surgical option",
      "Quick, simple procedure with lasting results",
    ],
    sections: [
      {
        heading: "A personal passion for skin health",
        body: [
          "Amelia Madan-Dumper trained in Aesthetics with Oris Medical before up-levelling her skills with Avanti Aesthetics, introducing Obagi medical skincare and anti-wrinkle therapies to the practice. Every treatment plan begins with a full consultation, so you understand exactly what to expect before going ahead.",
        ],
      },
    ],
  },

  "skin-care": {
    hub: "aesthetics",
    title: "Skin Care",
    lead: "With Obagi skin care you can give your skin a new lease of life that will get your face glowing.",
    intro: "Our popular chemical peel revitalises facial skin by gently removing the outer layer of skin, taking away old skin that may be blemished, uneven and dry, and encouraging a fully rejuvenated new layer to grow.",
    benefitsLabel: "Areas of concern that can be treated",
    benefits: [
      "Acne & acne scarring",
      "Dryness & pigmentation",
      "Dryness, sun damage & signs of ageing",
      "Enlarged pores",
    ],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "We begin with a full, face-to-face consultation to understand your skin and goals. The Obagi Blue Peel Radiance facial is a salicylic acid-based chemical peel, applied to gently exfoliate the outer layer of skin. Most patients see little to no downtime, with skin appearing brighter and smoother within days.",
        ],
      },
    ],
  },

  profhilo: {
    hub: "aesthetics",
    title: "Profhilo",
    lead: "Using a unique hyaluronic acid gel, Profhilo intensely moisturises and hydrates ageing skin, smoothing lines and creating a tightening effect.",
    intro: "Profhilo remodels the skin and boosts skin cells to work effectively, providing elasticity and support. The treatment works beneath the skin, stimulating collagen production to counteract sagging and improve your overall appearance.",
    benefitsLabel: "Areas of concern that can be treated",
    benefits: ["Face & neck", "Hands & arms", "Elbows & knees", "Abdomen"],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "Initially, we invite you for a full medical, face-to-face consultation, where we ensure the treatment is suitable for you and discuss your ideal results. You will be required to give your consent before we begin.",
          "We ensure you are comfortable and relaxed before beginning the procedure. A specially formulated hyaluronic acid gel is injected under your skin, dispersing easily and allowing hydration from within. It promotes collagen and elastin production, helping to smooth fine lines and lift and tighten the skin.",
          "There is no downtime following treatment, so you can return to your normal routine straight away. You may experience some sensitivity or mild swelling, but this fades after a few days.",
          "Results can be visible as soon as 24 hours after treatment. Profhilo involves two sessions, repeated one month after the initial treatment, and you can continue with treatments at three- or six-month intervals, which will be discussed at your consultation.",
        ],
      },
    ],
  },

  "dermal-fillers": {
    hub: "aesthetics",
    title: "Dermal Fillers",
    lead: "Dermal fillers use hyaluronic acid, a substance found naturally in the body, to replenish lost volume and hydration in the skin.",
    intro: "Fillers help maintain the structure of the face, which loses volume due to depleted collagen as we age. The treatment can also improve the appearance of facial skin affected by weight loss, smoking or sun damage.",
    benefitsLabel: "Areas of concern that can be treated",
    benefits: ["Lips & cheeks", "Nasolabial lines", "Marionette lines", "Upper lip area & chin"],
    sections: [
      {
        heading: "What does the treatment involve?",
        body: [
          "At your initial consultation, we carry out a full face-to-face assessment and careful planning of your treatment and costs, including photographs so we can clearly show you the difference fillers can make. You will be required to give your consent before we begin.",
          "There are a number of dermal fillers available, so we select the one suited to the result you want to achieve. We ensure you are comfortable before beginning, and can use topical local anaesthetic if needed — you may feel some discomfort, but it shouldn't be painful.",
          "The treatment involves injecting sterilised hyaluronic acid gel under the skin using needles, and sometimes cannulas (blunt-ended tubes) to ensure the gel is placed safely. Treatment is straightforward and quick, with results visible soon after and lasting around 6–10 months before needing to be topped up.",
        ],
      },
    ],
  },
};

module.exports = { hubs, details };
