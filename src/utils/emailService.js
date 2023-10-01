import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'Hotmail', // Puedes configurar esto según tu proveedor de correo
    auth: {
        user: 'wetunes.confirm@hotmail.com', // Tu dirección de correo
        pass: 'univalle123', // Tu contraseña
    },
});

async function sendConfirmationEmail(userEmail, userName) {
    const mailOptions = {
        from: 'wetunes.confirm@hotmail.com',
        to: userEmail,
        subject: 'Confirmación de Registro',
        html:
        `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Confirmación de Registro</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                h1 {
                    color: #333;
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                h2 {
                    color: #333;
                    font-size: 22px;
                    margin-bottom: 5px;
                }
                p {
                    color: #666;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #00C2FF;
                    color: #ffffff !important;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .button:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Hola ${userName},</h1>
                <h2>Bienvenido/a a <span style='color: #00C2FF'>We</span>Tunes</h2>
                <p>Gracias por registrarte en nuestra plataforma. Tu cuenta ha sido creada exitosamente.</p>
                <p>Puedes comenzar a disfrutar de todos nuestros servicios y funcionalidades.</p>
                <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
                <p>¡Esperamos que tengas una gran experiencia con nosotros!</p>
                <p>
                    <a href="https://wetunes.vercel.app/" class="button">Iniciar sesión</a>
                </p>
            </div>
        </body>
        </html>`

    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info.response;
    } catch (error) {
        throw error;
    }
}

export { sendConfirmationEmail };
