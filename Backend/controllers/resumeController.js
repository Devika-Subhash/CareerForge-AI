const analyzeResume = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        message: "Resume and job description are required.",
      });
    }

    const resumeText = resume.toLowerCase();
    const jobText = jobDescription.toLowerCase();

    // Common technical and professional skills
    const skillList = [
      "javascript",
      "typescript",
      "react",
      "react.js",
      "node.js",
      "node",
      "express",
      "express.js",
      "mongodb",
      "mysql",
      "postgresql",
      "sql",
      "html",
      "css",
      "bootstrap",
      "tailwind",
      "git",
      "github",
      "rest api",
      "rest apis",
      "api",
      "python",
      "java",
      "c",
      "c++",
      "c#",
      "php",
      "aws",
      "docker",
      "kubernetes",
      "figma",
      "firebase",
      "redux",
      "next.js",
      "angular",
      "vue",
      "machine learning",
      "artificial intelligence",
      "data analysis",
      "communication",
      "leadership",
      "problem solving",
      "teamwork",
    ];

    // Find skills that actually appear in the job description
    const requiredSkills = skillList.filter((skill) =>
      jobText.includes(skill)
    );

    // Remove duplicates
    const uniqueRequiredSkills = [...new Set(requiredSkills)];

    // Find skills from the job description that also appear in the resume
    const matchingSkills = uniqueRequiredSkills.filter((skill) =>
      resumeText.includes(skill)
    );

    // Find required skills missing from the resume
    const missingSkills = uniqueRequiredSkills.filter(
      (skill) => !resumeText.includes(skill)
    );

    // Calculate score
    let score = 0;

    if (uniqueRequiredSkills.length > 0) {
      score = Math.round(
        (matchingSkills.length / uniqueRequiredSkills.length) * 100
      );
    } else {
      score = 0;
    }

    const suggestions = [];

    if (missingSkills.length > 0) {
      suggestions.push(
        `Consider adding relevant skills such as ${missingSkills
          .slice(0, 5)
          .join(", ")} if you have experience with them.`
      );
    }

    suggestions.push(
      "Use keywords from the job description naturally throughout your resume."
    );

    suggestions.push(
      "Include measurable achievements to make your experience stronger."
    );

    suggestions.push(
      "Highlight projects and experience that are directly related to the target role."
    );

    res.json({
      score,
      matchingSkills,
      missingSkills,
      suggestions,
    });
  } catch (error) {
    console.error("Resume analysis error:", error);

    res.status(500).json({
      message: "Unable to analyze resume.",
    });
  }
};

module.exports = {
  analyzeResume,
};