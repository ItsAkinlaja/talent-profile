import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://njqxrwdresyjbqmjdgxe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qcXhyd2RyZXN5amJxbWpkZ3hlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MTI4NDc3MSwiZXhwIjoyMTA2ODYwNzcxfQ.EpCeY2-09YtdNOtSnHMZLZ0llop48bCMfSeKH2xYruY"
);

const USERS = [
  {
    info: {
      firstName: "Chukwuemeka",
      lastName: "Okafor",
      dob: "1990-03-15",
      occupation: "Software Engineer",
      gender: "Male",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chukwuemeka",
    },
    contact: {
      email: "chukwuemeka.okafor@gmail.com",
      phoneNumber: "+234 801 234 5678",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/chukwuemeka-okafor",
    },
    address: {
      address: "14 Adeola Odeku Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      zipCode: "101001",
    },
    academics: [
      { schoolName: "University of Lagos", degree: "B.Sc. Computer Science", fieldOfStudy: "Computer Science", startYear: 2008, endYear: 2012 },
      { schoolName: "Lagos Business School", degree: "MBA", fieldOfStudy: "Technology Management", startYear: 2016, endYear: 2018 },
    ],
  },
  {
    info: {
      firstName: "Adaeze",
      lastName: "Nwosu",
      dob: "1993-07-22",
      occupation: "Product Manager",
      gender: "Female",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Adaeze",
    },
    contact: {
      email: "adaeze.nwosu@outlook.com",
      phoneNumber: "+234 802 345 6789",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/adaeze-nwosu",
    },
    address: {
      address: "7 Aminu Kano Crescent",
      city: "Abuja",
      state: "FCT",
      country: "Nigeria",
      zipCode: "900001",
    },
    academics: [
      { schoolName: "Obafemi Awolowo University", degree: "B.Sc. Business Administration", fieldOfStudy: "Business Admin", startYear: 2011, endYear: 2015 },
      { schoolName: "Pan-Atlantic University", degree: "MBA", fieldOfStudy: "Product & Innovation", startYear: 2019, endYear: 2021 },
    ],
  },
  {
    info: {
      firstName: "Babatunde",
      lastName: "Fashola",
      dob: "1988-11-04",
      occupation: "Civil Engineer",
      gender: "Male",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Babatunde",
    },
    contact: {
      email: "babatunde.fashola@yahoo.com",
      phoneNumber: "+234 803 456 7890",
      fax: "+234 1 234 5678",
      linkedInUrl: null,
    },
    address: {
      address: "22 Ring Road",
      city: "Ibadan",
      state: "Oyo",
      country: "Nigeria",
      zipCode: "200001",
    },
    academics: [
      { schoolName: "University of Ibadan", degree: "B.Eng. Civil Engineering", fieldOfStudy: "Civil Engineering", startYear: 2006, endYear: 2011 },
      { schoolName: "University of Benin", degree: "M.Eng. Structural Engineering", fieldOfStudy: "Structural Engineering", startYear: 2013, endYear: 2015 },
    ],
  },
  {
    info: {
      firstName: "Ngozi",
      lastName: "Adeyemi",
      dob: "1995-05-30",
      occupation: "Data Scientist",
      gender: "Female",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ngozi",
    },
    contact: {
      email: "ngozi.adeyemi@techcorp.ng",
      phoneNumber: "+234 805 678 9012",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/ngozi-adeyemi",
    },
    address: {
      address: "5 Awolowo Road",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      zipCode: "101233",
    },
    academics: [
      { schoolName: "Covenant University", degree: "B.Sc. Statistics", fieldOfStudy: "Statistics & Mathematics", startYear: 2013, endYear: 2017 },
      { schoolName: "African Institute for Mathematical Sciences", degree: "M.Sc. Data Science", fieldOfStudy: "Machine Learning & AI", startYear: 2018, endYear: 2019 },
    ],
  },
  {
    info: {
      firstName: "Emeka",
      lastName: "Eze",
      dob: "1991-09-12",
      occupation: "Fullstack Developer",
      gender: "Male",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka",
    },
    contact: {
      email: "emeka.eze@devstudio.com",
      phoneNumber: "+234 807 890 1234",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/emeka-eze",
    },
    address: {
      address: "11 Trans-Amadi Industrial Layout",
      city: "Port Harcourt",
      state: "Rivers",
      country: "Nigeria",
      zipCode: "500001",
    },
    academics: [
      { schoolName: "University of Port Harcourt", degree: "B.Sc. Computer Science", fieldOfStudy: "Computer Science", startYear: 2009, endYear: 2013 },
      { schoolName: "Udacity Nanodegree Program", degree: "Nanodegree", fieldOfStudy: "React & Node.js Development", startYear: 2020, endYear: 2020 },
    ],
  },
  {
    info: {
      firstName: "Fatima",
      lastName: "Aliyu",
      dob: "1994-02-18",
      occupation: "UX Designer",
      gender: "Female",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    },
    contact: {
      email: "fatima.aliyu@designhaus.ng",
      phoneNumber: "+234 808 901 2345",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/fatima-aliyu",
    },
    address: {
      address: "3 Sultan Road",
      city: "Kaduna",
      state: "Kaduna",
      country: "Nigeria",
      zipCode: "800001",
    },
    academics: [
      { schoolName: "Ahmadu Bello University", degree: "B.Sc. Fine and Applied Arts", fieldOfStudy: "Graphic Design", startYear: 2012, endYear: 2016 },
      { schoolName: "Interaction Design Foundation", degree: "Certificate", fieldOfStudy: "UX Design", startYear: 2021, endYear: 2022 },
    ],
  },
  {
    info: {
      firstName: "Oluwaseun",
      lastName: "Akinwale",
      dob: "1989-12-01",
      occupation: "Financial Analyst",
      gender: "Male",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oluwaseun",
    },
    contact: {
      email: "seun.akinwale@fingroup.ng",
      phoneNumber: "+234 809 012 3456",
      fax: "+234 1 345 6789",
      linkedInUrl: "https://linkedin.com/in/seun-akinwale",
    },
    address: {
      address: "45 Marina Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      zipCode: "102001",
    },
    academics: [
      { schoolName: "University of Lagos", degree: "B.Sc. Economics", fieldOfStudy: "Economics & Finance", startYear: 2007, endYear: 2011 },
      { schoolName: "ICAN Nigeria", degree: "ACA", fieldOfStudy: "Chartered Accountancy", startYear: 2012, endYear: 2014 },
      { schoolName: "CFA Institute", degree: "CFA Charter", fieldOfStudy: "Investment Management", startYear: 2015, endYear: 2018 },
    ],
  },
  {
    info: {
      firstName: "Chidinma",
      lastName: "Okeke",
      dob: "1997-04-25",
      occupation: "Frontend Developer",
      gender: "Female",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chidinma",
    },
    contact: {
      email: "chidinma.okeke@webcraft.ng",
      phoneNumber: "+234 810 123 4567",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/chidinma-okeke",
    },
    address: {
      address: "8 Ogui Road",
      city: "Enugu",
      state: "Enugu",
      country: "Nigeria",
      zipCode: "400001",
    },
    academics: [
      { schoolName: "University of Nigeria, Nsukka", degree: "B.Sc. Computer Science", fieldOfStudy: "Software Engineering", startYear: 2015, endYear: 2019 },
    ],
  },
  {
    info: {
      firstName: "Musa",
      lastName: "Ibrahim",
      dob: "1986-08-14",
      occupation: "Project Manager",
      gender: "Male",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Musa",
    },
    contact: {
      email: "musa.ibrahim@pmhub.ng",
      phoneNumber: "+234 811 234 5678",
      fax: null,
      linkedInUrl: "https://linkedin.com/in/musa-ibrahim-pmp",
    },
    address: {
      address: "17 Kano Road",
      city: "Kano",
      state: "Kano",
      country: "Nigeria",
      zipCode: "700001",
    },
    academics: [
      { schoolName: "Bayero University Kano", degree: "B.Sc. Business Administration", fieldOfStudy: "Project Management", startYear: 2004, endYear: 2008 },
      { schoolName: "PMI Global", degree: "PMP Certification", fieldOfStudy: "Project Management Professional", startYear: 2015, endYear: 2015 },
    ],
  },
  {
    info: {
      firstName: "Amaka",
      lastName: "Okonkwo",
      dob: "1992-06-08",
      occupation: "Healthcare Professional",
      gender: "Female",
      profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amaka",
    },
    contact: {
      email: "amaka.okonkwo@lagoshealth.gov.ng",
      phoneNumber: "+234 812 345 6789",
      fax: "+234 1 456 7890",
      linkedInUrl: null,
    },
    address: {
      address: "Lagos Island General Hospital, Broad Street",
      city: "Lagos",
      state: "Lagos",
      country: "Nigeria",
      zipCode: "101001",
    },
    academics: [
      { schoolName: "University of Lagos College of Medicine", degree: "MBBS", fieldOfStudy: "Medicine & Surgery", startYear: 2010, endYear: 2016 },
      { schoolName: "National Postgraduate Medical College", degree: "FMCPH", fieldOfStudy: "Public Health", startYear: 2018, endYear: 2022 },
    ],
  },
];

async function seed() {
  console.log("🌱 Seeding database with Nigerian talent profiles...\n");
  let success = 0;
  let failed = 0;

  for (const user of USERS) {
    try {
      // 1. Insert UserInfoTB
      const { data: info, error: infoErr } = await supabase
        .from("UserInfoTB")
        .insert(user.info)
        .select()
        .single();

      if (infoErr) throw new Error(`UserInfoTB: ${infoErr.message}`);
      const userId = info.id;

      // 2. Insert related tables in parallel
      const [c, a, ac] = await Promise.all([
        supabase.from("UserContactTB").insert({ ...user.contact, userId }).select().single(),
        supabase.from("UserAddressTB").insert({ ...user.address, userId }).select().single(),
        supabase.from("UserAcademicsTB").insert(user.academics.map((x) => ({ ...x, userId }))).select(),
      ]);

      if (c.error) throw new Error(`UserContactTB: ${c.error.message}`);
      if (a.error) throw new Error(`UserAddressTB: ${a.error.message}`);
      if (ac.error) throw new Error(`UserAcademicsTB: ${ac.error.message}`);

      console.log(`  ✅  ${user.info.firstName} ${user.info.lastName} — ${user.info.occupation}`);
      success++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.log(`  ❌  ${user.info.firstName} ${user.info.lastName} — ${msg}`);
      failed++;
    }
  }

  console.log(`\n✨ Done — ${success} seeded, ${failed} failed`);
}

seed();
