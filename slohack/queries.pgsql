CREATE TABLE users (
    id serial PRIMARY KEY,
    name text,
    license_plate text,
    credit_card text
);

CREATE TABLE parkings (
    id text PRIMARY KEY,
    level integer,
    userid integer REFERENCES users(id),
    taken boolean
);

ALTER TABLE users ADD column expires timestamp DEFAULT (NOW() + interval '1 hour');
