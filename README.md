# Couchbase Vale Style Guide

This repository is the home of the Couchbase Style Guide, translated into Vale format! 

## Get Started 

To get started with the Vale Style guide, you need to: 

1. [Install Vale](#install-vale). 
2. [Set up a `.vale.ini` file](#set-up-a-valeini-file).
3. [Configure your dicpath/ignore for Coucbase.Spelling](#configure-your-dicpathignore-for-couchbasespelling)

### Install Vale

To install Vale: 

1. Install a package manager: 
    a. On Windows: [Chocolatey](https://chocolatey.org/install)
    b. On Mac/Linux: [Homebrew](https://brew.sh/)

2. Open a terminal application with administrator permissions. 

3. Follow the instructions at [Vale.sh](https://vale.sh/docs/vale-cli/installation/) for your platform. 

The package manager does all of the heavy lifting to install Vale. If you receive a prompt to "run additional scripts" from the terminal, approve it. 

### Set up a .vale.ini file 

This repo contains a `.vale.ini` file that contains everything you need to get started. This file contains all of the necessary configuration for Vale to lint your text files.

Make a couple changes to ensure your Vale installation pulls your styles from the correct location: 

1. In your file explorer, move the `.vale.ini` from this repository to your `$HOME` directory: 
    - On Windows: `C:\Users\<yourusername>`
    - On Mac: `/Users/<yourusername>`

    On Linux, the location of the `$HOME` directory varies based on your specific Linux distribution. 

2. Open the `.vale.ini` file in a text editor. 

3. Set the `StylesPath` to the location of the `ValeStyles` folder in this repository. 
    For example, `C:\Users\<yourusername>\GitHub\cb-vale-style-guide\ValeStyles`

### Configure your dicpath/ignore for `Couchbase.Spelling`

Unfortunately, the Spelling rule for our spellcheck searches for the path to the required dictionary and ignore files relative to the directory where you're trying to lint. 

Not great. 

1. Replace the `$REPO` in the `dicpath` and `ignore` attributes to the location of the local copy of this repository on your machine. 

## Lint a file 

After you've done all the set up, you're ready to lint some files! 

### Lint a single file 

1. Open the file's folder location in a terminal window. 

2. Run `vale <filename>`. 

Vale generates a report that provides the following information: 

1. The line number and character number where it found an issue. 
2. 