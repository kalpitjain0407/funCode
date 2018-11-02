from selenium import webdriver
from getpass import getpass

usernamestr = input("Enter your username")
userpassstr = input("Enter your password")

browser = webdriver.Chrome()
browser.get(('https://172.16.1.1:8090/httpclient.html?u=http://go.microsoft.com/fwlink/?LinkID=219472&clcid=0x409'))

username = browser.find_element_by_name('username')
username.send_keys(usernamestr)
password = browser.find_element_by_name('password')
password.send_keys(userpassstr)
login = browser.find_element_by_name('btnSubmit')
login.submit()