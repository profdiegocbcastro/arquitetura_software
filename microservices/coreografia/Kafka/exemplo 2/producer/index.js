const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function run() {
  try {
    console.log('🚀 Conectando ao Kafka...');
    await producer.connect();

    const data = {
      name: 'Diego',
      timestamp: new Date().toISOString(),
    };

    console.log('📤 Enviando mensagem para o tópico "my-topic"...');
    await producer.send({
      topic: 'my-topic',
      messages: [
        {
          key: 'user-event',
          value: JSON.stringify(data),
        },
      ],
    });

    console.log('Mensagem enviada com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
  } finally {
    await producer.disconnect();
    console.log('Produtor desconectado.');
  }
}

run();
