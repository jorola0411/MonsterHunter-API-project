
This is an API project for MDIA-3294-Web Scripting 2 during my time at BCIT studying New Media Design and Web Development.

This project focused on quering an API in a 3 page React.js application. Some of the requirements in this assignment were:
- the option to favorite an item, and an option to remove the favorite item from the favorites page
- Favorited items should save to the local storage to persist across browser sessions.
- use an API to query results and receive data from the API

--How to run the project--
Node modules are removed and not available on Github to reduce file size and to unzip the entire project faster.

1. Open the Terminal on the Navigation bar on the top, or Ctrl + ` to open the terminal.
2. In the terminal, input "cd monster" to change directories to the folder that contains all the files and sub-folders.
3. In the terminal, input "npm install" **NOTE** you must have node.js installed in your personal computer first for this to work.
4. In the terminal, input "npm run dev" and click on the link to open the project.

Challenges:

- handling multiple categories: Instead of just doing one category, like monsters only from the Monster Hunter API, I wanted to make full (or atleast a majority) of the data offered in the API, so I added the choice of choosing different categories of things from the game. The challenge was trying to change the code to handle multiple categories.

For the fetch method, instead of (`https://mhw-db.com/monsters`) for one category, I changed it to (`https://mhw-db.com/${category}`). category was a constant variable created for this, as well as setCategory, which is used to change the categories. setCategory is used in the buttons to change category, which changes it to monsters, items, skills, and/or more.



