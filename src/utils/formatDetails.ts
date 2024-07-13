import { Details } from "../models/PersonalDetails";

export const FormatDetails = (rawData: any) => {
  const details: Details = {
    first_name: rawData.first_name,
    last_name: rawData.last_name,
    email: rawData.email,
    phone_number: rawData.phone_number,
    github_link: rawData.github_link,
    linkedin_link: rawData.linkedin_link,
    location: rawData.location,
    education: rawData.education,
    skills: rawData.skills,
    projects: rawData.projects,
    experience: rawData.experience,
    relevant_coursework: rawData.relevant_coursework,
  };

  return details;
};
