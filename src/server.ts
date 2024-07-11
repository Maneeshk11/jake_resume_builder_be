import express, { Request, Response } from "express";
import helmet from "helmet";
import { Details } from "./models/PersonalDetails";
const { exec } = require("child_process");
const Mustache = require("mustache");
const fs = require("fs");
var cors = require("cors");
const path = require("path");

const port = 17080;
const app = express();
const template = fs.readFileSync("tex/main.tex", "utf-8");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const data: Details = {
  first_name: "Maneesh",
  last_name: "Kolli",
  email: "maneesh@nyu.edu",
  phone_number: "1234567890",
  github_link: "Maneeshk11",
  linkedin_link: "maneeshkolli",
  location: "New York, USA",
  education: [
    {
      school_name: "New York University",
      degree_type: "Master of Science",
      major: "Computer Science",
      start_date: "August 2020",
      end_date: "May 2022",
      location: "New York, USA",
    },
    {
      school_name: "Indian Institute of Technology",
      degree_type: "Bachelor of Technology",
      major: "Computer Science",
      start_date: "August 2016",
      end_date: "May 2020",
      location: "Hyderabad, India",
    },
    {
      school_name: "Silver Oaks International School",
      degree_type: "High School",
      major: "Computer Science",
      start_date: "August 2008",
      end_date: "May 2018",
      location: "Hyderabad, India",
    },
  ],
  skills: [
    {
      category: "Programming",
      skill_set: "Python, Java, C++, JavaScript",
    },
    {
      category: "Frameworks",
      skill_set: "React, Node.js, Express.js, Flask",
    },
    {
      category: "Databases",
      skill_set: "MySQL, MongoDB, PostgreSQL",
    },
    {
      category: "Tools",
      skill_set: "Git, Docker, Kubernetes, Jenkins",
    },
  ],
  projects: [
    {
      project_title: "RateMUprofessors",
      tech_used: "Next.js, Amazon S3, Golang, PostgreSQL",
      start_date: "Mar. 2023",
      end_date: "May. 2023",
      description: [
        "Development of a website similar to RateMyProfessor for Indian colleges where students can provide feedbacks, reviews and ratings on instructors and courses.",
        "Built a website version of a software that assesses and simulates the structural integrity of a building during earthquakes based on the user input and details of the building.",
      ],
    },
    {
      project_title: "RateMUprofessors",
      tech_used: "Next.js, Amazon S3, Golang, PostgreSQL",
      start_date: "Mar. 2023",
      end_date: "May. 2023",
      description: [
        "Development of a website similar to RateMyProfessor for Indian colleges where students can provide feedbacks, reviews and ratings on instructors and courses.",
        "Built a website version of a software that assesses and simulates the structural integrity of a building during earthquakes based on the user input and details of the building.",
      ],
    },
  ],
  experience: [
    {
      company_name: "Google",
      location: "Mountain View, CA",
      position_title: "Software Engineer Intern",
      experience_type: "Internship",
      start_date: "May 2022",
      end_date: "Aug 2022",
      currently_working: false,
      description: [
        "Developed a web application that allows users to search for and view the details of various movies and TV shows.",
        "Implemented a feature that allows users to view the details of the cast and crew of a movie or TV show.",
      ],
    },
    {
      company_name: "Amazon",
      location: "Seattle, WA",
      position_title: "Software Engineer",
      experience_type: "Full-time",
      start_date: "Aug 2022",
      currently_working: true,
      end_date: "Present",
      description: [
        "Developed a web application that allows users to search for and view the details of various movies and TV shows.",
        "Implemented a feature that allows users to view the details of the cast and crew of a movie or TV show",
      ]
    },
  ],
  relevant_coursework: [
    "Algorithms",
    "Database Systems",
    "Operating Systems",
    "Computer Networks",
    "Machine Learning",
    "Software Engineering",
    "Web Development",
    "Data Structures",
  ]
};

app.get("/health", (req: Request, res: Response) => {
  const filledTemplate = Mustache.render(template, data);
  fs.writeFileSync("tex/filled_template.tex", filledTemplate);
  exec(
    "pdflatex -output-directory=tex tex/filled_template.tex",
    (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
    }
  );
  res.status(200).json({ status: "online" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
