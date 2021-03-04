# Main info about package.json

It's a starting point for any Node.js or npm project. It consists of a single JSON object where information is stored in key-value pairs. There are only 2 required fields: `"name"` and `"version"`.
Description for other fields:

- `"author"` - owner(s) of the project;
- `"description"` - short and informative description to summarize? what the project does;
- `"keywords"` - an array of related to the project keywords
- `"license"` - informs users of what they are allowed to do with current project. Common licenses for open source projects are MIT and BSD.
- `"dependencies"` - an object with key-value pairs of external packages ("package-name":"version"). Package manager (npm, yarn) will automatically installs all, what you specified there. Also, newly installed modules will be listed there automatically also. The `versions` of the npm packages in the dependencies follow Semantic Versioning (SemVer), an industry standard for software versioning aiming to make it easier to manage dependencies. Libraries, frameworks or other tools published on npm should use SemVer in order to clearly communicate what kind of changes projects can expect if they update. This is how Semantic Versioning works according to the official website:

```json
"package": "MAJOR.MINOR.PATCH"
```

The `MAJOR` version should increment when you make incompatible API changes. The `MINOR` version should increment when you add functionality in a backwards-compatible manner. The `PATCH` version should increment when you make backwards-compatible bug fixes. This means that `PATCH`es are bug fixes, `MINOR`s - add new features but neither of them break what worked before. Finally, `MAJOR`s add changes that won’t work with earlier versions.<br/>
If you specified version as it is, only numbers you'll include only specific version of the package to the project. That’s a useful way to freeze your dependencies if you need to make sure that different parts of your project stay compatible with each other. But in most use cases, you don’t want to miss bug fixes since they often include important security patches and (hopefully) don’t break things in doing so.

To allow an npm dependency to update to the latest `PATCH` version, you can prefix the dependency’s version with the tilde (**~**) character. Here's an example of how to allow updates to any 1.3.x version.

```json
"package": "~1.3.8"
```

If you want to install both `MINOR`s and `PATCH`s - use the caret (**^**).
If you were to use the caret (^) as a version prefix, npm would be allowed to update to any 1.x.x version.

```json
"package": "^1.3.8"
```

If you need to remove an external package from your project - just remove the corresponding key-value pair for that project from your dependencies.

# Node

is a runtime environment for JS (allows to run JS code outside of the browser) and provides handfull methods to write backend (server-side) programs with JS.

# Express

is a lightweight web application framework, which provides simple syntax for creating a server, handling routing and etc.

```js
const express = require("express");
const app = express();
```

- To run the server on the specific port, express provides a method:

```js
app.listen(port, () => {});
```

- To make http requests, we need to follow syntax:

```js
app.METHOD(PATH, HANDLER);
```

where `METHOD` - a request method in lower case (get, post, delete, patch, etc.),<br/>
`PATH` - a string or regexp representing the relative path to some endpoint
`HANDLER` - a function, wich Express calls when the `PATH` route is matched. It's syntax: `function(req, res){...}` - where request (`req`) and response (`res`) objects.
We can respond on requests with `res` object. Examples:

```js
app.get("/json", (req, res) => res.json({ key: "data" })); //Now the preferred data format for moving information around the web is JSON. "res.json" method converts JS into JSON string, then sets the appropriate headers to tell your browser that you are serving JSON, and sends the data back.
app.get("/", (req, res) => res.sendFile(__dirname + "/views/index.html")); //sendFile method expects an absolute path for file
// __dirname - global variable from Node.js - provides an absolute path for the current folder
app.get("/", (req, res) => res.send("Hello World")); //This one will never be executed.
```

Note: Express evaluetes pathes from top to bottom and executes the handler for the first match. That's why recommended to place more specific )pathes first. <br/>

- To add directory, that would be accessible for users (e.g. to place in it static assets, like stylesheets, scripts, images) in case of server-side rendering, we need to add middleware `express.static(path)`, where `path` is the absolute path of the folder containing the assets. `Middleware` are functions that intercept route handlers, adding some kind of information
- To mount middleware express provides method:

```js
app.use(path, middlewareFunction);
```

`path` argument is optional, if it doesn't provided, the middleware will be executed for all requests.

- To get access to environment variables from `.env` file in the Node exists a global object `process.env`. By convention, variables are consist of words in upper case, separated with an underscore, placed on separate lines and souldn't have any whitespaces around equal sign: `VAR_NAME=value`. The `.env` is a shell file, so you don’t need to wrap names or values in quotes.

## Middleware functions

Generally, it's functions that take 3 arguments: the request object, the response object, and the next function in the application’s request-response cycle. These functions execute some code that can have side effects on the app, and usually add information to the request or response objects. They can also end the cycle by sending a response when some condition is met. If they don’t send the response when they are done, they start the execution of the next function in the stack. This triggers calling the 3rd argument, `next()`.

```js
function(req, res, next) {
  console.log("I'm a middleware...");
  next();
}
```

If you'll mount this function on a route and the request will match this route, the function will display the string "I'm middleware..." and then it executes the next function in the stack. **`Remember`** to call `next()` when you are done, or your server will be stuck forever. <br/>
`Note:` from the request object you can get such info as:

- request method (GET, POST, etc.) with **`req.method`**
- relative request path with **`req.path`**
- IP the request comes from with **`req.ip`**

Middleware can be mounted at a specific route `app.METHOD(path, middlewareFunction)` or can be chained inside route, by adding multiple, separated by commas:

```js
app.get(
  "/user",
  function (req, res, next) {
    req.user = getTheUserSync(); // Hypothetical synchronous operation
    next();
  },
  function (req, res) {
    res.send(req.user);
  }
);
```

Chaining middleware allows to split the server operations into smaller units which leads to better structure and gives the opportunity to reuse code. Also, we can perform some validation on the data.

## Route parameters
Route parameters are named segments of the URL, delimeted by slashes (/). Each value captures the value of the part of the URL which matches its position. The captured values can be found in the __`req.params`__ object.
```js
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```
Route parameters allows users to communicate with the server, specifing what information they needed (e.g. from the database)