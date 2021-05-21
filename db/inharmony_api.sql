--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carts; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.carts (
    cart_id integer NOT NULL,
    user_id uuid
);


ALTER TABLE public.carts OWNER TO jon;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: jon
--

CREATE SEQUENCE public.carts_cart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_cart_id_seq OWNER TO jon;

--
-- Name: carts_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jon
--

ALTER SEQUENCE public.carts_cart_id_seq OWNED BY public.carts.cart_id;


--
-- Name: carts_products; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.carts_products (
    id integer NOT NULL,
    cart_id integer,
    product_id integer
);


ALTER TABLE public.carts_products OWNER TO jon;

--
-- Name: carts_products_id_seq; Type: SEQUENCE; Schema: public; Owner: jon
--

CREATE SEQUENCE public.carts_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.carts_products_id_seq OWNER TO jon;

--
-- Name: carts_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jon
--

ALTER SEQUENCE public.carts_products_id_seq OWNED BY public.carts_products.id;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.orders (
    order_id integer NOT NULL,
    user_id uuid
);


ALTER TABLE public.orders OWNER TO jon;

--
-- Name: orders_order_id_seq; Type: SEQUENCE; Schema: public; Owner: jon
--

CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_order_id_seq OWNER TO jon;

--
-- Name: orders_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jon
--

ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;


--
-- Name: orders_products; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.orders_products (
    id integer NOT NULL,
    order_id integer,
    product_id integer
);


ALTER TABLE public.orders_products OWNER TO jon;

--
-- Name: orders_products_id_seq; Type: SEQUENCE; Schema: public; Owner: jon
--

CREATE SEQUENCE public.orders_products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.orders_products_id_seq OWNER TO jon;

--
-- Name: orders_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jon
--

ALTER SEQUENCE public.orders_products_id_seq OWNED BY public.orders_products.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(50) NOT NULL,
    category character varying(50) NOT NULL,
    description text,
    price numeric(8,2) NOT NULL,
    num_in_stock integer NOT NULL
);


ALTER TABLE public.products OWNER TO jon;

--
-- Name: products_product_id_seq; Type: SEQUENCE; Schema: public; Owner: jon
--

CREATE SEQUENCE public.products_product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_product_id_seq OWNER TO jon;

--
-- Name: products_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: jon
--

ALTER SEQUENCE public.products_product_id_seq OWNED BY public.products.product_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: jon
--

CREATE TABLE public.users (
    user_id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    first_name character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO jon;

--
-- Name: carts cart_id; Type: DEFAULT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts ALTER COLUMN cart_id SET DEFAULT nextval('public.carts_cart_id_seq'::regclass);


--
-- Name: carts_products id; Type: DEFAULT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts_products ALTER COLUMN id SET DEFAULT nextval('public.carts_products_id_seq'::regclass);


--
-- Name: orders order_id; Type: DEFAULT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);


--
-- Name: orders_products id; Type: DEFAULT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders_products ALTER COLUMN id SET DEFAULT nextval('public.orders_products_id_seq'::regclass);


--
-- Name: products product_id; Type: DEFAULT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_product_id_seq'::regclass);


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.carts (cart_id, user_id) FROM stdin;
\.


--
-- Data for Name: carts_products; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.carts_products (id, cart_id, product_id) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.orders (order_id, user_id) FROM stdin;
\.


--
-- Data for Name: orders_products; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.orders_products (id, order_id, product_id) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.products (product_id, name, category, description, price, num_in_stock) FROM stdin;
1	violin	strings	A bowed stringed instrument having four strings tuned at intervals of a fifth and a usual range from G below middle C upward for more than 4¹/₂ octaves and having a shallow body, shoulders at right angles to the neck, a fingerboard without frets, and a curved bridge.	500.00	8
2	viola	strings	A stringed musical instrument, the tenor of the violin family. It is built in proportions similar to those of the violin but has a body length of 37 to 43 cm (14.5 to 17 inches), about 5 cm (2 inches) longer than a violin. Its four strings are tuned c–g–d′–a′, beginning with the C below middle C.	400.00	9
3	cello	strings	a musical instrument with four strings that looks like a large violin. You play the cello with a bow while sitting down and holding it upright between your legs.	450.00	7
4	doublebass	strings	The largest and lowest-pitched bowed string instrument in the modern symphony orchestra. The Double bass has a similar structure to the cello.	600.00	3
5	flute	woodwind	A woodwind instrument, generally of a tubular shape, that is played by blowing across a specially-shaped opening (known as the embouchure) in such a way as to produce a vibrating column of air whose pulsations we hear as sound	300.00	11
6	oboe	woodwind	A double-reed woodwind instrument having a conical tube, a brilliant penetrating tone, and a usual range from B flat below middle C upward for over 2¹/₂ octaves.	450.00	8
7	recorder	woodwind	A wind instrument of the fipple, or whistle, flute class, closely related to the flageolet.	60.00	20
8	clarinet	woodwind	It has a single-reed mouthpiece, a straight, cylindrical tube with an almost cylindrical bore, and a flared bell.	250.00	4
9	saxophone	woodwind	A type of single-reed woodwind instrument with a conical body, usually made of brass. As with all single-reed instruments, sound is produced when a cane reed on a mouthpiece vibrates to produce a sound wave inside the instrument's body.	300.00	3
10	bassoon	woodwind	A double-reed woodwind instrument having a long U-shaped conical tube connected to the mouthpiece by a thin metal tube and a usual range two octaves lower than that of the oboe.	500.00	6
11	trumpet	brass	A wind instrument consisting of a conical or cylindrical usually metal tube, a cup-shaped mouthpiece, and a flared bell specifically : a valved brass instrument having a cylindrical tube with two turns and a usual range from F sharp below middle C upward for 2¹/₂ octaves.	300.00	9
12	trombone	brass	A brass instrument consisting of a long cylindrical metal tube with two turns and having a movable slide or valves for varying the tone and a usual range one octave lower than that of the trumpet.	200.00	5
13	french horn	brass	A circular valved brass instrument having a conical bore, a funnel-shaped mouthpiece, and a usual range from B below the bass staff upward for more than three octaves.	500.00	6
14	euphonium	brass	A brass wind instrument with valves, pitched in C or B♭ an octave below the trumpet; it is the leading instrument in the tenor-bass range in military bands.	350.00	2
15	tuba	brass	A large low-pitched brass instrument usually oval in shape and having a conical tube, a cup-shaped mouthpiece, and a usual range an octave lower than that of the euphonium.	600.00	2
16	music stand	accessories	A stand to hold your precious sheet music!	15.50	20
17	metronome	accessories	Keeps you in time with the click-click.	20.40	13
18	tuner	accessories	Stops you sounding quite so terrible.	20.80	10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: jon
--

COPY public.users (user_id, email, password, last_name, first_name) FROM stdin;
42f726f7-768c-4b63-bbf3-3d968a766d05	Nigel25@yahoo.com	$2a$10$.UPTkd4PkLDDLrt3iBukM.1saDrAKUk58nK.0fRqEzjpYF3glkkY6	Bailey	Daisha
87c6f26a-79e2-4d22-be01-1cf4b347574d	Ignacio.Ankunding84@yahoo.com	$2a$10$9qayCENxbwebMufIHYQh..9IrvB9JgVy8uf1lbF7r1rf2IuHjTmb6	Cummings	Garry
072909af-6e39-437b-9821-20b378cb4b6e	Nadia_Koch43@gmail.com	$2a$10$p7H5lY0AXAcPUFyeOfCSyO2s9wo7VN08kaL9u8zdqV0xkgPxLqrL.	Fisher	Fay
bd5a0017-27c7-4cc0-bfd6-48f54be754e8	Jed94@hotmail.com	$2a$10$hf164BGK4DbocSmG0Ih/r.y0PpjzWJrTksQmVHpTxSEdOvZPPLiAa	Reichert	Van
57e82c03-48ce-4990-bff6-1478d60929e6	Myra72@yahoo.com	$2a$10$b9jKrVuXZqTPfh4mSuQoAuO1EBSTVQKl/KZrQMYUpNDgiElGpxGxK	Gorczany	Garrick
de24a67f-e6ad-420f-8d2a-f0064bad128c	Adan59@hotmail.com	$2a$10$Q3cDaZGkCaRJ9n0KoXP3buI4eBABhhyVCP8pBLAV90H7biKHchx8G	Reichert	Elliot
90f6a4b6-4e7a-4887-a1a2-54d49825e568	Moshe.Veum41@yahoo.com	$2a$10$ULSo8rGGNz9YL.V.IVn6tOzQXV8wrwS.2qVFrHD9ifBjZ3/PouvLS	Schinner	Cicero
8e35d9e6-2151-4afb-a105-c59f889cba45	Arianna_Schinner67@yahoo.com	$2a$10$.AYbwR17pQq4lgT2akxBlufsQlfMIN3/2fj/p.F6rJuG5TlhgaMaS	Ortiz	Anabelle
5c898399-dc3f-497b-9c4a-2b7540a96a4a	Queen64@hotmail.com	$2a$10$BezKyJOcvz0Cd2y5E.VqbOeZObyI2QM/v3SnY11sSjTupIMoxselq	Cole	Hertha
660caae0-33dc-48b6-9528-4408f7064fed	Amira57@gmail.com	$2a$10$I35AtALlh.zMIkXjXVG.b.FxReNEzLOtaUsCPLJJCB6xxATBTcwMy	Breitenberg	Luna
9d0006b3-08b3-4d8d-8c6b-4032140df19e	example@email.com	$2a$10$D4l40ZAFFTADTkkXMB9XJ.0gwjWxulbioKPVEvQfFyk7ZsGyivtpS	Ample	Ex
\.


--
-- Name: carts_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.carts_cart_id_seq', 1, false);


--
-- Name: carts_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.carts_products_id_seq', 1, false);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 24, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: orders_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);


--
-- Name: orders_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.orders_products_id_seq', 1, false);


--
-- Name: products_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: jon
--

SELECT pg_catalog.setval('public.products_product_id_seq', 18, true);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (cart_id);


--
-- Name: carts_products carts_products_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);


--
-- Name: orders_products orders_products_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_pkey PRIMARY KEY (id);


--
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: carts_products carts_products_cart_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_cart_id_foreign FOREIGN KEY (cart_id) REFERENCES public.carts(cart_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts_products carts_products_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts_products
    ADD CONSTRAINT carts_products_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: carts carts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_products orders_products_order_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_order_id_foreign FOREIGN KEY (order_id) REFERENCES public.orders(order_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_products orders_products_product_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_product_id_foreign FOREIGN KEY (product_id) REFERENCES public.products(product_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders orders_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: jon
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

