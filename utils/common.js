export const uuidv4 = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const showQuestion = (question_variable_name, index, reduxState) => {
  const { questions, questionDisplayLogic } = reduxState;

  if (index === 0) {
    return true;
  }

  // show if the previous question has an answer
  const previousQuestionAnswered =
    reduxState[questions[index - 1].variable_name] !== "";
  if (!previousQuestionAnswered && question_variable_name !== "needs") {
    return false;
  }

  const relevantLogic = questionDisplayLogic.filter(x => {
    return (
      x["exclude questions"] &&
      x["exclude questions"].indexOf(question_variable_name) > -1
    );
  });

  if (!relevantLogic) {
    return true;
  }

  let return_value = true;
  relevantLogic.forEach(x => {
    const questionName = x.question[0];
    const users_answer = reduxState[questionName];
    if (x["has value"].indexOf(users_answer) > -1) {
      return_value = false;
    }
  });

  return return_value;
};
