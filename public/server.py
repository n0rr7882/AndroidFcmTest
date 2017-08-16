import socket
s = socket.socket()
addr = ("0.0.0.0", 12345)
s.bind(addr)
s.listen()
print("""
------------------
SERVER IS STARTED!
------------------
""")
conn, addr = s.accept()
print("connected by {}:{}".format(addr[0], addr[1]))
while True:
    data = conn.recv(1024)
    if data:
        print(data.decode("ascii"))
    conn.send(input().encode("ascii"))
conn.close()
