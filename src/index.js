require('dotenv/config');
const path = require('path');
const getLinkB3 = require('./services/getLinkB3');
const getLinkBase = require('./services/getLinkBase');
const postSource = require('./services/postSource');
const notImplemented = require('./middlewares/notImplemented');
const errorHandler = require('./middlewares/errorHandler');
const express = require('express');
const cors = require('cors');

const urlB3 = process.env.URL_SOURCE;
const urlBase = process.env.URL_BASE_DADOS;
const hashPost = process.env.HASH_ATT;
const port = process.env.PORT || 3002;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_req, res, _next) => {
  return res.sendFile(__dirname + '/views/index.html');
});

app.get('/check', async (_req, res, next) => {
  try {
    let message = 'Base already updated!';
    let srcOld;
    let response;

    const [sourceBase, sourceB3] = await Promise.all([
      getLinkBase(`${urlBase}/source`),
      getLinkB3(urlB3),
    ]);

    if (!sourceB3 || !sourceB3.src)
      return next({
        status: 404,
        message: 'Não foi possível encontrar o link.',
      });

    if (sourceBase.src !== sourceB3.src) {
      message = 'Base needs to be updated!!!!';
      console.log(message);
      response = (await postSource(`${urlBase}/data`, sourceB3, hashPost)).data;
      console.log(
        'Post enviado com o body:: ',
        sourceB3,
        new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      );
      message = 'The base has been updated successfully!!!';
      srcOld = sourceBase.src;
    } else {
      console.log(message);
    }
    console.log(
      'Fim da checagem',
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
    );
    return res.status(200).send({
      message,
      srcOld,
      src: sourceB3.src,
      response,
    });
  } catch (error) {
    console.log(error.message);
    return next({ message: error.message });
  }
});

app.use(notImplemented);
app.use(errorHandler);

app.listen(port, () => console.log('Server ON na porta :: %s ::', port));
