--
-- PostgreSQL database dump
--

\restrict DetgHcZ16WC7AKPHjO08tprS4DOhd7DVCQ9MqnCIjc3LSIky9lpWcnShpDhSvdh

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

-- Started on 2025-11-09 22:58:29

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16581)
-- Name: clients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clients (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    address text,
    contact character varying(50),
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.clients OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16580)
-- Name: clients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.clients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.clients_id_seq OWNER TO postgres;

--
-- TOC entry 5155 (class 0 OID 0)
-- Dependencies: 227
-- Name: clients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.clients_id_seq OWNED BY public.clients.id;


--
-- TOC entry 234 (class 1259 OID 16641)
-- Name: order_comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_comments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    comments text,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.order_comments OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16640)
-- Name: order_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_comments_id_seq OWNER TO postgres;

--
-- TOC entry 5156 (class 0 OID 0)
-- Dependencies: 233
-- Name: order_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_comments_id_seq OWNED BY public.order_comments.id;


--
-- TOC entry 236 (class 1259 OID 16660)
-- Name: order_payments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_payments (
    id integer NOT NULL,
    order_id integer NOT NULL,
    payment_mode character varying(100) NOT NULL,
    amount numeric(12,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.order_payments OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16659)
-- Name: order_payments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_payments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_payments_id_seq OWNER TO postgres;

--
-- TOC entry 5157 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_payments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_payments_id_seq OWNED BY public.order_payments.id;


--
-- TOC entry 232 (class 1259 OID 16615)
-- Name: order_transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_transactions (
    id integer NOT NULL,
    order_id integer NOT NULL,
    product_id integer NOT NULL,
    product_quantity integer NOT NULL,
    unit_price numeric(12,2) NOT NULL,
    total_price numeric(12,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.order_transactions OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 16614)
-- Name: order_transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_transactions_id_seq OWNER TO postgres;

--
-- TOC entry 5158 (class 0 OID 0)
-- Dependencies: 231
-- Name: order_transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_transactions_id_seq OWNED BY public.order_transactions.id;


--
-- TOC entry 230 (class 1259 OID 16597)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    client_id integer NOT NULL,
    overall_price numeric(12,2) NOT NULL,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 16596)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5159 (class 0 OID 0)
-- Dependencies: 229
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 226 (class 1259 OID 16565)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(12,2) NOT NULL,
    stock integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16564)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5160 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 238 (class 1259 OID 16692)
-- Name: sys_refresh_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sys_refresh_tokens (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL,
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now(),
    revoked boolean DEFAULT false
);


ALTER TABLE public.sys_refresh_tokens OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16691)
-- Name: sys_refresh_tokens_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sys_refresh_tokens_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sys_refresh_tokens_id_seq OWNER TO postgres;

--
-- TOC entry 5161 (class 0 OID 0)
-- Dependencies: 237
-- Name: sys_refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sys_refresh_tokens_id_seq OWNED BY public.sys_refresh_tokens.id;


--
-- TOC entry 222 (class 1259 OID 16528)
-- Name: sys_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sys_roles (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.sys_roles OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16527)
-- Name: sys_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sys_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sys_roles_id_seq OWNER TO postgres;

--
-- TOC entry 5162 (class 0 OID 0)
-- Dependencies: 221
-- Name: sys_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sys_roles_id_seq OWNED BY public.sys_roles.id;


--
-- TOC entry 224 (class 1259 OID 16542)
-- Name: sys_user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sys_user_roles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.sys_user_roles OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16541)
-- Name: sys_user_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sys_user_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sys_user_roles_id_seq OWNER TO postgres;

--
-- TOC entry 5163 (class 0 OID 0)
-- Dependencies: 223
-- Name: sys_user_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sys_user_roles_id_seq OWNED BY public.sys_user_roles.id;


--
-- TOC entry 220 (class 1259 OID 16510)
-- Name: sys_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sys_users (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_active boolean DEFAULT true,
    created_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by integer,
    updated_date timestamp without time zone,
    updated_by integer,
    is_deleted boolean DEFAULT false,
    deleted_by integer
);


ALTER TABLE public.sys_users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16509)
-- Name: sys_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sys_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sys_users_id_seq OWNER TO postgres;

--
-- TOC entry 5164 (class 0 OID 0)
-- Dependencies: 219
-- Name: sys_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sys_users_id_seq OWNED BY public.sys_users.id;


--
-- TOC entry 240 (class 1259 OID 16730)
-- Name: view_orders_summary; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.view_orders_summary AS
 SELECT o.id AS order_id,
    c.name AS client_name,
    count(ot.product_id) AS total_products,
    sum(ot.total_price) AS total_order_price,
    COALESCE(( SELECT oc.comments
           FROM public.order_comments oc
          WHERE ((oc.order_id = o.id) AND (oc.is_deleted = false))
          ORDER BY oc.created_date DESC
         LIMIT 1), ''::text) AS latest_comment,
    o.created_date,
    u.name AS created_by
   FROM (((public.orders o
     JOIN public.clients c ON ((o.client_id = c.id)))
     LEFT JOIN public.order_transactions ot ON (((ot.order_id = o.id) AND (ot.is_deleted = false))))
     LEFT JOIN public.sys_users u ON ((o.created_by = u.id)))
  WHERE (o.is_deleted = false)
  GROUP BY o.id, c.name, o.created_date, u.name
  ORDER BY o.id DESC;


ALTER VIEW public.view_orders_summary OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16725)
-- Name: vw_user_with_roles; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.vw_user_with_roles AS
 SELECT u.id AS user_id,
    u.name AS user_name,
    u.email AS user_email,
    u.is_active AS user_is_active,
    r.id AS role_id,
    r.title AS role_title,
    r.description AS role_description
   FROM ((public.sys_users u
     LEFT JOIN public.sys_user_roles ur ON ((u.id = ur.user_id)))
     LEFT JOIN public.sys_roles r ON ((ur.role_id = r.id)))
  WHERE ((u.is_deleted = false) AND ((ur.is_deleted = false) OR (ur.is_deleted IS NULL)) AND ((r.is_deleted = false) OR (r.is_deleted IS NULL)));


ALTER VIEW public.vw_user_with_roles OWNER TO postgres;

--
-- TOC entry 4926 (class 2604 OID 16584)
-- Name: clients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients ALTER COLUMN id SET DEFAULT nextval('public.clients_id_seq'::regclass);


--
-- TOC entry 4938 (class 2604 OID 16644)
-- Name: order_comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_comments ALTER COLUMN id SET DEFAULT nextval('public.order_comments_id_seq'::regclass);


--
-- TOC entry 4942 (class 2604 OID 16663)
-- Name: order_payments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_payments ALTER COLUMN id SET DEFAULT nextval('public.order_payments_id_seq'::regclass);


--
-- TOC entry 4934 (class 2604 OID 16618)
-- Name: order_transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_transactions ALTER COLUMN id SET DEFAULT nextval('public.order_transactions_id_seq'::regclass);


--
-- TOC entry 4930 (class 2604 OID 16600)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4921 (class 2604 OID 16568)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4946 (class 2604 OID 16695)
-- Name: sys_refresh_tokens id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_refresh_tokens ALTER COLUMN id SET DEFAULT nextval('public.sys_refresh_tokens_id_seq'::regclass);


--
-- TOC entry 4913 (class 2604 OID 16531)
-- Name: sys_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_roles ALTER COLUMN id SET DEFAULT nextval('public.sys_roles_id_seq'::regclass);


--
-- TOC entry 4917 (class 2604 OID 16545)
-- Name: sys_user_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user_roles ALTER COLUMN id SET DEFAULT nextval('public.sys_user_roles_id_seq'::regclass);


--
-- TOC entry 4909 (class 2604 OID 16513)
-- Name: sys_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_users ALTER COLUMN id SET DEFAULT nextval('public.sys_users_id_seq'::regclass);


--
-- TOC entry 5139 (class 0 OID 16581)
-- Dependencies: 228
-- Data for Name: clients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clients (id, name, email, address, contact, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	Acme Corp	contact@acme.com	123 Industrial Road, Cityville	1234567890	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
2	Globex Inc	info@globex.com	456 Business Blvd, Metropolis	9876543210	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
3	Soylent Co	support@soylent.com	789 Market Street, Gotham	5551234567	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
\.


--
-- TOC entry 5145 (class 0 OID 16641)
-- Dependencies: 234
-- Data for Name: order_comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_comments (id, order_id, comments, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	1	Please deliver by next week	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
2	2	Urgent order, handle with priority	t	2025-11-09 23:25:56.774884	3	\N	\N	f	\N
\.


--
-- TOC entry 5147 (class 0 OID 16660)
-- Dependencies: 236
-- Data for Name: order_payments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_payments (id, order_id, payment_mode, amount, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	1	Credit Card	1000.00	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
2	1	Bank Transfer	1525.00	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
3	2	PayPal	625.00	t	2025-11-09 23:25:56.774884	3	\N	\N	f	\N
\.


--
-- TOC entry 5143 (class 0 OID 16615)
-- Dependencies: 232
-- Data for Name: order_transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_transactions (id, order_id, product_id, product_quantity, unit_price, total_price, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	1	1	2	1200.00	2400.00	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
2	1	2	5	25.00	125.00	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
3	2	3	3	75.00	225.00	t	2025-11-09 23:25:56.774884	3	\N	\N	f	\N
4	2	4	2	200.00	400.00	t	2025-11-09 23:25:56.774884	3	\N	\N	f	\N
\.


--
-- TOC entry 5141 (class 0 OID 16597)
-- Dependencies: 230
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, client_id, overall_price, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	1	2525.00	t	2025-11-09 23:25:56.774884	2	\N	\N	f	\N
2	2	625.00	t	2025-11-09 23:25:56.774884	3	\N	\N	f	\N
\.


--
-- TOC entry 5137 (class 0 OID 16565)
-- Dependencies: 226
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, price, stock, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	Laptop	High performance laptop	1200.00	50	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
2	Mouse	Wireless mouse	25.00	200	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
3	Keyboard	Mechanical keyboard	75.00	100	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
4	Monitor	24 inch LED monitor	200.00	75	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
5	USB Cable	1 meter USB-C cable	10.00	300	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
\.


--
-- TOC entry 5149 (class 0 OID 16692)
-- Dependencies: 238
-- Data for Name: sys_refresh_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sys_refresh_tokens (id, user_id, token, expires_at, created_at, revoked) FROM stdin;
1	1	token1	2025-12-09 23:25:56.774884+05:30	2025-11-09 23:25:56.774884+05:30	f
2	2	token2	2025-12-09 23:25:56.774884+05:30	2025-11-09 23:25:56.774884+05:30	f
3	3	token3	2025-12-09 23:25:56.774884+05:30	2025-11-09 23:25:56.774884+05:30	f
4	4	token4	2025-12-09 23:25:56.774884+05:30	2025-11-09 23:25:56.774884+05:30	f
5	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMTM0MiwiZXhwIjoxNzYzMzE2MTQyfQ.1WxL1UX6y4nTOF4BxoY9WHeRgmRV9ZhujJ5ZvNiwN2Y	2025-11-16 23:32:22+05:30	2025-11-09 23:32:22.879548+05:30	f
6	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMTU5NCwiZXhwIjoxNzYzMzE2Mzk0fQ.Af6Vf8WWHEDynl-Thlyh75i-fAZ7OCoHmvzI8pBw178	2025-11-16 23:36:34+05:30	2025-11-09 23:36:34.721653+05:30	f
7	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMjIxNiwiZXhwIjoxNzYzMzE3MDE2fQ.hAy7hMAHAI8OhjeCDo9wybEdbHrBspQjjpxsgF-5nhM	2025-11-16 23:46:56+05:30	2025-11-09 23:46:56.022141+05:30	f
8	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzAwMSwiZXhwIjoxNzYzMzE3ODAxfQ.cmsOkgMn9LoIIi0MAKskdT9u8AUk0GsnibUbWvJj54A	2025-11-17 00:00:01+05:30	2025-11-10 00:00:01.544203+05:30	f
9	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzMwMCwiZXhwIjoxNzYzMzE4MTAwfQ.NndPFRc7IOJWnyiNFeGQRPh2yDB2xnMGqBbpvsow3wE	2025-11-17 00:05:00+05:30	2025-11-10 00:05:00.898705+05:30	f
10	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzQxMCwiZXhwIjoxNzYzMzE4MjEwfQ.TcwTJEWLx8sZTSlzw-RT3LP4_jy556DKHa5atQNiAm8	2025-11-17 00:06:50+05:30	2025-11-10 00:06:50.384609+05:30	f
11	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzU0MiwiZXhwIjoxNzYzMzE4MzQyfQ.rWMluspJuQnepjb6krpSahyo1Cb9Qoi2F2W5NYNt8Ws	2025-11-17 00:09:02+05:30	2025-11-10 00:09:02.181786+05:30	f
12	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzU4NywiZXhwIjoxNzYzMzE4Mzg3fQ.ex42gGAFrfKkOWW4e9ZOszEAMmtZ8r-VaOFsXZJnk0Q	2025-11-17 00:09:47+05:30	2025-11-10 00:09:47.737352+05:30	f
13	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzYwNiwiZXhwIjoxNzYzMzE4NDA2fQ.JvUbx8oSQ5dERlle-vDX6UeFrCK1qRlyBc0KC5khkKA	2025-11-17 00:10:06+05:30	2025-11-10 00:10:06.627379+05:30	f
14	1	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MjcxMzc4OSwiZXhwIjoxNzYzMzE4NTg5fQ.bjVu8_xbWfKJSDHUx1PgFg23hlc2kyBlzRyBoB7ONgU	2025-11-17 00:13:09+05:30	2025-11-10 00:13:09.760932+05:30	f
\.


--
-- TOC entry 5133 (class 0 OID 16528)
-- Dependencies: 222
-- Data for Name: sys_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sys_roles (id, title, description, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	Admin	Administrator with all access	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
2	Manager	Manages orders and clients	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
3	User	Regular user	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
\.


--
-- TOC entry 5135 (class 0 OID 16542)
-- Dependencies: 224
-- Data for Name: sys_user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sys_user_roles (id, user_id, role_id, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	1	1	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
2	2	2	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
3	3	3	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
4	4	3	t	2025-11-09 23:25:56.774884	1	\N	\N	f	\N
\.


--
-- TOC entry 5131 (class 0 OID 16510)
-- Dependencies: 220
-- Data for Name: sys_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sys_users (id, name, email, password, is_active, created_date, created_by, updated_date, updated_by, is_deleted, deleted_by) FROM stdin;
1	Alice Johnson	alice@example.com	$2b$10$Bsi8Z/.KKJlNUdQw3GoQKeLABHp.ZRMzUenO59l.eZcHaofDNlQDu	t	2025-11-09 23:25:56.774884	1	2025-11-09 23:32:02.842378	\N	f	\N
2	Bob Smith	bob@example.com	$2b$10$i6BlbPwgwXdJEOMJ4QzKYeFisEr/AYnFNGC/1im2Q3RM5Os0McXSG	t	2025-11-09 23:25:56.774884	1	2025-11-09 23:32:02.842378	\N	f	\N
3	Charlie Brown	charlie@example.com	$2b$10$ePDpDk2.gY/iYEyEk2mQI.6kEZAUFdTiAJTM81MBAVjL8V4kETdWO	t	2025-11-09 23:25:56.774884	1	2025-11-09 23:32:02.842378	\N	f	\N
4	Diana Prince	diana@example.com	$2b$10$5jy7Yio12HMfqpxCn0.ZWOBbWFWSdAEK34JBIizHhgN7UGDUDZceK	t	2025-11-09 23:25:56.774884	1	2025-11-09 23:32:02.842378	\N	f	\N
\.


--
-- TOC entry 5165 (class 0 OID 0)
-- Dependencies: 227
-- Name: clients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.clients_id_seq', 3, true);


--
-- TOC entry 5166 (class 0 OID 0)
-- Dependencies: 233
-- Name: order_comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_comments_id_seq', 2, true);


--
-- TOC entry 5167 (class 0 OID 0)
-- Dependencies: 235
-- Name: order_payments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_payments_id_seq', 3, true);


--
-- TOC entry 5168 (class 0 OID 0)
-- Dependencies: 231
-- Name: order_transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_transactions_id_seq', 4, true);


--
-- TOC entry 5169 (class 0 OID 0)
-- Dependencies: 229
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 2, true);


--
-- TOC entry 5170 (class 0 OID 0)
-- Dependencies: 225
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 5, true);


--
-- TOC entry 5171 (class 0 OID 0)
-- Dependencies: 237
-- Name: sys_refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sys_refresh_tokens_id_seq', 14, true);


--
-- TOC entry 5172 (class 0 OID 0)
-- Dependencies: 221
-- Name: sys_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sys_roles_id_seq', 3, true);


--
-- TOC entry 5173 (class 0 OID 0)
-- Dependencies: 223
-- Name: sys_user_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sys_user_roles_id_seq', 4, true);


--
-- TOC entry 5174 (class 0 OID 0)
-- Dependencies: 219
-- Name: sys_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sys_users_id_seq', 4, true);


--
-- TOC entry 4960 (class 2606 OID 16595)
-- Name: clients clients_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_email_key UNIQUE (email);


--
-- TOC entry 4962 (class 2606 OID 16593)
-- Name: clients clients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clients
    ADD CONSTRAINT clients_pkey PRIMARY KEY (id);


--
-- TOC entry 4968 (class 2606 OID 16653)
-- Name: order_comments order_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_comments
    ADD CONSTRAINT order_comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4970 (class 2606 OID 16672)
-- Name: order_payments order_payments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_payments
    ADD CONSTRAINT order_payments_pkey PRIMARY KEY (id);


--
-- TOC entry 4966 (class 2606 OID 16629)
-- Name: order_transactions order_transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT order_transactions_pkey PRIMARY KEY (id);


--
-- TOC entry 4964 (class 2606 OID 16608)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4958 (class 2606 OID 16579)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4972 (class 2606 OID 16704)
-- Name: sys_refresh_tokens sys_refresh_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_refresh_tokens
    ADD CONSTRAINT sys_refresh_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4954 (class 2606 OID 16540)
-- Name: sys_roles sys_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_roles
    ADD CONSTRAINT sys_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4956 (class 2606 OID 16553)
-- Name: sys_user_roles sys_user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user_roles
    ADD CONSTRAINT sys_user_roles_pkey PRIMARY KEY (id);


--
-- TOC entry 4950 (class 2606 OID 16526)
-- Name: sys_users sys_users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_users
    ADD CONSTRAINT sys_users_email_key UNIQUE (email);


--
-- TOC entry 4952 (class 2606 OID 16524)
-- Name: sys_users sys_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_users
    ADD CONSTRAINT sys_users_pkey PRIMARY KEY (id);


--
-- TOC entry 4975 (class 2606 OID 16609)
-- Name: orders fk_client; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT fk_client FOREIGN KEY (client_id) REFERENCES public.clients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4976 (class 2606 OID 16630)
-- Name: order_transactions fk_order; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4978 (class 2606 OID 16654)
-- Name: order_comments fk_order_comments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_comments
    ADD CONSTRAINT fk_order_comments FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4979 (class 2606 OID 16673)
-- Name: order_payments fk_order_payments; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_payments
    ADD CONSTRAINT fk_order_payments FOREIGN KEY (order_id) REFERENCES public.orders(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4977 (class 2606 OID 16635)
-- Name: order_transactions fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_transactions
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4973 (class 2606 OID 16559)
-- Name: sys_user_roles fk_role; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user_roles
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES public.sys_roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4974 (class 2606 OID 16554)
-- Name: sys_user_roles fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_user_roles
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.sys_users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4980 (class 2606 OID 16705)
-- Name: sys_refresh_tokens sys_refresh_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sys_refresh_tokens
    ADD CONSTRAINT sys_refresh_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.sys_users(id) ON DELETE CASCADE;


-- Completed on 2025-11-09 22:58:29

--
-- PostgreSQL database dump complete
--

\unrestrict DetgHcZ16WC7AKPHjO08tprS4DOhd7DVCQ9MqnCIjc3LSIky9lpWcnShpDhSvdh

