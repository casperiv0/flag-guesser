import * as React from "react";
import Head from "next/head";

import { getRandomQuestion, makeFunctionsArray } from "lib/questions";
import { Question } from "types/Question";
import { QuestionView, States } from "components/Question/Question";
import { loadHighScore, updateLocalStorageScore } from "lib/score";
import styles from "styles/app.module.scss";
import { Footer } from "components/Footer/Footer";
import { GetServerSideProps } from "next";

interface Props {
  question: Question;
  questions: Question[];
}

export default function Home({ question, questions: serverQuestions }: Props) {
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState<Question | null>(null);

  /**
   * the questions that have been answered
   */
  const [prevQuestions, setPrevQuestions] = React.useState<Question[]>([]);

  const [highscore, setHighscore] = React.useState(0);
  const [score, setScore] = React.useState(0);

  function handleNextQuestion(state: States) {
    setPrevQuestions((p) => [...p, currentQuestion!]);

    if (state === "correct") {
      const newScore = score + 1;

      setScore(newScore);
      setHighscore((p) => {
        if (newScore > p) {
          updateLocalStorageScore(newScore);
          return newScore;
        }

        return p;
      });
    }

    if (questions.length === prevQuestions.length) return;

    setCurrentQuestion(getRandomQuestion(questions));
  }

  React.useEffect(() => {
    setCurrentQuestion(question);
    setQuestions(serverQuestions);

    setHighscore(loadHighScore());
  }, [question, serverQuestions]);

  if (questions.length <= 0 || !currentQuestion) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Guess the country by the flag!</title>
      </Head>

      <div>
        <h1 className={styles.appTitle}>Guess the country by the flag!</h1>
        <h2 className={styles.scoreTitle}>
          Score: {score}/{prevQuestions.length} • Highscore: {highscore}
        </h2>

        {questions.length === prevQuestions.length ? (
          <p className={styles.endTitle}>
            Well then... that&apos;s the end! Thanks for playing. Reload the page to start a new
            game!
          </p>
        ) : (
          <QuestionView handleNextQuestion={handleNextQuestion} question={currentQuestion} />
        )}
      </div>

      <Footer />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await makeFunctionsArray();
  const question = getRandomQuestion(data);

  return {
    props: {
      question,
      questions: data,
    },
  };
};
