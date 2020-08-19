In order to enable mongodb access controol, one must perform a similar procedure:

1. Create a super user with root priviledges

```
  use admin
  db.createUser(
    {
      user: "kazkakazka",
      pwd: "visainekazka",
      roles: [ "root" ]
    }
  )
```

2. Create another user for the Node.js application:

```
  use admin
  db.createUser(
    {
      user: "meinediary",
      pwd: "rasperispi",
      roles: [ {role: "dbOwner", db: "diary"} ]
    }
  )
```

3. Shut down the MongoDB service
4. Start MongoDB with access control: `mongod --auth`

# Some resources

- https://stackoverflow.com/questions/4881208/how-to-secure-mongodb-with-username-and-password
- https://docs.mongodb.com/guides/server/auth/
