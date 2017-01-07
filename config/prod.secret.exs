use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or you later on).
config :thirty_seconds, ThirtySeconds.Endpoint,
  secret_key_base: "Lb+hYaOtvpyhY+IWKgIEizs40Pf6cbyVro3yriA8m+SPyCt0CchbfUIOA5XZNs6Y"

# Configure your database
config :thirty_seconds, ThirtySeconds.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "thirty_seconds_prod",
  pool_size: 20
