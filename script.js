document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const noteSection = document.getElementById('noteSection');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const noteInput = document.getElementById('noteInput');
    const saveButton = document.getElementById('saveButton');
    const output = document.getElementById('output');

    loginButton.addEventListener('click', function() {
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        if (username === '' || password === '') {
            alert('Please enter both username and password.');
            return;
        }

        if (username === 'user' && password === 'password') {
            sessionStorage.setItem('loggedIn', 'true');
            loginForm.style.display = 'none';
            noteSection.style.display = 'block';
            displayNotes();
        } else {
            alert('Invalid username or password.');
        }
    });

    logoutButton.addEventListener('click', function() {
        sessionStorage.removeItem('loggedIn');
        noteSection.style.display = 'none';
        loginForm.style.display = 'block';
    });

    saveButton.addEventListener('click', function() {
        const currentDate = new Date();
        const note = noteInput.value.trim() + ' ' + currentDate.toLocaleDateString() + ' ' + currentDate.toLocaleTimeString();

        
        if (note !== '') {
            saveNoteToLocalStorage(note);
            displayNotes();
            noteInput.value = '';
        } else {
            alert('Please enter a note.');
        }
    });

    function saveNoteToLocalStorage(note) {
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));
    }

    function displayNotes() {
        output.innerHTML = '';
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.forEach(function(note, index) {
            output.innerHTML += `<p><strong>Note ${index + 1}:</strong> ${note}</p>`;
        });
    }

    // Check if user is already logged in
    if (sessionStorage.getItem('loggedIn') === 'true') {
        loginForm.style.display = 'none';
        noteSection.style.display = 'block';
        displayNotes();
    }
});
