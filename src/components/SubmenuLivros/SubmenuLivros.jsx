import React from 'react';
import { Link } from 'react-router-dom';
import "./index.scss";

function SubmenuLivros() {
  return (
    <div className='submenu'>        
        <ul>
            <li><Link to="/livros/cadastro">te Livro</Link></li>
        </ul>        
    </div>
  )
}

export default SubmenuLivros
