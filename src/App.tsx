import { useState } from "react";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchBar from "./components/search_bar/SearchBar";
import Results from "./components/results/Results";
import { DataItem, data } from "./constants/data";
import { MAX_RESULTS } from "./constants/defaults";
import { getResults } from "./utils/utils";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [searchTimeTaken, setSearchTimeTaken] = useState<number>(0);
  const [results, setResults] = useState<DataItem[]>();

  const handleSearchExecute = async (keyword: string) => {
    setLoading(true);
    // Simulate server delay with random number
    const randomDelay = Math.random() * (1000 - 100) + 100;
    const foundedResults: DataItem[] = await new Promise(resolve =>
      setTimeout(() => resolve(getResults(data, "name", keyword)), randomDelay)
    );
    setResults(foundedResults);
    setSearchTimeTaken(randomDelay);
    setLoading(false);
  };

  return (
    <main className="main-container">
      <Header title="SearchX" />
      <SearchBar
        items={data}
        displayKeyName="name"
        autofocus
        placeholder="Search React, Angular, Vue..."
        maxResults={MAX_RESULTS}
        onSearch={handleSearchExecute}
      />
      <Results results={results} searchTimeTaken={searchTimeTaken} />
      <Footer
        copyText={`Copyright \u00A9 ${new Date().getFullYear()} SearchX`}
        author="Ivan Mitov"
      />
      {loading && <span className="loader" />}
    </main>
  );
}

export default App;
