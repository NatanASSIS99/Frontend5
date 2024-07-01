import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: '',
    link: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLivro({ ...livro, [name]: value });
  };

  const createLivro = async () => {
    try {
      const body = {
        id: Number(livro.id),
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora,
        link: livro.link
      };

      // Validar se todos os campos obrigatórios foram preenchidos
      if (!livro.id || !livro.titulo || !livro.num_paginas || !livro.isbn || !livro.editora || !livro.link) {
        setErrorMessage('Todos os campos são obrigatórios.');
        return;
      }
      
      await LivrosService.createLivro(body);
      alert('Livro cadastrado com sucesso!');
      setLivro({
        id: '',
        titulo: '',
        num_paginas: '',
        isbn: '',
        editora: '',
        link: ''
      }); // Limpa os campos após o cadastro
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      setErrorMessage('Erro ao cadastrar livro. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <Header />    
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>          
          <form>
            <div className='form-group'>
              <label>Id</label>
              <input type="text" name='id' value={livro.id} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" name='titulo' value={livro.titulo} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" name='num_paginas' value={livro.num_paginas} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" name='isbn' value={livro.isbn} onChange={handleInputChange} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" name='editora' value={livro.editora} onChange={handleInputChange} />
            </div> 
            <div className='form-group'>
              <label>Link</label>
              <input type="text" name='link' value={livro.link} onChange={handleInputChange} />
            </div> 
            <div className='form-group'>
              <button type="button" onClick={createLivro}>Cadastrar Livro</button>  
            </div>         
          </form>
        </div>
      </div>
    </>
  );
}

export default LivrosCadastro;
