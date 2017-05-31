
# BA-PhotoVideoMap

<p>An interactive map showing geotagged photos and videos.</p>

### Follow these steps to get it locally running on your system
1. Install **[Node.js](https://nodejs.org)**
2. Install **[MongoDB](https://docs.mongodb.com/manual/installation/)** 

   On OS X you just could install it via [homebrew](http://brew.sh/) for example. (see: https://docs.mongodb.com/master/tutorial/install-mongodb-on-os-x/?_ga=1.180592423.1050584679.1469735924)


3. [Install](https://git-scm.com/downloads) and [Set Up](https://help.github.com/articles/set-up-git/) **Git**


4. On your system create a folder for storing all files related to this project.
   Now open the Terminal application and navigate to this folder (via the `cd command`)


5. Now type in the follwing command into your Terminal window:  
`git clone https://github.com/s0539929/BA-PhotoVideoMap.git .`  
(adding the point at the end of the line will prevent git to create an extra folder inside the folder you created in step 4)


6. Now you have to install all the dependencies for Node.js. In your Terminal window type in:  
`npm install`


7. Now you need to start your MongoDB server: open up a new Terminal window and type in:  
`mongod --dbpath [path to the data folder inside your project folder]`


8. Lastly in your first Terminal window type in:  
`npm start`


9. Open up a webbrowser of your choice and enter:  
`http://localhost:3000/map`
