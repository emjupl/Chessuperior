if (window.location.hostname.includes("chess.com")) {
    if (!document.getElementById('chessuperior-custom-styles')) {
        const style = document.createElement("style");
        style.id = "chessuperior-custom-styles";
        style.textContent = `

            #thirdPartyAnalysisButtonGameOver{
                height: 50px;
                width: 100%;
                margin-top: 10px;
            }

            .thirdPartyAnalysisButton{
                width: 25px;
                height: 100%;
                margin-left: 3px;
            }

            .chessuperior-box {
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;

                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-weight: 500;
                background-color: #131313;
                box-shadow: inset 0px 0px 6px 4px black;
                border-radius: 16px;
                padding: 10px;
                margin: 1.6rem;
                max-width: 100%;
                box-sizing: border-box;
                outline: 2px dashed #4b4b4b;
                color: #8b8b8b;
                
            }

            .chessuperior-box span{
                width: 100%;
            }

            .chessuperior-btn {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                pointer-events: auto;
                z-index: 9999;
                position: relative;

                color: #d4d4d4;
                background-color: #131313;
                box-shadow: inset 0px 0px 7px 3px #0000007a;
                border-radius: 8px;
                box-sizing: border-box;
                padding: 8px;
                font-weight: bold;
                outline: 1px solid #4b4b4b;
            }

            .chessuperior-btn:active {
                outline: 1px solid #4b4b4b;
            }

            .chessuperior-btn:hover {
                background: linear-gradient(180deg, #2a2a2a 0%, #131313 100%);
            }

            .analysisButtonsContainer {
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction:row;
                    align-items: center;
            }
        `;
        document.head.appendChild(style);
    }
}

function addThirdPartyAnalysisButtonGameOverModal() {
    if (window.location.hostname.includes("chess.com") && window.location.pathname.includes("/game")) {
        const gameOverWindowButtonsContainer = document.querySelector(".game-over-modal-shell-buttons");
        if (gameOverWindowButtonsContainer) {
            if (!document.getElementById("thirdPartyAnalysisButtonGameOver")) {
                const chesscomGameUrl = window.location.href;
                const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", "6chess.com");

                const chessuperiorGameOverContainer = document.createElement("div");
                chessuperiorGameOverContainer.className = "chessuperior-box";
                gameOverWindowButtonsContainer.appendChild(chessuperiorGameOverContainer);

                const text = document.createElement('span');
                text.textContent = "Przejdź do zewnętrznej analizy!";
                chessuperiorGameOverContainer.appendChild(text);

                const thirdPartyAnalysisButtonGameOver = document.createElement("a");
                thirdPartyAnalysisButtonGameOver.className = "chessuperior-btn";
                thirdPartyAnalysisButtonGameOver.id = "thirdPartyAnalysisButtonGameOver";
                thirdPartyAnalysisButtonGameOver.textContent = "➔ Przejdź";
                thirdPartyAnalysisButtonGameOver.href = chessigmaGameUrl;
                thirdPartyAnalysisButtonGameOver.target = "_blank";
                chessuperiorGameOverContainer.appendChild(thirdPartyAnalysisButtonGameOver);
            } else {
                const chesscomGameUrl = window.location.href;
                const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", "6chess.com");

                const thirdPartyAnalysisButtonGameOver = document.getElementById('thirdPartyAnalysisButtonGameOver');
                thirdPartyAnalysisButtonGameOver.href = chessigmaGameUrl;
            }
        }
    }
}
addThirdPartyAnalysisButtonGameOverModal()

function addThirdPartyAnalysisButtons() {
    if (window.location.hostname.includes("chess.com") && (window.location.pathname.includes("/member") || window.location.pathname.includes("/home") || window.location.pathname.includes("/games"))) {
        const gameAccuracyContainer = document.querySelectorAll(".game-accuracy-component");
        if (gameAccuracyContainer) {
            gameAccuracyContainer.forEach(element => {
                if (!element.classList.contains("analysisButtonsContainer")) {
                    element.classList.add("analysisButtonsContainer");

                    const chesscomAnalysisButton = element.querySelector('.game-accuracy-review-button');
                    if (chesscomAnalysisButton) {
                        const chesscomAnalysisUrl = chesscomAnalysisButton.href;
                        const chessigmaAnalysisUrl = chesscomAnalysisUrl.replace("chess.com", "6chess.com");

                        const thirdPartyAnalysisButton = document.createElement("a");
                        thirdPartyAnalysisButton.classList.add('thirdPartyAnalysisButton');
                        thirdPartyAnalysisButton.classList.add('chessuperior-btn');
                        thirdPartyAnalysisButton.href = chessigmaAnalysisUrl;
                        thirdPartyAnalysisButton.target = '_blank';
                        thirdPartyAnalysisButton.textContent = '➔';

                        thirdPartyAnalysisButton.addEventListener('click', (event) => {
                            event.stopPropagation();
                        });

                        element.appendChild(thirdPartyAnalysisButton);
                    }
                }
            })
        }
    }
}
addThirdPartyAnalysisButtons()

function unmaskChesssigmaCoachComments() {
    if (window.location.hostname.includes("chessigma.com")) {
        const coachComments = document.querySelectorAll(".v2CoachComment");
        coachComments.forEach(element => {
            if (element.getAttribute("data-masked") != 0) {
                element.setAttribute("data-masked", "0");
            }
        });
    }
};
unmaskChesssigmaCoachComments();

let observerTimeout;
const observer = new MutationObserver(() => {
    clearTimeout(observerTimeout);
    observerTimeout = setTimeout(() => {
        addThirdPartyAnalysisButtonGameOverModal();
        addThirdPartyAnalysisButtons();
        unmaskChesssigmaCoachComments();
    }, 100);
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});