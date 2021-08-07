import * as React from "react";
import { getRandomQuestion, makeFunctionsArray } from "lib/questions";
import { Question } from "types/Question";
import { QuestionView } from "components/Question/Question";

export default function Home() {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null);

  async function init() {
    const data = await makeFunctionsArray();
    setQuestions(data);
    setCurrentQuestion(getRandomQuestion(data));
  }

  function handleNextQuestion() {}

  React.useEffect(() => {
    init();
  }, []);

  if (questions.length <= 0 || !currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <QuestionView question={currentQuestion} />
    </div>
  );
}
