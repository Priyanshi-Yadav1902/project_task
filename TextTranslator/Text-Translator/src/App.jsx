import { useState } from "react";
import axios from "axios";
import axiosRetry from "axios-retry";


axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

function App() {
  const [textInput, setTextInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [result, setResult] = useState("");

  const handleTextTranslation = async () => {
    if (!textInput || !selectValue) {
      setResult("Please enter text and select a language.");
      return;
    }

    const encodedParams = new URLSearchParams();
    encodedParams.append("source_language", "en");
    encodedParams.append("target_language", selectValue);
    encodedParams.append("text", textInput);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "x-rapidapi-key": "5681071e07msh3f45725dbdf9b9dp1728a9jsn7b6b0bc53a91",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: encodedParams,
    };

    try {
      const response = await axios.request(options);
      const translatedText = response.data.data.translatedText;
      setResult(translatedText);
    } catch (error) {
      console.error("Translation failed:", error);
      setResult("Error: Translation failed. Please check your internet or API limits.");
    }
  };

  return (
    <div className="h-screen w-screen bg-slate-200 flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-y-10">
        <h1 className="text-3xl text-zinc-700 font-bold">Text Translator</h1>

        <div className="flex items-center justify-center flex-col gap-y-5">
          <textarea
            name="input-text"
            className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg text-lg px-5 py-2"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter text in English"
          />

          <textarea
            name="output-text"
            className="bg-white h-30 w-[500px] border border-slate-700 outline-none rounded-lg text-lg px-5 py-2"
            value={result}
            readOnly
            placeholder="Translated text will appear here"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <label htmlFor="options" className="text-zinc-700 font-medium">Convert To:</label>
          <select
            name="value"
            className="bg-white px-2 py-1 rounded-lg border border-zinc-700 outline-none cursor-pointer"
            onChange={(e) => setSelectValue(e.target.value)}
            value={selectValue}
          >
            <option value="" disabled>
              Select Language
            </option>
            <option value="hi">Hindi</option>
            <option value="pa">Punjabi</option>
            <option value="bn">Bengali</option>
            <option value="gu">Gujarati</option>
          </select>
        </div>

        <button
          disabled={!textInput || !selectValue}
          className="bg-slate-700 text-slate-100 mx-auto w-[500px] py-2 rounded-lg cursor-pointer disabled:opacity-50"
          onClick={handleTextTranslation}
        >
          Translate
        </button>
      </div>
    </div>
  );
}

export default App;
