# CUANDO TRABAJES CON ESTO CUANDO TE DIGA, AGREGA LA EXPLICACIÓN A LA ACCIÓN QUE HAS HECHO AQUÍ

Quiero crear los seeders para rellenar informacion en la base de datos.

## ✅ Completado: Seeder de Assignatures (19/02/2026)

- Se ha rellenado el AssignaturesSeeder con 16 asignaturas (14 del CONTEXT.md + 2 de proyecto)
- Configuración aplicada:
    - Nom: nombres extraídos de CONTEXT.md
    - Projecte: false para todas las asignaturas EXCEPTO "Projecte" y "Projecte Final" (true)
    - Excepcio: false para todas EXCEPTO IPO2 (true)
    - Interval: array JSON con fechas sincronizadas con los períodos:
        - Asignaturas regulares inicio: 2025-09-12 (trimestre_1_ini)
        - Asignaturas regulares final:
            - SOX, Serveis de Xarxes, Seguretat: 2026-06-14 (trimestre_3_fi - curso completo)
            - Resto: 2026-03-13 (trimestre_2_fi - dos trimestres)
        - Asignaturas de proyecto (Projecte, Projecte Final): 2026-03-14 a 2026-06-14 (trimestre_3)

## ✅ Completado: Seeder de Horaris (19/02/2026)

- Se ha creado y rellenado el HorarisSeeder con los horarios actualizados de las clases 1SMIX-A1 y 2SMIX-A2
- Configuración aplicada:
    - codi_hora: Codificación por día y hora (L/M/X/J/V + 1-6)
        - L=Lunes, M=Martes, X=Miércoles, J=Jueves, V=Viernes
        - 1=8-9h, 2=9-10h, 3=10-11h, 4=11:30-12:30h, 5=12:30-13:30h, 6=13:30-14:30h
    - id_assignatura: IDs numéricos según orden en AssignaturesSeeder (1-16, incluye Projecte=15)
    - id_classe: IDs según orden en ClassesSeeder (1SMIX-A1=1, 2SMIX-A2=6)
    - id_aula: IDs según orden en AulesSeeder (INFO-1=1, INFO-12=6)
- Total de registros: 47 franjas horarias (27 para 1SMIX-A1, 20 para 2SMIX-A2)

Todos los seeders base están completados.
