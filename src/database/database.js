import { openDatabase } from "expo-sqlite"

const db = openDatabase("database.db")

const createUserQuery = `
    CREATE TABLE IF NOT EXISTS user
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      password TEXT
    );
`

const createProductQuery = `
    CREATE TABLE IF NOT EXISTS product
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_type TEXT,
      product TEXT,
      value INTEGER
    );
`

db.transaction((tx) => {
  tx.executeSql(createUserQuery)
})

db.transaction((tx) => {
  tx.executeSql(createProductQuery)
}
)

const getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM product",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
}

const getProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM product WHERE id = ?",
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

const insertProduct = (product_type, product, value) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO product (product_type, product, value) VALUES (?, ?, ?)",
        [product_type, product, value],
        (_, { insertId, rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

const deleteProduct = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM product WHERE id = ?",
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

const updateProduct = (product_type, product, value, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE product SET product_type = ?, product = ?, value = ? WHERE id = ?",
        [product_type, product, value, id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user",
        [],
        (_, { rows: { _array } }) => resolve(_array),
        (_, error) => reject(error)
      );
    });
  });
};

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user WHERE id = ?",
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const insertUser = (name, password) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (name, password) VALUES (?, ?)",
        [name, password],
        (_, { insertId, rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM user WHERE id = ?",
        [id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};

const updateUser = (name, password, id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE user SET name = ?, password = ? WHERE id = ?",
        [name, password, id],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
};


export {
  getAllUsers,
  getUser,
  insertUser,
  deleteUser,
  updateUser,
  
  getAllProducts,
  getProduct,
  insertProduct,
  deleteProduct,
  updateProduct
}