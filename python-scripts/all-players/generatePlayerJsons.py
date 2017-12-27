import csv
import pprint
import json

batter_dict = dict()
pitcher_dict = dict()

with open('all-players.csv', 'rb') as csvfile:
	reader = csv.reader(csvfile)
	reader.next() # skips the header
	for row in reader:
		batter_type = row[2]
		if row[0].lower() == 'p':
			types = row[2].split("/")
			pitcher_type = types[0]
			batter_type = types[1]
			pitcher_dict[row[1]] = {
				'type': pitcher_type,
				'hand': row[3]
			}
		print(row[0].lower(), '-', row[1])
		batter_dict[row[1]] = {
			'type': batter_type,
			'hand': row[3]
		}

with open('pitchers.json', 'w') as fp:
	json.dump(pitcher_dict, fp, indent=4)

with open('batters.json', 'w') as fp:
	json.dump(batter_dict, fp, indent=4)	