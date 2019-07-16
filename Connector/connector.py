import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="nimfinder"
)

mycursor = mydb.cursor()

with open("res.txt","r") as f :
    for l in f :
        data = [x.strip() for x in l.split("\t")[0].split(",")] + [l.split("\t")[1].strip()]
        if len(data) == 3 :
            sql = "INSERT into nimdb (nim_tpb,nim_jur,name) VALUES (%s,%s,%s)"
        elif len(data) == 2 :
            sql = "INSERT into nimdb (nim_tpb,name) VALUES (%s,%s)"
        mycursor.execute(sql,data)

mydb.commit()

mycursor.close()
mydb.close()