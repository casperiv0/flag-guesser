import * as React from "react";
import { Question } from "types/Question";

interface Props {
  question: Question;
}

export const QuestionView = ({ question }: Props) => {
  console.log(question);

  return <div></div>;
};
