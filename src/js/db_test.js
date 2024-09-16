(async function() {
    const { text } = await( await fetch(`/api/functions/message`)).json();
    document.querySelector('#name').textContent = text;
}());