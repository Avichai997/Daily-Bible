# Daily Bible Learn App

![](client/public/logo192.png)

A Full Stack web app for daily bible learning using the newest technologies!

## Our Developers Team

| Name              | Role                                         |
| ----------------- | -------------------------------------------- |
| _Uria Medalia_    | `Full-Stack Developer + AI developer`        |
| _Ahuvia Shani_    | `Full-Stack Developer + Product Designer`    |
| _Avichai Iluz_    | `Full-Stack Developer + Technical Team Lead` |
| _Yehuda Kalerman_ | `Full-Stack Developer + Product Manager`     |
| _Shilo Hacohen_   | `Full-Stack Developer + Team Lead`           |
| _Haim Leibman_    | `Full-Stack Developer + CTO`                 |

# Getting Started

## Prerequisites

Please install all the required packages & softwares before running the app.

| Name                                  | Version | Download Instructions                                                                                                                    |
| ------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Postman                               | Latest  | [Download Postman](https://dl.pstmn.io/download/latest/win64)                                                                            |
| MongoDB Compass                       | Latest  | [Download MongoDB Compass](https://www.mongodb.com/try/download/compass)                                                                 |
| Node.js                               | LTS     | [Download Node.js](https://nodejs.org/en/download)                                                                                       |
| VS Code                               | Latest  | [Download VS Code](https://code.visualstudio.com/download)                                                                               |
| Azure Account extension               | Latest  | [Download Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)                                    |
| Prettier extension                    | Latest  | [Download Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                                          |
| Auto Import extension                 | Latest  | [Download Auto Import](https://marketplace.visualstudio.com/items?itemName=steoates.autoimport)                                          |
| Auto Rename Tag extension             | Latest  | [Download Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)                            |
| Code Spell Checker extension          | Latest  | [Download Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)                 |
| colorize extension                    | Latest  | [Download colorize](https://marketplace.visualstudio.com/items?itemName=kamikillerto.vscode-colorize)                                    |
| DotENV extension                      | Latest  | [Download DotENV](https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv)                                                  |
| ES7+ React snippets extension         | Latest  | [Download ES7+ React snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)                      |
| ESLint extension                      | Latest  | [Download ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                                            |
| Hebrew - Code Spell Checker extension | Latest  | [Download Hebrew - Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-hebrew) |
| Pretty TypeScript Errors extension    | Latest  | [Download Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)                        |
| Restore Terminals extension           | Latest  | [Download Restore Terminals](https://marketplace.visualstudio.com/items?itemName=EthanSK.restore-terminals)                              |

## Run the app:

**Step 1:**
To run the app client + server side in development MODE you have two methods available:

1. Automatically (**recommended**):

   - [Clone the repo from Github](https://github.com/Avichai997/Daily-Bible.git).
   - Install VS Code extension: [Restore Terminals](https://marketplace.visualstudio.com/items?itemName=EthanSK.restore-terminals)
   - Re-open VsCode and then open the file "DailyBible.code-workspace" inside the root folder.
     It will open vs code with terminals for server & client, navigate to the folders directory, install npm packages and start the apps. A new window of your default browser will automatically open at "http://localhost:3000" - the default start page of the client app.

2. Manually:

   - Clone the repo.
   - Open new terminal for server
   - Run:
     ```
     cd server && npm set legacy-peer-deps true && npm i && npm run seed && npm run dev
     ```
   - Open new terminal for client
   - Run:
     ```
     cd client && npm set legacy-peer-deps true && npm i && npm run huskyInit && npm run dev:development
     ```
   - open http://localhost:3000

**Step 2:**

- Open Postman
- Click on "Create Workspace", hit "Next", enter name of workspace: "Daily Bible", Click on "Create".
- Type CTRL + O to open import popup, click on "folders" and import the 2 folders located inside "YOUR_PROJECT_LOCATION\Daily-Bible\server\src\Seed\PostmanBackup".
- wait for the files to load and click on "Import" button.
- In Postman click on "Collections" button in the left bar.
- At the top right corner of the screen under the "Upgrade" button click on "No Environment" select box and choose "Dev: Daily Bible".

## Tests:

Tests in client side powered by Jest.

- Run the test once:
  ```
  cd client && npm run test:once
  ```
- Run the test in Watch mode:

  ```
  cd client && npm run test
  ```

Tests in server side powered by Vitest + MSW.

- Run the test once:
  ```
  cd server && npm run test:once
  ```
- Run the test in Watch mode:
  ```
  cd server && npm run test
  ```

## Technologies:

**Server side:**

- Node.js
- Express.js
- Typescript
- Mongoose
- Mongo DB Atlas

**Client side:**

- React.js
- Typescript
- Tanstack Query
- Jotai

## Environments:

1. development
2. production

## Database:

**mongoDB**
![](https://www.pngall.com/wp-content/uploads/13/Mongodb-PNG-Image-HD.png)

# Synchronization

Synchronization is one of the biggest Issues in our project we used **Google Drive** and **GitHub** (Git) to collaborate with each other, and integrate easily into our workflow... The synchronization mechanism takes place every minute in the background, downloading, merging, and uploading file modifications.

# Deploy to Ec2:

<!-- Update and install prerequisites: -->

sudo apt update
sudo apt install -y curl software-properties-common

<!-- Install Node.js v20: -->

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

<!-- Verify Git installation: -->

sudo apt install -y git
Install PM2 globally:
sudo npm install -g pm2

# Clone the GitHub repository:

git clone https://github.com/Avichai997/Daily-Bible.git

<!-- Create .env file: -->

cd <FOLDER_NAME>

cat <<EOL > .env.production
<!-- .env CONTENT GOES HERE: -->
EOL

