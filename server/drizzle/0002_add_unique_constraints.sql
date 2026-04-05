ALTER TABLE "commits" ADD CONSTRAINT "commits_repo_id_commit_hash_unique" UNIQUE("repo_id","commit_hash");--> statement-breakpoint
ALTER TABLE "file_commits" ADD CONSTRAINT "file_commits_file_id_commit_id_unique" UNIQUE("file_id","commit_id");--> statement-breakpoint
ALTER TABLE "files" ADD CONSTRAINT "files_repo_id_path_unique" UNIQUE("repo_id","path");