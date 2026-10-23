
import { useState } from 'react';

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrar(e) {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.error || 'Erro ao cadastrar');
        return;
      }

      alert('Usuário cadastrado com sucesso!');

      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      alert('Erro ao conectar com o servidor');
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Cadastro de Usuário</h1>

      <form onSubmit={cadastrar}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
