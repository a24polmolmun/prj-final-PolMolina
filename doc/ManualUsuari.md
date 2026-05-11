# Manual d'Usuari: EduPass

> **Projecte Final de Grau - INS Pedralbes**  
> **Aplicació:** EduPass - Gestió d'Assistència Escolar  
> **Desenvolupador:** Pol Molina Muñoz

---

## Índex de continguts

1. [Introducció i propòsit](#1-introducció-i-propòsit)
2. [Captures de pantalla del manual](#2-captures-de-pantalla-del-manual)
3. [Accés al sistema](#3-accés-al-sistema)
4. [Funcions comunes](#4-funcions-comunes)
5. [Administrador](#5-administrador)
6. [Professor](#6-professor)
7. [Alumne](#7-alumne)
8. [Resolució de problemes](#8-resolució-de-problemes)

---

## 1. Introducció i propòsit

**EduPass** és una aplicació de gestió d'assistència escolar que permet centralitzar el control de faltes, retards, justificants, horaris, classes, assignatures i usuaris d'un centre educatiu.

L'aplicació està dividida en tres rols:

- **Administrador:** configura l'estructura del centre i gestiona les dades principals.
- **Professor:** consulta el seu horari, passa llista, revisa faltes i gestiona justificants.
- **Alumne:** consulta el seu horari, revisa faltes i retards, i envia justificants.

Cada usuari veu les opcions corresponents al seu rol. Després d'iniciar sessió, EduPass redirigeix automàticament cada persona al seu panell.

![Captura de pantalla: Vista general d'EduPass](imatges/manual/edupass-vista-general.png)

---

## 2. Captures de pantalla del manual

Aquest manual inclou espais preparats per inserir captures de pantalla. Les imatges s'han d'afegir a la carpeta:

```text
doc/imatges/manual/
```

Cada captura ja té una ruta proposada. Per exemple:

```md
![Captura de pantalla: Gestió d'usuaris](imatges/manual/admin-gestio-usuaris.png)
```

Per completar el manual, només cal guardar la captura amb el nom indicat a la ruta. No cal posar una imatge per cada botó, però sí és recomanable incloure una captura per cada pantalla important.

---

## 3. Accés al sistema

### 3.1. Iniciar sessió

Per entrar a EduPass, l'usuari ha d'obrir la URL principal de l'aplicació. La primera pantalla mostra el formulari **Iniciar Sessió**.

Passos:

1. Escriu el teu **email**.
2. Escriu la teva **contrasenya**.
3. Prem **Entrar al sistema**.
4. Si les dades són correctes, EduPass obre el panell corresponent al teu rol.

També es pot iniciar sessió prement la tecla **Enter** després d'escriure les credencials.

![Captura de pantalla: Pantalla d'inici de sessió](imatges/manual/login.png)

### 3.2. Recuperació de contrasenya

Al codi actual de l'aplicació no hi ha cap pantalla de **recuperació de contrasenya** disponible per a l'usuari final.

Si un usuari oblida la contrasenya, ha de contactar amb un administrador del centre perquè la modifiqui des de **Gestió d'Usuaris**. Si l'usuari encara pot entrar al sistema, també pot canviar-la des de **El Meu Perfil**.

### 3.3. Tancar sessió

Per sortir d'EduPass, cal prémer l'opció **Sortir** del menú lateral. El sistema tanca la sessió i torna a la pantalla d'inici de sessió.

![Captura de pantalla: Botó Sortir del menú lateral](imatges/manual/sortir-sessio.png)

---

## 4. Funcions comunes

### 4.1. El Meu Perfil

Tots els rols poden accedir a **El Meu Perfil** des del menú lateral.

En aquesta pantalla es poden modificar:

- Nom.
- Cognom.
- Correu electrònic.
- Contrasenya.

Per canviar la contrasenya, cal escriure la nova contrasenya i repetir-la. Ha de tenir com a mínim **8 caràcters** i les dues contrasenyes han de coincidir.

Després de fer els canvis, prem **Desar canvis**.

![Captura de pantalla: Pantalla El Meu Perfil](imatges/manual/perfil-usuari.png)

### 4.2. Menú lateral

El menú lateral mostra opcions diferents segons el rol:

- L'administrador veu opcions de configuració del centre.
- El professor veu opcions relacionades amb classes, assignatures, faltes i justificants.
- L'alumne veu opcions per consultar el seu resum, justificar faltes i editar el perfil.

---

## 5. Administrador

L'administrador és el rol encarregat de configurar l'estructura principal d'EduPass.

El menú d'administració inclou:

- **Inici**
- **Gestió d'Usuaris**
- **Gestió de Cursos**
- **Gestió de Periodes**
- **Gestió de Classes / Grups**
- **Gestió d'Assignatures**
- **Sortir**

![Captura de pantalla: Menú lateral d'administració](imatges/manual/admin-menu.png)

### 5.1. Panell inicial d'administració

La pantalla inicial de l'administrador mostra un resum general del centre:

- Nombre total d'usuaris.
- Nombre total de classes.
- Nombre total d'assignatures.
- Progrés del curs acadèmic.
- Calendari mensual.
- Accessos ràpids a gestió d'usuaris, classes i assignatures.

![Captura de pantalla: Panell inicial de l'administrador](imatges/manual/admin-inici.png)

### 5.2. Gestió d'usuaris

La pantalla **Gestió d'Usuaris** permet crear, editar, consultar i eliminar usuaris.

Els rols disponibles són:

- **Alumne**
- **Profe**
- **Admin**

![Captura de pantalla: Gestió d'usuaris](imatges/manual/admin-gestio-usuaris.png)

#### Crear un usuari

1. Entra a **Administració > Gestió d'Usuaris**.
2. Omple el formulari amb:
   - Nom.
   - Cognom.
   - Email.
   - Contrasenya.
   - Rol.
3. Si el rol és **Alumne**, pots indicar:
   - Email dels pares.
   - Classe assignada.
4. Prem **Crear Usuari**.

![Captura de pantalla: Formulari per crear un usuari](imatges/manual/admin-crear-usuari.png)

#### Editar un usuari

1. Busca l'usuari a la taula.
2. Prem **Editar**.
3. Modifica les dades necessàries.
4. Si no vols canviar la contrasenya, deixa aquest camp en blanc.
5. Prem **Actualitzar Usuari**.

![Captura de pantalla: Edició d'un usuari](imatges/manual/admin-editar-usuari.png)

#### Eliminar un usuari

1. Busca l'usuari a la taula.
2. Prem **Esborrar**.

Si l'usuari té dades relacionades, per exemple assistències, justificants o una classe assignada com a tutor, el sistema pot impedir l'eliminació.

### 5.3. Gestió de cursos

La pantalla **Gestió de Cursos** permet administrar els cursos o cicles del centre.

Cada curs té:

- Nom.
- Tipus de grau.
- Període escolar associat.

![Captura de pantalla: Gestió de cursos](imatges/manual/admin-gestio-cursos.png)

#### Crear un curs

1. Entra a **Administració > Gestió de Cursos**.
2. Escriu el **Nom del Curs**.
3. Selecciona el **Tipus de Grau**:
   - **GS**: Grau Superior.
   - **GM**: Grau Mitjà.
4. Selecciona el **Periode Escolar**, si correspon.
5. Prem **Crear Curs**.

![Captura de pantalla: Formulari per crear un curs](imatges/manual/admin-crear-curs.png)

#### Editar o eliminar un curs

Per modificar un curs, prem **Editar**, fes els canvis i desa'ls amb **Actualitzar Curs**.

Per eliminar un curs, prem **Esborrar** i confirma l'acció. Si el curs té dependències, el sistema pot bloquejar l'eliminació.

### 5.4. Gestió de períodes acadèmics

La pantalla **Gestió de Periodes Acadèmics** serveix per definir els trimestres del curs escolar.

Cada període inclou:

- Data d'inici i final del 1r trimestre.
- Data d'inici i final del 2n trimestre.
- Data d'inici i final del 3r trimestre.

![Captura de pantalla: Gestió de períodes acadèmics](imatges/manual/admin-gestio-periodes.png)

#### Crear un període

1. Entra a **Administració > Gestió de Periodes**.
2. Omple les dates dels tres trimestres.
3. Prem **Crear Periode**.

![Captura de pantalla: Formulari per crear un període](imatges/manual/admin-crear-periode.png)

#### Editar o eliminar un període

Per editar un període, prem **Editar**, modifica les dates i prem **Actualitzar Periode**.

Per eliminar-lo, prem **Esborrar** i confirma l'acció. No es pot eliminar si hi ha cursos que depenen d'aquest període.

### 5.5. Gestió de classes i grups

La pantalla **Gestió de Classes / Grups** permet crear i organitzar els grups d'alumnes.

Cada classe pot tenir:

- Nom de la classe.
- Curs organitzatiu.
- Tutor.
- Aula assignada.

![Captura de pantalla: Gestió de classes i grups](imatges/manual/admin-gestio-classes.png)

#### Crear una classe

1. Entra a **Administració > Gestió de Classes / Grups**.
2. Escriu el nom de la classe.
3. Selecciona el curs.
4. Selecciona el tutor, si n'hi ha.
5. Selecciona l'aula, si n'hi ha.
6. Prem **Crear Classe**.

![Captura de pantalla: Formulari per crear una classe](imatges/manual/admin-crear-classe.png)

#### Editar o eliminar una classe

Per editar una classe, prem **Editar**, modifica les dades i prem **Actualitzar**.

Per eliminar-la, prem **Esborrar** i confirma l'acció. Si la classe té alumnes, horaris o altres dades relacionades, el sistema pot mostrar un error.

### 5.6. Gestió d'aules

Les aules existeixen al sistema i es carreguen des del backend. A la interfície actual no hi ha una pantalla pròpia per fer el CRUD complet d'aules, però l'administrador les utilitza en altres pantalles.

Les aules apareixen a:

- **Gestió de Classes / Grups**, per assignar una aula a una classe.
- **Horari Alumnes**, per assignar una aula a una sessió concreta.

![Captura de pantalla: Selector d'aula en una classe](imatges/manual/admin-selector-aula.png)

### 5.7. Gestió d'assignatures

La pantalla **Gestió d'Assignatures** permet crear i mantenir les matèries del centre.

Cada assignatura pot tenir:

- Nom.
- Data d'inici.
- Data de finalització.
- Vinculació opcional a una classe concreta com a projecte.

![Captura de pantalla: Gestió d'assignatures](imatges/manual/admin-gestio-assignatures.png)

#### Crear una assignatura

1. Entra a **Administració > Gestió d'Assignatures**.
2. Escriu el nom de l'assignatura.
3. Indica la data d'inici.
4. Indica la data de finalització.
5. Si és una assignatura específica d'una classe, selecciona-la a **Vincular a Classe (Projecte)**.
6. Prem **Crear Assignatura**.

![Captura de pantalla: Formulari per crear una assignatura](imatges/manual/admin-crear-assignatura.png)

#### Editar o eliminar una assignatura

Per modificar una assignatura, prem **Editar**, fes els canvis i prem **Actualitzar**.

Per eliminar-la, prem **Esborrar** i confirma l'acció.

### 5.8. Gestió d'horaris

La configuració d'horaris es fa des de la pantalla **Horari Alumnes**. Aquesta pantalla està disponible per a professors tutors i també pot ser accessible per administració segons el rol permès a l'aplicació.

La graella mostra:

- Dilluns a divendres.
- Franges horàries.
- Assignatura.
- Aula.
- Classe.
- Professor assignat.

![Captura de pantalla: Graella d'horari setmanal](imatges/manual/horari-alumnes-graella.png)

#### Crear o editar una sessió

1. Fes clic en una cel·la buida o en una sessió existent.
2. Al modal **Configurar Sessió**, selecciona:
   - Assignatura.
   - Aula.
   - Professor encarregat.
3. Marca els alumnes convocats.
4. Prem **Desar Configuració**.

![Captura de pantalla: Modal Configurar Sessió](imatges/manual/horari-alumnes-modal-configurar.png)

#### Eliminar una sessió

1. Fes clic sobre una sessió existent.
2. Prem **Eliminar sessió**.
3. Confirma l'acció.

![Captura de pantalla: Eliminació d'una sessió d'horari](imatges/manual/horari-alumnes-eliminar-sessio.png)

### 5.9. Gestió d'inscrits

La pantalla **Gestió Inscrits** permet afegir o treure alumnes d'una classe.

Els administradors poden seleccionar la classe que volen gestionar.

![Captura de pantalla: Gestió d'inscrits com a administrador](imatges/manual/admin-gestio-inscrits.png)

#### Afegir alumnes a una classe

1. Selecciona la classe a gestionar.
2. Cerca un alumne per nom o correu electrònic.
3. Prem el botó amb la icona **+** per afegir-lo.

Quan s'afegeix un alumne a una classe, EduPass també intenta inscriure'l a les assignatures associades als horaris d'aquella classe.

#### Treure alumnes d'una classe

1. Localitza l'alumne a la llista d'alumnes actuals.
2. Prem la icona de treure alumne.

### 5.10. Gestió de justificants

L'administrador també pot accedir a la gestió de justificants si entra a la pantalla corresponent.

En aquesta pantalla pot:

- Veure justificants pendents.
- Filtrar per alumne.
- Obrir el detall del justificant.
- Obrir el document adjunt, si existeix.
- Acceptar el justificant.

![Captura de pantalla: Gestió de justificants com a administrador](imatges/manual/admin-gestio-justificants.png)

Quan s'accepta un justificant, l'assistència associada queda marcada com a justificada.

Actualment no hi ha cap botó de **rebutjar** justificants a la interfície.

---

## 6. Professor

El professor utilitza EduPass per consultar el seu horari, passar llista i revisar l'assistència dels seus alumnes.

El menú del professor pot incloure:

- **Inici**
- **Assignatures**
- **Gestió Inscrits**
- **Llista Classe**
- **Gestió Faltes**
- **Gestió Justificants**
- **Horari Alumnes**
- **El Meu Perfil**
- **Sortir**

![Captura de pantalla: Menú lateral del professor](imatges/manual/professor-menu.png)

### 6.1. Panell inicial del professor

La pantalla inicial del professor mostra:

- Salutació personalitzada.
- Classes setmanals.
- Alumnes totals.
- Faltes pendents.
- Classe en curs, si n'hi ha.
- Horari personal.

![Captura de pantalla: Panell inicial del professor](imatges/manual/professor-inici.png)

Si hi ha una classe en curs, el professor pot prémer **Passar llista ara** per anar directament a la sessió corresponent.

![Captura de pantalla: Botó Passar llista ara](imatges/manual/professor-passar-llista-ara.png)

### 6.2. Consulta de l'horari personal

El professor pot consultar **El Teu Horari Personal** des del panell inicial.

L'horari mostra:

- Dies de dilluns a divendres.
- Franges horàries.
- Assignatura.
- Classe.
- Franja d'esbarjo.

El botó **Franja: AM/PM** permet alternar entre horari de matí i horari de tarda.

![Captura de pantalla: Horari personal del professor](imatges/manual/professor-horari-personal.png)

### 6.3. Les meves assignatures

La pantalla **Les Meves Assignatures** mostra les matèries assignades al professor.

Inclou:

- Total d'assignatures.
- Curs acadèmic.
- Cercador d'assignatures.
- Targetes amb el nom de cada assignatura i el període lectiu.

![Captura de pantalla: Les meves assignatures](imatges/manual/professor-assignatures.png)

### 6.4. Passar llista

La pantalla **Llista de Classe** permet registrar l'assistència de les sessions del dia.

![Captura de pantalla: Llista de classe](imatges/manual/professor-llista-classe.png)

#### Seleccionar una sessió

1. Entra a **Llista Classe**.
2. Revisa la columna **Les meves sessions d'avui**.
3. Selecciona la sessió que vols gestionar.

Si no hi ha sessions, EduPass mostra un avís.

![Captura de pantalla: Selector de sessions del dia](imatges/manual/professor-sessions-avui.png)

#### Marcar l'assistència

Per cada alumne es pot marcar:

- **.**: Assistit.
- **F**: Falta.
- **R**: Retard.
- **FJ**: Falta justificada.

Quan el professor prem una opció, EduPass desa l'assistència. Si ja hi havia un registre d'aquell alumne per aquell dia, s'actualitza.

![Captura de pantalla: Botons d'assistència](imatges/manual/professor-botons-assistencia.png)

### 6.5. Gestió d'incidències, faltes i retards

La pantalla **Gestió Faltes** mostra un resum de les absències dels alumnes vinculats al professor.

Inclou:

- Total de faltes.
- Total de retards.
- Total de faltes justificades.
- Rànquing d'absències per alumne i assignatura.
- Filtre per assignatura.
- Indicador de gravetat.

![Captura de pantalla: Gestió de faltes del professor](imatges/manual/professor-gestio-faltes.png)

La gravetat es mostra així:

- **Baix:** menys de 3 faltes.
- **Moderat:** 3 o 4 faltes.
- **Greu:** 5 faltes o més.

### 6.6. Gestió de la classe com a tutor

Si el professor és tutor d'una classe, pot utilitzar **Gestió Inscrits**.

Des d'aquesta pantalla pot:

- Veure els alumnes actuals de la classe.
- Cercar alumnes per nom o correu.
- Afegir alumnes.
- Treure alumnes.

![Captura de pantalla: Gestió d'inscrits del professor tutor](imatges/manual/professor-gestio-inscrits.png)

Si el professor no és tutor de cap classe, EduPass mostra un missatge indicant que no té classe assignada.

![Captura de pantalla: Professor sense classe de tutor](imatges/manual/professor-sense-classe-tutor.png)

### 6.7. Horari dels alumnes

La pantalla **Horari Alumnes** permet configurar l'horari de la classe tutoritzada.

El professor pot:

- Crear sessions.
- Editar sessions existents.
- Assignar assignatura.
- Assignar aula.
- Assignar professor.
- Marcar alumnes convocats.
- Eliminar sessions.

![Captura de pantalla: Horari alumnes del professor tutor](imatges/manual/professor-horari-alumnes.png)

![Captura de pantalla: Configuració d'una sessió del professor](imatges/manual/professor-configurar-sessio.png)

### 6.8. Gestió de justificants

La pantalla **Gestió Justificants** permet revisar les sol·licituds pendents enviades pels alumnes.

El professor pot:

- Veure justificants pendents.
- Filtrar per alumne.
- Obrir el detall.
- Consultar el comentari.
- Obrir el document adjunt.
- Acceptar el justificant.

![Captura de pantalla: Gestió de justificants del professor](imatges/manual/professor-gestio-justificants.png)

![Captura de pantalla: Detall d'un justificant](imatges/manual/professor-detall-justificant.png)

Quan s'accepta un justificant, la falta queda marcada com a justificada.

---

## 7. Alumne

L'alumne utilitza EduPass per consultar el seu horari, revisar faltes i retards, i enviar justificants.

El menú de l'alumne inclou:

- **Inici**
- **Justificar Faltes**
- **El Meu Perfil**
- **Sortir**

![Captura de pantalla: Menú de l'alumne](imatges/manual/alumne-menu.png)

### 7.1. Panell inicial de l'alumne

La pantalla inicial de l'alumne mostra:

- Salutació personalitzada.
- Nombre d'assignatures.
- Faltes totals.
- Retards totals.
- Horari personal.
- Resum de faltes, retards i justificades.

![Captura de pantalla: Panell inicial de l'alumne](imatges/manual/alumne-inici.png)

### 7.2. Consulta de l'horari personal

L'alumne pot consultar el seu horari setmanal al panell inicial.

L'horari mostra:

- Dies de dilluns a divendres.
- Franges horàries.
- Assignatures.
- Franja d'esbarjo.

![Captura de pantalla: Horari personal de l'alumne](imatges/manual/alumne-horari-personal.png)

### 7.3. Consulta de faltes i retards

Al panell inicial, l'alumne pot veure un resum de:

- Retards.
- Faltes.
- Justificades.

També pot filtrar el resum per assignatura.

![Captura de pantalla: Resum de faltes i retards de l'alumne](imatges/manual/alumne-resum-faltes-retards.png)

### 7.4. Justificar faltes i retards

La pantalla **Justificar Faltes** mostra les faltes i retards pendents de justificar.

![Captura de pantalla: Pantalla Justificar Faltes](imatges/manual/alumne-justificar-faltes.png)

#### Filtrar per assignatura

1. Obre **Justificar Faltes**.
2. Utilitza el desplegable **Filtre per Assignatures**.
3. Selecciona una assignatura o deixa **Totes les assignatures**.

![Captura de pantalla: Filtre d'assignatures en justificació](imatges/manual/alumne-filtre-justificants.png)

#### Enviar un justificant

1. Localitza una falta o retard pendent.
2. Prem **Justificar Falta**.
3. Escriu el motiu de la justificació.
4. Adjunta documentació si cal:
   - PDF.
   - Imatge.
5. Prem **Desar Justificació**.

![Captura de pantalla: Modal per justificar una falta](imatges/manual/alumne-modal-justificar-falta.png)

El justificant queda pendent de revisió. Quan un professor o administrador l'accepta, la falta passa a constar com a justificada.

### 7.5. Faltes justificades

Quan una falta ja està justificada, EduPass mostra l'etiqueta **Justificada** i ja no cal enviar cap altre document.

![Captura de pantalla: Falta marcada com a justificada](imatges/manual/alumne-falta-justificada.png)

---

## 8. Resolució de problemes

### 8.1. No puc iniciar sessió

Comprova que:

- L'email està escrit correctament.
- La contrasenya és correcta.
- Tens connexió amb el servidor.
- El teu usuari existeix al sistema.

Si el problema continua, contacta amb l'administrador del centre.

### 8.2. He oblidat la contrasenya

EduPass no té recuperació automàtica de contrasenya a la pantalla de login. Cal demanar a un administrador que canviï la contrasenya des de **Gestió d'Usuaris**.

### 8.3. No veig la meva classe

Si ets alumne, pot ser que encara no tinguis cap classe assignada.

Si ets professor, pot ser que no constis com a tutor o que no tinguis horaris assignats.

### 8.4. No apareixen alumnes en passar llista

Comprova que:

- La sessió té alumnes convocats.
- Els alumnes estan inscrits a la classe.
- L'horari està configurat correctament.

### 8.5. No puc desar una sessió d'horari

Per desar una sessió cal seleccionar:

- Assignatura.
- Aula.
- Professor encarregat.

Si falta algun d'aquests camps, EduPass no desa la configuració.

### 8.6. No puc enviar un justificant

Comprova que:

- Has escrit el motiu.
- La falta o retard encara no està justificat.
- El fitxer adjunt és PDF o imatge.
- Tens connexió amb el servidor.

### 8.7. No puc eliminar un registre

Alguns registres poden tenir dependències. Per exemple:

- Un usuari pot tenir assistències o justificants.
- Un període pot tenir cursos assignats.
- Una classe pot tenir alumnes o horaris.
- Una assignatura pot estar vinculada a sessions.

En aquests casos cal revisar primer les dades relacionades.

---

© 2025-2026 - EduPass - Projecte Final DAW
