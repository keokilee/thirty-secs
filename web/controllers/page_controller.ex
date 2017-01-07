defmodule ThirtySeconds.PageController do
  use ThirtySeconds.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
