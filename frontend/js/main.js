// Registro 

document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/auth/register', { name, email, password });
        alert('Usuario registrado exitosamente');
        window.location.href = 'login.html';
    } catch (error) {
        alert('Error en el registro');
    }
});


//Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // Guardar token y datos del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirigir a la página de perfil
            window.location.href = 'profile.html';
        } else {
            alert(data.msg || 'Error al iniciar sesión');
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Error en el servidor');
    }
});

