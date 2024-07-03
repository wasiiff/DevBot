import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState();
  const [prevPrompt, setprevPrompt] = useState([]);
  const [showResult, setshowResult] = useState(false);
  const [loading, setloading] = useState(false);
  const [resultData, setresultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setresultData((prev) => prev + nextWord);
    }, 78 * index);
  };

  const onSent = async (prompt) => {
    setresultData("");
    setloading(true);
    setshowResult(true);
    setRecentPrompt(input);
    setprevPrompt((prev) => [...prev, input]);
    const response = await run(input);
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
   
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setloading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompt,
    setprevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
