import cgi
import cgitb
import sys
import json

cgitb.enable()

print("Content-type: application/json")
print("\n\n")

data = sys.stdin.read()
params = json.loads(data)
text = params['text']


result = {'text': text}

print(json.JSONEncoder().encode(result))
print('\n')