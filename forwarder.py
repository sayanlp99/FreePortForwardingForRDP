from pyngrok import ngrok
from datetime import datetime
import urllib.request

now = datetime.now()
current_time = now.strftime("%H:%M:%S")
print("Current Time =", current_time)

rdp_tunnel = ngrok.connect(3389, "tcp")
str_rdp_tunnel = str(rdp_tunnel)
rdp_url = str_rdp_tunnel.split("\"")[1]
public_url = str(rdp_url)
print(public_url)
urlQuery = "https://portforward.glitch.me/forward1?public_url="+public_url+"&timestamp="+current_time
with urllib.request.urlopen(urlQuery) as response:
   html = response.read()
   print(html)

ngrok_process = ngrok.get_ngrok_process()

try:
	ngrok_process.proc.wait()
except KeyboardInterrupt:
	print(" Shutting down server.")
	ngrok.kill()