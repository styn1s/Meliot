# Meliot

## Description

This project is an application for managing tasks and boards, written using the Angular framework.

## Installation

Here are the steps how to install and run this project correctly:

1. First, download all the files from this repository.

2. Go to [**NodeJS**](https://nodejs.org/en) official site, download it and install it wherever you want.

3. After you've installed NodeJS, go to [**MongoDB**](https://www.mongodb.com/try/download/community) official site, then download MongoDB Community Server and install it in the system folder on your PC.

4. After installation MongoDB Server, you need to create a directory on your hard drive in which the MongoDB databases will be located. On Windows OS, by default MongoDB stores databases in the path **`C:\data\db`**, so if you are using Windows, you will need to create an appropriate directory.

5. Open the downloaded project via Visual Studio Code (if you don't have it, go to this [*link*](https://code.visualstudio.com/) and install that).

6. Open a new terminal and type **`npm install -g @angular/cli`**. This comman will install Angular globally on your PC.
   > When running on Windows and executing commands in PowerShell instead of the command line, it is worth keeping in mind that PowerShell scripting is disabled by default. To enable PowerShell scripting (which is required for npm), run the following command:
   > **`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`**

8. Next, create a new terminal and type **`npm install`** for updating dependencies of the project.

9. Open a new terminal and type **`C:/mongodb/bin/mongod`**. This comand will start the MongoDB Server.

10. Then, create another terminal, and go to the API folder by typing **`cd api`**.

11. After that, just type **`nodemon app.js`**. This comand will launch the API of the project.

12. One more step, you need to create another terminal and type **`cd frontend`** to go to the frontend folder, and then type **`ng serve`**. This command will launch the Angular application.

13. Finally, open your favourite browser (***not Explorer, delete it forever***) and go to http://localhost:4200.

## Features

Here are some features that I plan to add to this project:

- Creating tasks states
- Drag & Drop system (user will be able to change the order of tasks and also drag a specific task between states)
- Adding subtasks

# Enjoy ;)
