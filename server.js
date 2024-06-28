const express = require('express');        // Importa o módulo Express para criar o servidor.
const sqlite3 = require('sqlite3').verbose(); // Importa o módulo SQLite3 e ativa o modo verbose para mais informações.
const app = express();                    // Cria uma instância do servidor Express.
const port = 3000;                        // Define a porta em que o servidor vai escutar.

// Configuração do banco de dados SQLite
const db = new sqlite3.Database('aplicacao.db'); // Cria um banco de dados na memória. ':memory:' significa que o DB é temporário.

// Cria uma tabela de exemplo
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, name TEXT)"); // Cria uma tabela 'users' com colunas 'id' e 'name'.

    // Insere dados de exemplo na tabela
    const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");
    stmt.run(1, "Alice");
    stmt.run(2, "Bob");
    stmt.finalize();
});

// Rota para buscar todos os usuários
app.get('/users', (req, res) => {
    db.all("SELECT * FROM users", [], (err, rows) => { // Executa uma query para selecionar todos os dados da tabela 'users'.
        if (err) {
            res.status(500).send(err.message);  // Envia uma resposta de erro se ocorrer algum problema na query.
            return;
        }
        res.json(rows);  // Envia os dados como resposta em formato JSON.
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`); // Mensagem de confirmação que o servidor está rodando.
});
