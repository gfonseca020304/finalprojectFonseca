import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('chatApp.db')

db.transaction(tx => {
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS participant (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      password TEXT,
      profilePicture TEXT
    );`
  );
});

export default db
