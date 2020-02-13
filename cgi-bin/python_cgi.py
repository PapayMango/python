import cgi
import cgitb
import sys
import json
import logging
import urllib.request, urllib.error
from bs4 import BeautifulSoup,element
import re

# try:
#     logger = logging.getLogger(__name__)
cgitb.enable()
# logger.debug("test")



data = sys.stdin.read()
params = json.loads(data)
url = params['url']

# スクレイピング対象の URL にリクエストを送り HTML を取得する
res = urllib.request.urlopen(url=url)

# レスポンスの HTML から BeautifulSoup オブジェクトを作る
soup = BeautifulSoup(res, 'html.parser')

# title タグの文字列を取得する
# title_text = soup.find('title').get_text()
# print(title_text)
# > Quotes to Scrape

# ページに含まれるリンクを全て取得する
links = [url.get('href') for url in soup.find_all('a')]
# print(links)g
# > ['/', '/login', '/author/Albert-Einstein', '/tag/change/page/1/', '/tag/deep-thoughts/page/1/', '/tag/thinking/page/1/', '/tag/world/page/1/', '/author/J-K-Rowling', '/tag/abilities/page/1/', '/tag/choices/page/1/', '/author/Albert-Einstein', '/tag/inspirational/page/1/', '/tag/life/page/1/', '/tag/live/page/1/', '/tag/miracle/page/1/', '/tag/miracles/page/1/', '/author/Jane-Austen', '/tag/aliteracy/page/1/', '/tag/books/page/1/', '/tag/classic/page/1/', '/tag/humor/page/1/', '/author/Marilyn-Monroe', '/tag/be-yourself/page/1/', '/tag/inspirational/page/1/', '/author/Albert-Einstein', '/tag/adulthood/page/1/', '/tag/success/page/1/', '/tag/value/page/1/', '/author/Andre-Gide', '/tag/life/page/1/', '/tag/love/page/1/', '/author/Thomas-A-Edison', '/tag/edison/page/1/', '/tag/failure/page/1/', '/tag/inspirational/page/1/', '/tag/paraphrased/page/1/', '/author/Eleanor-Roosevelt', '/tag/misattributed-eleanor-roosevelt/page/1/', '/author/Steve-Martin', '/tag/humor/page/1/', '/tag/obvious/page/1/', '/tag/simile/page/1/', '/page/2/', '/tag/love/', '/tag/inspirational/', '/tag/life/', '/tag/humor/', '/tag/books/', '/tag/reading/', '/tag/friendship/', '/tag/friends/', '/tag/truth/', '/tag/simile/', 'https://www.goodreads.com/quotes', 'https://scrapinghub.com']

div_elms = soup.find_all('div')
a_elms = soup.find_all('a')
span_elms = soup.find_all('span')
p_elms = soup.find_all('p')
h_elms = soup.find_all(re.compile('h?'))
# print(len(quote_elms))
# > 10

result = {'div':len(div_elms),'a':len(a_elms),'span':len(span_elms),'p':len(p_elms),'h':len(h_elms)}

print('Content-Type:application/json\n\n')
print(json.dumps(result))