import sqlite3

# Crear conexión y tabla
con = sqlite3.connect("ejemplo.db")
cur = con.cursor()
cur.execute("CREATE TABLE IF NOT EXISTS autos(id INTEGER, nombre TEXT)")

# Insertar dato
cur.execute("INSERT INTO autos VALUES(1, 'Civic')")

# Consultar
cur.execute("SELECT * FROM autos")
print(cur.fetchall())

con.commit()
con.close()
