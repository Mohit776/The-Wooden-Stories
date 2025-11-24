// Auto-generated schema.js from SQL dumps

export const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  price decimal(10,2) NOT NULL,
  images json DEFAULT NULL,
  category varchar(100) NOT NULL,
  stock_quantity int NOT NULL,
  description text,
  created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

export const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
  id varchar(20) NOT NULL,
  customer varchar(255) NOT NULL,
  amount decimal(10,2) NOT NULL,
  status varchar(50) DEFAULT 'Pending',
  date date DEFAULT (curdate()),
  phone bigint DEFAULT NULL,
  customer_phone varchar(20) DEFAULT NULL,
  customer_email varchar(255) DEFAULT NULL,
  address text,
  items text,
  payment_id varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

export const createCustomersTable = `
CREATE TABLE IF NOT EXISTS customers (
  name varchar(100) NOT NULL,
  phone bigint NOT NULL,
  addresses json DEFAULT NULL,
  email varchar(150) DEFAULT NULL,
  PRIMARY KEY (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

export default {
  createProductsTable,
  createOrdersTable,
  createCustomersTable,
};
