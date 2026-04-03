CREATE TABLE IF NOT EXISTS authors (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    available BOOLEAN NOT NULL DEFAULT TRUE,
    author_id INTEGER NOT NULL REFERENCES authors(id)
);

INSERT INTO authors (id, name) VALUES
(1, 'Robert C. Martin'),
(2, 'Eric Evans'),
(3, 'Martin Fowler')
ON CONFLICT (id) DO NOTHING;

SELECT setval('authors_id_seq', COALESCE((SELECT MAX(id) FROM authors), 1), true);

INSERT INTO books (id, title, available, author_id) VALUES
(1, 'Clean Architecture', true, 1),
(2, 'Domain-Driven Design', true, 2),
(3, 'Refactoring', false, 3)
ON CONFLICT (id) DO NOTHING;

SELECT setval('books_id_seq', COALESCE((SELECT MAX(id) FROM books), 1), true);
