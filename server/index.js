import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 3000;

app.set('port', port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
routes(router);

app.use('/api/v1', router);
app.use('*', (req, res) => res.send('Hello World!'));

app.listen(port);
