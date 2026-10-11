
let cachedPayload = {};

async function initPayload() {
    const result = await chrome.storage.local.get("payload");
    if (result.payload) {
        cachedPayload = result.payload;
    }
}
initPayload();

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

        if (!gameOverWindowButtonsContainer) { return; }

        const customDomain = cachedPayload.customGameUrl;
        if (!customDomain) { return; }

        if (!document.getElementById("chessuperior-third-party-analysis-button-game-over")) {
            const chesscomGameUrl = window.location.href;
            const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", customDomain);

            const chessuperiorGameOverContainer = document.createElement("div");
            chessuperiorGameOverContainer.className = "chessuperior-box";
            gameOverWindowButtonsContainer.appendChild(chessuperiorGameOverContainer);

            const text = createText("Zewnetrzna analiza jest dostepna!");
            chessuperiorGameOverContainer.appendChild(text);

            const btn = createThirdPartyAnalysisButtonGameOverModal(chessigmaGameUrl);
            chessuperiorGameOverContainer.appendChild(btn);

        } else {
            const chesscomGameUrl = window.location.href;
            const chessigmaGameUrl = chesscomGameUrl.replace("chess.com", customDomain);

            const thirdPartyAnalysisButtonGameOver = document.getElementById('chessuperior-third-party-analysis-button-game-over');
            if (thirdPartyAnalysisButtonGameOver) {
                thirdPartyAnalysisButtonGameOver.href = chessigmaGameUrl;
            }
        }
    }
}

function appendThirdPartyAnalysisButtons() {
    if (window.location.hostname.includes("chess.com") && (window.location.pathname.includes("/member") || window.location.pathname.includes("/home") || window.location.pathname.includes("/games"))) {
        const customDomain = cachedPayload.customGameUrl;
        if (!customDomain) { return; }

        const chesscomGameAccuracyContainer = document.querySelectorAll(".game-accuracy-component");
        chesscomGameAccuracyContainer.forEach(element => {
            if (!element.classList.contains("analysis-buttons-container")) {
                element.classList.add("analysis-buttons-container");
                const chesscomAnalysisButton = element.querySelector('.game-accuracy-review-button');
                if (chesscomAnalysisButton) {
                    const chesscomAnalysisUrl = chesscomAnalysisButton.href;
                    const chessigmaAnalysisUrl = chesscomAnalysisUrl.replace("chess.com", customDomain);
                    const btn = createThirdPartyAnalysisButtons(chessigmaAnalysisUrl);
                    element.appendChild(btn);
                }
            }
        });
    }
}

function main() {
    appendThirdPartyAnalysisButtonGameOverModal();
    appendThirdPartyAnalysisButtons();

    let observerTimeout;
    const observer = new MutationObserver(() => {
        clearTimeout(observerTimeout);
        observerTimeout = setTimeout(() => {
            appendThirdPartyAnalysisButtonGameOverModal();
            appendThirdPartyAnalysisButtons();
        }, 100);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

main();