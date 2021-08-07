import { Country } from "types/Country";
import { Question } from "types/Question";

const API_URL = "https://restcountries.eu/rest/v2/";

export async function fetchCountries(): Promise<Country[]> {
  const data = await fetch(API_URL)
    .then((v) => v.json())
    .catch(() => null);

  if (!data) {
    return [];
  }

  return data;
}

export async function makeFunctionsArray(): Promise<Question[]> {
  const countries = await fetchCountries();

  return countries.map((country) => {
    return {
      flagUrl: country.flag,
      answer: country.name,
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
    const country = countries[randomIdx] as Country;

    if (selectChoices.includes(country.name)) continue;
    selectChoices.push(country?.name);
  }

  return addAnswerAtIndex(selectChoices, country.name);
}

function addAnswerAtIndex(choices: string[], answer: string) {
  const randomIdx = Math.floor(Math.random() * 4);

  if (choices[randomIdx]) {
    const prev = choices[randomIdx] as string;

    choices[randomIdx - 1] = prev;
    choices[randomIdx] = answer;
  }

  return choices;
}
