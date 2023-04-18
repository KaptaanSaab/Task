
import "./App.css";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");
  const [err, setErr] = useState("");
  const [openFrame, setOpenFrame] = useState(false);
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");

  const validatorUrl = () => {
    let expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    if (!regex.test(url)) {
      return true;
    }
    return false;
  };
  const submitHandler = async () => {
    setErr("");
    if (validatorUrl()) {
      setErr("Invalid Url");
      return;
    }
    setLoading(true);
    const data = await fetch(`http://localhost:3001/tractor?url=${url}`, {
      method: "GET",
    });
    const res = await data.text();
    console.log(res, "res");
    setHtmlContent(res);
    setLoading(false);
    setOpenFrame(true);
  };
  return (
    <div className="App">
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;"
      ></meta>
      <input
        type="text"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter url"
      />
      <button type="submit" onClick={() => submitHandler()}>
        {loading ? "Loading..." : "Search"}
      </button>
      {err?.length > 0 ? <p>{err}</p> : null}
      {/* {openFrame ? <iframe src={url} /> : null} */}
      {openFrame ? (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : null}
    </div>
  );
}

export default App;
