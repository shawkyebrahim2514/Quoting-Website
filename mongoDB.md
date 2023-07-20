# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Validations](#validations)
    - [Validations for the collection `users`](#validations-for-the-collection-users)
    - [Validations for the collection `quotes`](#validations-for-the-collection-quotes)
    - [Validations for the collection `quoteLikes`](#validations-for-the-collection-quotelikes)
  - [Indexes](#indexes)
    - [Indexes for the collection `users`](#indexes-for-the-collection-users)
    - [Indexes for the collection `quotes`](#indexes-for-the-collection-quotes)
    - [Indexes for the collection `quoteLikes`](#indexes-for-the-collection-quotelikes)

## Validations

### Validations for the collection `users`

```js
db.runCommand( {
    collMod: "users",
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "username", "first_name", "last_name", "password", "email", "bio" ],
        properties: {
            username: {
                bsonType: "string",
                description: "You must provide username that must be a string with maximum 20 characters",
                minLength: 1,
                maxLength: 20
            },
            first_name: {
                bsonType: "string",
                description: "You must provide first name that must be a string with maximum 20 characters",
                minLength: 2,
                maxLength: 20,
                pattern: "^[A-Za-z]+$"
            },
            last_name: {
                bsonType: "string",
                description: "You must provide last name that must be a string with maximum 20 characters",
                minLength: 2,
                maxLength: 20,
                pattern: "^[A-Za-z]+$"
            },
            password: {
                bsonType: "string",
                description: "You must provide password that must be a string with length between 6 and 20",
            },
            email: {
                bsonType: "string",
                description: "You must provide email that must be a string with maximum 50 characters",
                minLength: 10,
                maxLength: 50,
                pattern: "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"
            },
            bio: {
                bsonType: "string",
                description: "You must provide bio that must be a string with maximum 150 characters",
                maxLength: 150
            },
        }
    }},
    validationLevel: "strict"
})
```

### Validations for the collection `quotes`

```js
db.runCommand( {
    collMod: "quotes",
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "title", "content", "username", "created_at" ],
        properties: {
            title: {
                bsonType: "string",
                description: "You must provide title that must be a string with maximum 50 characters",
                minLength: 3,
                maxLength: 50
            },
            content: {
                bsonType: "string",
                description: "You must provide content that must be a string with maximum 400 characters",
                minLength: 10,
                maxLength: 400
            },
            username: {
                bsonType: "string",
                description: "You must provide username that must be a string with maximum 20 characters",
                minLength: 1,
                maxLength: 20
            },
            created_at: {
                bsonType: "date",
                description: "You must provide created_at field that must be assigned with the current date",
            }
        }
    }},
    validationLevel: "strict"
})
```

### Validations for the collection `quoteLikes`

```js
db.runCommand( {
    collMod: "quoteLikes",
    validator: { $jsonSchema: {
        bsonType: "object",
        required: [ "quote_id", "username" ],
        properties: {
            username: {
                bsonType: "string",
                description: "You must provide a valid username that must be a string with maximum 20 characters",
                minLength: 1,
                maxLength: 20
            },
            quote_id: {
                bsonType: "objectId",
                description: "You must provide a valid quote id using new ObejctId('id')",
            }
        }
    }},
    validationLevel: "strict"
})
```

## Indexes

### Indexes for the collection `users`

```js
    db.users.createIndex( { username: 1 }, { unique: true } )
    db.users.createIndex( { email: 1 }, { unique: true } )
```

### Indexes for the collection `quotes`

```js
    db.quotes.createIndex({ username: 1, created_at: -1 })
```

### Indexes for the collection `quoteLikes`

```js
    db.quoteLikes.createIndex({ quote_id: 1, username: 1 }, { unique: true })
```
