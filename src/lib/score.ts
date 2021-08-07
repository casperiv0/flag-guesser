export const LOCAL_STORAGE_KEY = "flag_guesser_highscore";

/**
 * get the saved score from localStorage, if not exists the score is 0
 */
export function loadHighScore(): number {
  const local = localStorage.getItem(LOCAL_STORAGE_KEY);
  return parseInt(local ?? "0");
}

/**
 * update localStorage with the new score
 */
export function updateLocalStorageScore(score: number) {
  localStorage.setItem(LOCAL_STORAGE_KEY, String(score));
}
