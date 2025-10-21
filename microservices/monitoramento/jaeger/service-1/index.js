const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { initTracer } = require('./tracer');
const {Tags, FORMAT_HTTP_HEADERS} = require('opentracing');

const tracer = initTracer('service-1');

const app = express();
app.use(bodyParser.json());

const SERVICE_2_URL = 'http://localhost:3001';
const service2 = axios.create({ baseURL: SERVICE_2_URL });

app.post('/posts', async (req, res) => {
  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);

  const span = tracer.startSpan("span-service-1", {
    childOf: parentSpanContext,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
      [Tags.HTTP_URL]: req.url,
      [Tags.HTTP_METHOD]: req.method
    }
  });

  try {
    const headers = {};
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);

    const response = await service2.post('/posts', req.body, { headers });

    res.status(response.status).json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Erro ao enviar para o Service 2' });
  } finally {
    span.finish();
  }
});

app.listen(3000, () => console.log('Service 1 ouvindo na porta 3000'));
