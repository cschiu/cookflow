import sqlite3 from 'sqlite3';

export class Database {
  private db: sqlite3.Database;

  constructor(databaseFile: string = 'cookflow.db') {
    this.db = new sqlite3.Database(databaseFile, (err) => {
      if (err) {
        console.error('Failed to connect to the database:', err.message);
      } else {
        console.log('Connected to the SQLite database.');
        this.createTable();
      }
    });
  }

  private createTable(): void {
    const createTable = `
      CREATE TABLE IF NOT EXISTS recipes (
        name TEXT UNIQUE NOT NULL PRIMARY KEY,
        rml TEXT NOT NULL
      );
    `;

    this.db.run(createTable, (err) => {
      if (err) {
        console.error('Failed to create table:', err.message);
      } else {
        console.log('Table "recipes" created or already exists.');
      }
    });
  }

  public addRecipe(name: string, rml: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO recipes (name, rml) VALUES (?, ?);`;
      this.db.run(query, [name, rml], (err) => {
        if (err) {
          reject(new Error(`Failed to add recipe: ${err.message}`));
        } else {
          resolve();
        }
      });
    });
  }

  public getRecipe(name: string): Promise<{ name: string; rml: string } | null> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM recipes WHERE name = ?;`;
      this.db.get(query, [name], (err, row: { name: string; rml: string } | undefined) => {
        if (err) {
          reject(new Error(`Failed to retrieve recipe: ${err.message}`));
        } else {
          resolve(row || null);
        }
      });
    });
  }

  public getAllRecipes(): Promise<{ name: string; rml: string }[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM recipes;`;
      this.db.all(query, (err, rows: { name: string; rml: string }[] | undefined) => {
        if (err) {
          reject(new Error(`Failed to retrieve recipes: ${err.message}`));
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  public getAllRecipeNames(): Promise<{ name: string }[]> {
    return new Promise((resolve, reject) => {
      const query = `SELECT name FROM recipes;`;
      this.db.all(query, (err, rows: { name: string }[] | undefined) => {
        if (err) {
          reject(new Error(`Failed to retrieve recipes: ${err.message}`));
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  public close(): void {
    this.db.close((err) => {
      if (err) {
        console.error('Failed to close the database:', err.message);
      } else {
        console.log('Database connection closed.');
      }
    });
  }
}