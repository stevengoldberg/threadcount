# ThreadCount (Beta)

*Visualize your correspondence*

### Installing
Clone the repo, then `npm install`. `npm start` to run in prod mode, `npm run dev` to run in dev mode.

The latest Mac OSX version is 0.2.1. You can [download it here](https://www.dropbox.com/s/qxuwcxk1w8mkt33/ThreadCount-0.2.1.dmg?dl=0).

### Instructions
* Sign in with your Google account
* Type a name or email address in the upper-left search bar
* Click a contact in the left-hand bar.
* Select start and end dates for your query.
* Click the "Search" button
* The upper pane will display previews of all threads between the logged-in user and the selected contact over the chosen time period. The number on the right side of the pane indicates the number of messages in the thread. If "Word Cloud" is selected, the lower pane will display the most commonly used words in the correspondence, with more common words appearing larger.
* If "Word Count" is selected, the lower pane will display data and charts about the number of messages and words exchanged between the logged-in user and the selected contact over the chosen time period.

### Known Issues
* Token refresh is currently disabled. When your auth token expires, you'll have to sign out and sign in again.

### Screenshots

Word Count
![image](https://i.imgur.com/zQNl2rX.png)
Word Cloud
![image](https://i.imgur.com/VZf6pEI.png)
### [Based on React Electron Boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
