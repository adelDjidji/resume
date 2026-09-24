export const profile = {
  name: "Adel Djidjik",
  role: "Software Engineer",
  headline: "Full-stack JavaScript developer",
  email: "djidjik.adel.sp@gmail.com",
  phone: "(+213) 669 479 443",
  phoneHref: "+213669479443",
  location: "Ouled Hedadj, Boumerdès, Algeria",
  resumeUrl:
    "https://docs.google.com/document/d/1scVtph_ctSwPrrbcl394PlHOt3PFzTxO/edit?usp=sharing&ouid=114007002643511804895&rtpof=true&sd=true",
  linkedin: "https://www.linkedin.com/in/adel-djidjik/",
  github: "https://github.com/adelDjidji",
  upwork: "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
};

export const strengths = [
  {
    title: "Full-stack craft",
    body: "Skilled in the MERN stack, REST API integration and UI/UX — delivering high-quality, efficient solutions on time.",
  },
  {
    title: "Built to scale",
    body: "From layout design to code, optimizing large-scale applications for performance and scalability.",
  },
  {
    title: "Delivery-minded",
    body: "Strong project management and problem-solving, ensuring smooth execution from planning to deployment.",
  },
  {
    title: "Team player",
    body: "An effective communicator, adaptable to fast-paced environments and committed to continuous improvement.",
  },
];

export const techStack = [
  { src: "/img/tech/react.png", alt: "React" },
  { src: "/img/tech/nextjs.svg", alt: "Next.js" },
  { src: "/img/tech/ts.png", alt: "TypeScript" },
  { src: "/img/tech/nodejs.png", alt: "Node.js" },
  { src: "/img/tech/tailwind.png", alt: "Tailwind CSS" },
  { src: "/img/tech/docker.png", alt: "Docker" },
];

export type Experience = {
  role: string;
  company: string;
  logo?: string;
  link: string;
  location: string;
  period: string;
  start: string;
  highlights: { title?: string; items: string[] }[];
};

export const experience: Experience[] = [
  {
    role: "Full-stack Software Engineer",
    company: "Skaalab",
    logo: "https://www.skaalab.com/images/logo-v1.png",
    link: "https://www.skaalab.com/",
    location: "Remote, Algeria",
    period: "Sept 2021 — Present",
    start: "2021",
    highlights: [
      {
        title: "Clevermate",
        items: [
          "Designed and developed a new matching platform from scratch.",
          "Maintained legacy systems (Node.js, React.js) and implemented a CRM with Forest Admin.",
          "Integrated SMS, email, Calendly, and Stripe services.",
          "Improved SEO and optimized WordPress blog performance.",
        ],
      },
      {
        title: "Servichain",
        items: [
          "Developed the Smart Wallet mobile app using React Native and Expo.",
          "Built APIs with Node.js and Express.js and integrated front-end/back-end workflows.",
          "Designed architecture for app synchronization with the Marketplace.",
        ],
      },
      {
        title: "Adriver",
        items: [
          "Built a web solution for 3D object manipulation using Three.js.",
          "Developed APIs for uploading/downloading 3D models.",
          "Designed the desktop app interface with React.js and Electron.js.",
        ],
      },
    ],
  },
  {
    role: "Full-stack Software Engineer",
    company: "RightInnov · Cevital Group",
    logo: "https://www.cevital.com/wp-content/themes/cevital/img/logo.svg",
    link: "https://www.cevital.com",
    location: "Hybrid, Algeria",
    period: "Oct 2020 — Sept 2021",
    start: "2020",
    highlights: [
      {
        items: [
          "Designed UI/UX wireframes and sketches.",
          "Implemented front-end features using React and Redux.",
          "Tested and deployed the web applications.",
          "Worked within the Scrum framework.",
        ],
      },
    ],
  },
  {
    role: "Independent Web Developer",
    company: "Upwork",
    logo: "/img/logos/upwork.png",
    link: "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
    location: "Remote",
    period: "April 2020 — Sept 2021",
    start: "2020",
    highlights: [
      {
        items: [
          "Converted wireframes into pixel-perfect, fully responsive React web apps.",
          "Communicated with clients to understand their needs and gather feedback.",
          "Implemented continuous integration with Jenkins.",
          "Debugged and fixed CSS styling issues and responsive views.",
        ],
      },
    ],
  },
  {
    role: "Software Engineer",
    company: "National Agency of Employment",
    logo: "https://auth.anem.dz/icon1.png",
    link: "https://wassitonline.anem.dz/",
    location: "Remote & Algiers, Algeria",
    period: "Dec 2019 — Oct 2020",
    start: "2019",
    highlights: [
      {
        items: [
          "Maintained the UI and UX of web applications and solutions.",
          "Deployed and tested web apps on IIS; managed mobile apps on the Play Store.",
          "Wrote technical documents and illustrated system architecture with UML.",
          "Built new features and fixed bugs on the AngularJS front end.",
          "Implemented, tested and deployed an Identity Server on .NET Core 2.",
        ],
      },
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Cevital",
    link: "https://www.cevital.com/en/",
    location: "Algiers, Algeria",
    period: "Sept 2018 — Aug 2019",
    start: "2018",
    highlights: [
      {
        items: [
          "Built a web application for talent management.",
          "Analysed company needs and wrote functional and technical specifications.",
          "Designed wireframes and validated them with the product owner.",
          "Implemented the front end in React and the back end in Node.js with MySQL.",
          "Wrote full documentation: specs, diagrams, system design and tests.",
        ],
      },
    ],
  },
  {
    role: "Front-end Developer Intern",
    company: "Unicoorp",
    link: "https://www.linkedin.com/company/unicoorp/about/",
    location: "Algiers, Algeria",
    period: "July 2018 — Nov 2018",
    start: "2018",
    highlights: [
      {
        items: [
          "Designed web interfaces and converted PSD designs to HTML.",
          "Built fully responsive web applications with HTML, CSS and jQuery.",
          "Implemented an e-learning dashboard using React and Material UI.",
        ],
      },
    ],
  },
];

export const graduation = {
  title: "MSc, Software Engineering",
  date: "Sept 2019",
};

/**
 * Client reviews. `lat`/`lng` place the marker on the globe; reviews that share
 * a `place` are grouped under one marker. Only the country is known for most
 * clients, so markers sit on a representative city — set `place` and the
 * coordinates to the client's real city to be more precise.
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
  source: "linkedin" | "upwork";
  link: string;
  date: string;
  place: string;
  lat: number;
  lng: number;
};

const FRANCE = { place: "France", lat: 48.8566, lng: 2.3522 };
const USA = { place: "United States", lat: 40.7128, lng: -74.006 };
const SINGAPORE = { place: "Singapore", lat: 1.3521, lng: 103.8198 };
const ALGERIA = { place: "Algeria", lat: 36.7538, lng: 3.0588 };

export const HOME = { place: "Boumerdès, Algeria", lat: 36.7664, lng: 3.4772 };

export const testimonials: Testimonial[] = [
  {
    quote:
      "J’ai eu le plaisir de collaborer avec Adel sur le projet Fneek, et je ne peux que souligner la qualité de son travail. Il a su apporter des solutions efficaces et adaptées tout en respectant les délais. Son expertise technique, couplée à une grande réactivité, a été un atout précieux pour le succès de l’application. Je le recommande vivement pour tout projet de développement !",
    name: "Chaker Boughanbouz",
    role: "Founder & CEO @ Fneek · Researcher · Lecturer",
    avatar:
      "https://media.licdn.com/dms/image/v2/C5603AQF_OTj_YxNH_w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1541098518473?e=1739404800&v=beta&t=KICS0uDWVOJSekM6_jtTbnsONl8TFWMOCIMFKeuauC0",
    source: "linkedin",
    link: "https://www.linkedin.com/in/chakerboughanbouz/",
    date: "2024-06",
    ...FRANCE,
  },
  {
    quote:
      "Adel is a professional with high skills! It is incredible how Adel can adapt with the team and the different situations. An ally that got all what one need to build.",
    name: "Niamkey Kouamé",
    role: "CEO Servichain · Blockchain Advisor",
    avatar:
      "https://media.licdn.com/dms/image/v2/C5603AQEZZMdW_kE9Kw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1641453809946?e=1739404800&v=beta&t=KK5bouLUI4JiebtFteiNg2bb441DZw4UbDYT9aCs11w",
    source: "linkedin",
    link: "https://www.linkedin.com/in/niamkey-kouam%C3%A9/",
    date: "2023-06",
    ...FRANCE,
  },
  {
    quote:
      "Excellent work. The contractor was willing to solve the issue right away. He also did a zoom call and fixed the problem instantly. Very impressive and great communication skills. I highly recommend him for all web work.",
    name: "Joseph Gilbert",
    role: "Web Agency Director",
    source: "upwork",
    link: "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
    date: "2021-03",
    ...USA,
  },
  {
    quote:
      "Adel is the most trustworthy freelancer. He is responsive, cooperative, good responsibility. I highly recommend Adel and I will give him 6 star rating... :)",
    name: "Jesen Bak",
    role: "CEO / Art Director · PAY N EARN PTE. LTD.",
    avatar: "https://cdn.dribbble.com/users/2436043/avatars/normal/data?1532185867",
    source: "upwork",
    link: "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
    date: "2020-09",
    ...SINGAPORE,
  },
  {
    quote: "Adel is friendly and worked hard while he was with us.",
    name: "Nick Esposito",
    role: "CEO · Future Realities",
    source: "upwork",
    link: "https://www.upwork.com/o/profiles/users/~01dbcd5d17acf61616/",
    date: "2020-07",
    ...USA,
  },
  {
    quote:
      "Adel is a young engineer with high capabilities and innovative thinking. I trained him in project management and he showed an excellent performance in resolving the case studies. You will enjoy working with him.",
    name: "Youcef Belouz",
    role: "CEO & Founder · Connectech & Certipro",
    avatar:
      "https://media.licdn.com/dms/image/v2/D4D03AQG32TfTeBuP-g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1706207277742?e=1739404800&v=beta&t=PArj3h9POJxC0ip5s-v36BVdC0Wd3blToOoO0Pn6F7s",
    source: "linkedin",
    link: "https://www.linkedin.com/in/youcefbelouz/",
    date: "2019-10",
    ...ALGERIA,
  },
  {
    quote:
      "I had the chance to work with Adel, a very serious and dynamic person, he brought a great value to the IT team of Unicoorp. I strongly recommend this engineer for your project!",
    name: "Aghiles Djellouli",
    role: "CRM & Digital Marketing Project Manager · Transdev",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D03AQHULMvY8wLSVw/profile-displayphoto-shrink_800_800/0/1616333475380?e=1622678400&v=beta&t=tWcASxbE3cVRT2jDKbOvTxqdY1zGQeqw7UNq-C6Nnd8",
    source: "linkedin",
    link: "https://www.linkedin.com/in/aghiles-djellouli/",
    date: "2018-10",
    ...FRANCE,
  },
  {
    quote:
      "Adel is among the best people I've met during my academic career, he is a brilliant element, he learns quickly and allows to boost his team with his human and professional qualities. I was his Android trainer to develop an application for an association, we worked together in the preparation of events organized by the clubs CVE and Google Developers Group Algiers. I recommend him for his technical skills, his human and professional qualities.",
    name: "Bouzid Medjdoub",
    role: "Salesforce Technical Functional Consultant",
    avatar:
      "https://media-exp1.licdn.com/dms/image/C4D35AQF9ZlQOwkUjQA/profile-framedphoto-shrink_800_800/0/1602534092209?e=1617951600&v=beta&t=LLBThpLysQI4oYuBAkVX_DnTUZxuQCbqIYbCXpjnCRo",
    source: "linkedin",
    link: "https://www.linkedin.com/in/bouzid-medjdoub/",
    date: "2018-03",
    ...FRANCE,
  },
];

export type Project = {
  name: string;
  description?: string;
  cover: string;
  link?: string;
  skills: string[];
  date: string;
};

export const projects: Project[] = [
  {
    name: "Rwad Platform",
    description: "Platform for training centers and courses.",
    cover: "/img/rwad.png",
    skills: ["Next.js", "Strapi", "React", "Responsive", "Git"],
    date: "Since 09·2020",
  },
  {
    name: "Media Analytics",
    description: "Social media analytics for Facebook & Twitter.",
    cover: "/img/mediaanalyti.png",
    skills: ["React", "Redux", "react-grid-layout", "Material-UI", "MongoDB", "Node.js", "GitLab"],
    date: "12·2020 — 03·2021",
  },
  {
    name: "Cash Consolidation & Reporting",
    description: "Web tool for managing cash flow, bank accounts and reporting.",
    cover: "/img/dfc.png",
    skills: ["React", "Redux", "Material-UI", "MongoDB", "Node.js", "GitLab"],
    date: "10·2020 — 12·2020",
  },
  {
    name: "Wassit Online",
    description: "Algeria’s national employment platform.",
    cover: "/img/wo.png",
    link: "https://wassitonline.anem.dz/",
    skills: ["AngularJS", ".NET Core", "IdentityServer", "SQL Server", "IIS", "TFS", "UML", "OAuth2"],
    date: "12·2019 — 09·2020",
  },
  {
    name: "PDF Extractor",
    description: "Extracts and splits PDF pages and sends them by email.",
    cover: "/img/sagepdf.png",
    skills: ["Python", "Django", "Heroku"],
    date: "06·2020",
  },
  {
    name: "CONVERT Portal",
    description: "Fintech startup website, Singapore.",
    cover: "/img/convert-0.png",
    skills: ["React", "JavaScript", "Ant Design", "Responsive", "Multi-lang", "Heroku", "Git"],
    date: "06·2020 — 08·2020",
  },
  {
    name: "TETHYR Redesign",
    description: "Marketing website redesign.",
    cover: "/img/tethyr_landing.png",
    skills: ["React", "Redux", "ES7", "Ant Design", "Responsive", "Jenkins", "Git"],
    date: "04·2020 — 06·2020",
  },
  {
    name: "Omran Startups",
    description: "Platform to help and accelerate startup ideas.",
    cover: "/img/startups.Omran.jpg",
    link: "http://startups.omran.org",
    skills: ["HTML", "AJAX", "jQuery", "Responsive", "PHP", "Git"],
    date: "01·2019 — 03·2019",
  },
  {
    name: "Talent Performance · Cevital",
    description: "Human-resources performance management.",
    cover: "/img/talent.png",
    skills: ["React", "Node.js", "Ant Design", "MySQL", "Socket.IO", "Flask", "Data mining", "Git", "UML"],
    date: "10·2018 — 08·2019",
  },
  {
    name: "Visor Web Interface",
    description: "Responsive web interface.",
    cover: "/img/VISOR.jpg",
    skills: ["HTML", "JavaScript", "CSS", "Responsive", "Git"],
    date: "09·2018",
  },
];

export const honors = [
  { src: "/img/certifs/guines.jpg", title: "Guinness World Record", caption: "Hajj Hackathon, Saudi Arabia · 2018", w: 1293, h: 1995 },
  { src: "/img/certifs/hajjHackathon.jpeg", title: "Hajj Hackathon", caption: "Saudi Arabia · 2018", w: 1200, h: 630 },
  { src: "/img/certifs/770001_SFC_Adel Djidjik.jpg", title: "Scrum Fundamentals Certified", caption: "SCRUMstudy", w: 3301, h: 2551 },
  { src: "/img/certifs/datasceince.png", title: "Data Science Fundamentals", caption: "Certificate", w: 1506, h: 938 },
  { src: "/img/certifs/EFSET.png", title: "EF SET English · C2", caption: "Proficient", w: 1274, h: 1214 },
  { src: "/img/certifs/itil1.png", title: "ITIL Training", caption: "Part I", w: 1542, h: 1186 },
  { src: "/img/certifs/itil2.png", title: "ITIL Training", caption: "Part II", w: 1548, h: 1184 },
  { src: "/img/certifs/itil3.png", title: "ITIL Training", caption: "Part III", w: 1344, h: 1030 },
  { src: "/img/certifs/webtrainer.png", title: "Web Trainer", caption: "Certificate", w: 1504, h: 1064 },
];
