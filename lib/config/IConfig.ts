export interface IConfig {
  firstName: string;
  lastName: string;
  birthDate: string;
  title: string;
  description: string;
  buttonTextExperience: string;
  buttonTextContact: string;
  currentCompany: string;
  aboutMeFirstParagraph: string;
  aboutMeSecondParagraph: string;
  github: string;
  linkedin: string;
  email: string;
  aboutCardSession: AboutCardSection[];
  technologiesAndSkills: TechnologyCategory[];
  experiences: Experience[];
}

export interface AboutCardSection {
  title: string;
  items: string[];
}

export interface TechnologyCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  company: string;
  role: string;
  startDate: string; // formato "YYYY-MM"
  endDate: string | null; // pode ser null se ainda estiver no cargo
  responsibilities: string;
}