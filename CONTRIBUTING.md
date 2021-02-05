<!--
2021 February 5
https://github.com/kembreyfarquhar
-->

# Before You Post!

## Support

We offer support through our [Github Issues Page](https://github.com/kembreyfarquhar/rotten-potatoes-api/issues).

## Contribute

Scroll down to our [Contributing Guide](#contributing-guide) which contains useful tips and suggestions for how to contribute to this project.

## Development

### Setup

1. [Install Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

2. Fork the project and clone your fork - [guide](https://help.github.com/articles/fork-a-repo/)

3. Install TypeScript - `npm install -g typescript`

4. Install typeorm - `npm install -g typeorm`

5. Setup the project for development. In the root of the directory run

   ```bash
   npm i
   ```

6. Run migrations to create your local database

   ```bash
   npm run migration:run
   ```

### Developing

1. Start the server using nodemon, which monitors changes in code and automatically restarts the server

   ```bash
   npm run server
   ```

2. If making a new migration run

   ```bash
   typeorm migration:create --name CreateSomethingTable
   ```

#### **Preparation**

1. Make sure your changes are on their own branch that is branched off from master.
2. Branch names must follow "\<type>/\<what-it's-doing>" format. Example:

   - `git checkout master; git checkout -b fix/register-endpoint-crash`
   - Then push to your branch - `git push origin fix/register-endpoint-crash`

Branch types may include feature, fix, upgrade, etc.

3. Commit messages must follow the format "verb/action noun/target" with the potential of having up to three arguments. Example `creates users migration, scaffolds users model`

#### **Pull Request**

To send your changes for the project owner to merge in:

1. Submit your pull request
   1. List any changes made in the Pull Request
   2. By submitting a pull request you agree for your changes to have the same license as the project

## Contributing Guide

### **Semantic Versioning**

We abide by [semantic versioning principals](http://semver.org/). For example:

- _MAJOR_ releases v1, contain breaking changes for everyone
- _MINOR_ releases v1.1, contain breaking changes for some people
- _PATCH_ releases v1.1.1, contain no breaking changes

### **Spelling**

US English should be used in your code. This API uses US English throughout the entire codebase and our aim is to avoid needless inconsistencies (i.e. using `colour` in some places and `color` in others).

### **Formatting**

We use [Prettier](https://github.com/prettier/prettier) along with our ESLint Config to format our code. Please be sure to have your code formatted accordingly. (TIP: turn on "format on save" in your code editor and it should read from the .prettierrc file to automatically format for you.)

### **Naming Convention**

Class names, types, interfaces, and enums should be PascalCase. Everything else should be camelCase. Acronyms and initialisms should be capitalized.

```typescript
class JSONHandler {
	toJSON(msg: object) {
		/* ... */
	}
}

const jsonHandler = new JSONHandler();
jsonHandler.toJSON({ test: 'hello!' });
```
