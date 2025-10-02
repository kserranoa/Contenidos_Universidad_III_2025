Instala primero:

```bash
pip install firebase-admin
```

Código mínimo (`key.json` en el mismo directorio):

```python
import firebase_admin
from firebase_admin import credentials, db

firebase_admin.initialize_app(
    credentials.Certificate('key.json'),
    {'databaseURL': 'https://<tu-proyecto>.firebaseio.com'}
)

db.reference('mensaje').set('hola')
```

Reemplaza `<tu-proyecto>` por el ID de tu Realtime Database. Esto creará/actualizará `/mensaje` = `"hola"`.


# Codigo asincrono
import asyncio, firebase_admin
from firebase_admin import credentials, db

firebase_admin.initialize_app(
    credentials.Certificate("key.json"),
    {"databaseURL": "https://rodriguez-najera-rogelio-2025-default-rtdb.firebaseio.com/"}
)

async def main():
    await asyncio.to_thread(db.reference("mensaje").set, "asincrono")

await main()



