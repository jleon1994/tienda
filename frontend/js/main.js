// main.js

// Función para manejar el formulario de registro
async function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await axios.post('/api/auth/register', { name, email, password });
        alert('Usuario registrado exitosamente');
    } catch (error) {
        alert('Error en el registro');
    }
}

// Función para manejar el formulario de inicio de sesión
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await axios.post('/api/auth/login', { email, password });
        alert('Inicio de sesión exitoso');
        // Aquí puedes redirigir a una página de inicio
    } catch (error) {
        alert('Error en el inicio de sesión');
    }
}

// Asignar eventos a los formularios si existen en la página
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) registerForm.addEventListener('submit', handleRegister);
    if (loginForm) loginForm.addEventListener('submit', handleLogin);
});




