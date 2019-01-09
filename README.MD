<p align="center">
    <img src="https://www.agillic.com/wp-content/uploads/2016/02/Logo.svg"
        height="170">
</p>

<p align="center">
  <a href="https://gitlab.com/agillic-ci/create-reducer/commits/master"><img alt="pipeline status" src="https://gitlab.com/agillic-ci/create-reducer/badges/master/pipeline.svg" /></a>
</p>
<p align="center">
  <a href="https://gitlab.com/agillic-ci/create-reducer/commits/master"><img alt="coverage report" src="https://gitlab.com/agillic-ci/create-reducer/badges/master/coverage.svg" /></a>
</p>

# Agillic Create Reducer

The `createReducer` helper makes your Redux life easier by providing an easy and maintainable way to construct reducers.

Made with :heart: by Agillic

## Installation

```sh
npm install --save @agillic/create-reducer
```

Or if you're using `yarn`

```sh
yarn add @agillic/create-reducer
```

## Usage

In order to import createReducer use:

```javascript
import createReducer from '@agillic/create-reducer'
```

Or for some good old nostalgia:

```javascript
const createReducer = require('@agillic/create-reducer')
```
## Syntax

```javascript
const myReducer = createReducer({initialState, actions, [mode]})
```

### Parameters

- `initialState` - an object with the initial state of your reducer,
- `actions` - an object with actions available to the reducer, either as functions or objects,
- `options` (_optional_), an object with optional properties:
  - `mode`, defaults to `replaceState`:
    - `replaceState` - replace the old state with the newly defined,
    - `setState` - to use the React-like behaviour, where the new state gets merged to the old one.

### Return value

`createReducer` returns a reducer function which can be directly used in `combineReducers` and other typical use cases. That's why it's so awesome!

If the reducer is called with an unidentified action it will return the initial state.

## Examples

Consider the following `initialState` for all the following examples:

```javascript
const initialState = {
  stringProp: 'Nice Value',
  numberProp: 5,
  arrayProp: [1, 'two', 3],
  objectProp: {
    stringProp: 'Fancy Value'
  },
  boolProp: false,
  nullProp: null
}
```

### Typical use case

```javascript
const myReducer = createReducer(
  initialState,
  {
    simpleAction: () => ({boolProp: true}),
    complexAction: ({action: {newNumber, newString}}) => ({
      numberProp: newNumber,
      objectProp: {
        stringProp: newString
      }
    })
  },
  options: {
    mode: 'setState'
  }
)
```

In the above example, the actions are functions which specify how should the state be transformed. Note that the actions names are labels which should be passed as `type` property in action creators. The action arguments names are up to the developer to decide.

### Complex use case

You are not bound to the use of just one `mode` for the whole reducer. In order to mix the two, you can specify actions as objects with either `replaceState` or `setState` properties on them, which will override the `mode` set in `options` argument.

```javascript
const myReducer = createReducer(
  initialState,
  {
    simpleAction: () => ({boolProp: true}),
    specialAction: {
      replaceState: ({action: {newNumber, newString}}) => ({
      stringProp: newString,
      numberProp: newNumber
    })
    }
  },
  options: {
    mode: 'setState'
  }
)
```

In the above example `simpleAction` will be applied in `setState` mode as it's the one specified in `options` for the whole reducer. However, `specialAction` will be applied in `replaceState` mode, since it has not been defined as a function but rather as an object with `replaceState` property defining the state transformation.

### Using previous state

It is also possible to use previous state in the reducer.

```javascript
const myReducer = createReducer(
  initialState,
  {
    complexActionWithState: ({action: {newString}, state: {objectProp}}) => ({
      objectProp: {
        ...objectProp,
        someStringProp: newString
      }
    })
  },
  options: {
    mode: 'setState'
  }
)
```

## Scripts

- `npm run build:watch` will transpile all the sources on file save,
- `npm test` will run tests in watch mode,
- `npm run test:coverage` will run tests and report coverage statistics,
- `npm run lint` will lint the source files.
