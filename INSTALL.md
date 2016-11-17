# Introduction
The `c1d3r` guide is built using the [Polymer](https://www.polymer-project.org/) application framework. This framework makes it easy to use the latest web technologies in a way that is portable and actually enjoyable to code.

This project relatively small size and clear focus makes it an excellent introduction to the Polymer framework. You should be up and running in no time.

# Prerequisite
Here are the tools and technologies needed to locally deploy `c1d3r`. Be aware that the commands will be run from a command line utility.

1. Install [Git](https://git-scm.com/downloads)
1. Install [Node.js](https://nodejs.org/en/download/) LTS version.
1. Install the latest version of Bower.

    npm install -g bower

1. Install Polymer CLI.

    npm install -g polymer-cli

### Updating libraries

Each time the guide is deployed, it's library should first be updated. The command to deploy the application locally will **not** perform a verification of library update status. Missing library will most of the time result in either weird behavior or an empty page. The libraries are updated by going to the root of the referential and running ``npm install`` and ``bower install``.

### Serving C1d3r

The `c1d3r` guide is now fully deployed using the Polymer CLI tools. It means that ``polymer serve`` is the only command needed for most situations. The command will output the full URL which can be used to access the application running locally.

## Running Tests

At this point, our regression testing suite is just a placeholder, but please do always run ``wct -l chrome`` to be warned if any of our tested assumptions are broken. Each developer is expected to run this before committing.

## Building and Deploying

Publishing the `c1d3r` application is a two step process. We first use the Polymer-cli project to analyse and minify our sources and dependencies using : ``gulp build``.

Then we can deploy our project on the web, by pushing these changes to the **gh-pages** branch of the repository. By doing so, we are making GitHub update our project page which is hosting the web accessible version of the application. This is done using : ``gulp deploy``.
