# How to develop

First make sure that you have NVM and Node.js installed.

```sh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
nvm install node
```

Then to install Gulp and all the plugins:

```sh
npm install
npm install -g gulp
```

Finally, to start developing, do:
```
gulp
```

To push changes to github pages use
```
gulp deploy
```

You'll probably want to install the Livereload extension on the Chrome app store too. If you just
activate that extension, then it will talk to the Gulp Livereload server and auto-reload the page
on SCSS/HTML changes. Super convenient for iterating!
