// components/LivrosCadastro.js

import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import "./index.scss";
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros';
import { LivrosService } from '../../api/LivrosService';

const LivrosCadastro = () => {
  
  const [livro, setLivro] = useState({
    id: '',
    titulo: '',
    num_paginas: '',
    isbn: '',
    editora: '',
    link: '' // Adicione o estado para o link do livro
  });
  const [errorMessage, setErrorMessage] = useState('');

  async function createLivro() {
    try {
      const body = {
        id: Number(livro.id),
        titulo: livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora,
        link: livro.link // Inclua o link no corpo da requisição
      };

      // Validar se todos os campos obrigatórios foram preenchidos
      if (!livro.id || !livro.titulo || !livro.num_paginas || !livro.isbn || !livro.editora || !livro.link) {
        setErrorMessage('Todos os campos são obrigatórios.');
        return;
      }
      
      await LivrosService.createLivro(body);
      alert('Livro cadastrado com sucesso!');
      document.getElementById('formulario').reset();
      setErrorMessage('');
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      setErrorMessage('Erro ao cadastrar livro. Tente novamente mais tarde.');
    }
  }

  return (
    <>
      <Header />    
      <div className='livrosCadastro'>
        <h1>Cadastro de Livros</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>          
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" id='id' required onChange={(event) => { setLivro({ ...livro, id: event.target.value })}} />
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" id='titulo' required onChange={(event) => { setLivro({ ...livro, titulo: event.target.value })}} />
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text" id='num' required onChange={(event) => { setLivro({ ...livro, num_paginas: event.target.value })}} />
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text" id='isbn' required onChange={(event) => { setLivro({ ...livro, isbn: event.target.value })}} />
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text" id='editora' required onChange={(event) => { setLivro({ ...livro, editora: event.target.value })}} />
            </div> 
            <div className='form-group'>
              <label>Link</label>
              <input type="text" id='link' required onChange={(event) => { setLivro({ ...livro, link: event.target.value })}} />
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
