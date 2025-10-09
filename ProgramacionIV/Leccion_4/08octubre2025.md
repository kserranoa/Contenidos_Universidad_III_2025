# Concurrencia (dos cosas “a la vez”)

```python
# hola_concurrencia.py
import threading

def hola():
    print("Hola desde", threading.current_thread().name)

t = threading.Thread(target=hola, name="T1")
t.start()
hola()           # corre en el hilo principal a la vez que T1
t.join()
```

# Integridad (proteger datos compartidos con Lock)

```python
# hola_integridad.py
import threading
x = 0
lock = threading.Lock()

def inc():
    global x
    for _ in range(100_000):
        with lock:   # sin esto, x podría corromperse
            x += 1

h1 = threading.Thread(target=inc); h2 = threading.Thread(target=inc)
h1.start(); h2.start(); h1.join(); h2.join()
print("x =", x)      # siempre 200000
```

# Sincronización (coordinar con Event)

```python
# hola_sincronizacion.py
import threading, time
listo = threading.Event()

def trabajador():
    listo.wait()          # espera la señal
    print("Hola sincronizado")

threading.Thread(target=trabajador).start()
time.sleep(0.1)           # hacer algo... y luego señal
listo.set()
```

# Hilos y programación concurrente (pool sencillo)

```python
# hola_pool.py
from concurrent.futures import ThreadPoolExecutor

def hola(n): return f"Hola {n}"

with ThreadPoolExecutor() as ex:
    print(list(ex.map(hola, [1, 2, 3])))
```

# Sintaxis para la creación de Hilos (lo más mínimo)

```python
# hola_creacion.py
import threading
t = threading.Thread(target=lambda: print("Hola hilo"))
t.start(); t.join()
```

# Creación de Hilos independientes (daemon)

```python
# hola_daemon.py
import threading, time

def bucle():
    while True:
        print("Hola (daemon)")
        time.sleep(0.2)

threading.Thread(target=bucle, daemon=True).start()
time.sleep(0.6)   # el programa termina y mata el daemon
```

# Control de excepciones en Hilos (capturar/propagar)

```python
# hola_excepciones.py
import threading, queue
errores = queue.Queue()

def tarea():
    try:
        1/0
    except Exception as e:
        errores.put(e)

t = threading.Thread(target=tarea)
t.start(); t.join()
print("Error capturado:", errores.get())
```

# Uso de Hilos múltiples (lanzar varios)

```python
# hola_multihilos.py
import threading

def hola(i): print(f"Hola {i}")

hs = [threading.Thread(target=hola, args=(i,)) for i in range(5)]
[t.start() for t in hs]; [t.join() for t in hs]
```

# Comunicación entre Hilos (Queue)

```python
# hola_comunicacion.py
import threading, queue
q = queue.Queue()

def productor(): q.put("Hola desde productor")
def consumidor(): print(q.get())

tp = threading.Thread(target=productor)
tc = threading.Thread(target=consumidor)
tp.start(); tc.start(); tp.join(); tc.join()
```
