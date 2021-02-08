# Glip Salesforce Chrome extension

The idea is: for each Salesforce ticket, there should be a Glip team.

If there is no team, provide a button to create the team; if there is a team, provide links to navigate to the team.

[Install it from the Chrome Web Store](https://chrome.google.com/webstore/detail/glip-salesforce/gcmccmiceedebolmgjddhklghkaejbei)


## Background information

Originally this project was hosted at github.com/tylerlong/chrome-extension-glip-salesforce and it is kind of a personal project.

Later I got some feedbacks that it's not good to use my personal GitHub Pages domain name. I moved this project to github.com/ringcentral/chrome-extension-glip-salesforce and it became an "official" project.


## For developers

### Setup

```
yarn install
```

### Start the web site in dev mode

```
yarn start
```

Then navigate to http://localhost:8080/


### Build the web site for prod

```
yarn build
```

Built files are in `docs` folder. It is a static website which can be hosted by GitHub Pages.


### Release the Chrome extension

```
yarn release
```

Distributable files are located in `chrome_extension` folder. You can compress and upload it to Chrome Web Store.


### About the source code

Source code for the website is located in `src` folder. It is a pure frontend React app.

Source code for the chrome extension is in `content.js` file.
