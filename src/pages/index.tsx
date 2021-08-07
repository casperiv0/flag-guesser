import * as React from "react";
import { makeFunctionsArray } from "lib/questions";
import { Question } from "types/Question";

export default function Home() {
  const [questions, setQuestions] = React.useState<Question[]>([]);

  async function init() {
    const data = await makeFunctionsArray();
    setQuestions(data);
  }

  React.useEffect(() => {
    init();
  }, []);

  return <div>{questions.length}</div>;
}
