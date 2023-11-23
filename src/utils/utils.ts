export const getResults = <T>(
  data: T[],
  keyToCheckFrom: keyof T,
  criteria: string,
  maxResults?: number
): T[] => {
  const results = data.filter(item => {
    const value = item[keyToCheckFrom];
    if (typeof value === "string") {
      return value.toLowerCase().includes(criteria.toLowerCase());
    }
    return false;
  });
  const limitedResults = maxResults ? results.splice(0, maxResults) : results;
  return limitedResults;
};

export const convertMillisecondsToSeconds = (ms: number, roundTo = 2) => {
  const seconds = ((ms % 60000) / 1000).toFixed(roundTo);
  return seconds;
};
