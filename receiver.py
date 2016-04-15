import time
import httplib, urllib
import serial

server = "data.sparkfun.com"
publicKey = "yourPublicKey"
privateKey = "yourPrivateKey"
fields = ["accel", "altitude", "dust","force","gps","humidity","pressure","temp"] #list your sensor fields

ser = serial.Serial(
    port='COM14',\
    baudrate=9600,\
    parity=serial.PARITY_NONE,\
    stopbits=serial.STOPBITS_ONE,\
    bytesize=serial.EIGHTBITS,\
        timeout=0)

ser.xonxoff = False
ser.rtscts = False
ser.dsrdtr = False

ser.setRTS(0) 
print("connected to: " + ser.portstr)

while True:
    line = ser.readline()
    values = line.split()
    data = {}
    i = 0
    while i  < len(values):
        data[fields[i]] = values[i]
        i = i + 1
    print(len(values))
    if len(values) == 8:
        print(line)
        params = urllib.urlencode(data)
        print("Sending an update!")
        headers = {}
        headers["Content-Type"] = "application/x-www-form-urlencoded"
        headers["Connection"] = "close"
        headers["Content-Length"] = len(params)
        headers["Phant-Private-Key"] = privateKey
        c = httplib.HTTPConnection(server)
        c.request("POST", "/input/" + publicKey + ".txt", params, headers)
        r = c.getresponse()
        print(r.status, r.reason)
    time.sleep(0.5)

ser.close()
