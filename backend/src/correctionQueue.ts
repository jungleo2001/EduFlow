import Queue from 'bull';

export const correctionQueue = new Queue('corrections', {
  redis: { host: 'localhost', port: 6379 }
});

// Worker que simula correção
correctionQueue.process('correct-exercise', async (job) => {
  console.log(`📝 Corrigindo: ${job.data.studentName} - ${job.data.exercise}`);
  
  // Simula processamento
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const score = Math.floor(Math.random() * 100);
  const feedback = score >= 70 ? '✅ Aprovado' : '❌ Precisa estudar mais';
  
  return {
    score,
    feedback,
    correctedAt: new Date()
  };
});
