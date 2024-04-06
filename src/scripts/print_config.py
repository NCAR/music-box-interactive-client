import sys
import json

def main(args):
    # args[0] is the script name itself, so we skip that
    with open(args[1], 'r') as f:
        data = json.load(f)
    print(json.dumps(data, indent=4))

if __name__ == '__main__':
    main(sys.argv)