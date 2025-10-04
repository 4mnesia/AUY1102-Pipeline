/*
const username = "admin'; DROP TABLE Users; --";
const queryString = `SELECT * FROM Users WHERE username='${username}'`;

// XSS

const userInput = '<script>alert("XSS");</script>';
const html = `<div>${userInput}</div>`;

// CSRF

app.post('/change-password', (req, res) => {
  const newPassword = req.body.newPassword;
  // Cambiar la contraseña sin verificar el token CSRF
});

// Deserialización

/*
FRAGMENTO VULNERABLE ORIGINAL (conservado como comentario para capturas):

const username = "admin'; DROP TABLE Users; --";
const queryString = `SELECT * FROM Users WHERE username='${username}'`;

// XSS (Cross-Site Scripting)

const userInput = '<script>alert("XSS");</script>';
const html = `<div>${userInput}</div>`;

// CSRF

app.post('/change-password', (req, res) => {
  const newPassword = req.body.newPassword;
  // Cambiar la contraseña sin verificar el token CSRF
});

// Deserialización insegura

const data = JSON.parse(req.body);

// Credenciales en claro

const dbPassword = 'password123';
// const apiSecretKey = 'supersecretkey123'; // No usar en producción
const config = {
  dbUsername: 'admin',
  dbPassword: 'password123',
  apiKey: 'abc123',
};

const hashedPassword = hash('password123');

console.log(`Error: La contraseña ${dbPassword} no es válida`);

*/

// REMEDIACIÓN: patrones más seguros y sin secretos en el código
// @ts-nocheck
// Ejemplo de uso de consultas parametrizadas en lugar de concatenación para evitar inyección SQL
const exampleUsername = "someUser";
const queryString = {
  text: 'SELECT * FROM Users WHERE username = $1',
  values: [exampleUsername],
};

// XSS: escapar el input del usuario antes de inyectarlo en HTML
const userInput = '<script>alert("XSS");</script>';
const escapedHtml = `<div>${String(userInput).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>`;

// CSRF: validación (ejemplo, reemplazar por implementación real)
function validateCsrfToken(token) {
  return Boolean(token);
}

function hash(input) {
  // función hash de ejemplo (placeholder)
  return input ? `hashed:${input}` : null;
}

// Handler de ejemplo
function changePasswordHandler(req, res) {
  const csrfToken = (req && req.headers && req.headers['x-csrf-token']) || (req && req.body && req.body._csrf);
  if (!validateCsrfToken(csrfToken)) {
    if (res && typeof res.status === 'function') res.status(403).send('Token CSRF inválido');
    return;
  }
  const newPassword = req && req.body && req.body.newPassword;
  // Proceder a cambiar la contraseña de forma segura (hash, validaciones)
}

// Deserialización segura: validar antes de parsear
let data = null;
try {
  // reqBody debe ser proporcionado por el llamador; placeholder de parseo seguro
  const reqBody = typeof globalThis !== 'undefined' && (globalThis.reqBody || null);
  if (typeof reqBody === 'string') {
    data = JSON.parse(reqBody);
  }
} catch (err) {
  data = null;
}

// Credenciales: nunca hardcodear secretos en el código. Usar variables de entorno.
// Opción 1 (fail-fast): exigir que DB_USERNAME y DB_PASSWORD estén definidas.
const dbUsername = typeof process !== 'undefined' ? process.env.DB_USERNAME : undefined;
const dbPassword = typeof process !== 'undefined' ? process.env.DB_PASSWORD : undefined;
const apiKey = typeof process !== 'undefined' ? (process.env.API_KEY || '') : '';

if (!dbUsername || !dbPassword) {
  throw new Error('DB_USERNAME y DB_PASSWORD deben estar definidas en las variables de entorno');
}

const config = { dbUsername, dbPassword, apiKey };

// Evitar mostrar secretos en logs
function safeLog(msg) {
  console.log(msg);
}

// Ejemplo de uso de hash (placeholder)
const hashedPassword = hash(config.dbPassword);

safeLog('Verificación de contraseña realizada');
