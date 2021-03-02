# Main info about package.json
It's a starting point for any Node.js or npm project. It consists of a single JSON object where information is stored in key-value pairs. There are only 2 required fields: `"name"` and `"version"`.
Description for other fields:
* `"author"` - owner(s) of the project;
* `"description"` - short and informative description to summarize? what the project does;
* `"keywords"` - an array of related to the project keywords
* `"license"` - informs users of what they are allowed to do with current project. Common licenses for open source projects are MIT and BSD.
* `"dependencies"` - an object with key-value pairs of external packages ("package-name":"version"). Package manager (npm, yarn) will automatically installs all, what you specified there. Also, newly installed modules will be listed there automatically also. The `versions` of the npm packages in the dependencies follow Semantic Versioning (SemVer), an industry standard for software versioning aiming to make it easier to manage dependencies. Libraries, frameworks or other tools published on npm should use SemVer in order to clearly communicate what kind of changes projects can expect if they update.  This is how Semantic Versioning works according to the official website:
```json
"package": "MAJOR.MINOR.PATCH"
```
The `MAJOR` version should increment when you make incompatible API changes. The `MINOR` version should increment when you add functionality in a backwards-compatible manner. The `PATCH` version should increment when you make backwards-compatible bug fixes. This means that `PATCH`es are bug fixes, `MINOR`s - add new features but neither of them break what worked before. Finally, `MAJOR`s add changes that won’t work with earlier versions.<br/>
If you specified version as it is, only numbers you'll include only specific version of the package to the project. That’s a useful way to freeze your dependencies if you need to make sure that different parts of your project stay compatible with each other. But in most use cases, you don’t want to miss bug fixes since they often include important security patches and (hopefully) don’t break things in doing so.

To allow an npm dependency to update to the latest `PATCH` version, you can prefix the dependency’s version with the tilde (__~__) character. Here's an example of how to allow updates to any 1.3.x version. 
```json
"package": "~1.3.8"
```
If you want to install both `MINOR`s and `PATCH`s - use the caret (__^__). 
 If you were to use the caret (^) as a version prefix, npm would be allowed to update to any 1.x.x version.
 ```json
 "package": "^1.3.8"
 ```
 If you need to remove an external package from your project - just remove the corresponding key-value pair for that project from your dependencies.
