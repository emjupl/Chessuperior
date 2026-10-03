function createText(content) {
    const span = document.createElement('span');
    span.textContent = content;
    return span;
}

function createThirdPartyAnalysisButtonGameOverModal(href) {
    const thirdPartyAnalysisButtonGameOver = document.createElement("a");
    thirdPartyAnalysisButtonGameOver.classList.add("chessuperior-btn");
    thirdPartyAnalysisButtonGameOver.id = "chessuperior-third-party-analysis-button-game-over";
    thirdPartyAnalysisButtonGameOver.textContent = "➔ Przejdź";
    thirdPartyAnalysisButtonGameOver.href = href;
    thirdPartyAnalysisButtonGameOver.target = "_blank";
    return thirdPartyAnalysisButtonGameOver;
}

function createThirdPartyAnalysisButtons(href) {
    const thirdPartyAnalysisButton = document.createElement("a");
    thirdPartyAnalysisButton.classList.add('chessuperior-third-party-analysis-button', 'chessuperior-btn');
    thirdPartyAnalysisButton.href = href;
    thirdPartyAnalysisButton.target = '_blank';
    thirdPartyAnalysisButton.textContent = '➔';

    thirdPartyAnalysisButton.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    return thirdPartyAnalysisButton;
}


function appendThirdPartyAnalysisButtonGameOverModal() {
    if (window.location.hostname.includes("chess.com") && window.location.pathname.includes("/game")) {
        const gameOverWindowButtonsContainer = document.querySelector(".game-over-modal-shell-buttons");

        if (!gameOverWindowButtonsContainer) { return }

        if (!document.getElementById("chessuperior-third-party-analysis-button-game-over")) {
            const chesscomGameUrl = window.location.href;
            const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", "6chess.com");

            const chessuperiorGameOverContainer = document.createElement("div");
            chessuperiorGameOverContainer.className = "chessuperior-box";
            gameOverWindowButtonsContainer.appendChild(chessuperiorGameOverContainer);

            const text = createText("Zewnetrzna analiza jest dostepna!");
            chessuperiorGameOverContainer.appendChild(text);

            const btn = createThirdPartyAnalysisButtonGameOverModal(chessigmaGameUrl)
            chessuperiorGameOverContainer.appendChild(btn);

        } else {
            const chesscomGameUrl = window.location.href;
            const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", "6chess.com");

            const thirdPartyAnalysisButtonGameOver = document.getElementById('chessuperior-third-party-analysis-button-game-over');
            thirdPartyAnalysisButtonGameOver.href = chessigmaGameUrl;
        }
    }
}

function appendThirdPartyAnalysisButtons() {
    if (window.location.hostname.includes("chess.com") && (window.location.pathname.includes("/member") || window.location.pathname.includes("/home") || window.location.pathname.includes("/games"))) {
        const chesscomGameAccuracyContainer = document.querySelectorAll(".game-accuracy-component");
        chesscomGameAccuracyContainer.forEach(element => {
            if (!element.classList.contains("analysis-buttons-container")) {
                element.classList.add("analysis-buttons-container");
                const chesscomAnalysisButton = element.querySelector('.game-accuracy-review-button');
                if (chesscomAnalysisButton) {
                    const chesscomAnalysisUrl = chesscomAnalysisButton.href;
                    const chessigmaAnalysisUrl = chesscomAnalysisUrl.replace("chess.com", "6chess.com");
                    const btn = createThirdPartyAnalysisButtons(chessigmaAnalysisUrl);
                    element.appendChild(btn);
                }
            }
        })
    }
}

function unmaskChessigmaCoachComments() {
    if (window.location.hostname.includes("chessigma.com")) {
        const coachComments = document.querySelectorAll(".v2CoachComment");
        coachComments.forEach(element => {
            if (element.getAttribute("data-masked") != 0) {
                element.setAttribute("data-masked", "0");
            }
        });
    }
}

function main() {
    appendThirdPartyAnalysisButtonGameOverModal()
    appendThirdPartyAnalysisButtons()
    unmaskChessigmaCoachComments();


    let observerTimeout;
    const observer = new MutationObserver(() => {
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            appendThirdPartyAnalysisButtonGameOverModal();
            appendThirdPartyAnalysisButtons();
            unmaskChessigmaCoachComments();
        }, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
main();