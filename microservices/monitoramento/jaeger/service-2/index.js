const express = require('express');
const bodyParser = require('body-parser');
const { initTracer } = require('./tracer');
const { Tags, FORMAT_HTTP_HEADERS } = require('opentracing');

const tracer = initTracer('service-2');

const app = express();
app.use(bodyParser.json());

app.post('/posts', async (req, res) => {

  const parentSpanContext = tracer.extract(FORMAT_HTTP_HEADERS, req.headers);

  const span = tracer.startSpan("span-service-2", {
    childOf: parentSpanContext,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
      [Tags.HTTP_URL]: req.url,
      [Tags.HTTP_METHOD]: req.method
    }
  });

  try {
    const post = req.body;
    res.status(201).json({ id: 2, ...post });
  } finally {
    span.finish();
  }
});

app.listen(3001, () => console.log('Service 2 ouvindo na porta 3001'));
