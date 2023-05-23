import asyncio
import json
import random
import psycopg2
import socket
import os
from websockets.exceptions import ConnectionClosedOK

#dbip = os.environ['SHELTER_DB']

conn = psycopg2.connect(
        host="cms-shelter-db",
        port="5433",
        user="shelter",
        password="20121208",
        dbname="cms_shelter_server"
        )

class Advertiser:
    def __init__(self):
        self.temp = 0
        self.clients = dict()

    async def init_adv(self):
        print('Advertiser has been ready')
        asyncio.create_task(self.runAdvertiser())
        print('advertiser is running')

    async def addClient(self, cl_socket):
        if cl_socket.id in self.clients.keys():
            print(cl_socket.origin, 'is already added')
        else:
            self.clients[cl_socket.id] = cl_socket

    async def printClients(self):
        for idx, cli in enumerate(self.clients.values()):
            print(idx, cli.origin, cli.id)

    async def runAdvertiser(self):
        cnt = 0

        cur = conn.cursor()

        sql = 'SELECT * FROM \"Updator_advertisement_media\"'

        cur.execute(sql)

        advlist = []

        ftp_path = "/ftp/"

        for rst in cur:
            advlist.append(ftp_path + rst[1])

        #advlist = [
        #    "http://ocean.cu.ac.kr/files/W_CONTENTS/1620/20220930170044(1).jpg",
        #    "http://ocean.cu.ac.kr/files/W_CONTENTS/1300/thumb_20190522135811.jpg",
        #    "http://ocean.cu.ac.kr/files/W_CONTENTS/1512/thumb_20211221105853(3).jpg"
        #]

        four_icon = [
            "https://cdn-icons-png.flaticon.com/512/636/636047.png",
            "https://cdn-icons-png.flaticon.com/512/3342/3342137.png",
            "https://cdn-icons-png.flaticon.com/512/686/686308.png",
            "https://cdn-icons-png.flaticon.com/512/5843/5843713.png",
            "https://cdn-icons-png.flaticon.com/512/2940/2940431.png",
            "https://cdn-icons-png.flaticon.com/512/1549/1549454.png"
        ]

        while True:
            for idx, cli in enumerate(self.clients.values()):
                #여기에 사진 링크 보내면 될듯
                data = random.sample(advlist, len(advlist))
                # data_string = json.dumps(four_icon)
                adv_string = json.dumps(data)
                try:
                    await cli.send(adv_string)
                # await cli.send(data_string)
                except ConnectionClosedOK:
                    print(idx, cli.origin, 'data sended', adv_string)
                    del self.clients[cli.id]
                    self.printClients()
                    break

            cnt += 1
            #1초 주기로 데이터 변경됨 -> 주기 변경 가능
            
            await asyncio.sleep(5)
