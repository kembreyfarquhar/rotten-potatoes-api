# Rotten Potatoes API

> A spoof off of Rotten Tomatoes. A RESTful, Object-Oriented API written in TypeScript using Node.js, Express.js, TypeORM, and SQLite. Inspired by [this blog post](https://medium.com/swlh/how-to-rest-api-a-tale-of-node-js-express-and-typescript-77bc598b280c) written by [Simone Staffa](https://medium.com/@simonestaffa).

![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555) ![node.js](https://badgen.net/badge/-/node.js?icon=npm&label&labelColor=blue&color=555555) ![Express](https://badgen.net/badge/-/Express?label&labelColor=blue) ![typeorm](https://badgen.net/badge/-/typeorm?label&labelColor=blue) ![SQLite3](https://badgen.net/badge/-/SQLite3?label&labelColor=blue) ![license](https://badgen.net/badge/license/MIT?&labelColor=blue&color=555555)

![commits](https://badgen.net/github/contributors/kembreyfarquhar/rotten-potatoes-api?color=purple) ![issues](https://badgen.net/github/issues/kembreyfarquhar/rotten-potatoes-api?color=purple) ![watchers](https://badgen.net/github/watchers/kembreyfarquhar/rotten-potatoes-api?color=purple)

<!-- Describe very briefly but clearly what the project does.
State if it is out-of-the-box user-friendly, so it’s clear to the user.
List its most useful/innovative/noteworthy features.
State its goals/what problem(s) it solves.
Note and briefly describe any key concepts (technical, philosophical, or both) important to the user’s understanding.
Link to any supplementary blog posts or project main pages.
Note its development status.
Include badges.
If possible, include screenshots and demo videos. -->

## **Table of Contents**

- ### [**Endpoints/Routes**](#endpoints)

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

- [**Contributing**](#contributing)
- [**History**](#history)
- [**Acknowledgments**](#acknowledgments)
- [**License**](#license)

---

## **Endpoints:**

### [GET] Base

<details><summary>Base route of API:</summary>

**Endpoint:** /

**Payload:** _None_

**Return:** HTML with a link to API documentation.

[Back to Top](#table-of-contents)

</details>

---

### [POST] Registration

<details><summary>Register new user:</summary>

**Endpoint:** /users/register

**Payload:** _an object with the following credentials:_

> **Required:** `username` & `password`

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

</details>

---

### [POST] Login

<details><summary>User Login:</summary>

**Endpoint:** /users/login

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

</details>

---

### [GET] All Users

<details><summary>Retrieve all user objects:</summary>

**Endpoint:** /users/all

**Payload:** _None_

**Authorization:** use returned JSONWebToken (from login/registration) as a value for headers.authorization

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

</details>

---

## Contributing

See our [Contributor Guide](CONTRIBUTING.md) for information on project setup, pull requests, and code standards.

We follow [Contributor Covenant's](https://www.contributor-covenant.org/version/1/3/0/code-of-conduct/) Code of Conduct.

## History

See [HISTORY.md](HISTORY.md) for version history.

## Acknowledgments

## License

MIT © Katie Embrey-Farquhar

See [LICENSE.md](LICENSE.md) for more information.
