# Contexto entero

Esta carpeta está encargada de tener todos los seeders por modelo / tabla que se muestra mas adelante.

## Estructura de la Base de Datos - Sistema de Gestión Académica
Este documento describe el esquema de la base de datos para el sistema de control de asistencia, usuarios y horarios.

### Entidades principales
#### Users

ID (Int): Clave primaria.

Nom (String)

Cognom (String)

Rol (ENUM: Admin, Profe, Alumne)

Email (Email)

Email_Pares (Email)

Password (String)

Token (String)

NFC_ID (String): Identificador para hardware/fichaje.

ID_Curs (Int): Relación con la tabla Curs.

Horari_Guardies (String): Definición de horarios de guardia para profesores.

#### Assignatures

ID (Int): Clave primaria.

Nom (String)

Projecte (Boolean): Indica si es materia de proyecto.

Interval (String)

Excepcio (Boolean)

#### Aules

ID (Int): Clave primaria.

Nom (String): Nombre o número del aula.

### Gestión Académica y Periodos
#### Curs

ID (Int): Clave primaria.

Tipus (ENUM: GS, GM, ...): Ciclo Formativo de Grado Superior o Medio.

Nom (String)

ID_Tutor (Int): Relación con la tabla Users (ID del profesor tutor).

ID_Periode (Int): Relación con la tabla Periode.

#### Periode

ID (Int): Clave primaria.

1r_Trimestre_ini (Data)

1r_Trimestre_fi (Data)

2n_Trimestre_ini (Data)

2n_Trimestre_fi (Data)

3r_Trimestre_ini (Data)

3r_Trimestre_fi (Data)

#### Classes (Grupos/Secciones)

ID (Int): Clave primaria.

ID_Curs (Int): Relación con la tabla Curs.

Nom (String)

ID_Tutor (Int): Relación con la tabla Users.

ID_Aula (Int): Relación con la tabla Aules.

### Relaciones e Inscripciones
#### Inscrits (Matrícula de alumnos)

ID (Int): Clave primaria.

ID_Alumne (Int): Relación con la tabla Users.

ID_Assignatura (Int): Relación con la tabla Assignatures.

#### Imparteix (Asignación de profesores)

ID (Int): Clave primaria.

ID_Profe (Int): Relación con la tabla Users.

ID_Assignatura (Int): Relación con la tabla Assignatures.

Titular (Boolean): Indica si es el profesor principal de la materia.

### Seguimiento y Control de Asistencia
#### Assistencies

ID (Int): Clave primaria.

ID_Ins (Int): Relación con la tabla Inscrits (Alumno matriculado).

Codi_hora (String): Código de la franja horaria (L1-12, M1-12, etc.).

ID_Assignatura (Int): Relación con la tabla Assignatures.

Data (Date)

Estat (ENUM: NULL, Assistit, Falta, Retard)

ID_profe (Int): Relación con la tabla Users (Profesor que registra).

#### Justificant

ID (Int): Clave primaria.

ID_Alum (Int): Relación con la tabla Users.

ID_Ass_Ini (Int): Relación con la tabla Assignatures (Asignatura de inicio del periodo a justificar).

ID_Ass_Fi (Int): Relación con la tabla Assignatures (Asignatura de fin del periodo a justificar).

Comentari (String)

Document (String): Ruta o enlace al archivo justificante.

Acceptada (Boolean): Estado de aprobación por parte de administración.

### Infraestructura y Horarios
#### Horaris

ID (Int): Clave primaria.

Codi_hora (String): Franja horaria (L1-12, M1-12, X1-12, J1-12, V1-12).

ID_Assignatura (Int): Relación con la tabla Assignatures.

ID_Classe (Int): Relación con la tabla Classes.

ID_Aula (Int): Relación con la tabla Aules.

#### Sensors

ID (Int): Clave primaria.

MAC (String): Dirección física del dispositivo.

ID_Aula (Int): Relación con la tabla Aules donde está instalado.

## Assignatures

Nom: Programació

Nom: Aplicacions Web

Nom: Muntatge i manteniment

Nom: Xarxes Locals 

Nom: Tutoria 

Nom: DIG + SOS 

Nom: SOM 

Nom: IPO1

Nom: Ofimàtica 

Nom: Anglès 

Nom: SOX 

Nom: IPO2 

Nom: Serveis de Xarxes

Nom: Seguretat 

## Horaris

## 1SMIX-A1

Codi_hora: Dilluns 8:00-10:00, ID_Assignatura: PROG, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dilluns 10:00-11:30, ID_Assignatura: Muntatge i manteniment, ID_Classe: 1SMX-A1, ID_Aula: INFO-1

Codi_hora: Dilluns 11:30-12:30, ID_Assignatura: Muntatge i manteniment, ID_Classe: 1SMX-A1, ID_Aula: INFO-1

Codi_hora: Dilluns 12:30-14:30, ID_Assignatura: IPO1, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 


Codi_hora: Dimarts 8:00-10:00, ID_Assignatura: Aplicacions We, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dimarts 10:00-11:00, ID_Assignatura: Muntatge i manteniment, ID_Classe: 1SMX-A1, ID_Aula: INFO-1

Codi_hora: Dimarts 11:30-12:30, ID_Assignatura: Muntatge i man, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dimarts 12:30-13:30, ID_Assignatura: IPO1, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dimarts 13:30-14:30, ID_Assignatura: SOM, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 


Codi_hora: Dimecres 8:00-10:00, ID_Assignatura: Xarxes Locals, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dimecres 10:00-11:00, ID_Assignatura: Tutoria, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dimecres 11:30-13:30, ID_Assignatura: Ofimàtica, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 


Codi_hora: Dijous 8:00-10:00, ID_Assignatura: Xarxes Locals, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dijous 10:00-11:00, ID_Assignatura: DIG + SOS, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dijous 11:30-12:30, ID_Assignatura: DIG + SOS, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Dijous 12:30-13:30, ID_Assignatura: Anglès, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 


Codi_hora: Divendres 8:00-9:00, ID_Assignatura: Ofimàtica, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Divendres 9:00-10:00, ID_Assignatura: PROG, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Divendres 10:00-11:00, ID_Assignatura: SOM, ID_Classe: 1SMX-A1, ID_Aula: INFO-1 

Codi_hora: Divendres 11:30-12:30, ID_Assignatura: SOM, ID_Classe: 1SMX-A1, ID_Aula: INFO-1

Codi_hora: Divendres 12:30-13:30, ID_Assignatura: Anglès, ID_Classe: 1SMX-A1, ID_Aula: INFO-1

### 2SMIX-A2

Codi_hora: Dilluns 8:00-9:00, ID_Assignatura: Seguretat, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dilluns 9:00-11:00, ID_Assignatura: Serveis de Xar, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dilluns 11:30-12:30, ID_Assignatura: IPO II, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 


Codi_hora: Dimarts 8:00-10:00, ID_Assignatura: SOX, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dimarts 10:00-11:00, ID_Assignatura: Projecte, ID_Classe: 2SMX-A2, ID_Aula: INFO-12

Codi_hora: Dimarts 11:30-12:30, ID_Assignatura: Projecte, ID_Classe: 2SMX-A2, ID_Aula: INFO-12


Codi_hora: Dimecres 8:00-10:00, ID_Assignatura: Serveis de Xar, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dimecres 10:00-11:00, ID_Assignatura: Seguretat, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dimecres 11:30-12:30, ID_Assignatura: Seguretat, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 


Codi_hora: Dijous 8:00-10:00, ID_Assignatura: Projecte, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dijous 10:00-11:00, ID_Assignatura: IPO2, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 

Codi_hora: Dijous 11:30-12:30, ID_Assignatura: Tutoria, ID_Classe: 2SMX-A2, ID_Aula: INFO-12 


Codi_hora: Divendres 8:00-10:00, ID_Assignatura: SOX, ID_Classe: 2SMX-A2, ID_Aula: INFO-12

Codi_hora: Divendres 10:00-11:00, ID_Assignatura: Projecte, ID_Classe: 2SMX-A2, ID_Aula: INFO-12

Codi_hora: Divendres 11:30-12:30, ID_Assignatura: Projecte, ID_Classe: 2SMX-A2, ID_Aula: INFO-12