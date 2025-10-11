---

### 1) HTTP + `timeout` + reintentos con backoff (mínimo)

`01_http_timeout_retry.py`

```python
import requests, time, sys
URL = sys.argv[1] if len(sys.argv) > 1 else "https://httpbin.org/delay/1"
for i in range(5):                          # hasta 5 intentos
    try:
        r = requests.get(URL, timeout=2)    # timeout estricto
        r.raise_for_status()
        print("bytes:", len(r.content))
        break
    except Exception as e:
        if i == 4: raise
        time.sleep(0.5 * (2**i))            # backoff exponencial
```

---

### 2) Lectura de archivos (I/O-bound simple)

`02_file_read_min.py`

```python
import sys
p = sys.argv[1] if len(sys.argv) > 1 else "data.txt"
print("líneas:", sum(1 for _ in open(p, encoding="utf-8")))
```

---

### 3) `ThreadPoolExecutor` con `max_workers` razonable

`03_threadpool_max_workers.py`

```python
from concurrent.futures import ThreadPoolExecutor
import requests

URLS = ["https://httpbin.org/delay/1"] * 10
MAX = min(8, len(URLS))                     # razonable según carga

def size(u): return len(requests.get(u, timeout=3).content)

with ThreadPoolExecutor(max_workers=MAX) as ex:
    print(list(ex.map(size, URLS)))         # paralelo, orden de entrada
```

---

### 4) Procesar tan pronto terminan: `as_completed`

`04_as_completed_min.py`

```python
from concurrent.futures import ThreadPoolExecutor, as_completed
import requests

URLS = ["https://httpbin.org/delay/3", "https://httpbin.org/delay/1", "https://httpbin.org/delay/2"]

def fetch(u):
    r = requests.get(u, timeout=5)
    r.raise_for_status()
    return u, r.elapsed.total_seconds()

with ThreadPoolExecutor(max_workers=3) as ex:
    futs = [ex.submit(fetch, u) for u in URLS]
    for f in as_completed(futs):             # resultados a medida que estén
        print("listo:", f.result())
```

---

### 5) Logging + reporte CSV mínimo

`05_logging_report.py`

```python
import logging, csv, sys, requests
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
urls = ["https://httpbin.org/delay/1", "https://httpbin.org/status/503"]
rows = []
for u in urls:
    try:
        r = requests.get(u, timeout=2); r.raise_for_status()
        rows.append({"url": u, "status": r.status_code})
    except Exception as e:
        logging.warning("falló %s: %s", u, e)
out = sys.argv[1] if len(sys.argv) > 1 else "reporte.csv"
with open(out, "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["url", "status"]); w.writeheader(); w.writerows(rows)
print("ok:", len(rows))
```

---

### 6) **Todo junto** (HTTP + backoff + `ThreadPool` + `as_completed` + logging + CSV)

`06_all_together_min.py`

```python
import requests, time, logging, csv, sys
from concurrent.futures import ThreadPoolExecutor, as_completed

def get(u, tries=3, base=0.5, timeout=3):
    for i in range(tries):
        try:
            r = requests.get(u, timeout=timeout); r.raise_for_status()
            return r.status_code, len(r.content)
        except Exception as e:
            if i == tries - 1: return None, str(e)
            time.sleep(base * (2**i))       # backoff exponencial

urls = [l.strip() for l in open(sys.argv[1])] if len(sys.argv) > 1 else [
    "https://httpbin.org/delay/2", "https://httpbin.org/status/200", "https://httpbin.org/status/500"
]
MAX = min(8, len(urls))                     # documenta tu elección
logging.basicConfig(level=logging.INFO, format="%(levelname)s %(message)s")
rows = []

with ThreadPoolExecutor(max_workers=MAX) as ex:
    futs = {ex.submit(get, u): u for u in urls}
    for f in as_completed(futs):            # fan-in por finalización
        u = futs[f]; status, info = f.result()
        if status:
            logging.info("ok %s %s", u, status)
            rows.append({"url": u, "status": status, "size": info})
        else:
            logging.warning("fail %s %s", u, info)

with open("reporte.csv", "w", newline="") as f:
    w = csv.DictWriter(f, fieldnames=["url", "status", "size"]); w.writeheader(); w.writerows(rows)
print("hecho, filas:", len(rows))
```

---

## Archivos auxiliares mínimos

**`requirements.txt`**

```
requests
```

**`.gitignore`**

```
# Python
__pycache__/
*.pyc
*.pyo
*.pyd
.venv/
venv/
.env
# Datos temporales / reportes
reporte.csv
data/
```

**README (extracto sugerido)**

```
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# 1) HTTP + timeout + reintentos
python 01_http_timeout_retry.py https://httpbin.org/delay/1

# 2) Lectura de archivos
echo "hola" > data.txt && python 02_file_read_min.py data.txt

# 3) ThreadPool con max_workers
python 03_threadpool_max_workers.py

# 4) as_completed
python 04_as_completed_min.py

# 5) Logging + CSV
python 05_logging_report.py reporte.csv

# 6) Todo junto (lee URLs desde archivo opcional)
python 06_all_together_min.py urls.txt
```
