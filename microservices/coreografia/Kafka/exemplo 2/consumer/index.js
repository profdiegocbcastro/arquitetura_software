const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'group-my-topic' });

async function run() {
  try {
    console.log('Conectando ao Kafka...');
    await consumer.connect();

    await consumer.subscribe({
      topic: 'my-topic',
      fromBeginning: true,
    });

    console.log('👂 Aguardando mensagens no tópico "my-topic"...');

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const rawValue = message.value.toString();
          const parsed = JSON.parse(rawValue);

          console.log('Nova mensagem recebida:');
          console.log(`Tópico: ${topic}`);
          console.log(`Partição: ${partition}`);
          console.log('Conteúdo:', parsed);
        } catch {
          console.warn('Mensagem inválida (não é JSON válido).');
        }
      },
    });
  } catch (error) {
    console.error('Erro no consumidor:', error);
  }
}

run();
