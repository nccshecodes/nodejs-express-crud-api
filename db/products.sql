CREATE TABLE products(
  "ID" INTEGER PRIMARY KEY,
  "Title" TEXT,
  "Description" TEXT,
  "Price" REAL,
  "Created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
  "Updated_at" DATETIME DEFAULT CURRENT_TIMESTAMP
);
