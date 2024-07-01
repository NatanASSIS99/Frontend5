import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import './index.scss';
import { useParams } from 'react-router-dom';
import { LivrosService } from '../../api/LivrosService';

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function getLivro() {
    try {
      const { data } = await LivrosService.getLivro(livroId);
      setLivro(data);
    } catch (err) {
      console.error('Erro ao obter livro:', err);
      setError('Erro ao obter livro');
    }
  }

  async function editLivro(e) {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    const body = {
      id: Number(livro.id),
      titulo: livro.titulo,
      num_paginas: Number(livro.num_paginas),
      isbn: livro.isbn,
      editora: livro.editora
    };

    if (
      livro.id !== undefined && livro.id !== '' &&
      livro.titulo !== undefined && livro.titulo !== '' &&
      livro.num_paginas !== undefined && livro.num_paginas !== '' &&
      livro.isbn !== undefined && livro.isbn !== '' &&
      livro.editora !== undefined && livro.editora !== ''
    ) {
      try {
        const response = await LivrosService.updateLivro(Number(livro.id), body);
        if (response && response.data) {
          console.log('Resposta da atualização:', response.data);
          setMessage(response.data.mensagem || 'Livro atualizado com sucesso');
          setError(''); // Limpa qualquer mensagem de erro anterior
        } else {
          console.error('Resposta de atualização inválida:', response);
          setError('Erro ao atualizar livro');
          setMessage(''); // Limpa qualquer mensagem de sucesso anterior
        }
      } catch (err) {
        console.error('Erro ao atualizar livro:', err);
        setError('Erro ao atualizar livro');
        setMessage(''); // Limpa qualquer mensagem de sucesso anterior
      }
    } else {
      setError('Todos os campos são obrigatórios');
      setMessage('');
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario" onSubmit={editLivro}>
            <div className='form-group'>
              <label>Id</label>
              <input
                type="text"
                disabled
                required
                onChange={(event) => { setLivro({ ...livro, id: event.target.value }); }}
                value={livro.id || ''}
              />
            </div>
            <div className='form-group'>
              <label>Título</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, titulo: event.target.value }); }}
                value={livro.titulo || ''}
              />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value }); }}
                value={livro.num_paginas || ''}
              />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, isbn: event.target.value }); }}
                value={livro.isbn || ''}
              />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => { setLivro({ ...livro, editora: event.target.value }); }}
                value={livro.editora || ''}
              />
            </div>
            <div className='form-group'>
              <button type="submit">Atualizar Livro</button>
            </div>
          </form>
          {message && <p className="success-message">{message}</p>}
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default LivrosEdicao;
