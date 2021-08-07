export const LOCAL_STORAGE_KEY = "flag_guesser_score";

/**
 * get the saved score from localStorage, if not exists the score is 0
 */
export function loadScoreFromLocalStorage(): number {
  const local = window.localStorage.getItem("LOCAL_STORAGE_KEY");
  return parseInt(local ?? "0");
}

/**
 * update localStorage with the new score
 */
export function updateLocalStorageScore(score: number) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, String(score));
}
