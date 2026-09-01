const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const analyzeResume = async (req, res) => {
  try {
    const { resume, jobDescription } = req.body;

    if (!resume || !jobDescription) {
      return res.status(400).json({
        message: "Resume and job description are required.",
      });
    }

    const prompt = `
You are an expert resume analyzer.

Compare the candidate's resume with the job description.

Return ONLY valid JSON in this exact format:

{
  "score": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "suggestions": []
}

Rules:
- score must be a number between 0 and 100.
- matchingSkills should contain relevant technical and professional skills found in both the resume and job description.
- missingSkills should contain important skills from the job description that are missing from the resume.
- Do not include ordinary words such as "and", "with", "for", "looking", "experience", "developer", or "candidate" as skills.
- suggestions should contain 3 to 5 useful and specific resume improvements.
- Do not use markdown.
- Do not include text outside the JSON.

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}
`;

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: prompt,
    });

    const output = response.output_text;

    console.log("AI response:", output);

    let result;

    try {
      result = JSON.parse(output);
    } catch (parseError) {
      console.error("JSON parsing error:", parseError);

      return res.status(500).json({
        message: "AI returned an invalid response.",
        rawResponse: output,
      });
    }

    res.json(result);
  } catch (error) {
    console.error("AI resume analysis error:", error);

    res.status(500).json({
      message: "Unable to analyze resume with AI.",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
};