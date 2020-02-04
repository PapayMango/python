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

url = "https://www.google.com"
# スクレイピング対象の URL にリクエストを送り HTML を取得する
res = urllib.request.urlopen(url=url)

# レスポンスの HTML から BeautifulSoup オブジェクトを作る
soup = BeautifulSoup(res, 'html.parser')

# title タグの文字列を取得する
title_text = soup.find('title').get_text()
print(title_text)
# > Quotes to Scrape

# ページに含まれるリンクを全て取得する
links = [url.get('href') for url in soup.find_all('a')]
# print(links)
# > ['/', '/login', '/author/Albert-Einstein', '/tag/change/page/1/', '/tag/deep-thoughts/page/1/', '/tag/thinking/page/1/', '/tag/world/page/1/', '/author/J-K-Rowling', '/tag/abilities/page/1/', '/tag/choices/page/1/', '/author/Albert-Einstein', '/tag/inspirational/page/1/', '/tag/life/page/1/', '/tag/live/page/1/', '/tag/miracle/page/1/', '/tag/miracles/page/1/', '/author/Jane-Austen', '/tag/aliteracy/page/1/', '/tag/books/page/1/', '/tag/classic/page/1/', '/tag/humor/page/1/', '/author/Marilyn-Monroe', '/tag/be-yourself/page/1/', '/tag/inspirational/page/1/', '/author/Albert-Einstein', '/tag/adulthood/page/1/', '/tag/success/page/1/', '/tag/value/page/1/', '/author/Andre-Gide', '/tag/life/page/1/', '/tag/love/page/1/', '/author/Thomas-A-Edison', '/tag/edison/page/1/', '/tag/failure/page/1/', '/tag/inspirational/page/1/', '/tag/paraphrased/page/1/', '/author/Eleanor-Roosevelt', '/tag/misattributed-eleanor-roosevelt/page/1/', '/author/Steve-Martin', '/tag/humor/page/1/', '/tag/obvious/page/1/', '/tag/simile/page/1/', '/page/2/', '/tag/love/', '/tag/inspirational/', '/tag/life/', '/tag/humor/', '/tag/books/', '/tag/reading/', '/tag/friendship/', '/tag/friends/', '/tag/truth/', '/tag/simile/', 'https://www.goodreads.com/quotes', 'https://scrapinghub.com']

# class が quote の div 要素を全て取得する
# quote_elms = soup.find_all('div'}, {'class': 'quote')
div_elms = soup.find_all('div')
print(len(div_elms))
# > 10

# result = {'url': len(quote_elms)}
result = {'url': div_elms}
print(type(result))
print(type(div_elms))
# for i in div_elms:
#     print(i)


# print(json.dumps(result))
# print(json.JSONEncoder().encode(result))
def get_children(list):
    for i in list:
        if isinstance(i,element.Tag):
            print(type(i))
            print(i)
            print(i.name)
        if hasattr(i,'contents'):
            a = i.contents
            if len(a) > 0:
                # print(a)
                get_children(a)
get_children(div_elms[0])

