import sqlite3 from "sqlite3";
import {open} from "sqlite"; 

async function criarPopularTabelaUsuarios(){ /*Esta função abre a conexão com o banco de dados. Param await força todos os scripts subsequentes a esperarem um retorno válido dessa função */
    const db = await open({
        filename: './aplicacao.db',
        driver: sqlite3.Database, 
    });  

    db.run('CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT, senha TEXT, data_cadastro TIMESTAMP)')

    db.run('INSERT INTO usuarios (nome, senha, data_cadastro) values( (? , ? , ?)'[
        nome = document.getElementById("formLoginFieldUsername"),
        senha = document.getElementById("formLoginFieldInputPassword"),
        data_cadastro = Date()
    ])
}

criarPopularTabelaUsuarios();