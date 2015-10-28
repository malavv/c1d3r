# c1d3r
C1d3r is an interactive *hard* cider brewing guide. It aims at providing simple and easily followable recipes that beginners and experts alike can follow. This is not a recipe maker nor a brewing simulator.

C1d3r is a single page web application which offers a few recipe and a custom mode. In the custom mode, the user defines the required target levels of ingredients.

The best way to experience C1d3r is to use the online demo found on the home page at: https://malavv.github.io/c1d3r/. However, deploying your own instance is straightforward.

## Contributors
Contribution to this project are welcome however they must comply with this projects vision of a simple, easy to use, and focused interactive guide. This being said a project is only as strong as the people who contributes to it. This is why here is a couple of way you may help :

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
4. Gulp builder
  * [Website](http://gulpjs.com/)
  * Install :```npm install -g gulp-cli```
5. Polymer Vulcanizer
  * [Website](https://www.polymer-project.org/1.0/)
  * Install :```npm install -g vulcanize```
6. Polymer Web Component Tester
  * [Website](https://www.polymer-project.org/1.0/)
  * Install :```npm install -g web-component-tester```

### Updating libraries
From the root folder of the project, update the *Node* and *Bower* libraries.
```
$npm update
$bower update
```

## Serving the instance
### For development
```gulp serve:dev```

### To run test suite
```gulp test:local```

### To generate distribution files
```gulp dist```