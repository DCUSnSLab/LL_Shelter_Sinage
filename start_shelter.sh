export PATH=$PATH:$NPM_PATH

echo $PATH

# Migrate shelter_server DB

IP=$(ifconfig eth0 | awk '/inet/ { print $2 }')
echo $IP

PORT=":8000"

DEST=${IP}${PORT}

cd /root/LivingLab-ShelterServer/local_shelter_server

sleep 3s

python3 manage.py migrate # migrate database

python3 manage.py runserver $DEST &

#--------------------------

# Start WiFi Page

sleep 2s

cd /root/Livinglab_WiFi

# npm install and start
/bin/bash -c "source $NVM_DIR/nvm.sh && nvm use --delete-prefix $NODE_VERSION && PORT=3001 npm start &"

#--------------------------

# Start IDLE Page
sleep 2s

cd /root/LivingLab-CMS-IDLE/Client/client_react

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
