import asyncio  # 웹 소켓 모듈을 선언한다.
import json
import pickle
import websockets  # 클라이언트 접속이 되면 호출된다.

from advertiser import Advertiser

async def accept(websocket, path):
    print('accepted', websocket.origin, websocket.id)
    while True:
        data = await websocket.recv()  # 클라이언트로부터 메시지를 대기한다.
        recvdata = json.loads(data)
        recvMsg = int(recvdata['message'])

        #if you receive '0' data from client once, add client socket into Advertiser client list
        if recvMsg == 0: #advertise mode ready to client
            await adv.addClient(websocket)
            await adv.printClients()
        else:
            print("Wrong Messages",data)

adv = Advertiser()

async def main():
    await adv.init_adv()
    ipaddr = get_ip_address('eth0')
    async with websockets.serve(accept, ipaddr, 5000):
        await asyncio.Future()


asyncio.run(main())
