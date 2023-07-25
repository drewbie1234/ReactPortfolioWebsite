import React from 'react';
import { languages } from './Languages';

let title = ""

function FindOut() {

    const displayFindOut = e => {
        const selectedLanguage = e.target.alt;
        title = languages[selectedLanguage].title;
        let findOutText = languages[selectedLanguage].findOutInfo;
        document.getElementById("info").innerHTML = findOutText
    }

    const languageImages = []
        for (const language in languages){
            languageImages.push(
                <img
                key={language}
                className="logo"
                alt={language}
                src={languages[language].image}
                role="button"
                onClick={displayFindOut}
                />
            )
        }
    return (
    <div class="container4">
        <div class="container2">
            <h2>What tools do we use to create?</h2>
            <div class="logo-wrapper">
            {languageImages}
            </div>
            <div>
                <p id='click-to-find-out'>Click to find out</p>
            </div>
        </div>
        <div class="container3">
            <section class="find-out-wrapper">
            <div class="find-out-info">
                <h2>{title || "" ? "Lets Find Out!" : title}</h2>
                <p id='info'></p>
            </div>
            </section>
        </div>
    </div>
    )
}
export default FindOut;