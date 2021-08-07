import * as React from "react";
import Image from "next/image";
import { Question } from "types/Question";
import styles from "./question.module.scss";
import { classes } from "lib/classes";

export type States = "correct" | "incorrect";

interface Props {
  question: Question;
  handleNextQuestion: (state: States) => void;
}

export const QuestionView = ({ question, handleNextQuestion }: Props) => {
  const [state, setState] = React.useState<States | null>(null);
  const [disabled, setDisabled] = React.useState(true);

  function getClassName(choice: string) {
    if (question.answer === choice) return styles.correct;
    return styles.incorrect;
  }

  function isChoiceCorrect(choice: string) {
    if (disabled === true) return;
    setDisabled(true);

    const correct = question?.answer === choice;
    if (correct) {
      setState("correct");
    } else {
      setState("incorrect");
    }

    return correct;
  }

  React.useEffect(() => {
    setDisabled(false);
    setState(null);
  }, [question]);

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={question.flagUrl}
        width="750px"
        height="500px"
        placeholder="empty"
      />

      <div className={styles.choices}>
        {question.choices.map((choice) => (
          <button
            onClick={() => isChoiceCorrect(choice)}
            className={classes(
              styles.choiceBtn,
              disabled && styles.disabled,
              state !== null && getClassName(choice),
            )}
            key={choice}
          >
            {choice}
          </button>
        ))}
      </div>

      {state !== null ? (
        <button className={styles.nextFlagBtn} onClick={() => handleNextQuestion(state)}>
          Next flag
        </button>
      ) : null}
    </div>
  );
};
