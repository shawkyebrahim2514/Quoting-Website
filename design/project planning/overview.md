> Must use cookies and session authentication in the application

## Database Schemas

### Users

```
    User (
        email string(255) primary key,
        username string(255) unique,
        password string(255),
        firstname string(255), 
        lastname string(255), 
        )
```

```
    Friendship (
        user_email string(255),
        friend_email string(255),
        primary key (user_email, friend_email),
        foreign key (user_email) references User(email) on delete cascade,
        foreign key (friend_email) references User(email) on delete cascade
        )
```

### Quotes

```
    PrivacyType (
        id int primary key auto_increment,
        name string(50)
        )
```

> The available privacy types are (public, private, friends only)

```
    Quote (
        id int primary key auto_increment,
        title string(255),
        content string(1000),
        created_at timestamp default current_timestamp,
        user_email string(255),
        privacy_id int,
        foreign key (user_email) references User(email) on delete cascade,
        foreign key (privacy) references PrivacyType(id) on delete cascade
        )
```

```
    QuoteLike (
        quote_id int,
        user_email string(255),
        primary key (quote_id, user_email),
        foreign key (quote_id) references Quote(id) on delete cascade,
        foreign key (user_email) references User(email) on delete cascade
        )
```

```
    QuoteComment (
        quote_id int,
        user_email string(255),
        content string(1000),
        created_at timestamp default current_timestamp,
        foreign key (quote_id) references Quote(id) on delete cascade,
        foreign key (user_email) references User(email) on delete cascade
        )
```

## UI Consideration

### Registration page

```
    There must be a form that allow user to create a new account using (firstname, lastname, email, password).
    There must be a create button and loggin button.
    There must be a warning message if the email is already used or if there is any error occured.
    After successuful registration, the user will be redirected to the main page (logged to the website immediately).
        The email will be stored in the session and the cookies on the server.
```

### Login page

```
    There must be a form that allow user to login using (email, password).
    There must be a login button.
    There must be a warning message if the email doesn't exist or if there is any error occured.
```

### Main page

```
    Any User ethier logged or not can view the public quotes feed in the main page
    Any user can search about any user using the search bar in the main page
    The logged in user can view public and friends only quotes in the main page
    The logged in user can submit a quote in the main page through the form
    The number of quotes to be fetched in each time is 10
    The view of the quotes will be in the same page with load more button
```

### Quote design

```
    The quote must include (title, content, author, number of likes, number of comments, privacy level, a button to show the comments).
    The logged user can change his quotes' privacy level or its content using the settings option on each quote (the setting option to chnage from should only appear to the quote's owner).
    The logged user can like any quote using the like option on each quote.
    The logged user can submit a comment on any quote using the comment option on each quote
        The comment must include (content).
    The button to show the comments should use the same technique that used in the main page to view the quote's comments.
        Show the these comments in a pop up window.
    Each comment should include (content, author, created_at).
        The owner of the comment can delete the comment using the delete button on each comment. (this button should only appear to the comment's owner)
```

### User profile page

```
    User can view his profile page including (name, email, number of quotes, number of friends)
    User can view his quotes in his profile page (public, private, friends only)
        Use the same technique that used in the main page to view the quotes
        User can change any quote's privacy using the settings option on each quote
    User can view his friends in his profile page
        Use the same technique that used in the main page to view the friends
        User can remove any friend using the remove button on each friend
    The design of the page:
        Main Information (firstname, lastname, email)
        A button to change his information
            Show it in a pop up window
                If user will change the password, he must enter the old password
        A button to remove the account (if the user is the owner of the account)
        A button to remove the friend (if the user is a friend with the user)
        A button to add the friend (if the user is logged and not a friend with the user)
        A button to show the his quotes
            Show it in a pop up window
        A button to show his friends
            Show it in a pop up window
```

```
    User can view other users' profile page.
    This page will be the same as the user profile page but without the settings option (handle it using the authentication).
    If the user is not logged in, he can only view the public quotes of the user.
    If the user is a friend with the user, a remove option will appear.
```
