import json
import numpy as np
import matplotlib.pyplot as plt
import sys
import logging
import urllib.request, urllib.error
from bs4 import BeautifulSoup,element
import re
a = 1
print(a)
b = {'a':a}
print(b)
# print(json.JSONEncoder().encode(a))
# c = json.JSONEncoder().encode(a)
# print(c)
d = {}
dics = {}
multi_dics = {"body":{},"html":{},"div":{},"tags":{}}
url = "https://www.google.com"

res = urllib.request.urlopen(url=url)

soup = BeautifulSoup(res, 'html.parser')

title_text = soup.find('title').get_text()
print(title_text)

links = [url.get('href') for url in soup.find_all('a')]

# class が quote の div 要素を全て取得する
# quote_elms = soup.find_all('div'}, {'class': 'quote')
div_elms = soup.find_all('div')
print(len(div_elms))
# > 10
html_elem = soup.find_all('html')
body_elem = soup.find_all('body')
all_tags = soup.find_all(True)
print(len(html_elem))
print(len(body_elem))
# print(body_elem)
# result = {'url': len(quote_elms)}
result = {'url': div_elms}


# for i in div_elms:
#     print(i)


# print(json.dumps(result))
# print(json.JSONEncoder().encode(result))
# def get_children(list):
#     for i in list:
#         if isinstance(i,element.Tag):
#             print(type(i))
#             print(i)
#             print(i.name)
#             if not i.name in dics.keys():
#                 dics[i.name] = 1
#             else:
#                 dics[i.name] += 1
#             if hasattr(i,'contents'):
#                 a = i.contents
#                 print(len(a))
#                 # print(a)
#                 if len(a) > 0:
#                     # print(a)
#                     get_children(a)
def get_children(list,tag):
    print(list)
    for i in list:
        if isinstance(i,element.Tag):
            # print(type(i))
            # print(i)
            if i.name == "body":
                print(i.name)
                print(i)
            if not i.name in multi_dics[tag].keys():
                multi_dics[tag][i.name] = 1
            else:
                 multi_dics[tag][i.name] += 1
            if hasattr(i,'contents'):
                a = i.contents
                # print(len(a))
                # print(a)
                if len(a) > 0:
                    # print(a)
                    get_children(a,tag)
# get_children(body_elem,"body")
get_children(div_elms,"div")
# get_children(html_elem,"html")
# get_children(all_tags,"tags")
# for i in dics:
#     print(i,dics[i])
for i in multi_dics:
    print(i,multi_dics[i])





