const fastify = require("fastify")({ logger: true });
const sqlite3 = require("sqlite3").verbose();

fastify.register(require("fastify-cors"), {
  origin: "http://localhost",
});

fastify.get("/posts", async (request, reply) => {
  const posts = [
    { id: 1, title: "はじめての投稿", content: "これはサンプルです。" },
    { id: 2, title: "二つ目の投稿", content: "別のサンプルです。" },
  ];
  return posts;
});

const db = new sqlite3.Database("./database/test.db", (err) => {
  if (err) {
    fastify.log.error("SQLite接続エラー: " + err.message);
  } else {
    fastify.log.info("SQLiteデータベースに接続しました");
  }
});

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY,
      title TEXT,
      content TEXT,
      created_at TEXT
    )
  `,
    (err) => {
      if (err) {
        fastify.log.error("itemsテーブル作成エラー: " + err.message);
      } else {
        fastify.log.info("itemsテーブルが作成または既に存在します");
      }
    }
  );
});

fastify.get("/items", async (request, reply) => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM items ORDER BY created_at ASC", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
});

fastify.post("/items", async (request, reply) => {
  const { title, content } = request.body;

  return new Promise((resolve, reject) => {
    db.all("SELECT id FROM items ORDER BY id ASC", [], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        let newId = 1;
        for (const row of rows) {
          if (row.id === newId) {
            newId++;
          } else if (row.id > newId) {
            break;
          }
        }
        const createdAt = new Date().toISOString();

        const query = `
          INSERT INTO items (id, title, content, created_at)
          VALUES (?, ?, ?, ?)
        `;
        db.run(query, [newId, title, content, createdAt], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: newId, title, content, created_at: createdAt });
          }
        });
      }
    });
  });
});

fastify.delete("/items/:id", async (request, reply) => {
  const { id } = request.params;

  return new Promise((resolve, reject) => {
    const query = "DELETE FROM items WHERE id = ?";
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes > 0) {
          resolve({ success: true, deletedId: id });
        } else {
          resolve({
            success: false,
            message: "指定された ID のアイテムが存在しません",
          });
        }
      }
    });
  });
});

// WebSocket の登録
fastify.register(require("fastify-websocket"));

const clients = new Set();

fastify.get("/chat", { websocket: true }, (connection, req) => {
  console.log("WebSocket接続（/chat）が確立しました");

  clients.add(connection.socket);

  connection.socket.on("close", () => {
    clients.delete(connection.socket);
  });

  connection.socket.on("message", (message) => {
    console.log(`受信メッセージ: ${message}`);
    for (const client of clients) {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    }
  });
});

fastify.listen(5000, "0.0.0.0", (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is listening on ${address}`);
});
