// All copy is taken from the aaqzinteriors.com homepage, in the homepage's order.
// The exceptions are `contact` (its Contact Us page) and `testimonials`. Photos
// under /images/aaqz are AAQZ's own, from its site. Those under /images/placeholder
// are temporary stand-ins from the Kairn template: replace them before going live.
const photo = (name: string) => `/images/placeholder/${name}.jpg`;
const aaqzPhoto = (name: string) => `/images/aaqz/${name}.jpg`;

export const contact = {
  phones: [
    { label: "+91 9821782286", href: "tel:+919821782286" },
    { label: "+91 9820325450", href: "tel:+919820325450" },
  ],
  email: "aaqzinteriors9@gmail.com",
  address:
    "Shop No. 13, Manju Niketan Building, Next to Topiwala Center, Goregaon (West), Mumbai - 400104",
  directions:
    "https://www.google.com/maps/search/?api=1&query=Manju+Niketan+Building+Topiwala+Center+Goregaon+West+Mumbai+400104",
};

export const sectors = ["Residents", "Hotel & Restaurants", "Offices", "Banks"];

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  {
    label: "Services",
    href: "#services",
    children: sectors.map((label) => ({ label, href: "#services" })),
  },
  { label: "Our Project", href: "#projects" },
  { label: "Contact Us", href: "#contact" },
];

export const hero = {
  slides: [
    {
      title: "Designing spaces that enhance life and inspire creativity.",
      image: photo("hero-media-room"),
    },
    {
      title: "Designing with a purpose, creating spaces that work for you.",
      image: photo("hero-bedroom"),
    },
    {
      title:
        "Creating unique and personalized spaces that reflect your style.",
      image: aaqzPhoto("octacrest-lounge"),
    },
  ],
};

export const story = {
  eyebrow: "Our Story",
  title: "Welcome To ZS Design Studio",
  first:
    "We take pride in our reputation for creating spectacular interiors for commercial and residential customers.",
  second:
    "From the moment that you meet with us to discuss your ideas, we are able to turn your vision into reality.",
  third:
    "We love what we do, so much that we want to share our passion with you by sharing the best interior design services we offer.",
  background: "/images/story-background.jpg",
  images: {
    tall: photo("story-basin"),
    small: photo("story-console"),
    wide: aaqzPhoto("oberoi-lounge"),
    bedroom: aaqzPhoto("octacrest-bedroom"),
    dining: aaqzPhoto("octacrest-dining"),
  },
};

export const services = {
  eyebrow: "What Can We Offer",
  title: "Our Services",
  items: [
    {
      title: "Architecture & Interior",
      text: "When it comes to your home, you want to feel at home and enjoy the comfort of living in a home that fits your lifestyle.",
      image: photo("service-kitchen"),
    },
    {
      title: "Project Planning",
      text: "From the moment that you meet with us to discuss your ideas, we are able to turn your vision into reality.",
      image: photo("service-joinery"),
    },
    {
      title: "Product Design",
      text: "From elegant to modern, modern and contemporary style, designers are a necessary part of your home.",
      image: photo("service-desk"),
    },
    {
      title: "Customer Solutions",
      text: "We've great range of professionals & expertise who will guide you for the best designs which suits your homes.",
      image: photo("service-cabinet"),
    },
  ],
};

export const projects = {
  eyebrow: "Living Room",
  title: "Our Project",
  octacrest: {
    name: "Octacrest",
    location: "Lokhandwala Kandivali",
    category: "Living",
    image: aaqzPhoto("octacrest-living"),
  },
  oberoi: {
    name: "Oberoi",
    location: "Goregaon",
    category: "Living",
    image: aaqzPhoto("oberoi-living"),
    detail: aaqzPhoto("oberoi-sofa"),
  },
};

export const callToAction = {
  title: "Get Incredible Interior Design Right Now!",
  text: "From the moment that you meet with us to discuss your ideas, we are able to turn your vision into reality.",
  image: photo("cta-desk"),
};

export const values = {
  eyebrow: "Our Skills",
  title: "The Core Company Values",
  items: [
    {
      title: "Illustration",
      text: "The purpose of illustration is to communicate a design concept or idea to clients, builders, or other stakeholders involved in a project.",
    },
    {
      title: "Interior Design",
      text: "It involves selecting and arranging furnishings, color schemes, lighting, and other decorative elements to create a functional and visually appealing space.",
    },
    {
      title: "Architecture",
      text: "Architects are responsible for designing the overall layout of a building, including the structural framework, the materials used, and the building systems.",
    },
    {
      title: "3D Modeling",
      text: "3D modeling is a powerful tool that can help designers to create more accurate, efficient, and visually appealing designs.",
    },
  ],
};

// The heading is the homepage's second hero line, split in two.
export const elements = {
  eyebrow: "Interior Design",
  title: "Designing with a purpose,",
  text: "creating spaces that work for you.",
  images: [
    photo("element-lamp"),
    aaqzPhoto("octacrest-ceiling"),
    photo("element-gallery"),
    aaqzPhoto("oberoi-hall"),
    photo("element-relief"),
    aaqzPhoto("octacrest-study"),
    photo("element-chair-dark"),
    photo("element-chair"),
    photo("element-lounger"),
  ],
};

// Copied as-is from the site's About page, where this same lorem ipsum quote and
// name repeat five times. Replace with genuine client quotes before going live.
export const testimonials = {
  title: "What People Say",
  items: [
    {
      quote:
        "Ipsum dolor sit amet, consectetur adipiscing elit. Fringilla vel tincidunt ipsum ac. Nam at et id leo pulvinar egestas mi lorem. Adipiscing felis, vel faucibus in. Hendrerit viverra elementum venenatis pellentesque pellentesque ornare",
      name: "Helena Gibbson",
      role: "Finance Manager",
    },
    {
      quote:
        "Ipsum dolor sit amet, consectetur adipiscing elit. Fringilla vel tincidunt ipsum ac. Nam at et id leo pulvinar egestas mi lorem. Adipiscing felis, vel faucibus in. Hendrerit viverra elementum venenatis pellentesque pellentesque ornare",
      name: "Helena Gibbson",
      role: "Finance Manager",
    },
    {
      quote:
        "Ipsum dolor sit amet, consectetur adipiscing elit. Fringilla vel tincidunt ipsum ac. Nam at et id leo pulvinar egestas mi lorem. Adipiscing felis, vel faucibus in. Hendrerit viverra elementum venenatis pellentesque pellentesque ornare",
      name: "Helena Gibbson",
      role: "Finance Manager",
    },
  ],
};
