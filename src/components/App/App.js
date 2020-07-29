import React, { useCallback, useState } from "react";
import { Button } from "../Button/Button";
import { Spacer } from "../Spacer/Spacer";
import { TextMetricsCache } from "../../core/TextMetricsCache";
import { fonts, words } from "../../core/TestData";
import "./App.css";

const textMetricsCache = new TextMetricsCache();

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function App() {
  const [cacheDump, setCacheDump] = useState("");
  const [history, setHistory] = useState("");

  const tryCache = useCallback(() => {
    const word = getRandomItem(words);
    const font = getRandomItem(fonts);

    const cachedEntry = textMetricsCache.getCachedEntry(word, font);
    if (!cachedEntry) {
      const value = word.toLowerCase() + "_" + font.toLowerCase();

      setHistory(`${history}\nset ${value}`);

      textMetricsCache.setCachedEntry(word, font, value);
    } else {
      setHistory(`${history}\nget ${cachedEntry}`);
    }

    const dump = textMetricsCache.dump();
    setCacheDump(dump);
  }, [history]);

  const remove = useCallback(() => {
    const randomInteger = Math.floor(Math.random() * 2) + 1;

    textMetricsCache.evictEntries(randomInteger);

    setHistory(`${history}\nevict ${randomInteger}`);

    const dump = textMetricsCache.dump();
    setCacheDump(dump);
  });

  const dump = useCallback(() => {
    const dump = textMetricsCache.dump();
    console.log(dump);
  }, []);

  return (
    <div className="App">
      <div className="Title">Conveyor Belt Kid</div>
      <div className="Container">{cacheDump}</div>
      <div className="Actions">
        <Button onClick={tryCache}>Add</Button>
        <Spacer space={8} />
        <Button onClick={remove}>Remove Random</Button>
        <Spacer space={8} />
        <Button onClick={dump}>Dump</Button>
      </div>
      <div className="Container">
        <div className="Title">History</div>
        <div className="History">{history}</div>
      </div>
    </div>
  );
}

export default App;
