const userPrompt = document.getElementById("userPrompt");
const goal = document.getElementById("goal");
const detail = document.getElementById("detail");
const constraints = document.getElementById("constraints");

const buildPromptBtn = document.getElementById("buildPromptBtn");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const scoreSection = document.getElementById("scoreSection");
const optimizedSection = document.getElementById("optimizedSection");
const responseSection = document.getElementById("responseSection");

const optimizedPrompt = document.getElementById("optimizedPrompt");
const aiResponse = document.getElementById("aiResponse");

const scoreValue = document.getElementById("scoreValue");
const scoreTitle = document.getElementById("scoreTitle");
const scoreMessage = document.getElementById("scoreMessage");

const clarityScore = document.getElementById("clarityScore");
const contextScore = document.getElementById("contextScore");
const constraintScore = document.getElementById("constraintScore");
const structureScore = document.getElementById("structureScore");

const clarityBar = document.getElementById("clarityBar");
const contextBar = document.getElementById("contextBar");
const constraintBar = document.getElementById("constraintBar");
const structureBar = document.getElementById("structureBar");

let currentOptimizedPrompt = "";


/* ==========================================
   SMART PROMPT ANALYZER
========================================== */

function analyzePrompt(prompt, constraintText) {

  const text = prompt.trim();
  const words = text.split(/\s+/).filter(Boolean);

  /*
     CLARITY
     Measures whether the request clearly states an action.
  */

  let clarity = 20;

  if (words.length >= 3) clarity += 10;
  if (words.length >= 7) clarity += 10;
  if (words.length >= 12) clarity += 10;

  if (
    /\b(teach|explain|create|build|write|solve|analyze|compare|design|plan|generate|find|develop|summarize)\b/i.test(
      text
    )
  ) {
    clarity += 20;
  }

  if (/[?.!]/.test(text)) {
    clarity += 5;
  }


  /*
     CONTEXT
     Measures whether enough background information exists.
  */

  let context = 15;

  if (words.length >= 8) context += 10;
  if (words.length >= 15) context += 15;

  if (
    /\b(for|about|using|with|because|based on|for a|target|audience|project)\b/i.test(
      text
    )
  ) {
    context += 15;
  }

  if (
    /\b(beginner|student|developer|teacher|customer|business|professional|child|expert)\b/i.test(
      text
    )
  ) {
    context += 15;
  }


  /*
     CONSTRAINTS
     Measures limitations and requirements.
  */

  let constraintScoreValue = 10;

  if (constraintText.trim()) {
    constraintScoreValue += 35;
  }

  if (
    /\b(simple|short|detailed|step-by-step|steps|examples|bullet|table|format|under|within|avoid|include|exclude|language)\b/i.test(
      text
    )
  ) {
    constraintScoreValue += 25;
  }

  if (
    /\b(simple english|no jargon|concise|detailed explanation|real-world examples)\b/i.test(
      constraintText
    )
  ) {
    constraintScoreValue += 15;
  }


  /*
     STRUCTURE
     Measures whether the prompt contains organized requirements.
  */

  let structure = 15;

  if (words.length >= 10) structure += 10;

  if (
    /\b(first|then|finally|step|steps|format|sections|headings|bullet points|table|example|examples)\b/i.test(
      text
    )
  ) {
    structure += 20;
  }

  if (constraintText.trim()) {
    structure += 10;
  }

  if (
    /\b(goal|purpose|output|result|audience|requirement)\b/i.test(text)
  ) {
    structure += 15;
  }


  /*
     Keep all scores between 0 and 100.
  */

  clarity = Math.min(clarity, 100);
  context = Math.min(context, 100);
  constraintScoreValue = Math.min(constraintScoreValue, 100);
  structure = Math.min(structure, 100);


  /*
     Weighted overall score.
     These weights reflect Prompt Craft.
  */

  const overall = Math.round(
    clarity * 0.30 +
    context * 0.25 +
    constraintScoreValue * 0.20 +
    structure * 0.25
  );


  return {
    clarity,
    context,
    constraints: constraintScoreValue,
    structure,
    overall
  };
}


/* ==========================================
   BUILD OPTIMIZED PROMPT
========================================== */

function buildOptimizedPrompt(
  prompt,
  selectedGoal,
  selectedDetail,
  constraintText
) {

  const finalConstraints =
    constraintText.trim() ||
    "Use clear language, practical examples, and avoid unnecessary complexity.";

  return `ROLE:
You are an expert AI assistant specialized in ${selectedGoal.toLowerCase()} tasks.

PRIMARY GOAL:
${selectedGoal}

USER REQUEST:
${prompt.trim()}

AUDIENCE / DETAIL LEVEL:
The response should be suitable for a ${selectedDetail.toLowerCase()}-level user.

INSTRUCTIONS:
1. Understand the user's request before answering.
2. Identify the main objective and respond directly to it.
3. Explain important concepts step by step where appropriate.
4. Include practical examples when they improve understanding.
5. Avoid irrelevant information and unnecessary repetition.
6. Use terminology appropriate for the requested detail level.

USER CONSTRAINTS:
${finalConstraints}

OUTPUT FORMAT:
- Start with a concise answer.
- Organize the response using clear headings.
- Use bullet points or numbered steps when useful.
- Include examples where appropriate.
- Keep the final answer practical and easy to follow.

QUALITY CHECK:
Before providing the final answer:
- Check that every part of the user's request is addressed.
- Check factual accuracy.
- Check that the requested detail level is followed.
- Check that all constraints are respected.
- Remove unnecessary repetition.
- Make sure the final response directly solves the user's goal.`;
}


/* ==========================================
   DISPLAY SCORE
========================================== */

function displayScore(scores) {

  scoreValue.textContent = scores.overall;

  clarityScore.textContent = scores.clarity;
  contextScore.textContent = scores.context;
  constraintScore.textContent = scores.constraints;
  structureScore.textContent = scores.structure;

  clarityBar.style.width = `${scores.clarity}%`;
  contextBar.style.width = `${scores.context}%`;
  constraintBar.style.width = `${scores.constraints}%`;
  structureBar.style.width = `${scores.structure}%`;


  if (scores.overall >= 85) {

    scoreTitle.textContent = "Excellent prompt";

    scoreMessage.textContent =
      "Your prompt is clear, contextual, constrained and well structured.";

  } else if (scores.overall >= 70) {

    scoreTitle.textContent = "Strong prompt";

    scoreMessage.textContent =
      "Your prompt has a strong foundation but still has room for optimization.";

  } else if (scores.overall >= 50) {

    scoreTitle.textContent = "Good starting point";

    scoreMessage.textContent =
      "Your idea is understandable, but adding context and constraints can improve it.";

  } else {

    scoreTitle.textContent = "Needs improvement";

    scoreMessage.textContent =
      "Your prompt is quite vague. PromptShield has strengthened its structure.";
  }
}


/* ==========================================
   BUILD PROMPT BUTTON
========================================== */

buildPromptBtn.addEventListener("click", () => {

  const prompt = userPrompt.value.trim();

  if (!prompt) {

    alert("Please enter your rough prompt first.");

    userPrompt.focus();

    return;
  }


  const selectedGoal = goal.value;

  const selectedDetail = detail.value;

  const constraintText = constraints.value;


  /*
     Analyze the ORIGINAL prompt.
  */

  const scores = analyzePrompt(
    prompt,
    constraintText
  );


  /*
     Build optimized prompt.
  */

  currentOptimizedPrompt =
    buildOptimizedPrompt(
      prompt,
      selectedGoal,
      selectedDetail,
      constraintText
    );


  optimizedPrompt.textContent =
    currentOptimizedPrompt;


  /*
     Display score.
  */

  displayScore(scores);


  /*
     Show result sections.
  */

  scoreSection.classList.remove("hidden");

  optimizedSection.classList.remove("hidden");

  responseSection.classList.add("hidden");


  /*
     Scroll to score.
  */

  scoreSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
});


/* ==========================================
   COPY OPTIMIZED PROMPT
========================================== */

copyBtn.addEventListener("click", async () => {

  if (!currentOptimizedPrompt) {
    return;
  }


  try {

    await navigator.clipboard.writeText(
      currentOptimizedPrompt
    );


    const originalText =
      copyBtn.textContent;


    copyBtn.textContent =
      "COPIED ✓";


    setTimeout(() => {

      copyBtn.textContent =
        originalText;

    }, 1500);


  } catch (error) {

    alert("Unable to copy the prompt.");

  }
});


/* ==========================================
   GENERATE AI RESPONSE
========================================== */

generateBtn.addEventListener("click", async () => {

  if (!currentOptimizedPrompt) {
    return;
  }


  responseSection.classList.remove("hidden");

  aiResponse.textContent =
    "Generating response...";


  responseSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });


  try {

    const response = await fetch(
      "/api/generate",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          prompt: currentOptimizedPrompt
        })
      }
    );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(
        data.message ||
        "Request failed."
      );
    }


    aiResponse.textContent =
      data.message ||
      "AI response generated successfully.";


  } catch (error) {

    console.error(error);


    aiResponse.textContent =
      "The prompt was created successfully, but the AI response could not be generated. Please check the server terminal.";
  }
});
