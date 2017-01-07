defmodule ThirtySeconds.GameController do
  use ThirtySeconds.Web, :controller

  def ping(conn, _params) do
    IO.puts "request start"
    :timer.sleep(31000)
    IO.puts "request end"
    render conn, "ping.json", %{}
  end
end
