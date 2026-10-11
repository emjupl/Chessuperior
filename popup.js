async function getPayload() {
    const result = await chrome.storage.local.get("payload");
    return result.payload || {};
}

// Funkcja wczytująca dane przy otwarciu popupu
async function init() {
    const payloadData = await getPayload();
    const customDomainTextbox = document.getElementById('custom-domain-textbox');
    const alertSpan = document.getElementById('alertSpan');

    if (payloadData && payloadData.customGameUrl) {
        customDomainTextbox.value = payloadData.customGameUrl;
        if (alertSpan) {
            alertSpan.textContent = payloadData.customGameUrl;
        }
    }
}

// Uruchomienie odczytu przy starcie popupu
document.addEventListener('DOMContentLoaded', init);

// Nasłuchiwanie zmian podczas pisania i natychmiastowy zapis
document.addEventListener('input', async (e) => {
    if (e.target && e.target.id === 'custom-domain-textbox') {
        const alertSpan = document.getElementById('alertSpan');
        const urlValue = e.target.value;

        if (alertSpan) {
            alertSpan.textContent = urlValue;
        }

        const payload = {
            "customGameUrl": urlValue,
        };

        await chrome.storage.local.set({ payload: payload });
    }
});