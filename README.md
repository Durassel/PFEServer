# `PFEServer` — Graduation project / Voxel

This project is a backend server used as an API to produce informations displayed on a web client application.


## Getting Started

To get you started you can simply clone the `PFEServer` repository and install the dependencies:

### Prerequisites

You need git to clone the `PFEServer` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `PFEServer`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `PFEServer`

Clone the `PFEServer` repository using git:

```
git clone https://github.com/Sodsixela/PFEServer
cd PFEServer
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools
help us manage and test the application.

* We get the tools we depend upon and the AngularJS code via `npm`, the [Node package manager][npm].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
nodemon index.js
```

Now browse to the app at [`localhost:3005`][local-app-url].