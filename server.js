require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const authController = require('./src/controllers/authController');

const PORT = process.env.PORT || 3000;
const app = require('./src/app');

app.use(helmet());

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        next();
    });
}

app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const productosRoutes = require('./src/routes/productosRoutes');
const personalRoutes = require('./src/routes/personalRoutes');
const mesasRoutes = require('./src/routes/mesasRoutes');

app.use('/auth', authRoutes);
app.use('/productos', authController.authenticateToken, productosRoutes);
app.use('/personal', authController.authenticateToken, personalRoutes);
app.use('/mesas', authController.authenticateToken, mesasRoutes);

app.get('/', authController.authenticateToken, (req, res) => {
    res.render('index', { user: req.user });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
