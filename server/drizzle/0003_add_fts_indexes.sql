CREATE INDEX commits_message_fts ON commits USING GIN (to_tsvector('english', message));
CREATE INDEX notes_content_fts   ON notes   USING GIN (to_tsvector('english', content));
CREATE INDEX files_path_fts      ON files   USING GIN (to_tsvector('english', path));

