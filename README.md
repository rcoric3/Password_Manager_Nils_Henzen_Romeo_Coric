# Password_Manager_Nils_Henzen_Romeo_Coric

# Dokumentation

### Projektstruktur
- Package manager: bun
- Frontend: React
    - ```bash
    http://localhost:5173/login
    ```
- Backend: Hono
    -```bash
    http://localhost:4000
    ```
- Database: Postgres

## Set-up:

- Bun installieren
```bash
curl -fsSL https://bun.sh/install | bash
```

- Danach mit bun die packages runterladen, sowohl im frontend wie im Backend

```bash
bun install
```

## /password_manager_backend

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

## /password_manager_frontend

### Um das frontend zu starten

```bash
bun run start
```
## Env Files für die Datenbank

### Env files im backend /backend .env

```bash
DATABASE_URL=postgres://user:password@127.0.0.1:5432/passwordManager?sslmode=disable
```