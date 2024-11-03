

const healthResponses = {
    symptoms: "If you're experiencing symptoms, it's best to consult a healthcare professional for personalized advice. Common symptoms like fever, cough, and fatigue may indicate various conditions.",
    diet: "A balanced diet includes a variety of fruits, vegetables, whole grains, protein, and healthy fats. It's always good to consult with a nutritionist for a diet tailored to your needs.",
    exercise: "For general health, aim for at least 150 minutes of moderate aerobic exercise per week. This can include walking, cycling, or other activities you enjoy.",
    mentalHealth: "Mental health is just as important as physical health. Practices like mindfulness, regular physical activity, and talking to friends or a therapist can help manage stress.",
    hydration: "Staying hydrated is essential. Aim to drink at least 8 cups of water daily, and adjust according to your activity level and climate.",
  };
  
  const getResponse = (question) => {
    const lowerCaseQuestion = question.toLowerCase();
  
    if (lowerCaseQuestion.includes("symptom")) return healthResponses.symptoms;
    if (lowerCaseQuestion.includes("diet")) return healthResponses.diet;
    if (lowerCaseQuestion.includes("exercise")) return healthResponses.exercise;
    if (lowerCaseQuestion.includes("mental health")) return healthResponses.mentalHealth;
    if (lowerCaseQuestion.includes("hydrate") || lowerCaseQuestion.includes("water")) {
      return healthResponses.hydration;
    }
  
    return "I'm sorry, I can't answer that question. Please consult a healthcare professional for personalized advice.";
  };
  
  export default getResponse;
  