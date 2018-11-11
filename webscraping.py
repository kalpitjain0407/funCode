import re
import urllib.request
word = input("Enter a word : ")
url = "https://en.oxforddictionaries.com/definition/"
url = url + word
print(url)
data = urllib.request.urlopen(url).read()
data1 = data.decode("utf-8")
print(data1)
m = re.search('<meta name="description" content="',data1)
start = m.end()
end = start + 150
newString = data1[start:end]
print(newString)
