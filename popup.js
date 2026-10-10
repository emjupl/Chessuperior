function printSelectedRadioValue() {

    const selectedRadio = document.querySelector('input[name="website-for-analysis"]:checked');
    const selectedRadioValue = selectedRadio.value;

    const customDomainTextbox = document.getElementById('custom-domain-textbox');
    if (selectedRadioValue == 'custom-domain') {
        customDomainTextbox.removeAttribute('hidden');
        customDomainTextbox.style.display = 'block';
    } else {
        customDomainTextbox.setAttribute('hidden', '');
        customDomainTextbox.style.display = 'none';
    }
}

document.addEventListener('change', (e) => {
    printSelectedRadioValue();
});