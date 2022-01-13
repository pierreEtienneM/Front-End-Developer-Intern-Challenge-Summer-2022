import React, { useState, useEffect, useRef } from "react";
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
    fetchData();
    window.addEventListener("scroll", loadMore);
  }, []);

  const loadingRef = useRef(loading);
  const _setLoading = (value: boolean) => {
    loadingRef.current = value;
    setLoading(value);
  };

  const fetchData = async (): Promise<void> => {
    if (!loadingRef.current) {
      _setLoading(true);
      try {
        const result = await searchAPOD();
        setAPODItems((APODItems) => APODItems?.concat(result));
      } catch (error) {
        console.log(error);
      }
      _setLoading(false);
    }
  };

  const loadMore = (): void => {
    const atBottom =
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight;

    if (atBottom) {
      fetchData();
    }
  };

  const ScrollTop = (): void => {
    window.scroll(0, 0);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 onClick={() => ScrollTop()}>🚀 Spacestagram</h1>
        <p>Thanks to NASA's image API</p>
      </header>

      <div className="App-body">
        {APODItems && <APODList apodItems={APODItems} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
}

export default App;
