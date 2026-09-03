CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts TEXT NOT NULL,
  ip TEXT,
  country TEXT,
  city TEXT,
  path TEXT,
  referer TEXT,
  user_agent TEXT
);

CREATE INDEX IF NOT EXISTS idx_visits_country ON visits(country);
CREATE INDEX IF NOT EXISTS idx_visits_ts ON visits(ts);
