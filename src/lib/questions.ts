import { Country } from "types/Country";
import { Question } from "types/Question";

const API_VERSION = 3.1;
const API_URL = `https://restcountries.com/v${API_VERSION}`;

export async function fetchCountries(): Promise<Country[]> {
  const data: Country[] | null = await fetch(`${API_URL}/all`)
    .then((v) => v.json())
    .catch(() => []);

  return data ?? [];
}

export async function makeFunctionsArray(): Promise<Question[]> {
  const countries = await fetchCountries();

  return countries.map((country) => {
    return {
      flagUrl: country.flags.svg,
      answer: country.name.official,
      choices: makeChoices(country, countries),
    };
  });
}

function makeChoices(country: Country, countries: Country[]) {
  const selectChoices: string[] = [];

  /**
   * 3 random choices + the correct answer
   */
  for (let i = 0; i < 4; i++) {
    const randomIdx = Math.floor(Math.random() * countries.length);
    const randomCountry = countries[randomIdx] as Country;

    if (randomCountry.name === country.name) continue;
    if (selectChoices.includes(randomCountry.name.official)) continue;
    selectChoices.push(randomCountry.name.official);
  }

  return addAnswerAtIndex(selectChoices, country.name.official);
}

function addAnswerAtIndex(choices: string[], answer: string) {
  const randomIdx = Math.floor(Math.random() * 4);

  if (choices[randomIdx]) {
    const prev = choices[randomIdx] as string;

    choices[randomIdx - 1] = prev;
    choices[randomIdx] = answer;
  } else {
    choices[randomIdx] = answer;
  }

  return choices;
}

const cached: Question[] = [];
export function getRandomQuestion(questions: Question[]) {
  let random = {} as Question;

  for (let i = 0; i < questions.length; i++) {
    const randomIdx = Math.floor(Math.random() * questions.length);
    const country = questions[randomIdx] as Question;

    if (cached.includes(country)) continue;
    random = country;
  }

  cached.push(random);

  return random;
}
