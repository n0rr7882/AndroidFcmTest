import requests

host = "http://malware-traffic-analysis.net/"
res = requests.get(host)

print(res.status_code)
print(res.raise_for_status())
print(res.content)
print(res.text)
print(res.json())


