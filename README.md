# noex

Golang style error handling for `Functions`, `Promises` and `Thenables`.

## Install

Using npm:
```sh
$ npm install noex
```

Using yarn:
```sh
$ yarn add noex
```

## Usage
```js
// ESM
import { noex } from 'noex'
```
```js
// CJS
const { noex } = require('noex')
```

Resolve a Promise:
```js
// as a "tuple"
const [ file, fileError ] = await noex(fs.promises.readFile('someFile'))
// as a "named tuple"
const { value, error } = await noex(fs.promises.readFile('someFile'))
```

Call a Function:
```js
// as a "tuple"
const [ json, jsonError ] = noex(() => JSON.parse('{"success": true}'))
// as a "named tuple"
const { value, error } = noex(() => JSON.parse('{"success": true}'))
```

**Example**
```js
router.get('/api/resource/:id', async (req, res) => {
    const [ resource, resourceErr ] = await noex(
        resourceService.findById(req.params.id)
    )

    // database error
    if (resourceErr) {
        logger.error(resourceErr)
        return res.sendStatus(500)
    }

    // resource not found
    if (! resource) {
        return res.sendStatus(404)
    }

    return res.json(resource)
})
```

## API
#### noex(predicate: `Promise<any>`): <code>Promise<[Result<any, Error>](#result-arrayany-error)></code>
Run a function in a try-catch block and return the result.

#### noex(predicate: `Function`): <code>[Result<any, Error>](#result-arrayany-error)</code>
Run a promise or thenable in a try-catch block and return the result.

#### Result: `Array<any, Error>`
The object to hold the resulting value or error of a function, promise or thenable.

Properties:
* **value (`any`)** : The resulting value of a function, promise or thenable.
* **val (`any`)** : Same as value.
* **error (`Error`)** : The error caught by the try-catch block.
* **err (`Error`)** : Same as error.

## License

This project is open-sourced software licensed under the [MIT license](./LICENSE).
