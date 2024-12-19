// Fetch Works
async function fetchWorks() {
    const response = await fetch('http://localhost:5678/api/works');
    return await response.json();
}

// Fetch Categories
async function fetchCategory () {
    const response = await fetch('http://localhost:5678/api/categories');
    return await response.json();
}

// Fetch Envoie des nouveaux travaux
async function fetchSend(userToken, formData) {
    return fetch('http://localhost:5678/api/works', {
      
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${userToken}`
        },
        body: formData
    });
}