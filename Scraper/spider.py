# Scraper by I Putu Gede Wirasuta (https://github.com/wirasuta)

import requests
from itertools import product
from time import sleep

notfound_count = 0

nimtpb = ['160','161','162','163','164','165','166','167','168','169','197','198','199']

res = []

def scrap_by_nim(nim):
    global notfound_count
    url = 'https://nic.itb.ac.id/manajemen-akun/pengecekan-user'
    cookie = {'':'' } #insert session cookie here
    body = {'uid': nim}
    r = requests.post(url, data=body, cookies=cookie)
    if 'tidak ditemukan' in r.text:
        print(f'NIM {nim} tidak ada')
        notfound_count += 1
    else:
        if notfound_count != 0:
            notfound_count = 0
        r = r.text.split(":")
        r = [st.strip().replace('\t','') for st in r]
        nim = r[105].split('<td>')[1].split('</td>')[0]
        nama = r[106].split('<td>')[1].split('</td>')[0]
        print(f'{nim} : {nama}')
        res.append(f'{nim} : {nama}')

def main():
    global notfound_count
    for kode in nimtpb:
        base = f'{kode}0'
        for i in range(8,9):
            for j in range(10,100):
                nim = f'{base}{i}0{j}'
                scrap_by_nim(nim)
                if notfound_count >= 10:
                    notfound_count = 0
                    break

if __name__ == "__main__":
    main()
    with open("res.txt","w") as f:
        for result in res :
            f.write(result)
            f.write("\n")