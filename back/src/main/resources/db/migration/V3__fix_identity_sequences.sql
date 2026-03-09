-- Ajuste de secuencias IDENTITY tras cargar datos iniciales en V2
-- Se reinician los ID auto_increment a un valor alto para evitar colisiones
-- con los IDs explícitos insertados en los scripts de población.

ALTER TABLE product           ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE platform_parameter ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE permanent_turn    ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE reservation_turn  ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE deleted_turn      ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE shift             ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE turn              ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE current_account   ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE movements         ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE sells             ALTER COLUMN id RESTART WITH 10000;
ALTER TABLE daily_sell        ALTER COLUMN id RESTART WITH 10000;

