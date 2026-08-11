export type CareerProfile = {
    id: string;
    name: string;
    aliases: string[];
    coreSkills: string[];
  };
  
  export const careerProfiles: CareerProfile[] = [
    {
      id: "full-stack-developer",
      name: "Full Stack Developer",
      aliases: [
        "full stack developer",
        "full-stack developer",
        "fullstack developer",
        "full stack engineer",
        "full-stack engineer",
        "fullstack engineer",
      ],
      coreSkills: [
        "Frontend Development",
        "JavaScript / TypeScript",
        "Modern Frontend Framework",
        "Responsive Web Design",
        "Backend Development",
        "Backend Framework",
        "REST API Development",
        "SQL & Relational Databases",
        "Database Design",
        "Authentication & Authorization",
        "Git & Version Control",
        "Testing & Debugging",
        "Deployment",
        "Cloud Fundamentals",
        "Data Structures & Algorithms",
      ],
    },
    {
      id: "software-engineer",
      name: "Software Engineer",
      aliases: [
        "software engineer",
        "software developer",
        "software engineering",
        "swe",
        "se",
      ],
      coreSkills: [
        "Programming Fundamentals",
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Version Control (Git)",
        "Frontend Development",
        "Backend Development",
        "Web Frameworks",
        "API Design & Development (RESTful)",
        "SQL & Relational Databases",
        "Problem Solving & Analytical Thinking",
        "Debugging & Testing",
        "Software Design Principles",
        "Cloud Computing Fundamentals",
        "Deployment & CI/CD Concepts",
        "Containerization (Docker)",
      ],
    },
  ];
  
  /**
   * Find the manually defined career profile
   * using the career name or one of its aliases.
   */
  export function getCareerProfile(
    careerGoal: string
  ): CareerProfile | null {
    const normalizedGoal = careerGoal.trim().toLowerCase();
  
    return (
      careerProfiles.find((profile) => {
        if (profile.name.toLowerCase() === normalizedGoal) {
          return true;
        }
  
        return profile.aliases.some(
          (alias) => alias.toLowerCase() === normalizedGoal
        );
      }) ?? null
    );
  }