<link rel="stylesheet" type="text/css" media="all" href="./README.css" />

# Rotten Potatoes API

A spoof of Rotten Tomatoes, built in TypeScript using Node.js, Express.js, TypeORM, and SQLite.

---

## **Table of Contents**

<br>

- ### **Endpoints/Routes**

  - #### BASE ROUTE & AUTHENTICATION ENDPOINTS

    | Links                                   | Endpoints         |
    | --------------------------------------- | ----------------- |
    | [GET Base](#get-base)                   | `/`               |
    | [POST Registration](#post-registration) | `/users/register` |
    | [POST Login](#post-login)               | `/users/login`    |

  - #### USER ENDPOINTS

    | Links                               | Endpoints    |
    | ----------------------------------- | ------------ |
    | [GET All Users](#get-all-users)     | `/users/all` |
    | [GET User by ID](#get-user-by-id)   | `/users/:id` |
    | [PUT User Update](#put-user-update) | `/users/:id` |
    | [DELETE User](#delete-user)         | `/users/:id` |

  - #### MOVIE ENDPOINTS

    | Links                                     | Endpoints      |
    | ----------------------------------------- | -------------- |
    | [GET All Movies](#get-all-movies)         | `/movies/all`  |
    | [GET Find Movie(s)](<#get-find-movie(s)>) | `/movies/find` |
    | [POST New Movie](#post-new-movie)         | `/movies`      |
    | [DELETE Movie](#delete-movie)             | `/movies/:id`  |

---

### [GET] Base

<details><summary>Base route of API - See details:</summary>

<p>

**Endpoint:** /

**Payload:** _None_

**Return:** HTML with a link to API documentation.

[Back to Top](#table-of-contents)

</p>
</details>

---

### [POST] Registration

#### Endpoint: /users/register

**Payload:** _an object with the following credentials:_

> **Required:** `username` & `password`.

```json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

**Return:** _an object with the user credentials provided in the request body, along with an auto-generated id and auth token_

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Im5ld1VzZXI0IiwiaWF0IjoxNTY3MTAwNTAzLCJleHAiOjE1NjcxODY5MDN9.BrCNULMh7pLMFGzY6HyX5CK_tA7ek8bUQSFiWkrPBQQ",
  "id": 1,
  "username": "newUsername"
}
```

[Back to Top](#table-of-contents)

---

### [POST] Login

#### Endpoint: /users/login

**Payload:** _an object with the following:_

```json
{
  "username": "newUsername",
  "password": "newPassword"
}
```

**Return:** _the user object and auth token_

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo1LCJ1c2VybmFtZSI6Im5ld1VzZXI0IiwiaWF0IjoxNTY3MTAwNTAzLCJleHAiOjE1NjcxODY5MDN9.BrCNULMh7pLMFGzY6HyX5CK_tA7ek8bUQSFiWkrPBQQ",
  "id": 1,
  "username": "newUsername"
}
```

[Back to Top](#table-of-contents)

---

### [GET] All Users

#### Endpoint: /users/all

**Return:** _an array of registered user objects_

```json
[
  {
    "id": 1,
    "username": "newUsername"
  },
  {
    "id": 12,
    "username": "johndoe53"
  },
  {
    "id": 13,
    "username": "anotherUsername"
  },
];
```

[Back to Top](#table-of-contents)

---
