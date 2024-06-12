# Password_Manager_Nils_Henzen_Romeo_Coric
# Dokumentation
Projektstruktur:
- Frontend: React js
- Backend: Bun js
- Database: Maria DB

## Set-up:
- Bun installieren
Danach mit bun die packages runterladen, sowohl im frontend wie im Backend

```bash
bun install
``` 
## /backend

### Um die Datenbank zu starten im /backend folder

```bash
bun run db:up
``` 
### Um die sql-files zu migrieren im /backend folder

```bash
bun run db:migrate
``` 
### Um die db abzubrechen im /backend folder

```bash
bun run db:down
``` 
### Um das backend zu starten im /backend folder

```bash
bun run dev
``` 

## /frontend

### Um das frontend zu starten

```bash
bun run start
``` 

Grundkonzept:
![image](https://github.com/rcoric3/Password_Manager_Nils_Henzen_Romeo_Coric/assets/108061556/ba71be4e-33f6-49c0-950a-24d29d604a2a)

Verschlüsselungsmehtode:


Passwortwiederherstellung:
Damit der User sein Passwort wiederherstellen, kann muss er seinen unique_key speichern, welcher er am Anfang bekommt und in in dem Feld eingeben. Der Wiederherstellungscode wird mit hilfe von UUID generiert Universally Unique Identifier
