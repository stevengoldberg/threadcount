# ThreadCount (Beta)

*Visualize your correspondence*

### Installing
Clone the repo, then `npm install`. `npm start` to run in prod mode, `npm run dev` to run in dev mode.


### Instructions
* Sign in with your Google account
* Type a name or email address in the upper-left search bar
![screenshot](https://i.imgur.com/npKwtmm.jpg)
* Click a contact in the left-hand bar. The contact's email will display below the search bar.
![screenshot](https://i.imgur.com/avQuY78.jpg)
* Select start and end dates for your query.
![screenshot](https://i.imgur.com/x7yrGij.jpg)
* Click the "Search" button
![screenshot](https://i.imgur.com/ri0AmSM.jpg)
* The upper pane will display previews of all threads between the logged-in user and the selected contact over the chosen time period. The number on the right side of the pane indicates the number of messages in the thread. If "Word Cloud" is selected, the lower pane will display the most commonly used words in the correspondence, with more common words appearing larger.
![screenshot](https://i.imgur.com/Vp0lz4u.jpg)
* If "Word Count" is selected, the lower pane will display data and charts about the number of messages and words exchanged between the logged-in user and the selected contact over the chosen time period.
![screenshot](https://i.imgur.com/9tGQ6RQ.jpg)

### Known Issues
* Token refresh is currently disabled. When your auth token expires, you'll have to sign out and sign in again.
* There is no query validation -- you can enter invalid queries (e.g. no selected user, end date before start date, etc.)

### [Based on React Electron Boilerplate](https://github.com/chentsulin/electron-react-boilerplate)
