# Libretrieve

What began as a simple interface for Google Books became a full reference for book club. One part discord bot, one part website, libretrieve makes it easier to manage our book club by retrieving information on suggested books and maintaining a history.

### Discord Bot Commands _(Node.js, Discord.js)_:

- !getbook [search string] : retrieves book details from Google Books
- !pastbooks : returns the 5 most recent book club picks
- !addbook [title] - [author] : adds book to the list of book club picks

### Webpage _(React)_:

- Contains full listing of prior book club picks
- Theme selector allows you to select an album-inspired colorway. Selection is saved in local storage so your choice will be preserved for repeated visits
- **Major work in progress.** More styling and functionality to come!
