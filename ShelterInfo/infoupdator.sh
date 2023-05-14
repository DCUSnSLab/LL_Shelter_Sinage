json_file="shelter_info.json"

# specify the parameter you want to modify and its new value
shelter_name=$SHELTER_NAME
shelter_auth_num=$SHELTER_AUTH_NUMBER
shelter_id=$SHELTER_ID

# use sed to modify the parameter value in the json file
json_data=$(printf '{"shelter_name": "%s", "access_number": %s, "shelter_id": %d, "recent_updated": null}' $SHELTER_NAME $SHELTER_AUTH_NUMBER $SHELTER_ID)

# use jq to validate the modified json file and save it
echo "$json_data" | jq '.' > "$json_file"