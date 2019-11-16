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

insert into parkings (id, level, taken)
VALUES ('A1', 1, FALSE);
insert into parkings (id, level, taken)
VALUES ('B1', 2, FALSE);
