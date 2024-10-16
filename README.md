# RingCentral Team Messaging Salesforce Chrome extension

The idea is: for each Salesforce ticket, there should be a RingCentral Team Messaging team.

If there is no team, provide a button to create the team; if there is a team, provide links to navigate to the team.

[Install it from the Chrome Web Store](https://chrome.google.com/webstore/detail/glip-salesforce/gcmccmiceedebolmgjddhklghkaejbei)

## Background information

Originally this project was hosted at github.com/tylerlong/chrome-extension-glip-salesforce and it is kind of a personal project.

Later I got some feedbacks that it's not good to use my personal GitHub Pages domain name. I moved this project to github.com/ringcentral/chrome-extension-glip-salesforce and it became an "official" project.

## Known issues

2024-06-12 I found that the extension is not working anymore.

After investigation, I found that the root cause is the [Storage Partioning](https://developers.google.com/privacy-sandbox/3pcd/storage-partitioning) feature. A web page embedded in an iframe doesn't share the same storage with the same web page standalone. This is a good feature for privacy, but it breaks the extension.

The workaround is to go to chrome://flags/#third-party-storage-partitioning and disable the feature. After that you need to relaunch the browser. The extension will work again.

We may figure out a better way in the future, but for now, above is the workaround.

Proposed solution (for developer of this repo only): Let user login inside the iframe, do not open a new window. Because the new window doesn't share storage with the iframe at all. Problem is: the iframe is too small to show the login page. We need to find a way to make the iframe bigger when login and make it smaller after login.

## For developers

### Setup

```
yarn install
```

### Start the web site in dev mode

```
yarn serve
```

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

## Error: error:0308010C:digital envelope routines::unsupported

```
NODE_OPTIONS=--openssl-legacy-provider yarn build
```

I believe this issue will go away if I upgrade everything to latest version.
