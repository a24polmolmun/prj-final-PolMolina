# Documentació Tècnica Estesa (Apartat E) - Projecte EduPass

Aquest document serveix com a guia profunda per a desenvolupadors que vulguin entendre l'arquitectura, la lògica de negoci i el flux de dades del projecte **EduPass**.

## 1. Estructura Global del Projecte

El projecte està dividit en una arquitectura de desacoblament total entre client i servidor:

- **/back/principal**: Backend desenvolupat amb **Laravel 11**. Conté tota la lògica de negoci, gestió de base de dades i l'API REST.
- **/front**: Frontend desenvolupat amb **Angular 18**. Una Single Page Application (SPA) que consumeix l'API del backend.
- **/doc**: Documentació del projecte i manuals d'usuari.
- **/back/sensor** i **/back/dbinsert**: Microserveis en Node.js per a la gestió de dades de sensors IoT (via RabbitMQ i MongoDB).

---

## 2. Backend (Laravel)

### 2.1 Models i Base de Dades
L'aplicació utilitza una base de dades relacional (PostgreSQL en producció/dev) amb els següents models clau:

- **Usuari**: Entitat central. Gestiona l'autenticació i els perfils. Els rols es defineixen mitjançant un camp `rol` (`Admin`, `Profe`, `Alumne`).
- **Curs**: Representa l'any acadèmic (ex: 2024-2025).
- **Classe**: Grups d'alumnes (ex: DAM2, ASW1). Estan vinculats a un Curs i a un Tutor (Usuari).
- **Assignatura**: Matèries impartides al centre.
- **Assistencia**: Registre de presència d'un alumne en una sessió específica.
- **Justificant**: Documentació (sovint PDF) que justifica una falta d'assistència.
- **Horari**: Defineix quan i on es realitza una classe d'una assignatura.
- **Inscrit**: Taula intermèdia que vincula alumnes amb les seves classes.

### 2.2 Controladors i API
L'API està versionada sota el prefix `/api/v1/`. S'utilitzen `ApiResource` per mantenir un estàndard RESTful. A continuació es detallen els controladors principals:

- **AuthController**: Gestiona l'autenticació via Google OAuth2 i el sistema de tokens temporals per a desenvolupament.
- **AssistenciaController**: El cor del projecte. Gestiona la generació de llistes diàries, el marcatge de presència i la generació d'informes d'absències.
- **UsuariController**: Gestió de CRUD d'usuaris, perfils i assignació de rols.
- **ClasseController**: Gestiona els grups (ex: DAM2), incloent-hi l'assignació massiva d'alumnes i la consulta de tutors.
- **HorariController**: Lògica complexa per gestionar la graella horària, actualitzacions granulars de sessions i consulta de l'horari actual.
- **JustificantController**: Gestió del cicle de vida dels justificants (pujada, revisió i acceptació per part del professor).
- **Curs & Periode Controllers**: Gestió de l'estructura temporal del centre (anys acadèmics i franges horàries).
- **Assignatura, Aula, Inscrit i Imparteix Controllers**: CRUDs auxiliars per a la gestió de dades mestres i relacions.

### 2.3 Seguretat
- **Laravel Sanctum**: S'utilitza per a l'emissió de tokens API segurs.
- **Middlewares**: La majoria de rutes estan protegides per `auth:sanctum`. 
- **Rols**: La validació de rols es realitza tant a nivell de controladors (mitjançant polítiques o validacions manuals) com a les rutes.

---

## 3. Frontend (Angular)

### 3.1 Estructura de Components
El projecte segueix una estructura modular basada en característiques (`features`):

- **Login**: Pantalla d'entrada i gestió del callback de Google.
- **Alumnes**: Vistes per consultar l'horari propi, faltes i perfil.
- **Professors**: Gestió de classes, passar llista (LlistaClasse), gestió de justificants i llistat de faltes.
- **Administracio**: Panell de control per a la gestió de Cursos, Usuaris, Assignatures i Periodes. Utilitza un `AdminLayoutComponent` per mantenir la coherència visual.

### 3.2 Serveis
Els serveis es troben a `src/app/services/`. Cada servei encapsula la comunicació amb un recurs de l'API:
- `ApiService`: Servei base per a peticions genèriques.
- `AuthService`: Gestiona l'estat d'autenticació i l'emmagatzematge del token al `localStorage`.
- `AssistenciaService`: Crides per obtenir i marcar assistències.

### 3.3 Guards i Rutes
La seguretat al client es gestiona amb:
- **authGuard**: Verifica si l'usuari té un token actiu.
- **roleGuard**: Comprova si el rol de l'usuari (guardat al token/estat) coincideix amb els `expectedRoles` definits a `app.routes.ts`.

---

## 4. Punt d'entrada (Onboarding)

Si ets un nou desenvolupador i vols entendre com funciona el flux principal de l'aplicació, el millor és seguir el flux de **"Passar Llista"**:

1. **Frontend (UI)**: Comença per `src/app/features/professors/llista-classe/llista-classe.component.ts`. Aquí veuràs com el professor selecciona una classe i una assignatura.
2. **Frontend (Servei)**: Mira com el component crida a `AssistenciaService.generar()` per crear o recuperar la llista del dia.
3. **Backend (API)**: Ves a `routes/api.php` i busca la ruta `POST assistencies/generar`.
4. **Backend (Controlador)**: Obre `app/Http/Controllers/AssistenciaController.php` i busca el mètode `generar()`. Aquí entendràs com es creen els registres d'assistència basant-se en els alumnes inscrits a la classe.
5. **Base de Dades**: Finalment, comprova la taula `assistencies` per veure com s'emmagatzema l'estat (Present, Falta, Justificada).

Aquest flux toca pràcticament totes les capes del sistema i et donarà una visió clara de com interactuen el frontend i el backend a EduPass.
