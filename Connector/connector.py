import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="12345",
    database="nimfinder"
)

mycursor = mydb.cursor()

sql = "INSERT into nimdb (nimJur,nimTPB,name) VALUES (%s,%s,%s)"
val = [
    
]