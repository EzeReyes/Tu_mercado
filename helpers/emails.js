const nodemailer = require ('nodemailer');
const dotenv = require ('dotenv');
dotenv.config();

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos

      // Verificar que la dirección de correo electrónico no esté vacía
        if (!email) {
        throw new Error('No recipients defined');
    }

    // Enviar el email
    await transport.sendMail({
        from: 'Tu_Mercado.com',
        to: email,
        subject:'Confirma tu Cuenta en Tu_Mercado.com',
        text:'Confirma tu Cuenta en Tu_Mercado.com',
        html: `
            <p>Hola ${nombre}, comprueba tu cuenta en Tu_Mercado.com</p>
            
            <p>Tu cuenta ya está lista, solo debés  confirmarla en el siguiente enlace:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT || 3000}/auth/confirmar/${token}">Confirmar cuenta</a> </p>
            
            <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
        `
    })
}

const emailOlvidePassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const { email, nombre, token } = datos

      // Verificar que la dirección de correo electrónico no esté vacía
        if (!email) {
        throw new Error('No recipients defined');
    }

    // Enviar el email
    await transport.sendMail({
        from: 'Tu_Mercado.com',
        to: email,
        subject:'Restablece tu Password en Tu_Mercado.com',
        text:'Restablece tu Password en Tu_Mercado.com',
        html: `
            <p>Hola ${nombre}, haz solicitado reestablecer tu Password a Tu_Mercado.com</p>
            
            <p>Sigue el siguiente enlace para generar un nuevo password:
            <a href="${process.env.BACKEND_URL}:${process.env.PORT || 3000}/auth/olvide-password/${token}">Reestablcer Password</a> </p>
            
            <p>Si tu no solicitaste el cambio de Password, puedes ignorar el mensaje</p>
        `
    })
}

module.exports = {
    emailRegistro,
    emailOlvidePassword
};