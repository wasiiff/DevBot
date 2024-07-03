import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../Assets/assets/assets";
import { Context } from "../../context/Context";

export default function Main() {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Wasif.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>How to design a AI Chatbot</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>How to develop a Model Based AI machine</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>What is Gemini?</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>What is TUFMUN? When is it happening?</p>

                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input? <img onClick={() => onSent()} src={assets.send_icon} alt="" />:null}
             
            </div>
          </div>
          <p className="bottom-info">
            This a Clone Of Gemini by Wasif, So this Might have Some Errors ©.
          </p>
        </div>
      </div>
    </div>
  );
}
