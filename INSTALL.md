# Introduction
The C1d3r guide is built using the [Polymer](https://www.polymer-project.org/1.0/) framework. This framework makes it easy to use the latest web technologies in a way that is portable and actually enjoyable to code.

# Prerequisite
Here are the tools and technologies needed to locally deploy C1d3r. Be aware that the commands will be run from a command line utility.

1. Install [Git](https://git-scm.com/downloads)
1. Install [Node.js](https://nodejs.org/en/download/) LTS version.
1. Install the latest version of Bower.

    npm install -g bower

1. Install Polymer CLI.

    npm install -g polymer-cli

### Updating libraries

Each time the guide is deployed, it's library should first be updated. The command to deploy the application locally will **not** perform a verification of library update status. Missing library will most of the time result in either weird behavior or an empty page. The libraries are updated by going to the root of the referential and running ``bower install``.

### Serving C1d3r

The C1d3r guide is now fully deployed using the Polymer CLI tools. It means that ``polymer serve`` is the only command needed for most situations. The command will output the full URL which can be used to access the application running locally.

## Running Tests

At this point, our regression testing suite is just a placeholder, but please do always run ``wct -l chrome`` to be warned if any of our tested assumptions are broken. Each developer is expected to run this before committing.