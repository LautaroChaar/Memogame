import cors from 'cors';
import Express from 'express';
import { createServer } from 'http';
import { config } from './src/config/config.js';
import { routerAuth } from './src/Routes/auth.routes.js';
import { routerHome } from './src/Routes/home.routes.js';
import { routerScore } from './src/Routes/scores.routes.js';

const app = Express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: config.server.URL,
  optionsSuccessStatus: 200,
  methods: "GET, PUT, POST"
}));

app.use(Express.urlencoded({ extended: true}));
app.use(Express.json());
app.use(Express.static('public'));

app.use('/api/', routerAuth);
app.use('/api/', routerHome);
app.use('/api/', routerScore);

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchado en http://localhost:${PORT}}`);
})

server.on('error', err => console.log(`error en server ${err}`));
