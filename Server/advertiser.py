import asyncio
import json
import random
import psycopg2
import socket
import os
import time
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

        # flag variable for websocket msg send.
        # True : send messages
        # False : do not send messages

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
        print("runAdvertiser called.")

        cur = conn.cursor()

        sql = 'SELECT * FROM \"Updator_advertisement_media\"'

        cur.execute(sql)

        advlist = []

        ftp_path = "/ftp/"

        interval = 0.5

        for rst in cur:
            advlist.append([ftp_path + rst[1], rst[3]])
        random.shuffle(advlist)
        while True:
            if len(self.clients) > 0: # 최소 1개의 클라이언트가 있는 경우에 동작
                for idx, cli in enumerate(self.clients.values()):
                    adv_string = json.dumps(advlist)
                    try:
                        await cli.send(adv_string)
                    # await cli.send(data_string)
                    except ConnectionClosedOK:
                        print(idx, cli.origin, 'data sended', adv_string)
                        del self.clients[cli.id]
                        self.printClients()
                        break
                break
            await asyncio.sleep(interval) # 클라이언트가 하나도 ㅇ벗는 경우, 비동기적으로 대기합니다.

        initclients = len(self.clients)

        while True:
            #print("runadv while loop, loop interval :", interval)

            new_advlist = []

            cur.execute(sql)

            for rst in cur:
                new_advlist.append([ftp_path + rst[1], rst[3]])

            random.shuffle(new_advlist)

            if (new_advlist != advlist) or (initclients != len(self.clients)):
                initclients = len(self.clients)
                for idx, cli in enumerate(self.clients.values()):
                    #여기에 사진 링크 보내면 될듯
                    # data = random.sample(advlist, len(advlist))
                    # data_string = json.dumps(four_icon)
                    adv_string = json.dumps(new_advlist)
                    try:
                        await cli.send(adv_string)
                    # await cli.send(data_string)
                    except ConnectionClosedOK:
                        print(idx, cli.origin, 'data sended', adv_string)
                        del self.clients[cli.id]
                        self.printClients()
                        break

                #1초 주기로 데이터 변경됨 -> 주기 변경 갥
            else:
                pass
            await asyncio.sleep(interval)
