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

Route parameters are named segments of the URL, delimeted by slashes (/). Each value captures the value of the part of the URL which matches its position. The captured values can be found in the **`req.params`** object.

```js
route_path: '/user/:userId/book/:bookId'
actual_request_URL: '/user/546/book/6754'
req.params: {userId: '546', bookId: '6754'}
```

Route parameters allows users to communicate with the server, specifing what information they needed (e.g. from the database).

## Query parameters

Query parameters are created after the parsing of the `query string` from the route path. The query string is delimeted by a question mark (?), and includes `field=value` pairs. Each couple separated by an ampersand (&). Express can parse the data from the query string, and populate the object **`req.query`**.

```js
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
```

`Note:` some characters, like the percent (%), cannot be in URLs and have to be encoded in a different format before you can send them.

## POST request
In REST convention, POST is used to send data to create new items in the database. In this kind of requests, the data is send in the request body. The body is a part of the HTTP request, also called the payload. By default, HTML forms encoded the body like the `query string` and the type of encoding is `application/x-www-form-urlencoded`. You can find it in the Headers section of the request:
```js
POST /path/subpath HTTP/1.0
From: john@example.com
User-Agent: someBrowser/1.0
Content-Type: application/x-www-form-urlencoded
Content-Length: 20

name=John+Doe&age=25
```
 With Ajax, you can also use JSON to handle data having a more complex structure. There is also another type of encoding: `multipart/form-data`. This one is used to upload binary files.

 To parse the data coming from POST requests we need some middleware. The popular one is the `body-parser` package. This package allows you to use a series of middleware, which can decode data in different formats. The middleware to handle `urlencoded` data is returned by `bodyParser.urlencoded({extended: false})`.
 ```js
 app.use(bodyParser.urlencoded({extended: false}))
```
Now, with POST request in the __`req.body`__ object you can get sended parameters:
```js
app.post('/name', (req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }))
```
`Note`: `extended=false` is a configuration option that tells the parser to use the classic encoding. When using it, values can be only strings or arrays.
<hr>

## Summarize on HTTP methods
By convention there is a correspondence between the http verb, and the operation you are going to execute on the server. The conventional mapping is:

* __GET__ - Read an existing resource without modifying it,
* __POST__ - Create a new resource using the information sent with the request,
* __PUT__ or __PATCH__ (sometimes __POST__) - Update a resource using the data sent:
1. __PUT__ - replaces all current representations of the target resource with the request payload.
2. __PATCH__ - to apply partial modifications to a resource.
* __DELETE__ - Delete a resource.

Except from __GET__, all the other methods listed above can have a payload (i.e. the data into the request body). The `body-parser` middleware works with these methods as well.

There are also other methods which are used to negotiate a connection with the server (these requests don't have a body):

* __HEAD__ method asks for a response identical to that of a __GET__ request, but without the response body.
For example, if a URL might produce a large download, a HEAD request could read its `Content-Length` header to check the filesize without actually downloading the file.

* __CONNECT__  method starts two-way communications with the requested resource. It can be used to open a tunnel.
(e.g., the __CONNECT__ method can be used to access websites that use SSL (HTTPS) (Secure Sockets Layer, has been superseded by the Transport Layer Security (TLS) protocol). The client asks an HTTP Proxy server to tunnel the TCP connection to the desired destination. The server then proceeds to make the connection on behalf of the client. Once the connection has been established by the server, the Proxy server continues to proxy the TCP stream to and from the client. Some proxy servers might need authority to create a tunnel and requires the Proxy-Authorization header.)

* __TRACE__ method performs a message loop-back test along the path to the target resource, providing a useful debugging mechanism.
The final recipient of the request should reflect the message received, excluding some fields described below, back to the client as the message body of a 200 (OK) response with a Content-Type of message/http. The final recipient is either the origin server or the first server to receive a Max-Forwards value of 0 in the request.

* __OPTIONS__ method is used to describe the communication options for the target resource. 

1. For instance, to find out which request methods a server supports, one can use the `curl` command-line program to issue an OPTIONS request:
```http
curl -X OPTIONS https://example.org -i
```
The response then contains an __Allow__ header that holds the allowed methods:
```http
HTTP/1.1 204 No Content
Allow: OPTIONS, GET, HEAD, POST
Cache-Control: max-age=604800
Date: Thu, 13 Oct 2016 11:45:00 GMT
Server: EOS (lax004/2813)
```
2. In CORS, a preflight request is sent with the __OPTIONS__ method so that the server can respond if it is acceptable to send the request. In this example, we will request permission for these parameters:

* `The Access-Control-Request-Method` header sent in the preflight request tells the server that when the actual request is sent, it will have a __POST__ request method.
* `The Access-Control-Request-Headers` header tells the server that when the actual request is sent, it will have the `X-PINGOTHER` and `Content-Type` headers.
```http
OPTIONS /resources/post-here/ HTTP/1.1
Host: bar.example
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Accept-Encoding: gzip,deflate
Connection: keep-alive
Origin: https://foo.example
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER, Content-Type
```

The server now can respond if it will accept a request under these circumstances. In this example, the server response says that:

`Access-Control-Allow-Origin`: the https://foo.example origin is permitted to request the `bar.example/resources/post-here/` URL via the following:

`Access-Control-Allow-Methods`: POST, GET, and OPTIONS are permitted methods for the URL. (This header is similar to the `Allow` response header, but used only for __CORS__.)

`Access-Control-Allow-Headers`: Any script inspecting the response is permitted to read the values of the `X-PINGOTHER` and `Content-Type` headers.
`Access-Control-Max-Age`: The above permissions may be cached for 86,400 seconds (1 day).
```http
HTTP/1.1 204 No Content
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: https://foo.example
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
Access-Control-Max-Age: 86400
Vary: Accept-Encoding, Origin
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
```
<hr>