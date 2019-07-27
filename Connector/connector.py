import mysql.connector

def validateNIM(nim) :
    t = nim[0:3]
    if t == "101" :
        return "Matematika"
    elif t == "102" :
        return "Fisika"
    elif t == "103" :
        return "Astronomi"
    elif t == "104" :
        return "Mikrobiologi"
    elif t == "105" :
        return "Kimia"
    elif t == "106" :
        return "Biologi"
    elif t == "107" :
        return "Sains dan Teknologi Farmasi"
    elif t == "108" :
        return "Aktuaria"
    elif t == "112" :
        return "Rekayasa Hayati"
    elif t == "114" :
        return "Rekayasa Pertanian"
    elif t == "115" :
        return "Rekayasa Kehutanan"
    elif t == "116" :
        return "Farmasi Klinik dan Komunitas"
    elif t == "119" :
        return "Teknologi Pascapanen"
    elif t == "120" :
        return "Teknik Geologi"
    elif t == "121" :
        return "Teknik Pertambangan"
    elif t == "122" :
        return "Teknik Perminyakan"
    elif t == "123" :
        return "Teknik Geofisika"
    elif t == "124" :
        return "Geofisika"
    elif t == "125" :
        return "Teknik Metalurgi"
    elif t == "128" :
        return "Meteorologi"
    elif t == "129" :
        return "Oseanografi"
    elif t == "130" :
        return "Teknik Kimia"
    elif t == "131" :
        return "Teknik Mesin"
    elif t == "132" :
        return "Teknik Elektro"
    elif t == "133" :
        return "Fisika Teknik"
    elif t == "134" :
        return "Teknik Industri"
    elif t == "135" :
        return "Teknik Informatika"
    elif t == "136" :
        return "Teknik Dirgantara"
    elif t == "137" :
        return "Teknik Material"
    elif t == "143" :
        return "Teknik Pangan"
    elif t == "144" :
        return "Manajemen Rekayasa Industri"
    elif t == "145" :
        return "Teknik Bioenergi dan Kemurgi"
    elif t == "150" :
        return "Teknik Sipil"
    elif t == "151" :
        return "Teknik Geodesi dan Geomatika"
    elif t == "152" :
        return "Arsitektur"
    elif t == "153" :
        return "Teknik Lingkungan"
    elif t == "154" :
        return "Perencanaan Wilayah dan Kota"
    elif t == "155" :
        return "Teknik Kelautan"
    elif t == "157" :
        return "Rekayasa Infrastruktur Lingkungan"
    elif t == "158" :
        return "Teknik dan Pengelolaan Sumber Daya Air"
    elif t == "170" :
        return "Seni Rupa"
    elif t == "172" :
        return "Kriya"
    elif t == "173" :
        return "Desain Interior"
    elif t == "174" :
        return "Desain Komunikasi Visual"
    elif t == "175" :
        return "Desain Produk"
    elif t == "180" :
        return "Teknik Tenaga Listrik"
    elif t == "181" :
        return "Teknik Telekomunikasi"
    elif t == "182" :
        return "Sistem dan Teknologi Informasi"
    elif t == "183" :
        return "Teknik Biomedis"
    elif t == "190" :
        return "Manajemen"
    elif t  == "192" :
        return "Kewirausahaan"

mydb = mysql.connector.connect(
    host="",
    user="",
    password="",
    database=""
)

mycursor = mydb.cursor()
#mycursor.execute("CREATE TABLE nimdb (nim_tpb VARCHAR(255), nim_jur VARCHAR(255), name VARCHAR(255), jur VARCHAR(255))")

with open("res.txt","r") as f :
    for l in f :
        data = [x.strip() for x in l.split("\t")[0].split(",")] + [l.split("\t")[1].strip()]
        if len(data) == 3 :
            data.append(validateNIM(data[1]))
            sql = "INSERT into nimdb (nim_tpb,nim_jur,name,jur) VALUES (%s,%s,%s,%s)"
        elif len(data) == 2 :
            sql = "INSERT into nimdb (nim_tpb,name) VALUES (%s,%s)"
        mycursor.execute(sql,data)

mydb.commit()

mycursor.close()
mydb.close()