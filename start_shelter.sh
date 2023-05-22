cd /root/LL_Shelter_Sinage/ShelterInfo

sh infoupdator.sh

export PATH=$PATH:$NPM_PATH

echo $PATH

# Migrate shelter_server DB

IP=$(ifconfig eth0 | awk '/inet/ { print $2 }')
echo $IP

PORT=":8000"

DEST=${IP}${PORT}

cd /root/LL_Shelter_API-Server/local_shelter_server

sleep 3s

# Check db container connection
while :
do
	# Check db container connection via ping cmd
	ping -c1 cms_shelter_db > /dev/null 2>&1
	if [ $? -eq 0 ];then # if database container connected,
		sleep 5s
		python3 manage.py migrate # migrate database
		break # and brack while loop
	else
		echo "Not detec shelter database server..."
		sleep 3s
	fi
done

python3 manage.py runserver $DEST &

#--------------------------

# Start WiFi Page

sleep 2s

cd /root/LL_Shelter_WIFI

# npm install and start
/bin/bash -c "source $NVM_DIR/nvm.sh && nvm use --delete-prefix $NODE_VERSION && PORT=3001 npm start &"

#--------------------------

# Start IDLE Page
sleep 2s

cd /root/LL_Shelter_Sinage/Client/client_react

#npm start &
/bin/bash -c "source $NVM_DIR/nvm.sh && nvm use --delete-prefix $NODE_VERSION && npm start &"

#--------------------------

# Start ShelterUpdator script

cd ../../

python3 ShelterUpdator.py &
# python3 server.py &

#--------------------------

# Start Websocket publisher script

cd Server/

python3 server.py
#python3 ShelterUpdator.py
