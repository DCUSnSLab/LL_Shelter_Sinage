import asyncio  # 웹 소켓 모듈을 선언한다.
import json
import pickle
import websockets  # 클라이언트 접속이 되면 호출된다.
import socket
import sysv_ipc

from advertiser import Advertiser


async def accept(websocket, path):
    print('accepted', websocket.origin, websocket.id)

    try:
        while True:
            data = await websocket.recv()  # 클라이언트로부터 메시지를 대기한다.
            recvdata = json.loads(data)
            recvMsg = str(recvdata['message'])
            order = int(recvMsg[0])
            try:
                data = int(recvMsg[1:])
            except:
                data = order

            print('data Check order=', order, 'data=',data)

            #if you receive '0' data from client once, add client socket into Advertiser client list
            if order == 0: #advertise mode ready to client
                await adv.addClient(websocket)
                await adv.printClients()
            elif order == 1: #advertiser sync mode
                print('sync mode data=',data)
                adv_mq.send(str(data), True, type=1) #type String
                pass
            elif order == 2: #content request mode
                cont_mq.send(str(data), True, type=1) #type String
                pass
            else:
                print("Wrong Messages",data)
    except Exception as e:
        print("------Disconnected socket----->>>",websocket.origin, websocket.id)
        print(e)

adv = Advertiser()
adv_mq = sysv_ipc.MessageQueue(3820, mode=0o666, flags=sysv_ipc.IPC_CREAT)
cont_mq = sysv_ipc.MessageQueue(3880, mode=0o666, flags=sysv_ipc.IPC_CREAT)

async def main():
    await adv.init_adv()
    print("host ip")
    IP = socket.gethostbyname(socket.gethostname())
    # IP = "127.0.0.1"
    async with websockets.serve(accept, IP, 5000):
        await asyncio.Future()


asyncio.run(main())
