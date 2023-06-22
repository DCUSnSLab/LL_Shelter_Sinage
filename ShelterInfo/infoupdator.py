import os
import json

shelter_name = os.environ['SHELTER_NAME']
shelter_auth_num = os.environ['SHELTER_AUTH_NUMBER']
shelter_id = os.environ['SHELTER_ID']

# Debug code
# shelter_name = "Park"
# shelter_auth_num = 55123252
# shelter_id = 9

with open('shelter_info.json', 'r') as file:
    data = json.load(file)

data['shelter_name'] = shelter_name
data['access_number'] = shelter_auth_num
data['shelter_id'] = shelter_id

with open('shelter_info.json', 'w') as file:
    json.dump(data, file, indent=4)