const express = require('express');
const Queue = require('bull');

const app = express();
app.use(express.json());

// HABILITA CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Configura a fila
const correctionQueue = new Queue('corrections', {
  redis: { host: 'localhost', port: 6379 }
});

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Backend funcionando!', timestamp: new Date() });
});

// Rota para ver submissões
app.get('/api/submissions', async (req, res) => {
  try {
    const jobs = await correctionQueue.getJobs(['waiting', 'active', 'completed']);
    
    const submissions = await Promise.all(
      jobs.map(async (job) => ({
        id: job.id,
        studentName: job.data.studentName,
        exercise: job.data.exercise,
        status: await job.getState(),
        result: job.returnvalue
      }))
    );

    res.json(submissions);
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

// Rota para submeter exercício
app.post('/api/submit', async (req, res) => {
  try {
    const { studentName, exercise } = req.body;
    
    const job = await correctionQueue.add('correct-exercise', {
      studentName,
      exercise,
      submittedAt: new Date()
    });

    res.json({ 
      jobId: job.id, 
      status: 'em_correcao',
      message: 'Exercício na fila de correção'
    });
  } catch (error) {
    console.log('Erro:', error);
    res.status(500).json({ error: 'Erro ao submeter' });
  }
});

// Worker que processa as correções
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

app.listen(3001, () => {
  console.log('🚀 Backend rodando na porta 3001');
  console.log('📡 Teste: http://localhost:3001/api/test');
});
