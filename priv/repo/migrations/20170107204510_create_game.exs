defmodule ThirtySeconds.Repo.Migrations.CreateGame do
  use Ecto.Migration

  def change do
    create table(:games) do
      add :token, :string

      timestamps()
    end

  end
end
