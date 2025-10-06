// CÓDIGO VULNERABLE ORIGINAL (conservado como comentario para documentación / capturas)
/*
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  const input = req.body.username;
  const template = `
doctype
html
head
    title= 'Hola mundo'
body
    form(action='/' method='post')
        input#username.form-control(type='text' name='username' value='${input}')
        button.btn.btn-primary(type='submit') Enviar
    p Hola ${input}`;
  const fn = pug.compile(template);
  const html = fn();
  res.send(html);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
*/

// REMEDIACIÓN: Manejo seguro del input de usuario para plantillas
// - Comentario: La versión anterior insertaba el input del usuario directamente en la plantilla Pug
//   usando interpolación de strings (`${input}`), lo que permite inyección de plantillas y XSS.
// - Cambio: Pasamos el valor como variable al template Pug (#{username}), Pug hará el escape
//   adecuado y evita que contenido malicioso se ejecute en el navegador.

// @ts-nocheck
const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req, res) => {
  // Tratamos el input como dato, no como código del template.
  const input = req.body && req.body.username ? String(req.body.username) : '';
  // Plantilla que usa interpolación segura de Pug (#{username}).
  const template = `
doctype
html
head
  title Hola mundo
body
  form(action='/' method='post')
    input#username.form-control(type='text' name='username' value='#{username}')
    button.btn.btn-primary(type='submit') Enviar
  p Hola #{username}
`;
  const fn = pug.compile(template);
  const html = fn({ username: input });
  res.send(html);
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
