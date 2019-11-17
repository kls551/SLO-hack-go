CREATE TABLE users (
    id serial PRIMARY KEY,
    name text,
    license_plate text,
    credit_card text
);

CREATE TABLE parkings (
    id int PRIMARY KEY,
    level integer,
    userid integer REFERENCES users(id),
    taken boolean
);

ALTER TABLE users DROP column expires;
ALTER TABLE users ADD column price int DEFAULT 0;
ALTER TABLE users ADD column totalHour int DEFAULT 1;


ALTER TABLE users ADD column expires timestamptz DEFAULT (NOW() + interval '1 hour');