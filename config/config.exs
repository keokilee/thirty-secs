# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :thirty_seconds,
  ecto_repos: [ThirtySeconds.Repo]

# Configures the endpoint
config :thirty_seconds, ThirtySeconds.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Rq8v3CWfBMJ5kOZ0BptAmIp17rsyI61mVDsRqtJbsdraU9fVcxywUp+Bi09m9GvT",
  render_errors: [view: ThirtySeconds.ErrorView, accepts: ~w(html json)],
  pubsub: [name: ThirtySeconds.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
