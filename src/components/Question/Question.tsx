import * as React from "react";
import Image from "next/image";
import { Question } from "types/Question";
import styles from "./question.module.scss";

interface Props {
  question: Question;
}

export const QuestionView = ({ question }: Props) => {
  console.log(question);

  return (
    <div className={styles.container}>
      <h1>Guess the country by this flag!</h1>

      <Image className={styles.image} src={question.flagUrl} width="750px" height="500px" />

      <div className={styles.choices}>
        {question.choices.map((choice) => (
          <button className={styles.choiceBtn} key={choice}>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};
