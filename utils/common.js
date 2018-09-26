export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const showQuestion = (question, index, reduxState) => {
  const { questions, multipleChoiceOptions, questionDisplayLogic } = reduxState;

  let questionDict = {};
  questions.forEach(x => {
    questionDict[x.id] = x.variable_name;
  });

  let optionDict = {};
  multipleChoiceOptions.forEach(x => {
    optionDict[x.variable_name] = x.id;
  });

  if (index === 0) {
    return true;
  }

  // show if the previous question has an answer
  const previousQuestionAnswered =
    reduxState[questions[index - 1].variable_name] !== "";
  if (!previousQuestionAnswered) {
    return false;
  }

  const relevantLogic = questionDisplayLogic.filter(x => {
    return (
      x["exclude questions"] && x["exclude questions"].indexOf(question.id) > -1
    );
  });

  if (!relevantLogic) {
    return true;
  }

  let return_value = true;
  relevantLogic.forEach(x => {
    const questionId = x.question[0];
    const users_answer = reduxState[questionDict[questionId]];
    const users_answer_id = optionDict[users_answer];
    if (x["has value"].indexOf(users_answer_id) > -1) {
      return_value = false;
    }
  });

  return return_value;
};
