import { convertMillisecondsToSeconds } from "../../utils/utils";
import styles from "./Results.module.css";

interface ResultItem {
  id: number;
  name: string;
  link: string;
  title: string;
  description: string;
}

interface ResultsProps<T> {
  results?: T[];
  searchTimeTaken?: number;
}

const Results = <T extends ResultItem>({ results, searchTimeTaken = 0 }: ResultsProps<T>) => {
  if (!results) return null;

  return (
    <div className={styles.container}>
      <div className={styles.resultStats}>
        Around {Math.round(results.length)} results ({convertMillisecondsToSeconds(searchTimeTaken)}{" "}
        seconds)
      </div>
      {results.map(result => (
        <div key={result.id}>
          <div>
            <div>{result.name}</div>
            <cite className={styles.smallText}>{result.link}</cite>
          </div>
          <a href={result.link} className={styles.link}>
            {result.title}
          </a>
          <p className={styles.paragraph}>{result.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Results;
