import { NextRequest, NextResponse } from "next/server";
import { ai } from "@/lib/gemini";
import { getCareerProfile } from "@/lib/careerProfiles";

const AI_UNAVAILABLE_MESSAGE =
  "AI service is temporarily unavailable. Please try again in a few minutes.";

  function hasExplicitEvidence(
    skill: string,
    resumeText: string
  ): boolean {
    const text = resumeText.toLowerCase();
  
    switch (skill) {
      case "Frontend Development":
        return (
          /\bfrontend development\b/.test(text) ||
          /\bfront-end development\b/.test(text) ||
          /\bfrontend developer\b/.test(text) ||
          /\bfront-end developer\b/.test(text) ||
          /\bfrontend\b/.test(text) ||
          /\bfront-end\b/.test(text)
        );
  
      case "JavaScript / TypeScript":
        return (
          /\bjavascript\b/.test(text) ||
          /\btypescript\b/.test(text) ||
          /\bjavascript\.js\b/.test(text) ||
          /\btypescript\.js\b/.test(text)
        );
  
      case "Modern Frontend Framework":
        return (
          /\breact\b/.test(text) ||
          /\breact\.js\b/.test(text) ||
          /\bnext\.js\b/.test(text) ||
          /\bnextjs\b/.test(text) ||
          /\bangular\b/.test(text) ||
          /\bvue\.?js\b/.test(text) ||
          /\bsvelte\b/.test(text)
        );
  
      case "Responsive Web Design":
        return (
          /\bresponsive web design\b/.test(text) ||
          /\bresponsive design\b/.test(text) ||
          /\bresponsive\b/.test(text) ||
          /\bflexbox\b/.test(text) ||
          /\bcss grid\b/.test(text) ||
          /\bmedia queries\b/.test(text)
        );
  
      case "Backend Development":
        return (
          /\bbackend development\b/.test(text) ||
          /\bback-end development\b/.test(text) ||
          /\bbackend developer\b/.test(text) ||
          /\bback-end developer\b/.test(text) ||
          /\bbackend\b/.test(text) ||
          /\bback-end\b/.test(text)
        );
  
      case "Backend Framework":
        return (
          /\bnode\.?js\b/.test(text) ||
          /\bexpress\.?js\b/.test(text) ||
          /\bexpress\b/.test(text) ||
          /\bdjango\b/.test(text) ||
          /\bflask\b/.test(text) ||
          /\bfastapi\b/.test(text) ||
          /\bspring boot\b/.test(text) ||
          /\blaravel\b/.test(text) ||
          /\bnest\.?js\b/.test(text)
        );
  
      case "REST API Development":
        return (
          /\brest api\b/.test(text) ||
          /\brestful api\b/.test(text) ||
          /\brest api development\b/.test(text) ||
          /\brestful api development\b/.test(text) ||
          /\bapi development\b/.test(text) ||
          /\bapi endpoints\b/.test(text) ||
          /\bdeveloped apis\b/.test(text) ||
          /\bbuilt apis\b/.test(text) ||
          /\bcreated apis\b/.test(text) ||
          /\bimplemented apis\b/.test(text)
        );
  
      case "SQL & Relational Databases":
        return (
          /\bmysql\b/.test(text) ||
          /\bpostgresql\b/.test(text) ||
          /\bpostgres\b/.test(text) ||
          /\bsqlite\b/.test(text) ||
          /\bmariadb\b/.test(text) ||
          /\bsql\b/.test(text) ||
          /\brelational database\b/.test(text) ||
          /\brelational databases\b/.test(text)
        );
  
      case "Database Design":
        return (
          /\bdatabase design\b/.test(text) ||
          /\bdatabase schema\b/.test(text) ||
          /\bschema design\b/.test(text) ||
          /\ber diagram\b/.test(text) ||
          /\berd\b/.test(text) ||
          /\bnormalization\b/.test(text) ||
          /\bdatabase modeling\b/.test(text) ||
          /\btable relationships\b/.test(text) ||
          /\bdatabase relationships\b/.test(text)
        );
  
      case "Authentication & Authorization":
        return (
          /\bauthentication\b/.test(text) ||
          /\bauthorization\b/.test(text) ||
          /\buser authentication\b/.test(text) ||
          /\buser authorization\b/.test(text) ||
          /\brole-based authorization\b/.test(text) ||
          /\brole-based access\b/.test(text) ||
          /\baccess control\b/.test(text) ||
          /\bprotected routes\b/.test(text) ||
          /\bjwt\b/.test(text) ||
          /\boauth\b/.test(text) ||
          /\bsession-based authentication\b/.test(text)
        );
  
      case "Git & Version Control":
        return (
          /\bgit\b/.test(text) ||
          /\bgit and github\b/.test(text) ||
          /\bgit & github\b/.test(text) ||
          /\bgithub\b/.test(text) ||
          /\bversion control\b/.test(text) ||
          /\bgit repository\b/.test(text) ||
          /\bcommits\b/.test(text) ||
          /\bbranches\b/.test(text)
        );
  
      case "Testing & Debugging":
        return (
          /\btesting\b/.test(text) ||
          /\btest cases\b/.test(text) ||
          /\bunit testing\b/.test(text) ||
          /\bintegration testing\b/.test(text) ||
          /\bend-to-end testing\b/.test(text) ||
          /\be2e testing\b/.test(text) ||
          /\bdebugging\b/.test(text) ||
          /\bdebugged\b/.test(text) ||
          /\bjest\b/.test(text) ||
          /\bmocha\b/.test(text) ||
          /\bvitest\b/.test(text) ||
          /\bpytest\b/.test(text)
        );
  
      case "Deployment":
        return (
          /\bdeployment\b/.test(text) ||
          /\bdeployed\b/.test(text) ||
          /\bdeploying\b/.test(text) ||
          /\bdeployed to\b/.test(text) ||
          /\bdeployed on\b/.test(text) ||
          /\bvercel\b/.test(text) ||
          /\bnetlify\b/.test(text) ||
          /\brender\.com\b/.test(text) ||
          /\brailway\b/.test(text) ||
          /\bheroku\b/.test(text) ||
          /\baws deployment\b/.test(text)
        );
  
      case "Cloud Fundamentals":
        return (
          /\baws\b/.test(text) ||
          /\bazure\b/.test(text) ||
          /\bgcp\b/.test(text) ||
          /\bgoogle cloud\b/.test(text) ||
          /\bcloud computing\b/.test(text) ||
          /\bcloud platform\b/.test(text) ||
          /\bcloud services\b/.test(text) ||
          /\bcloud deployment\b/.test(text)
        );
  
      case "Data Structures & Algorithms":
        return (
          /\bdata structures\b/.test(text) ||
          /\bdata structure\b/.test(text) ||
          /\balgorithms\b/.test(text) ||
          /\balgorithm\b/.test(text) ||
          /\bdsa\b/.test(text) ||
          /\bbig o\b/.test(text) ||
          /\btime complexity\b/.test(text) ||
          /\bspace complexity\b/.test(text) ||
          /\bsorting algorithms?\b/.test(text) ||
          /\bsearching algorithms?\b/.test(text) ||
          /\bleetcode\b/.test(text) ||
          /\bhackerrank\b/.test(text) ||
          /\bcodechef\b/.test(text) ||
          /\bcodeforces\b/.test(text) ||
          /\bcompetitive programming\b/.test(text)
        );
  
      case "Programming Fundamentals":
        return (
          /\bprogramming\b/.test(text) ||
          /\bc\+\+/.test(text) ||
          /\bjava\b/.test(text) ||
          /\bpython\b/.test(text) ||
          /\bc programming\b/.test(text) ||
          /\bcoding\b/.test(text) ||
          /\bprogramming languages?\b/.test(text) ||
          /\bprogramming fundamentals\b/.test(text)
        );

      case "Object-Oriented Programming (OOP)":
        return (
          /\boops?\b/.test(text) ||
          /\bobject[- ]oriented programming\b/.test(text) ||
          /\bobject[- ]oriented\b/.test(text) ||
          /\bobject oriented design\b/.test(text) ||
          /\binheritance\b/.test(text) ||
          /\bpolymorphism\b/.test(text) ||
          /\bencapsulation\b/.test(text) ||
          /\babstraction\b/.test(text) ||
          /\bdesign patterns\b/.test(text) ||
          /\bclass(?:es)?\b/.test(text)
        );

      case "Version Control (Git)":
        return (
          /\bgit\b/.test(text) ||
          /\bgithub\b/.test(text) ||
          /\bgitlab\b/.test(text) ||
          /\bbitbucket\b/.test(text) ||
          /\bversion control\b/.test(text) ||
          /\bgit and github\b/.test(text) ||
          /\bgit & github\b/.test(text) ||
          /\bgit repository\b/.test(text) ||
          /\bcommits?\b/.test(text) ||
          /\bbranch(?:es|ing)?\b/.test(text)
        );

      case "Web Frameworks":
        return (
          /\breact\b/.test(text) ||
          /\breact\.?js\b/.test(text) ||
          /\bnext\.?js\b/.test(text) ||
          /\bangular\b/.test(text) ||
          /\bvue\.?js\b/.test(text) ||
          /\bsvelte\b/.test(text) ||
          /\bexpress\.?js\b/.test(text) ||
          /\bexpress\b/.test(text) ||
          /\bdjango\b/.test(text) ||
          /\bflask\b/.test(text) ||
          /\bfastapi\b/.test(text) ||
          /\bspring boot\b/.test(text) ||
          /\bspring\b/.test(text) ||
          /\blaravel\b/.test(text) ||
          /\bnest\.?js\b/.test(text) ||
          /\brails\b/.test(text) ||
          /\bruby on rails\b/.test(text) ||
          /\bweb framework\b/.test(text)
        );

      case "API Design & Development (RESTful)":
        return (
          /\brest\s?api\b/.test(text) ||
          /\brestful\s?api\b/.test(text) ||
          /\bapi design\b/.test(text) ||
          /\bapi development\b/.test(text) ||
          /\bapi endpoints?\b/.test(text) ||
          /\bdeveloped apis?\b/.test(text) ||
          /\bbuilt apis?\b/.test(text) ||
          /\bcreated apis?\b/.test(text) ||
          /\bimplemented apis?\b/.test(text) ||
          /\brest\b/.test(text) ||
          /\brestful\b/.test(text) ||
          /\bgraphql\b/.test(text)
        );

      case "Problem Solving & Analytical Thinking":
        return (
          /\bproblem[- ]solving\b/.test(text) ||
          /\bproblem solving\b/.test(text) ||
          /\banalytical thinking\b/.test(text) ||
          /\banalytical skills?\b/.test(text) ||
          /\bcritical thinking\b/.test(text) ||
          /\bproblem analysis\b/.test(text) ||
          /\bleetcode\b/.test(text) ||
          /\bhackerrank\b/.test(text) ||
          /\bcompetitive programming\b/.test(text) ||
          /\bcodechef\b/.test(text) ||
          /\bcodeforces\b/.test(text)
        );

      case "Debugging & Testing":
        return (
          /\bdebugging\b/.test(text) ||
          /\bdebugged\b/.test(text) ||
          /\btesting\b/.test(text) ||
          /\btest cases?\b/.test(text) ||
          /\bunit test(?:s|ing)?\b/.test(text) ||
          /\bintegration test(?:s|ing)?\b/.test(text) ||
          /\bend-to-end test(?:s|ing)?\b/.test(text) ||
          /\be2e test(?:s|ing)?\b/.test(text) ||
          /\bjest\b/.test(text) ||
          /\bmocha\b/.test(text) ||
          /\bvitest\b/.test(text) ||
          /\bpytest\b/.test(text) ||
          /\bselenium\b/.test(text) ||
          /\bcypress\b/.test(text)
        );

      case "Software Design Principles":
        return (
          /\bdesign principles\b/.test(text) ||
          /\bsolid\b/.test(text) ||
          /\bdesign patterns?\b/.test(text) ||
          /\bsoftware design\b/.test(text) ||
          /\bsoftware architecture\b/.test(text) ||
          /\bclean code\b/.test(text) ||
          /\bclean architecture\b/.test(text) ||
          /\bmvc\b/.test(text) ||
          /\bmvvm\b/.test(text) ||
          /\bdry\b/.test(text) ||
          /\bkiss\b/.test(text) ||
          /\bseparation of concerns\b/.test(text) ||
          /\bmodular\b/.test(text)
        );

      case "Cloud Computing Fundamentals":
        return (
          /\baws\b/.test(text) ||
          /\bamazon web services\b/.test(text) ||
          /\bazure\b/.test(text) ||
          /\bgcp\b/.test(text) ||
          /\bgoogle cloud\b/.test(text) ||
          /\bcloud computing\b/.test(text) ||
          /\bcloud platform\b/.test(text) ||
          /\bcloud services?\b/.test(text) ||
          /\bcloud deployment\b/.test(text) ||
          /\bcloud\b/.test(text)
        );

      case "Deployment & CI/CD Concepts":
        return (
          /\bdeployment\b/.test(text) ||
          /\bdeployed\b/.test(text) ||
          /\bdeploying\b/.test(text) ||
          /\bci\/cd\b/.test(text) ||
          /\bcontinuous integration\b/.test(text) ||
          /\bcontinuous deployment\b/.test(text) ||
          /\bcontinuous delivery\b/.test(text) ||
          /\bgithub actions?\b/.test(text) ||
          /\bjenkins\b/.test(text) ||
          /\bvercel\b/.test(text) ||
          /\bnetlify\b/.test(text) ||
          /\bheroku\b/.test(text) ||
          /\brailway\b/.test(text) ||
          /\brender\.com\b/.test(text) ||
          /\bpipeline\b/.test(text)
        );

      case "Containerization (Docker)":
        return (
          /\bdocker\b/.test(text) ||
          /\bdockerfile\b/.test(text) ||
          /\bdocker[- ]compose\b/.test(text) ||
          /\bcontainer(?:s|ization|ized)?\b/.test(text) ||
          /\bkubernetes\b/.test(text) ||
          /\bk8s\b/.test(text) ||
          /\bpodman\b/.test(text)
        );

      default:
        return false;
    }
  }

export async function POST(request: NextRequest) {
  try {
    const { resumeText, careerGoal } = await request.json();

    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid resume text provided",
        },
        {
          status: 400,
        }
      );
    }

    const targetGoal =
      typeof careerGoal === "string" && careerGoal.trim()
        ? careerGoal.trim()
        : "Software Engineer";

    console.log("========== EXTRACTED RESUME TEXT ==========");
    console.log(resumeText);
    console.log("Target Career Goal:", targetGoal);
    console.log("=========================================");

    /*
     * ---------------------------------------------------------
     * CAREER PROFILE
     * ---------------------------------------------------------
     *
     * If we have manually defined this career in
     * careerProfiles.ts, use those exact 15 skills.
     *
     * If we don't have a profile yet, Gemini can create the
     * 15 skills as a fallback.
     */

    const careerProfile = getCareerProfile(targetGoal);

    const fixedCoreSkills = careerProfile?.coreSkills ?? [];

    console.log("Career profile found:", !!careerProfile);

    if (careerProfile) {
      console.log("Using manual core skills:");
      console.log(fixedCoreSkills);
    } else {
      console.log(
        "No manual career profile found. Gemini will determine the core skills."
      );
    }

    const coreSkillsInstruction = careerProfile
      ? `
The career "${targetGoal}" has a manually defined career profile.

You MUST use the following EXACT 15 core skills:

${fixedCoreSkills.map((skill, index) => `${index + 1}. ${skill}`).join("\n")}

IMPORTANT:

Do NOT change these skills.

Do NOT remove any skill.

Do NOT add any new skill.

Do NOT rename any skill.

Do NOT reorder them.

The "coreSkills" array in your response MUST exactly match the list above.

The career profile was manually designed by ResumeXpert to provide a
consistent evaluation framework for this career.
`
      : `
There is currently no manually defined career profile for "${targetGoal}".

Determine EXACTLY 15 core skills for this career based on:

1. Current industry relevance
2. Common hiring expectations
3. Practical employability
4. Foundational knowledge
5. Modern technologies where genuinely relevant
6. Job readiness
7. Common expectations for this career

Do not choose technologies simply because they are trending.

Do not use obsolete technologies.

Do not use random buzzwords.

Do not use unrelated technologies.

Do not create duplicate skills.

coreSkills MUST contain exactly 15 items.
`;

    const prompt = `
You are the career analysis engine for ResumeXpert.

ResumeXpert is a friendly career guidance platform, not a generic resume checker.

The user selected this career goal:

"${targetGoal}"

Your task is to analyze the user's resume against the career framework.

There are TWO stages:

STAGE 1:
Use the correct 15 core skills for the selected career.

STAGE 2:
Compare those 15 skills against the actual resume evidence.

==================================================
STAGE 1 — CAREER CORE SKILLS
==================================================

${coreSkillsInstruction}

==================================================
STAGE 2 — ANALYZE THE ENTIRE RESUME
==================================================

Read the ENTIRE resume before making any decision.

Consider evidence from:

- About Me
- Summary
- Objective
- Skills
- Experience
- Projects
- Education
- Certifications
- Other relevant sections

PROJECTS MUST BE CONSIDERED.

However, project descriptions must be interpreted conservatively.

Do NOT invent technologies.

For example:

"Built a full-stack event management system."

This does NOT automatically prove:

- React
- Next.js
- Node.js
- Express.js
- REST APIs
- Docker
- TypeScript
- AWS
- MongoDB

unless the resume explicitly provides evidence.

If the resume says:

"Built the frontend using React.js."

Then React.js can be counted.

If the resume says:

"Built the backend using Node.js and Express.js."

Then Node.js & Express.js can be counted.

If the resume says:

"Created REST APIs for authentication and event management."

Then RESTful APIs can be counted.

If the resume says:

"Used Docker to containerize the application."

Then Docker can be counted if Docker is part of the relevant career framework.

==================================================
EVIDENCE-BASED SKILL DETECTION
==================================================

A skill can appear in "skillsFound" ONLY when:

1. The skill exists in coreSkills.
AND
2. The resume provides reasonable evidence for it.

Evidence can come from:

- Explicit skills listed in the resume
- Explicit project technologies
- Experience
- Certifications
- Relevant education/coursework
- Clear descriptions of actual work

Be conservative.

Do NOT assume a technology from a broad category.

Examples:

"Frontend Development"

CAN support:

"Frontend Development"

But it does NOT automatically prove:

- React
- Next.js
- Angular
- Vue
- JavaScript
- TypeScript

unless explicitly supported elsewhere.

"Backend Development"

CAN support:

"Backend Development"

But it does NOT automatically prove:

- Node.js
- Express.js
- Django
- Flask
- Spring Boot
- REST APIs

unless supported by the resume.

"Python"

does NOT automatically prove:

- Django
- Flask
- FastAPI

"MySQL"

CAN reasonably support:

"SQL & Relational Databases"

because MySQL is a relational SQL database.

"Git & GitHub"

CAN reasonably support:

"Version Control"

because Git is a version control system.

"Problem-solving"

CAN reasonably support:

"Problem Solving" if Problem Solving is part of the career's core skills.

==================================================
BROAD SKILL MATCHING
==================================================

Use reasonable semantic matching.

Examples:

"Frontend Development"
→ "Frontend Development"

"Backend Development"
→ "Backend Development"

"MySQL"
→ "SQL & Relational Databases"

"Git & GitHub"
→ "Version Control"

"Problem-solving"
→ "Problem Solving"

But never use broad matching to invent a specific technology.

The rule is:

BROAD SKILL
→ MAY SUPPORT THE SAME BROAD SKILL

BROAD SKILL
→ MUST NOT AUTOMATICALLY SUPPORT A SPECIFIC TECHNOLOGY

SPECIFIC TECHNOLOGY
→ MAY SUPPORT A RELEVANT BROADER SKILL

==================================================
SKILLS FOUND
==================================================

skillsFound MUST contain ONLY items from coreSkills.

Only include skills that the resume genuinely demonstrates.

Do NOT put every resume skill into skillsFound.

For example:

If the resume contains:

Python
Frontend Development
Backend Development
MySQL
Supabase
Git & GitHub

and the core skills contain:

Frontend Development
Backend Development
SQL & Relational Databases
Version Control

then those relevant skills may be counted.

Python and Supabase should only be counted if they are themselves part of
coreSkills or clearly support one of the core skills.

==================================================
MISSING SKILLS
==================================================

missingSkills must contain:

coreSkills - skillsFound

Therefore:

skillsFound.length + missingSkills.length = 15

There must be:

- NO duplicates
- NO overlap
- NO skills outside coreSkills

Order missingSkills by importance.

Most important career gaps should appear first.

Do NOT add unrelated skills to missingSkills.

==================================================
ADDITIONAL SKILLS
==================================================

additionalSkills contains genuinely demonstrated skills from the resume
that are NOT part of the 15 coreSkills.

Example:

If the career core skills do not contain Python but the resume clearly
contains Python:

additionalSkills may contain:

"Python"

Do NOT invent additional skills.

Do NOT put languages such as Tamil or English into additionalSkills unless
they are genuinely useful professional skills for the selected career.

==================================================
RESUME SCORE
==================================================

Calculate resumeScore from 0 to 100.

Consider:

- Relevant skills demonstrated
- Project evidence
- Experience
- Career alignment
- Practical evidence
- Resume clarity
- Achievements
- Strength of evidence

Do NOT inflate the score because of unrelated skills.

A candidate with many technologies but weak evidence should not automatically
receive a high score.

==================================================
ATS SCORE
==================================================

Calculate atsScore specifically for:

"${targetGoal}"

Consider:

- Relevant keywords
- Explicit technical skills
- Project terminology
- Experience terminology
- Resume structure
- Career keyword alignment
- Missing important terminology

Do NOT reward irrelevant keywords.

==================================================
SUGGESTIONS
==================================================

Return 8-10 practical suggestions.

Suggestions must be specific to:

- This resume
- This career
- Missing skills
- Missing evidence
- Projects
- Experience
- ATS optimization
- Career readiness

Avoid generic advice.

Do not tell the candidate to learn every technology.

==================================================
LEARNING ROADMAP
==================================================

Return 8-10 learning steps.

Prioritize the actual missingSkills.

Start with important foundations.

Then move toward intermediate skills.

Then advanced skills where appropriate.

The roadmap should answer:

"What should I learn next?"

Do not overwhelm the user.

==================================================
INTERVIEW PREPARATION
==================================================

technical:

Exactly 10 technical interview questions relevant to:

"${targetGoal}"

hr:

Exactly 10 career-relevant HR questions.

aptitudeTopics:

Exactly 10 relevant aptitude topics.

==================================================
PROJECT RECOMMENDATIONS
==================================================

Return 4-6 realistic projects.

Projects must:

- Match "${targetGoal}"
- Strengthen missing core skills
- Improve portfolio evidence
- Be appropriate for the candidate level
- Avoid unnecessary technologies

Each project MUST contain:

"title"
"description"
"difficulty"
"estimatedTime"
"technologies"

difficulty MUST be:

"Beginner"
"Intermediate"
"Advanced"

==================================================
FINAL VALIDATION
==================================================

Before returning the JSON, verify:

1. coreSkills contains exactly 15 items.
2. If a manual career profile exists, coreSkills EXACTLY matches it.
3. skillsFound contains ONLY coreSkills.
4. missingSkills contains ONLY coreSkills.
5. No skill appears in both skillsFound and missingSkills.
6. skillsFound.length + missingSkills.length = 15.
7. additionalSkills contains only genuinely demonstrated resume skills.
8. No invented technologies.
9. Projects are considered.
10. Generic project descriptions do not prove specific technologies.
11. Irrelevant resume skills are not treated as missing career skills.
12. missingSkills are ordered by importance.
13. Suggestions are specific to the resume and career.
14. learningRoadmap focuses on missingSkills.
15. technical contains exactly 10 questions.
16. hr contains exactly 10 questions.
17. aptitudeTopics contains exactly 10 topics.
18. projectRecommendations contains 4-6 projects.
19. resumeScore is between 0 and 100.
20. atsScore is between 0 and 100.
21. Return ONLY valid JSON.

==================================================
JSON STRUCTURE
==================================================

{
  "resumeScore": 0,
  "atsScore": 0,
  "coreSkills": [],
  "skillsFound": [],
  "additionalSkills": [],
  "missingSkills": [],
  "suggestions": [],
  "learningRoadmap": [],
  "interviewPreparation": {
    "technical": [],
    "hr": [],
    "aptitudeTopics": []
  },
  "projectRecommendations": [
    {
      "title": "",
      "description": "",
      "difficulty": "Beginner",
      "estimatedTime": "",
      "technologies": []
    }
  ]
}

Resume:
${resumeText}
`;

    let rawText = "";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      rawText = response?.text ?? "";
    } catch (error) {
      console.error("Gemini generateContent failed:", error);

      return NextResponse.json(
        {
          success: false,
          error: AI_UNAVAILABLE_MESSAGE,
        },
        {
          status: 503,
        }
      );
    }

    console.log("========== GEMINI RAW RESPONSE ==========");
    console.log(rawText);
    console.log("=========================================");

    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    if (!cleanedText) {
      return NextResponse.json(
        {
          success: false,
          error: AI_UNAVAILABLE_MESSAGE,
        },
        {
          status: 503,
        }
      );
    }

    let analysis;

    try {
      analysis = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Failed to parse Gemini response:", err);
      console.log(cleanedText);

      return NextResponse.json(
        {
          success: false,
          error: AI_UNAVAILABLE_MESSAGE,
        },
        {
          status: 503,
        }
      );
    }

    /*
     * ---------------------------------------------------------
     * FINAL SERVER-SIDE VALIDATION
     * ---------------------------------------------------------
     *
     * This protects the application if Gemini accidentally
     * returns an incorrect number of skills.
     */

    if (
      !analysis ||
      !Array.isArray(analysis.coreSkills) ||
      !Array.isArray(analysis.skillsFound) ||
      !Array.isArray(analysis.missingSkills)
    ) {
      console.error("Invalid analysis structure returned by Gemini.");

      return NextResponse.json(
        {
          success: false,
          error: AI_UNAVAILABLE_MESSAGE,
        },
        {
          status: 503,
        }
      );
    }

    if (careerProfile) {
      const expectedSkills = fixedCoreSkills;

      const coreSkillsAreCorrect =
        analysis.coreSkills.length === 15 &&
        expectedSkills.every(
          (skill, index) => analysis.coreSkills[index] === skill
        );

      if (!coreSkillsAreCorrect) {
        console.error(
          "Gemini returned incorrect core skills for manual career profile."
        );

        console.error("Expected:", expectedSkills);
        console.error("Received:", analysis.coreSkills);

        /*
         * Force the manually defined career profile.
         */
        analysis.coreSkills = expectedSkills;
      }
    }

    const finalCoreSkills = careerProfile
      ? fixedCoreSkills
      : analysis.coreSkills;

    /*
     * Remove any skill from skillsFound that is not part
     * of the final core skill list.
     */

    const geminiSkillsFound = [...analysis.skillsFound];

    analysis.skillsFound = analysis.skillsFound.filter(
      (skill: string) =>
        finalCoreSkills.includes(skill) &&
        hasExplicitEvidence(skill, resumeText)
    );
    
    /*
     * Rebuild missingSkills from the actual coreSkills.
     *
     * This guarantees:
     *
     * coreSkills = skillsFound + missingSkills
     */
    
    analysis.missingSkills = finalCoreSkills.filter(
      (skill: string) => !analysis.skillsFound.includes(skill)
    );

    console.log("========== EVIDENCE FILTERING LOG ==========");
    console.log("Gemini skillsFound:", geminiSkillsFound);
    console.log("Final accepted skillsFound:", analysis.skillsFound);
    console.log("Final missingSkills:", analysis.missingSkills);
    console.log("==============================================");
    /*
     * Make sure coreSkills is always the final framework.
     */

    analysis.coreSkills = finalCoreSkills;

    /*
 * ---------------------------------------------------------
 * SERVER-SIDE SCORE CALCULATION
 * ---------------------------------------------------------
 *
 * Scores are calculated after skillsFound/missingSkills
 * have been finalized. This prevents Gemini from giving
 * credit for skills that were rejected by our evidence layer.
 */

// ---------- RESUME SCORE ----------

const coreSkillCoverage =
  finalCoreSkills.length > 0
    ? analysis.skillsFound.length / finalCoreSkills.length
    : 0;

// 40 points for demonstrated core skills
const skillScore = Math.round(coreSkillCoverage * 40);


// ---------- PROJECT / PRACTICAL EVIDENCE SCORE ----------

const hasProjectsSection =
  /\bprojects?\b/i.test(resumeText);

const projectNamesFound = [
  /\bresumexpert\b/i,
  /\bcollege event management system\b/i,
  /\bcems\b/i,
].filter((pattern) => pattern.test(resumeText)).length;

const projectEvidencePatterns = [
  /\bfull[- ]stack\b/i,
  /\bapplication\b/i,
  /\bsystem\b/i,
  /\bplatform\b/i,
  /\bqr attendance\b/i,
  /\bpayment verification\b/i,
  /\bresume scoring\b/i,
  /\bfeedback\b/i,
  /\bscoring\b/i,
];

const projectEvidenceCount = projectEvidencePatterns.filter((pattern) =>
  pattern.test(resumeText)
).length;

// Project score:
// 10 points → Projects section exists
// 10 points → Actual project evidence/features
// 5 points  → Multiple identifiable projects
const projectSectionScore = hasProjectsSection ? 10 : 0;

const projectDetailScore = Math.min(
  10,
  projectEvidenceCount * 2
);

const multipleProjectsScore =
  projectNamesFound >= 2 ? 5 :
  projectNamesFound === 1 ? 2 :
  0;

const projectScore = Math.min(
  25,
  projectSectionScore +
    projectDetailScore +
    multipleProjectsScore
);

// 15 points for resume structure
const structureSections = [
  /\babout me\b/i,
  /\bskills\b/i,
  /\beducation\b/i,
  /\bprojects\b/i,
  /\bcontact\b/i,
];

const structureCount = structureSections.filter((pattern) =>
  pattern.test(resumeText)
).length;

const structureScore = Math.round(
  (structureCount / structureSections.length) * 15
);

// 10 points for career alignment
const careerAlignmentScore =
  resumeText.toLowerCase().includes(targetGoal.toLowerCase()) ||
  resumeText.toLowerCase().includes("full stack developer")
    ? 10
    : 5;

// 10 points for evidence / achievement quality
const evidencePatterns = [
  /\bexperience\b/i,
  /\bachievement\b/i,
  /\bachievements\b/i,
  /\bgithub\b/i,
  /\blinkedin\b/i,
  /\bcertification\b/i,
];

const evidenceCount = evidencePatterns.filter((pattern) =>
  pattern.test(resumeText)
).length;

const evidenceScore = Math.min(
  10,
  Math.round((evidenceCount / evidencePatterns.length) * 10)
);

const calculatedResumeScore = Math.min(
  100,
  skillScore +
    projectScore +
    structureScore +
    careerAlignmentScore +
    evidenceScore
);

// ---------- ATS SCORE ----------

const relevantKeywordScore =
  finalCoreSkills.length > 0
    ? Math.round(
        (analysis.skillsFound.length / finalCoreSkills.length) * 50
      )
    : 0;

const careerKeywordPatterns = [
  /\bfull stack\b/i,
  /\bfull-stack\b/i,
  /\bdeveloper\b/i,
  /\bfrontend\b/i,
  /\bbackend\b/i,
  /\bsoftware\b/i,
];

const careerKeywordCount = careerKeywordPatterns.filter((pattern) =>
  pattern.test(resumeText)
).length;

const careerKeywordScore = Math.min(
  20,
  careerKeywordCount * 4
);

const projectKeywordPatterns = [
  /\bproject\b/i,
  /\bbuilt\b/i,
  /\bdeveloped\b/i,
  /\bimplemented\b/i,
];

const projectKeywordCount = projectKeywordPatterns.filter((pattern) =>
  pattern.test(resumeText)
).length;

const projectKeywordScore = Math.min(
  15,
  projectKeywordCount * 4
);

// Basic ATS structure/readability signals
const atsStructureScore = Math.min(
  15,
  structureCount * 3
);

const calculatedAtsScore = Math.min(
  100,
  relevantKeywordScore +
    careerKeywordScore +
    projectKeywordScore +
    atsStructureScore
);

analysis.resumeScore = calculatedResumeScore;
analysis.atsScore = calculatedAtsScore;

console.log("========== SERVER SCORE CALCULATION ==========");
console.log("Resume Score:", calculatedResumeScore);
console.log("ATS Score:", calculatedAtsScore);
console.log("Skill Score:", skillScore);
console.log("Project Score:", projectScore);
console.log("Structure Score:", structureScore);
console.log("Career Alignment Score:", careerAlignmentScore);
console.log("Evidence Score:", evidenceScore);
console.log("==============================================");

    console.log("========== FINAL CAREER ANALYSIS ==========");
    console.log("Career:", targetGoal);
    console.log("Core skills:", analysis.coreSkills);
    console.log("Skills found:", analysis.skillsFound);
    console.log("Missing skills:", analysis.missingSkills);
    console.log("==========================================");

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed",
      },
      {
        status: 500,
      }
    );
  }
}