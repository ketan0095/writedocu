import "../App.css";
import { useState } from "react";
import axios from "axios";

function Model() {
  const [prompt, setprompt] = useState(null);
  const [saveprompt, setsaveprompt] = useState(false);
  const [result, setresult] = useState(null);

  async function getresult() {
    const payload = {
      username: "ketan123",
      prompt: prompt,
      documentStandard: "Google",
      promptSave: saveprompt ? 1 : 2,
      maxWordCount: 100,
    };

    console.log(`${process.env.REACT_APP_PYTHON_URL}/ai/generate-result`);

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_PYTHON_URL}/ai/generate-result`,
      headers: {
        "Content-Type": "application/json",
        X_KEY: process.env.REACT_APP_X_KEY,
      },
      data: payload,
    })
      .then((res) => {
        if (res.data.status == 200) {
          setresult(res.data.msg);
        } else {
          alert(`Error : ${res.data.msg}`);
        }
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div class="App mt-10 App-header">
      <div class="row">
        <div class="col-12">
          <h1>WriteDocu</h1>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="col-12 mt-100">
          <input
            placeholder="Write/Paste your Prompt Here..."
            value={prompt ? prompt : ""}
            onChange={(e) => {
              setprompt(e.target.value);
            }}
          ></input>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="col-12">
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">Save Prompt for future</div>
            <div class="col-2 d-flex">
              <div class="form-check text-center">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label class="form-check-label" for="flexCheckDefault"></label>
              </div>
            </div>
            <div class="col-2"></div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="col-12">
          <button class="btn btn-primary" onClick={getresult}>
            Generate results
          </button>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div class="w-100 col-12 mx-auto">
          <textarea
            class="h-100"
            placeholder="Results will be shown here..."
            value={result ? result : ""}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

export default Model;
