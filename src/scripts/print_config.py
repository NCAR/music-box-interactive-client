import sys
import json
from music_box import MusicBox

def main(args):
    # args[0] is the script name itself, so we skip that
    with open(args[1], 'r') as f:
        data = json.load(f)
    print(json.dumps(data, indent=4))

    box_model = MusicBox()
    box_model.readFromUIJsonString(json.loads(data[0]))
    box_model.generateConfig("")
    box_model.readConditionsFromJson("./src/configs/_config.json")
    box_model.create_solver("./src/configs/camp_data")
    print(box_model.solve())


if __name__ == '__main__':
    main(sys.argv)