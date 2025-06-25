# 💰 Personal Finance Dashboard
![alt text](image.png)
Un'applicazione web per la gestione delle finanze personali, sviluppata con **Angular** (frontend) e **ASP.NET Core** (backend).  
Permette di monitorare bilanci, transazioni, budget, pots (obiettivi di risparmio) e spese ricorrenti.

---

## 🚀 Funzionalità principali

- ✅ Panoramica dei saldi, entrate e spese
- 🔍 Ricerca, ordinamento e paginazione delle transazioni
- 🧾 CRUD completo per budget e pots
- 📊 Visualizzazione dei progressi dei pots
- 💸 Gestione bollette ricorrenti con stato (pagato/in scadenza)
- 🧠 Accessibilità con navigazione da tastiera
- 📱 Responsive design per ogni dispositivo
- 🔐 (Bonus) Autenticazione e salvataggio su database

---

## 🛠️ Tecnologie utilizzate

### Frontend
- Angular 17+
- SCSS / Tailwind CSS
- Chart.js o ngx-charts (per grafici)

### Backend
- ASP.NET Core Web API
- Entity Framework Core
- SQLite / SQL Server

---

## 📂 Struttura del progetto
*Frontend (Angular)*
/finance-app/
├── src/
│   ├── app/
│   │   ├── services/             --> servizi comuni, moduli shared
│   │   ├── components/       --> componenti generici riutilizzabili
│   │   ├── pages/            --> Overview, Transactions, ecc.
│   │   └── models/           --> interfaces per dati (Transaction, Pot, ecc.)
│   ├── assets/               --> immagini, icone, data.json
│   └── environments/
├── angular.json
└── package.json

*Backend (ASP.NET Core Web API)*
/FinanceAPI/
├── Controllers/
├── Models/
├── Services/
├── Data/                 --> file JSON o db se usi EF Core
├── appsettings.json
└── Program.cs
