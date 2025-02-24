require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SESSION_SECRET || 'secretKey',
    resave: false,
    saveUninitialized: true
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
app.use('/productos', productosRoutes);
app.use('/personal', personalRoutes);
app.use('/mesas', mesasRoutes);

app.get('/', (req, res) => {
    res.render('index', { user: req.session.user });
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
