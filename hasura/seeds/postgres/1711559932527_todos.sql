SET check_function_bodies = false;
INSERT INTO public.todos (id, title, is_completed, is_public, created_at, user_id) VALUES (1, 'My first todo', false, false, '2024-03-27 16:46:15.731239+00', '1');
INSERT INTO public.todos (id, title, is_completed, is_public, created_at, user_id) VALUES (2, 'second todo', false, false, '2024-03-27 16:46:15.731239+00', '1');
SELECT pg_catalog.setval('public.todos_id_seq', 2, true);
