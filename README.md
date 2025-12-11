# Services Calculator (Mendoza Edition)

Aplicación web para calcular y dividir facturas de servicios (Gas y Luz) en propiedades con medidores compartidos. Diseñada específicamente para un escenario de "Casa Adelante" (Medidor General) y "Casa Atrás" (Medidor Interno).

![Version](https://img.shields.io/badge/version-1.0.1%2Bsupabase-blue)

##  problemática
En muchas propiedades de Mendoza existen situaciones donde hay un solo medidor de la empresa (Ej. Ecogas o Edemsa) para todo el terreno, pero varias viviendas (Casa Principal y Departamento/Casa atrás).
- El medidor de la calle mide el **TOTAL**.
- La casa de atrás suele tener un medidor interno (remarcador).
- Calcular cuánto debe pagar cada uno requiere hacer restas y reglas de tres simples cada mes.

## Solución
Esta aplicación automatiza ese cálculo.
1. Ingresas el monto de la factura.
2. Ingresas las lecturas (Anterior y Actual) del medidor de la calle.
3. Ingresas las lecturas (Anterior y Actual) del medidor interno.
4. El sistema calcula el consumo exacto de cada uno y divide el monto a pagar proporcionalmente.

## Cálculo
La lógica utilizada es:
1. `Consumo Total = Lectura Actual Calle - Lectura Anterior Calle`
2. `Consumo Atrás = Lectura Actual Interna - Lectura Anterior Interna`
3. `Consumo Adelante = Consumo Total - Consumo Atrás`
4. `Participación Atrás = Consumo Atrás / Consumo Total`
5. `Paga Atrás = Monto Factura * Participación Atrás`
6. `Paga Adelante = Monto Factura - Paga Atrás`

## Características
- **Base de Datos**: Historial guardado en Supabase (nube) para no perder datos.
- **Login Seguro**: Acceso restringido para administración.
- **Lecturas Inteligentes**: La app recuerda la "Lectura Actual" del mes pasado y te la sugiere como "Lectura Anterior" del nuevo mes.
- **Soporte Dual**: Maneja Gas y Luz por separado.

## Instalación

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno en `.env`:
   ```
   VITE_SUPABASE_URL=tu_url_supabase
   VITE_SUPABASE_ANON_KEY=tu_key_anon
   ```
4. Ejecutar el script SQL en Supabase (ver `schema.sql`).
5. Iniciar desarrollo:
   ```bash
   npm run dev
   ```

## Tecnologías
- React + TypeScript + Vite
- TailwindCSS (Estilos Modernos)
- Supabase (PostgreSQL Database)
- SweetAlert2 (Notificaciones)
