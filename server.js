import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import routes from './src/controllers/routes.js';
import { setupDatabase, testConnection } from './src/models/setup.js';
import { addLocalVariables } from './src/middleware/global.js';
import flash from './src/middleware/flash.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const pgSession = connectPgSimple(session);

app.use(session({
    store: new pgSession({
        conObject: { connectionString: process.env.DB_URL },
        tableName: 'session',
        createTableIfMissing: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

app.use(addLocalVariables);
app.use(flash);

app.use('/', routes);

// 404 handler — runs when no route matched
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler — centralizes all error responses
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    console.error(err);

    const status = err.status || 500;
    const message = status === 404
        ? 'The page you are looking for does not exist.'
        : 'Something went wrong on our end. Please try again later.';

    try {
        res.status(status).render('errors/error', { title: `Error ${status}`, status, message });
    } catch (renderErr) {
        res.status(status).send(`<h1>${status}</h1><p>${message}</p>`);
    }
});

const PORT = 3000;

app.listen(PORT, async () => {
    await setupDatabase();
    await testConnection();
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});