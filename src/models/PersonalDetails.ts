export interface Details {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  github_link: string;
  linkedin_link: string;
  location: string; // done
  education: EducationState[]; // done
  skills: SkillsState[]; // done
  projects: ProjectsState[]; // done
  experience: ExperienceState[]; // done
  relevant_coursework: string[]; // done
}

export interface EducationState {
  school_name: string;
  degree_type: string;
  major: string;
  start_date: string;
  end_date: string;
  location: string;
}

export interface SkillsState {
  category: string;
  skill_set: string;
}

export interface ProjectsState {
  project_title: string;
  tech_used: string;
  start_date: string;
  end_date: string;
  description: string[];
}

export interface ExperienceState {
  company_name: string;
  location: string;
  position_title: string;
  experience_type: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string[];
}
