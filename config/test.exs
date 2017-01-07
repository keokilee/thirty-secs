use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :thirty_seconds, ThirtySeconds.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :thirty_seconds, ThirtySeconds.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "thirty_seconds_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
