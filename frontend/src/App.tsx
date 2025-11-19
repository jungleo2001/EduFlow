import React, { useState, useEffect } from 'react';

interface Submission {
  id: string;
  studentName: string;
  exercise: string;
  status: string;
  result?: any;
}

function App() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [studentName, setStudentName] = useState('');
  const [exercise, setExercise] = useState('');

  // Busca submissões periodicamente
  useEffect(() => {
    const fetchSubmissions = async () => {
      const response = await fetch('http://localhost:3001/api/submissions');
      const data = await response.json();
      setSubmissions(data);
    };

    fetchSubmissions();
    const interval = setInterval(fetchSubmissions, 2000);
    return () => clearInterval(interval);
  }, []);

  const submitExercise = async () => {
    await fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentName, exercise })
    });
    
    setStudentName('');
    setExercise('');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🏫 Painel do Professor - Corretor IA</h1>
      
      {/* Simula aluno enviando exercício */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc' }}>
        <h3>Simular Submissão de Aluno:</h3>
        <input
          placeholder="Nome do aluno"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        />
        <input
          placeholder="Exercício"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          style={{ margin: '5px', padding: '8px', width: '300px' }}
        />
        <button onClick={submitExercise} style={{ margin: '5px', padding: '8px 15px' }}>
          Enviar para Correção
        </button>
      </div>

      {/* Lista de submissões */}
      <div>
        <h3>📋 Submissões dos Alunos:</h3>
        {submissions.map(sub => (
          <div key={sub.id} style={{
            margin: '10px 0',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            backgroundColor: getStatusColor(sub.status)
          }}>
            <strong>{sub.studentName}</strong> - {sub.exercise}
            <br />
            Status: <strong>{sub.status}</strong>
            {sub.result && (
              <div>
                Nota: <strong>{sub.result.score}</strong> - {sub.result.feedback}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'completed': return '#d4edda';
    case 'active': return '#fff3cd';
    case 'waiting': return '#d1ecf1';
    default: return '#f8f9fa';
  }
}

export default App;
