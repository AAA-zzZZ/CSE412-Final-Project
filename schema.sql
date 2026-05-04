-- Optional cleanup for reruns
-- DELETE FROM Ratings;
-- DELETE FROM MerchProd;
-- DELETE FROM Product;
-- DELETE FROM Merchant;
-- DELETE FROM Users;
-- DELETE FROM Manufacturer;

-- database initialization: creation of tables
-- 1. Manufacturer Table
CREATE TABLE Manufacturer (
    manufid SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL 
);

-- 2. User Table
CREATE TABLE Users (
    userid SERIAL PRIMARY KEY, 
    username VARCHAR(100) NOT NULL, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL 
);

-- 3. Merchant Table
CREATE TABLE Merchant (
    merchantid SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    url VARCHAR(255) 
);

-- 4. Product Table
CREATE TABLE Product (
    productid SERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    category VARCHAR(100),
    description TEXT, 
    manufid INT NOT NULL, 
    FOREIGN KEY (manufid) REFERENCES Manufacturer(manufid) ON DELETE CASCADE 
);

-- 5. Ratings Table (Associative Entity)
CREATE TABLE Ratings (
    userid INT NOT NULL, 
    productid INT NOT NULL, 
    rating INT CHECK (rating >= 1 AND rating <= 5), 
    comment TEXT, 
    datereviewed DATE DEFAULT CURRENT_DATE, 
    PRIMARY KEY (userid, productid),
    FOREIGN KEY (userid) REFERENCES Users(userid) ON DELETE CASCADE, 
    FOREIGN KEY (productid) REFERENCES Product(productid) ON DELETE CASCADE 
);

-- 6. MerchProd Table (Associative Entity)
CREATE TABLE MerchProd (
    merchantid INT NOT NULL, 
    productid INT NOT NULL, 
    price DECIMAL(10, 2) NOT NULL, 
    promotion VARCHAR(255), 
    shipping DECIMAL(10, 2), 
    availability BOOLEAN DEFAULT TRUE, 
    PRIMARY KEY (merchantid, productid), 
    FOREIGN KEY (merchantid) REFERENCES Merchant(merchantid) ON DELETE CASCADE,
    FOREIGN KEY (productid) REFERENCES Product(productid) ON DELETE CASCADE
);


--initial setup: inserting initial records so the database is not empty

-- 1. Manufacturer
INSERT INTO Manufacturer (manufid, name) VALUES
(1, 'Logitech'),
(2, 'Lenovo'),
(3, 'A Random Clothes Manufacturer'),
(4, 'Pepsi'),
(5, 'Sony');


-- 2. Users
INSERT INTO Users (userid, username, email, password) VALUES
(1,  'iamuser1',      'blablabla@yahoo.com',      '12345678'),
(2,  'yourwifipassword',    'curve0077cast@gmail.com',   '87654321'),
(3,  'iamuser45',     'randomuser45@gmail.com',  'fdjsoiiudhf'),
(4,  'beefnoodlesoup',    'noodle@something.com',     'huowh#54789'),
(5,  'shepherdspie',    'yummy@something.com',    'dufisg@4huf6&48_'),
(6,  'mashedpotato',     'yukongoldpotato@something.com',      'idontrememBErmypassword123'),
(7,  'remix_ver',    'whousesoutlook@gmail.com',     'forgeTUsername?0090'),
(8,  'laysoriginalchips',      'lesssalt@gmail.com',       '25%offforbUndles'),
(9,  'rtx5080super',     'javagarbagecollection@outlook.com',      '***helloWorld***'),
(10, 'grilledcheese',    'tomatosoup@outlook.com',     'hdfjkshfdks$*bf0'),
(11, '3by3animalstyle',     'withgrilledonions@yahoo.com',      'Extrat0astedbuns1'),
(12, 'chicken',   'chickennoob567@yahoo.com',    'chicken1573Sandwich'),
(13, 'ninjaturtle',    'imattheclub@outlook.com',     'MultiplicationTable224');

-- 3. Merchant
INSERT INTO Merchant (merchantid, name, url) VALUES
(1, 'Amazon',        'https//amazon.test'),
(2, 'Target',    'https//target.test'),
(3, 'Walmart',        'https//walmart.test'),
(4, 'BestBuy',		'https//bestbuy.test'),
(5, 'microcenter',     'https//microcenter.test'),
(6, 'Costco',        'https//costco.test');


-- 4. Product
INSERT INTO Product (productid, name, category, description, manufid) VALUES
(1,  'Logitech MX Master 3S',         'Electronics', 'Wireless ergonomic mouse with programmable buttons and fast scrolling.', 1),
(2,  'Logitech G Pro X Headset',      'Electronics', 'Gaming headset with detachable microphone and surround sound support.', 1),
(3,  'Logitech C920 HD Pro Webcam',   'Electronics', 'Full HD webcam commonly used for video calls and streaming.', 1),

(4,  'Lenovo ThinkPad X1 Carbon',     'Electronics', 'Lightweight business laptop with strong battery life and durable build.', 2),
(5,  'Lenovo Legion 5 Laptop',        'Electronics', 'Performance laptop designed for gaming and demanding workloads.', 2),
(6,  'Lenovo Tab M10',                'Electronics', 'Android tablet suited for media, browsing, and casual productivity.', 2),

(7,  'Classic Cotton Hoodie',         'Clothing',    'Midweight pullover hoodie with front pocket and adjustable drawstring hood.', 3),
(8,  'Slim Fit Denim Jacket',         'Clothing',    'Casual denim jacket with button front and two chest pockets.', 3),
(9,  'Everyday Jogger Pants',         'Clothing',    'Soft jogger pants intended for casual wear and light exercise.', 3),

(10, 'Pepsi Cola 12-Pack',            'Beverages',   'Pack of twelve 12 oz cans of classic cola soft drink.', 4),
(11, 'Pepsi Zero Sugar 12-Pack',      'Beverages',   'Pack of twelve zero sugar cola cans.', 4),

(12, 'Sony WH-1000XM5',               'Electronics', 'Premium wireless noise-cancelling headphones with long battery life.', 5),
(13, 'Sony PlayStation 5 Controller', 'Electronics', 'Wireless DualSense controller for PlayStation 5.', 5),
(14, 'Sony SRS-XB100 Speaker',        'Electronics', 'Compact portable Bluetooth speaker with enhanced bass.', 5);

-- 5. Ratings
INSERT INTO Ratings (userid, productid, rating, comment, datereviewed) VALUES
(1,  1, 5, 'very comfortable mouse', '2026-03-05'),
(2,  4, 5, 'Ive been wanting to get a thinkpad for so long', '2026-03-06'),
(3, 12, 5, 'I need this level of noise canceling', '2026-03-07'),
(4, 10, 4, 'good as always', '2026-03-08'),
(5,  7, 3, 'this hoodie too big for me', '2026-03-09'),
(6,  3, 4, 'Image quality is good', '2026-03-10'),
(7, 13, 5, 'Nice controller, will buy more', '2026-03-11'),
(8,  5, 4, 'it can run minecraft, though it gets a little warm', '2026-03-12'),
(9, 11, 3, 'regular pepsi on top, i dont like diet or 0 sygar', '2026-03-13'),
(10, 8, 4, 'I look ugly in this', '2026-03-14'),
(11, 14, 4, 'I can bust music at 2am now', '2026-03-15'),
(12, 2, 4, 'Mic quality is clear and it is comfortable enough', '2026-03-16'),
(1, 13, 5, 'Sony you need to lower the price for ps5', '2026-03-17'),
(3,  1, 4, 'Good mouse', '2026-03-18'),
(6, 10, 5, 'I prefer pepsi more than coke', '2026-03-19');

-- 6. MerchProd
INSERT INTO MerchProd (merchantid, productid, price, promotion, shipping, availability) VALUES
-- Amazon
(1,  1,  99.99, '10% off with coupon', 0.00, TRUE),
(1,  3,  64.99, NULL,                  0.00, TRUE),
(1,  7,  39.99, 'Spring apparel sale', 4.99, TRUE),
(1, 10,   8.99, NULL,                  2.99, TRUE),
(1, 12, 348.00, 'Limited-time deal',   0.00, TRUE),

-- Target
(2,  7,  42.50, NULL,                  5.99, TRUE),
(2,  8,  54.99, 'Buy 1 get 1 20% off', 6.50, TRUE),
(2,  9,  29.99, NULL,                  5.50, TRUE),
(2, 10,   9.49, NULL,                  3.99, TRUE),
(2, 11,   9.49, '2 for discount',      3.99, TRUE),

-- Walmart
(3,  6, 149.99, NULL,                  0.00, TRUE),
(3,  9,  27.88, NULL,                  4.50, TRUE),
(3, 10,   8.75, 'Rollback',            0.00, TRUE),
(3, 11,   8.75, NULL,                  0.00, TRUE),
(3, 14,  54.99, NULL,                  5.99, TRUE),

-- BestBuy
(4,  2, 129.99, NULL,                  0.00, TRUE),
(4,  3,  69.99, 'Member price',        0.00, TRUE),
(4,  4, 1299.99, NULL,                 0.00, TRUE),
(4, 12, 399.99, 'Weekend sale',        0.00, TRUE),
(4, 13,  74.99, NULL,                  0.00, TRUE),
(4, 14,  59.99, NULL,                  0.00, TRUE),

-- microcenter
(5,  1,  94.99, NULL,                  0.00, TRUE),
(5,  4, 1249.99, 'In-store pickup deal', 0.00, TRUE),
(5,  5,  999.99, NULL,                 0.00, TRUE),
(5, 12, 389.99, NULL,                  0.00, TRUE),
(5, 13,  72.99, NULL,                  0.00, TRUE),

-- Costco
(6, 10,   7.49, 'Warehouse pack value', 0.00, TRUE),
(6, 11,   7.49, NULL,                   0.00, TRUE),
(6, 12, 369.99, 'Member savings',       0.00, TRUE),
(6, 14,  49.99, NULL,                   0.00, TRUE);

-- Reset sequences after explicit SERIAL inserts
SELECT setval(pg_get_serial_sequence('Manufacturer', 'manufid'), COALESCE((SELECT MAX(manufid) FROM Manufacturer), 1), true);
SELECT setval(pg_get_serial_sequence('Users', 'userid'), COALESCE((SELECT MAX(userid) FROM Users), 1), true);
SELECT setval(pg_get_serial_sequence('Merchant', 'merchantid'), COALESCE((SELECT MAX(merchantid) FROM Merchant), 1), true);
SELECT setval(pg_get_serial_sequence('Product', 'productid'), COALESCE((SELECT MAX(productid) FROM Product), 1), true);
