import React, { useState, useEffect } from "react";
import { Spinner } from "@shopify/polaris";
import { searchAPOD } from "./api/APODClient";

import '@shopify/polaris/build/esm/styles.css';
import "./App.css";
import { APODItem } from "./types/global";
import APODList from "./components/APODList/APODList";

function App() {
  const [APODItems, setAPODItems] = useState<APODItem[] | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await searchAPOD();
      console.log("aaa", result);
      setAPODItems(result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Spacestagram</h1>
        <p>Thanks to NASA's images API</p>
      </header>

      <div className="App-body">
        {loading == true ? (
            <Spinner accessibilityLabel="Loading" size="large" />
        ) : (
          <APODList apodItems={APODItems} />
        )}
      </div>
    </div>
  );
}

export default App;
