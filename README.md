# Services Calculator (Mendoza Edition)

Aplicación web para calcular y dividir facturas de servicios (Gas y Luz) en propiedades con medidores compartidos. Diseñada específicamente para un escenario de "Casa Adelante" (Medidor General) y "Casa Atrás" (Medidor Interno).

![Version](https://img.shields.io/badge/version-1.0.2-blue)

##  problemática
En muchas propiedades de Mendoza existen situaciones donde hay un solo medidor de la empresa (Ej. Ecogas o Edemsa) para todo el terreno, pero varias viviendas (Casa Principal y Departamento/Casa atrás).
- El medidor de la calle mide el **TOTAL**.
- La casa de atrás suele tener un medidor interno (remarcador).
- Calcular cuánto debe pagar cada uno requiere hacer restas y reglas de tres simples cada mes.

## Solución
Esta aplicación automatiza ese cálculo.
1. Ingresas el monto de la factura y **adjuntas el PDF** (opcional).
2. Ingresas las lecturas (Anterior y Actual) del medidor de la calle.
3. Ingresas las lecturas (Anterior y Actual) del medidor interno.
4. El sistema calcula el consumo exacto de cada uno y divide el monto a pagar proporcionalmente.

## Configuración Técnica Completa

### 1. Instalación
```bash
npm install
```

### 2. Variables de Entorno (.env)
```
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_key_anon
```

### 3. Base de Datos (Supabase SQL)
Ejecuta este script en el SQL Editor de Supabase:
```sql
-- Tabla principal
create table bill_records (
  id uuid default gen_random_uuid() primary key,
  type text not null check (type in ('GAS', 'ELECTRICITY')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  date timestamp with time zone default timezone('utc'::text, now()) not null,
  period_label text not null,
  bill_amount numeric not null,
  total_consumption numeric not null,
  back_house_consumption numeric not null,
  front_house_consumption numeric not null,
  street_reading_prev numeric,
  street_reading_curr numeric,
  internal_reading_prev numeric,
  internal_reading_curr numeric,
  front_house_pay numeric not null,
  back_house_pay numeric not null,
  is_paid boolean default false,
  file_url text -- Nuevo en v1.0.2
);

-- Habilitar seguridad
alter table bill_records enable row level security;
create policy "Allow public access" on bill_records for all using (true) with check (true);
```

### 4. Storage (Archivos)
1. Crea un bucket público llamado `bills`.
2. Agrega una política para permitir escrituras (INSERT).

## Desarrollo
```bash
npm run dev
```

## Características
- **Base de Datos**: Historial en Supabase.
- **Adjuntar Facturas**: Sube PDFs para respaldo.
- **Login Seguro**: Acceso con contraseña y opción "Recordarme" (60 días).
- **Lecturas Inteligentes**: Sugiere la lectura anterior automáticamente.
