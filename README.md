# Sistema de Gestió d'Assistència Escolar

> **Projecte Final de Grau — En desenvolupament**

Aquest repositori conté el sistema integral de gestió d'assistència escolar desenvolupat per Pol Molina Muñoz. L'aplicació ofereix una plataforma de gestió per a professors, alumnes i administradors per al control d'assistència i horaris en centres educatius.

## Arquitectura del Projecte

El projecte segueix una arquitectura desacoblada (Client-Servidor) amb possibilitat d'expansió futura:

- **Frontend (Angular)**: Aplicació d'una sola pàgina (SPA) que ofereix una experiència d'usuari fluida i moderna.
- **Backend Principal (Laravel)**: API RESTful encarregada de la lògica de negoci, seguretat (Sanctum/OAuth) i gestió acadèmica.
- **Estat de dades**:
    - **PostgreSQL**: Base de dades relacional per a la gestió acadèmica.
- **Projectat (Futura expansió)**:
    - **Ingestió de dades (Node.js)**: Microserveis preparats per a la recepció de dades de sensors NFC.
    - **Cua de Missatgeria (RabbitMQ)**: Dissenyat per gestionar la comunicació asíncrona entre sensors.
    - **MongoDB**: Base de dades NoSQL per al registre històric de lectures de sensors.

## Tecnologies Utilitzades

- **Frontend**: Angular, Tailwind CSS, TypeScript.
- **Backend**: Laravel (PHP).
- **Bases de dades**: PostgreSQL.
- **Infraestructura**: Docker, Docker Compose, Nginx.

## Instal·lació i Configuració

Segueix aquests passos per aixecar el projecte en el teu entorn local:

### 1. Clonar el repositori

```bash
git clone https://github.com/a24polmolmun/prj-final-PolMolina.git
cd prj-final-PolMolina
```

### 2. Aixecar l'entorn amb Docker

El projecte utilitza Docker per gestionar tots els serveis. Pots aixecar l'entorn de desenvolupament amb la següent comanda:

```bash
docker compose -f compose.DEV.yml up -d --build
```

Aquest procés automàticament:
- Instal·larà les dependències de PHP (Composer) i Node (NPM).
- Generarà les claus de l'aplicació.
- Executarà les migracions de la base de dades.

### 3. Poblament de dades

Per poder entrar amb els usuaris de prova, és necessari executar els seeders:

```bash
docker compose exec pfg1-back php artisan db:seed
```

## 🔑 Usuaris de Prova

Pots utilitzar les següents credencials per provar les diferents funcionalitats del sistema (la contrasenya és la mateixa per a tots):

- **Contrasenya comuna:** `12345678`

| Rol | Email |
| :--- | :--- |
| **Administrador** | `admin@inspedralbes.cat` |
| **Professor** | `professor@inspedralbes.cat` |
| **Alumne** | `a24polmolmun@inspedralbes.cat` |

## Accés als Serveis

Una vegada el Docker estigui funcionant, podràs accedir a:

| Servei | URL |
| :--- | :--- |
| **Frontend (Angular)** | [http://localhost:4200](http://localhost:4200) |
| **Backend API (Laravel)** | [http://localhost:8000](http://localhost:8000) |
| **pgAdmin (PostgreSQL)** | [http://localhost:8080](http://localhost:8080) |

## Autors

- **Pol Molina Muñoz** - Desenvolupador Principal

---
© 2025-2026 - Projecte Final DAW - INS Pedralbes
