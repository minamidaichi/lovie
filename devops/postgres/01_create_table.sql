create table fms_filedir(id INTEGER PRIMARY KEY NOT NULL, parent_id INTEGER, path CHAR(100), name CHAR(100), m_time TIMESTAMP, size INTEGER);
create table fms_dirtag(id INTEGER PRIMARY KEY NOT NULL, dir_path CHAR(100), word CHAR(20), tfidf_val REAL);