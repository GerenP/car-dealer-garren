
# UKK Car Dealer

Dis for UKK


## Run Locally

Clone the project

```bash
  git clone https://github.com/AkitaEllie/car-dealer-app
```

Go to the project directory

```bash
  cd car-dealer-app
```

Install dependencies  
Note : You may and SHOULD use pnpm for this app.

```bash
  npm install
```

Set the database url in .env file following this format:  

```env
DATABASE_URL = mysql://username:password@host/database
```

Initialize and reset database if needed.

```bash
  npm run deploy
  npm run reset
```

Start the server

```bash
  npm run dev 
```

