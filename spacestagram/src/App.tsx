import React, { useState, useEffect } from "react";
import { Spinner } from "@shopify/polaris";
import { searchAPOD } from "./api/APODClient";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";
import { APODItem } from "./types/global";
import APODList from "./components/APODList/APODList";

function App() {
  const [APODItems, setAPODItems] = useState<APODItem[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchData();
    window.addEventListener("scroll", loadMore);
  }, []);

  const fetchData = async (): Promise<void> => {
    try {
      const result = await searchAPOD();
      setAPODItems(APODItems => APODItems?.concat(result));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const loadMore = (): void => {
    const atBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight;

    if (atBottom) {
      fetchData();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Spacestagram</h1>
        <p>Thanks to NASA's image API</p>
      </header>

      <div className="App-body">
        {loading ? (
          <Spinner accessibilityLabel="Loading" size="large" />
        ) : (
          <APODList apodItems={APODItems} />
        )}
      </div>
    </div>
  );
}

export default App;
