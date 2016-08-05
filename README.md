# c1d3r
C1d3r is an interactive *hard* cider brewing guide. It aims at providing simple and easy to follow instructions meant for beginners and seasoned cider makers alike. As opposed to a written guide, C1d3r allows you to factors in certain parameters and which will then impact the quantities and steps that are produced. 

This project is meant to be simple and straight to the point. It offers flexibility but only based on pre-existing recipes. This is therefore not meant to be a generic recipe maker, nor a brewing simulator. Other products are much better at doing this. The core of the C1d3r application is its set of curated recipes. It will always have a custom mode, that allows some basic calculation to be done, but it is not it's intended use case.
 
By leveraging web technologies, the C1d3r application can be access from your browser either remotely or on a local installation. If using it remotely, it also has the possibility to be bookmarked. The online deployment of the app is accessible at this address : https://malavv.github.io/c1d3r/.


## Contributors
Contribution to this project are welcome, and this project is only as strong as the people who contributes to it. However, all work must comply with this projects vision of a simple, easy to use, and focused interactive guide. Here is a couple of way you may help :

1. Using it! And reporting errors and bugs in the Github issue manager.
2. Fixing issues reported by other users.
3. Helping with the user experience and styling. *HTML | JS | Polymer*
4. Contributing recipes, see the [wiki page](https://github.com/malavv/c1d3r/wiki/Contributing-Recipes) for more details.

This is the lovely people to thank for this guide:
```
Maxime Lavigne (malavv)
# Generated using git log --format='%aN' | sort -u
```

## Building application
After building the application, you will have a local instance of C1d3r which uses the code you have in your local repository.

### Prerequisite
A few tools for web development are required to build this project.

1. NodeJS
  * [Website](https://nodejs.org/en/)
  * Install : Run their installer for your OS.
  * Verify : Make sure npm is accessible from the command line.
2. Bower package manager
  * [Website](https://nodejs.org/en/)
  * Install :```npm install -g bower```
3. Gulp builder
  * [Website](http://gulpjs.com/)
  * Install :```npm install -g gulp-cli```
4. Polymer Vulcanizer
  * [Website](https://www.polymer-project.org/1.0/)
  * Install :```npm install -g vulcanize```
5. Polymer Web Component Tester
  * [Website](https://www.polymer-project.org/1.0/)
  * Install :```npm install -g web-component-tester```

### Updating libraries
From the root folder of the project, update the *Node* and *Bower* libraries.
```
$npm update
$bower update
```

## Serving the instance

* **Development** ```gulp serve:dev```
* **Testing** ```gulp test:local```
* **Production** ```gulp dist```