import pymysql, psycopg2, time, datetime, schedule, json, os
from pathlib import Path
import ftpMediaDownloadClient as ftp
from tabulate import tabulate  # DB 데이터 출력 시 깔끔하게 출력
from filer import createDirectory
from psycopg2.extras import RealDictCursor

BASE_DIR = Path(__file__).resolve().parent
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# 일단 같은 로컬 서버 내에서 DB 연결 수행
# 하지만 외부 쉘터 DB에서 접근해야함으로 이렇게하면 안됨

cms_main_ip = os.environ['CMS_MAIN_IP']
cms_main_dbpw = None

'''
CMS_MAIN_SERVER_DB = pymysql.connect(host='localhost',  # DB 주소
                                     port=3306,  # DB port
                                     user='main01',  # DB 관리자 계정
                                     passwd='main01',  # DB 접속 비밀번호
                                     db='cms_main',  # DB 명
                                     charset='utf8',
                                     cursorclass=pymysql.cursors.DictCursor)
                                     '''

CMS_MAIN_SERVER_DB = psycopg2.connect(host=cms_main_ip,  # DB 주소
                                     port=5432,  # DB port
                                     user='main',  # DB 관리자 계정
                                     password='20121208',  # DB 접속 비밀번호
                                     dbname='cms_main_server',  # DB 명
                                     )

print(CMS_MAIN_SERVER_DB)
main_cursor = CMS_MAIN_SERVER_DB.cursor(cursor_factory=RealDictCursor)  # control structure of database(연결 객체로 봐도 무방)
print(main_cursor)
#print(CMS_MAIN_SERVER_DB.open)
#print(CMS_MAIN_SERVER_DB.ping())

'''
LOCAL_SHELTER_SERVER_DB = pymysql.connect(host='localhost',  # DB 주소
                                          port=3306,  # DB port
                                          user='shelter01',  # DB 관리자 계정
                                          passwd='shelter01',  # DB 접속 비밀번호
                                          db='cms_shelter01',  # DB 명
                                          charset='utf8',
                                          cursorclass=pymysql.cursors.DictCursor)
                                          '''

LOCAL_SHELTER_SERVER_DB = psycopg2.connect(host='cms-shelter-db',  # DB 주소
                                          port=5433,  # DB port
                                          user='shelter',  # DB 관리자 계정
                                          password='20121208',  # DB 접속 비밀번호
                                          dbname='cms_shelter_server',  # DB 명
                                          )

print(LOCAL_SHELTER_SERVER_DB)
local_cursor = LOCAL_SHELTER_SERVER_DB.cursor(cursor_factory=RealDictCursor)  # control structure of database(연결 객체로 봐도 무방)
print(local_cursor)
#print(LOCAL_SHELTER_SERVER_DB.open)
#print(LOCAL_SHELTER_SERVER_DB.ping())


def JsonLoader():
    # BASE_DIR = Path(__file__).resolve().parent.parent
    BASE_DIR = Path(__file__).resolve().parent
    print("BASE", BASE_DIR)
    # print("Test", Path(__file__).resolve().parent)
    #Shelter_info_DIR = str(BASE_DIR) + "/ShelterInfo/shelter_info.json"
    Shelter_info_DIR = str(BASE_DIR) + "/ShelterInfo/shelter_info.json"

    file_exist = os.path.exists(Shelter_info_DIR)

    if file_exist:
        with open(Shelter_info_DIR, 'r', encoding='utf-8') as file:
            info = json.load(file)

        return info

    else:
        print("file not exist")

def DoneUpdate():
    BASE_DIR = Path(__file__).resolve().parent
    Shelter_info_DIR = str(BASE_DIR) + "/ShelterInfo/shelter_info.json"

    file_exist = os.path.exists(Shelter_info_DIR)

    if file_exist:
        with open(Shelter_info_DIR, 'r', encoding='utf-8') as file:
            info = json.load(file)

        now = datetime.datetime.now()

        updated_time = now.strftime('%y-%m-%d %H:%M:%S.%f')

        info["recent_updated"] = updated_time

        with open(Shelter_info_DIR, 'w', encoding='utf-8') as file:
            json.dump(info, file, indent=4)

        return updated_time

    else:
        print("file not exist")


def RecordExistCheck():
    local_cursor.execute("SELECT id from \"Updator_shelter\"")
    checksum = local_cursor.fetchall()

    # print(type(a))
    # print(a)
    # print(len(a))

    if len(checksum) != 0:
        print("레코드 있음")

        return True

    elif len(checksum) == 0:
        print("레코드 없음")

        return False

def GetShelter(s_id, exist):

    if exist == False:
        print(s_id)
        print(type(s_id))
        main_cursor.execute("SELECT * FROM \"Management_shelter\" WHERE id = {id}".format(id=s_id))

        shelter = main_cursor.fetchall()
        for s in shelter:
            # print(json.dumps(s, indent=4, default=str))  # 딕셔너리, 키값으로 접근가능 record['id'], record['title']

            values = (s['id'],
                      s['title'],
                      s['shelter_description'],
                      s['shelter_status'],
                      s['add_states'],
                      s['add_city'],
                      s['add_town'],
                      s['add_last'],
                      s['access_number'],
                      s['createDate'],
                      s['lastEditDate'],
                      s['localupdateDate'],
                      )

            local_cursor.execute("INSERT INTO \"Updator_shelter\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", values)

            # Shelter_media
            main_cursor.execute("SELECT * FROM \"Management_shelter_media\" WHERE \"shelterFK\" = {id}".format(id=s['id']))


            shelter_media = main_cursor.fetchall()
            for sm in shelter_media:
                # print(json.dumps(sm, indent=4, default=str))

                values = (sm['id'],
                          sm['shelter_profile'],
                          sm['contentQR'],
                          sm['communityQR'],
                          sm['shelterFK'],
                          )

                if exist == False:
                    local_cursor.execute("INSERT INTO \"Updator_shelter_media\" VALUES(%s, %s, %s, %s, %s);", values)

                    if sm['shelter_profile'] != "":
                        ftp.MediaDownload(sm['shelter_profile'])
                        print("쉘터 프로필 동기화 파일", sm['shelter_profile'])

                    else:
                        print("no image")

                    if sm['contentQR'] != "":
                        ftp.MediaDownload(sm['contentQR'])
                        print("쉘터 콘텐츠QR 동기화 파일", sm['contentQR'])

                    else:
                        print("no image")

                    if sm['communityQR'] != "":
                        ftp.MediaDownload(sm['communityQR'])
                        print("쉘터 커뮤니티QR 동기화 파일", sm['communityQR'])

                    else:
                        print("no image")

                elif exist == True:
                    pass

    elif exist == True:
        pass

def GetCommunity(s_id, exist):

    # 쉘터에 연동된 커뮤니티 객체
    main_cursor.execute("SELECT * FROM \"Management_community\" WHERE \"shelterFK\" = {fk}".format(fk=s_id))

    community = main_cursor.fetchall()

    for com in community:
        # print(json.dumps(com, indent=4, default=str))

        values = (com['id'],
                  com['name'],
                  com['createDate'],
                  com['lastEditDate'],
                  com['isUpdate'],
                  com['community_status'],
                  com['shelterFK'],
                  )

        if exist == False:
            local_cursor.execute("INSERT INTO \"Updator_community\" VALUES(%s, %s, %s, %s, %s, %s, %s);", values)

        elif exist == True:
            pass

        isUpdate = True
        id = com['id']
        update = (isUpdate, id)

        main_cursor.execute("UPDATE \"Management_community\" SET \"isUpdate\" = {update_1} WHERE \"id\" = {update_2};".format(update_1=update[0],update_2=update[1]))

        # 커뮤니티에 연동된 일상게시판
        main_cursor.execute("SELECT * FROM \"Management_daily_board\" WHERE \"communityFK\" = {cfk}".format(cfk=com['id']))

        dboard = main_cursor.fetchall()
        for db in dboard:
            # print(json.dumps(db, indent=4, default=str))

            values = (db['id'],
                      db['name'],
                      db['board_status'],
                      db['createDate'],
                      db['lastEditDate'],
                      db['isUpdate'],
                      db['communityFK'],
                      )

            if exist == False:
                local_cursor.execute("INSERT INTO \"Updator_daily_board\" VALUES(%s, %s, %s, %s, %s, %s, %s);", values)

            elif exist == True:
                pass

            isUpdate = True
            id = db['id']
            update = (isUpdate, id)

            main_cursor.execute("UPDATE \"Management_daily_board\" SET \"isUpdate\" = {update_1} WHERE id = {update_2};".format(update_1=update[0], update_2=update[1]))

            # 일상게시판 연동된 댓글
            if exist == False:
                main_cursor.execute("SELECT * FROM \"Management_comment\" WHERE \"dboardFK\" = {id}".format(id=db['id']))

            elif exist == True:
                values = (db['id'], False)
                main_cursor.execute("SELECT * FROM \"Management_comment\" WHERE \"dboardFK\" = {values_1} AND \"isUpdate\" = {values_2}".format(values_1=values[0], values_2=values[1]))

            comment = main_cursor.fetchall()
            for c in comment:
                # print(json.dumps(c, indent=4, default=str))

                values = (c['id'],
                          c['text'],
                          c['email'],
                          c['comment_status'],
                          c['boardType'],
                          c['createDate'],
                          c['lastEditDate'],
                          c['isUpdate'],
                          c['dboardFK'],
                          c['iboardFK'],
                          )

                local_cursor.execute("INSERT INTO \"Updator_comment\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", values)

                isUpdate = True
                id = c['id']
                update = (isUpdate, id)

                main_cursor.execute("UPDATE \"Management_comment\" SET \"isUpdate\" = %s WHERE \"id\" = %s;", update)


                # 댓글에 연동된 미디어 댓글
                main_cursor.execute("SELECT * FROM \"Management_comment_media\" WHERE \"commentFK\" = {cfk}".format(cfk=c['id']))

                media = main_cursor.fetchall()
                for m in media:
                    # print(json.dumps(m, indent=4, default=str))

                    values = (m['id'],
                              m['image'],
                              m['commentFK'],
                              )

                    local_cursor.execute("INSERT INTO \"Updator_comment_media\" VALUES(%s, %s, %s);", values)

                    if m['image'] != "":
                        ftp.MediaDownload(m['image'])
                        print("일상 게시판 동기화 파일", m['image'])

                    else:
                        print("no image")

        # 커뮤니티에 연동된 이슈게시판
        main_cursor.execute("SELECT * FROM \"Management_issue_board\" WHERE \"communityFK\" = {cfk}".format(cfk=com['id']))

        iboard = main_cursor.fetchall()
        for ib in iboard:
            # print(json.dumps(ib, indent=4, default=str))

            values = (ib['id'],
                      ib['name'],
                      ib['board_status'],
                      ib['createDate'],
                      ib['lastEditDate'],
                      ib['isUpdate'],
                      ib['communityFK'],
                      )

            if exist == False:
                local_cursor.execute("INSERT INTO \"Updator_issue_board\" VALUES(%s, %s, %s, %s, %s, %s, %s );", values)

            elif exist == True:
                pass

            isUpdate = True
            id = ib['id']
            update = (isUpdate, id)

            main_cursor.execute("UPDATE \"Management_issue_board\" SET \"isUpdate\" = {update_1} WHERE id = {update_2};".format(update_1=update[0], update_2=update[1]))

            # 이슈게시판 연동된 댓글
            if exist == False:
                main_cursor.execute("SELECT * FROM \"Management_comment\" WHERE \"iboardFK\" = {bfk}".format(bfk=ib['id']))

            elif exist == True:
                values = (ib['id'], False)
                main_cursor.execute("SELECT * FROM \"Management_comment\" WHERE \"iboardFK\" = {bfk} AND \"isUpdate\" = {boolean}".format(bfk=values[0], boolean=values[1]))

            comment = main_cursor.fetchall()
            for c in comment:
                # print(json.dumps(c, indent=4, default=str))

                values = (c['id'],
                          c['text'],
                          c['email'],
                          c['comment_status'],
                          c['boardType'],
                          c['createDate'],
                          c['lastEditDate'],
                          c['isUpdate'],
                          c['dboardFK'],
                          c['iboardFK'],
                          )

                local_cursor.execute("INSERT INTO \"Updator_comment\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", values)

                isUpdate = True
                id = c['id']
                update = (isUpdate, id)

                main_cursor.execute("UPDATE \"Management_comment\" SET \"isUpdate\" = %s WHERE \"id\" = %s;", update)


                # 댓글에 연동된 미디어 댓글
                main_cursor.execute("SELECT * FROM \"Management_comment_media\" WHERE \"commentFK\" = {cfk}".format(cfk=c['id']))
                media = main_cursor.fetchall()
                for m in media:
                    # print(json.dumps(m, indent=4, default=str))

                    values = (m['id'],
                              m['image'],
                              m['commentFK'],
                              )

                    local_cursor.execute("INSERT INTO \"Updator_comment_media\" VALUES(%s, %s, %s);", values)


                    if m['image'] != "":
                        ftp.MediaDownload(m['image'])
                        print("이슈 게시판 동기화 파일", m['image'])

                    else:
                        print("no image")

def GetAdvertisement(s_id, exist):
    # 쉘터에 연동된 광고 객체
    if exist == False:
        main_cursor.execute("SELECT * FROM \"Management_advertisement\" WHERE \"shelterFK\" = {sfk}".format(sfk=s_id))

    elif exist == True:
        values = (s_id, False)
        main_cursor.execute("SELECT * FROM \"Management_advertisement\" WHERE \"shelterFK\" = {sfk} AND \"isUpdate\" = {boolean}".format(sfk=values[0], boolean=values[1]))

    advertisement = main_cursor.fetchall()
    for ad in advertisement:
        # print(json.dumps(ad, indent=4, default=str))

        values = (ad['id'],
                  ad['name'],
                  ad['adType'],
                  ad['company'],
                  ad['advertiser'],
                  ad['email'],
                  ad['phone'],
                  ad['advertisement_status'],
                  ad['createDate'],
                  ad['lastEditDate'],
                  ad['isUpdate'],
                  ad['shelterFK'],
                  )

        local_cursor.execute("INSERT INTO \"Updator_advertisement\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", values)

        isUpdate = True
        id = ad['id']
        update = (isUpdate, id)

        main_cursor.execute("UPDATE \"Management_advertisement\" SET \"isUpdate\" = %s WHERE \"id\" = %s;", update)


        main_cursor.execute("SELECT * FROM \"Management_advertisement_media\" WHERE \"advertisementFK\" = {id}".format(id=ad['id']))
        adv_media = main_cursor.fetchall()
        for adv in adv_media:
            # print(json.dumps(adv, indent=4, default=str))

            values = (adv['id'],
                      adv['content'],
                      adv['type'],
                      adv['advertisementFK'],
                      )

            local_cursor.execute("INSERT INTO \"Updator_advertisement_media\" VALUES(%s, %s, %s, %s);", values)

            ftp.MediaDownload(adv['content'])


def GetContent(s_id, exist):
    # 쉘터에 연동된 콘텐츠 객체
    if exist == False:
        main_cursor.execute("SELECT * FROM \"Management_content\" WHERE \"shelterFK\" = {sfk}".format(sfk=s_id))

    elif exist == True:
        values = (s_id, False)
        main_cursor.execute("SELECT * FROM \"Management_content\" WHERE \"shelterFK\" = {sfk} AND \"isUpdate\" = {boolean}".format(sfk=values[0], boolean=values[1]))

    content = main_cursor.fetchall()
    for con in content:
        # print(json.dumps(con, indent=4, default=str))

        values = (con['id'],
                  con['title'],
                  con['email'],
                  con['content_status'],
                  con['contentType'],
                  con['hits'],
                  con['likes'],
                  con['createDate'],
                  con['lastEditDate'],
                  con['isUpdate'],
                  con['shelterFK'],
                  )

        local_cursor.execute("INSERT INTO \"Updator_content\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", values)

        isUpdate = True
        id = con['id']
        update = (isUpdate, id)

        main_cursor.execute("UPDATE \"Management_content\" SET \"isUpdate\" = %s WHERE id = %s;", update)

        main_cursor.execute("SELECT * FROM \"Management_content_description\" WHERE \"contentFK\" = {cfk}".format(cfk=con['id']))
        cont_media = main_cursor.fetchall()
        for cont in cont_media:
            # print(json.dumps(cont, indent=4, default=str))

            values = (cont['id'],
                      cont['upload_file'],
                      cont['description'],
                      cont['width'],
                      cont['height'],
                      cont['HVType'],
                      cont['thumbnailPath'],
                      cont['contentFK'],
                      )

            local_cursor.execute("INSERT INTO \"Updator_content_description\" VALUES(%s, %s, %s, %s, %s, %s, %s, %s);", values)

            ftp.MediaDownload(cont['upload_file'])
            print("콘텐츠 동기화 파일", cont['upload_file'])

            if cont['thumbnailPath'] != None:
                ftp.MediaDownload(cont['thumbnailPath'])
                print("콘텐츠 동기화 파일_영상이면 썸네일", cont['upload_file'])

            else:
                print("no path, it's image, no thumbnail")

def QuerySet(shelter_id, exist):
    GetShelter(shelter_id, exist)
    GetCommunity(shelter_id, exist)
    GetAdvertisement(shelter_id, exist)
    GetContent(shelter_id, exist)

    updated_time = DoneUpdate()

    update = (updated_time, shelter_id)

    #main_cursor.execute("UPDATE \"Management_shelter\" SET \"localupdateDate\" = \'{localupdate}\' WHERE \"id\" = {id};".format(localupdate=update[0] + "+00", id=update[1]))

    main_cursor.execute("UPDATE \"Management_shelter\" SET \"localupdateDate\" = now() WHERE \"id\" = {id};".format(id=update[1]))   

    LOCAL_SHELTER_SERVER_DB.commit()
    CMS_MAIN_SERVER_DB.commit()

def DBQuery():
    shelter_info = JsonLoader()
    shelter_id = shelter_info['shelter_id']
    exist = RecordExistCheck()

    if exist == True:   # 레코드가 DB에 존재, 업데이트 이력있음
        print("update")
        QuerySet(shelter_id, exist)

    elif exist == False: # 레코드가 DB에 없음, 업데이트 이력없음
        print("init")
        QuerySet(shelter_id, exist)

    # 데이터 시각화용
    # table = pd.DataFrame(result)
    # print(tabulate(table,
    #                headers='keys',  # 각 컬럼 이름 명시 여부
    #                tablefmt='psql', # 디자인형태
    #                showindex=True,
    #                numalign='left')) # row index 표시

# 매초마다 해당 함수 호출(테스트용)
schedule.every(5).seconds.do(DBQuery)

# 매일 특정시간에 동작(03:00) 새벽 3시(서비스용)
# schedule.every().day.at("03:00").do(DBQuery)

while (True):
    schedule.run_pending()
    print("스케줄 체크 완료..")
    time.sleep(1)

# db.close()
