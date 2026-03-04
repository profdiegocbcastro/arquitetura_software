CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

INSERT INTO books (title, author, available) VALUES
('Clean Architecture', 'Robert Martin', true),
('Domain Driven Design', 'Eric Evans', true),
('Refactoring', 'Martin Fowler', true);