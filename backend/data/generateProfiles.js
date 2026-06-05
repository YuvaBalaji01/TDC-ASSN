const fs = require("fs");

const maleFirstNames = [
  "Rahul","Arjun","Rohit","Karan","Vikram",
  "Aman","Siddharth","Akash","Varun","Aditya"
];

const femaleFirstNames = [
  "Priya","Ananya","Sneha","Pooja","Aditi",
  "Neha","Riya","Kavya","Meera","Shruti"
];

const lastNames = [
  "Sharma","Reddy","Gupta","Patel",
  "Verma","Singh","Joshi","Iyer"
];

const cities = [
  "Hyderabad",
  "Bangalore",
  "Mumbai",
  "Pune",
  "Chennai",
  "Delhi"
];

const companies = [
  "Microsoft",
  "Google",
  "Amazon",
  "Infosys",
  "TCS",
  "Accenture"
];

const religions = [
  "Hindu",
  "Christian",
  "Muslim"
];

const castes = [
  "Brahmin",
  "Reddy",
  "Kamma",
  "Patel"
];

const profiles = [];

for (let i = 0; i < 50; i++) {
  profiles.push({
    firstName:
      maleFirstNames[
        Math.floor(Math.random() * maleFirstNames.length)
      ],
    lastName:
      lastNames[
        Math.floor(Math.random() * lastNames.length)
      ],

    gender: "Male",

    age: Math.floor(Math.random() * 8) + 26,

    city:
      cities[
        Math.floor(Math.random() * cities.length)
      ],

    country: "India",

    height: `${Math.floor(Math.random() * 8) + 5}'${Math.floor(
      Math.random() * 12
    )}`,

    maritalStatus: "Never Married",

    religion:
      religions[
        Math.floor(Math.random() * religions.length)
      ],

    caste:
      castes[
        Math.floor(Math.random() * castes.length)
      ],

    languages: ["English", "Hindi"],

    college: "IIT Hyderabad",

    degree: "B.Tech",

    company:
      companies[
        Math.floor(Math.random() * companies.length)
      ],

    designation: "Software Engineer",

    income: `${Math.floor(Math.random() * 20) + 10} LPA`,

    wantKids: "Yes",

    openToRelocate: "Yes",

    openToPets: "Maybe",
  });
}

for (let i = 0; i < 50; i++) {
  profiles.push({
    firstName:
      femaleFirstNames[
        Math.floor(Math.random() * femaleFirstNames.length)
      ],
    lastName:
      lastNames[
        Math.floor(Math.random() * lastNames.length)
      ],

    gender: "Female",

    age: Math.floor(Math.random() * 8) + 22,

    city:
      cities[
        Math.floor(Math.random() * cities.length)
      ],

    country: "India",

    height: `${Math.floor(Math.random() * 6) + 5}'${Math.floor(
      Math.random() * 12
    )}`,

    maritalStatus: "Never Married",

    religion:
      religions[
        Math.floor(Math.random() * religions.length)
      ],

    caste:
      castes[
        Math.floor(Math.random() * castes.length)
      ],

    languages: ["English", "Hindi"],

    college: "BITS Pilani",

    degree: "B.Tech",

    company:
      companies[
        Math.floor(Math.random() * companies.length)
      ],

    designation: "Software Engineer",

    income: `${Math.floor(Math.random() * 15) + 8} LPA`,

    wantKids: "Yes",

    openToRelocate: "Yes",

    openToPets: "Maybe",
  });
}

fs.writeFileSync(
  "./data/profiles.json",
  JSON.stringify(profiles, null, 2)
);

console.log("100 Profiles Generated");