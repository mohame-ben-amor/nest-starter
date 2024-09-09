--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11
-- Dumped by pg_dump version 12.11

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
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: box2home
--

CREATE TYPE public.users_role_enum AS ENUM (
    '0',
    '1'
);


ALTER TYPE public.users_role_enum OWNER TO box2home;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: projects; Type: TABLE; Schema: public; Owner: box2home
--

CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.projects OWNER TO box2home;

--
-- Name: projects_id_seq; Type: SEQUENCE; Schema: public; Owner: box2home
--

CREATE SEQUENCE public.projects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projects_id_seq OWNER TO box2home;

--
-- Name: projects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: box2home
--

ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: box2home
--

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    "dueDate" timestamp without time zone NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "assignedUserId" integer,
    "projectId" integer,
    status integer NOT NULL
);


ALTER TABLE public.tasks OWNER TO box2home;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: box2home
--

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO box2home;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: box2home
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: box2home
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    age integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    role public.users_role_enum DEFAULT '1'::public.users_role_enum NOT NULL
);


ALTER TABLE public.users OWNER TO box2home;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: box2home
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO box2home;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: box2home
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: projects id; Type: DEFAULT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: projects; Type: TABLE DATA; Schema: public; Owner: box2home
--

COPY public.projects (id, name, description, "createdAt", "updatedAt") FROM stdin;
1	first Project	first Project description	2024-09-08 13:48:44.824142	2024-09-08 13:48:44.824142
2	second Project	second Project description	2024-09-08 13:50:20.718116	2024-09-08 13:50:20.718116
3	third Project	third Project description	2024-09-08 13:51:28.250255	2024-09-08 13:51:28.250255
5	fourth Project	fourth Project description	2024-09-08 13:53:15.099324	2024-09-08 13:53:15.099324
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: box2home
--

COPY public.tasks (id, name, description, "dueDate", "createdAt", "updatedAt", "assignedUserId", "projectId", status) FROM stdin;
2	second task	second task description	2024-09-08 13:57:40.42	2024-09-08 14:00:45.179368	2024-09-08 14:00:45.179368	2	2	2
1	first task	string	2024-09-08 16:33:17.666	2024-09-08 13:59:34.909427	2024-09-08 17:34:08.742302	1	2	0
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: box2home
--

COPY public.users (id, name, email, password, age, "createdAt", "updatedAt", role) FROM stdin;
1	khalil	khalil.askri@gmail.com	$2b$10$qUGed25w.W2fOKbKrVDEMuT5Bt24HxwePamGeWH.W9qWohMDFLKqa	20	2024-09-08 13:21:34.899606	2024-09-08 13:21:34.899606	1
2	mba	med.benamor@gmail.com	$2b$10$VFv8eGNzkek6BPpbGulsq.0OJcpU20H8dj7OKgu6XfkIbzmFvl72m	20	2024-09-08 13:26:35.483864	2024-09-08 13:26:35.483864	1
3	admin	admin@gmail.com	$2b$10$I8BXYAZBb1JMzYSwEM8R6uwsIaqc0gwltebjsJY8nXDibgaY135nK	30	2024-09-09 11:43:44.515001	2024-09-09 11:43:44.515001	1
4	user	user@gmail.com	$2b$10$Z84n1M6rfOFfMrMFa9eCQeclA6YW4i3llMdgBkin0ubUb2rp0DKbC	30	2024-09-09 11:44:07.771336	2024-09-09 11:44:07.771336	1
5	user	users@gmail.com	$2b$10$wlid86EDhZjTrZSYPhI/sO1lL8im8wUTkQl6py4cPD6glG6vzJPxa	30	2024-09-09 11:44:22.926371	2024-09-09 11:44:22.926371	1
6	user	users1@gmail.com	$2b$10$N/6.V2tcBbvRYNvtDMqs..jq1T9PTG1LHpVSmNBWWzAbXxE59rmr.	30	2024-09-09 11:46:07.917081	2024-09-09 11:46:07.917081	1
7	user	users2@gmail.com	$2b$10$S2fejnbgw4mBdlLhd57oBe4JQiMKwdenbVLEjbAGP8dd5sjcg7dMm	30	2024-09-09 11:46:43.29158	2024-09-09 11:46:43.29158	1
8	user	users3@gmail.com	$2b$10$NjgqN0Gut/pTRCJt8LS/W.GuPmQmP93wJjqZBBSDbhLJk5pU8xC3u	30	2024-09-09 11:49:50.827303	2024-09-09 11:49:50.827303	1
9	user	users4@gmail.com	$2b$10$Tfh3byMHyubD2jseeZV/cOJ.b2eTbs4J0SM4gVB9R071mFpJcQ3Ge	30	2024-09-09 11:50:04.772797	2024-09-09 11:50:04.772797	1
10	user	users5@gmail.com	$2b$10$.YNl82sjNK1YxCCI0UTdge0XhUh1PL6PsE32fIubR6HL0B49RvbaW	30	2024-09-09 11:54:37.786629	2024-09-09 11:54:37.786629	1
11	user	users6@gmail.com	$2b$10$N4LcWiSl3smtTtZiqD.3qe/Z2S6tPzgZiHND8rW17mXudmZa6MqwG	30	2024-09-09 11:54:50.883371	2024-09-09 11:54:50.883371	0
\.


--
-- Name: projects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: box2home
--

SELECT pg_catalog.setval('public.projects_id_seq', 6, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: box2home
--

SELECT pg_catalog.setval('public.tasks_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: box2home
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: projects PK_6271df0a7aed1d6c0691ce6ac50; Type: CONSTRAINT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY (id);


--
-- Name: tasks PK_8d12ff38fcc62aaba2cab748772; Type: CONSTRAINT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: tasks FK_cf34ff7f1de7b973b7ad5f536de; Type: FK CONSTRAINT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de" FOREIGN KEY ("assignedUserId") REFERENCES public.users(id);


--
-- Name: tasks FK_e08fca67ca8966e6b9914bf2956; Type: FK CONSTRAINT; Schema: public; Owner: box2home
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT "FK_e08fca67ca8966e6b9914bf2956" FOREIGN KEY ("projectId") REFERENCES public.projects(id);


--
-- PostgreSQL database dump complete
--

