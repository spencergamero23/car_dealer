import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './src/controllers/routes.js';
import { setupDatabase, testConnection } from './src/models/setup.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/', routes);

const PORT = 3000;

app.listen(PORT, async()=> {
    await setupDatabase();
    await testConnection();
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
