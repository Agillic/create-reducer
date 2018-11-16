import createReducer from '../src/index'

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

const actions = {
  simpleAction: () => ({boolProp: true}),
  complexAction: ({action: {newNumber, newString}}) => ({
    numberProp: newNumber,
    objectProp: {
      stringProp: newString
    }
  }),
  complexActionWithState: ({action: {newString}, state: {objectProp}}) => ({
    objectProp: {
      ...objectProp,
      newStringProp: newString
    }
  }),
  replaceStateAction: {
    replaceState: ({action: {newNumber, newString}}) => ({
      stringProp: newString,
      numberProp: newNumber
    })
  },
  setStateAction: {
    setState: ({action: {newBool, newNull}}) => ({
      boolProp: newBool,
      nullProp: newNull
    })
  }
}

const getTestReducer = mode => createReducer({
  initialState,
  actions,
  options: {
    mode
  }
})

describe('Create reducer unit tests', () => {
  it('Should return initial state for unidentifiedAction', () => {
    const newState = getTestReducer('setState')(undefined, {type: 'unidentifiedAction'})
    expect(newState).toEqual(initialState)
  })

  it('Should fall back to replaceState if no mode specified', () => {
    const newState = getTestReducer()(undefined, {type: 'unidentifiedAction'})
    expect(newState).toEqual(initialState)
  })

  describe('setState mode', () => {
    it('Should return correct state for simple action', () => {
      const expectedState = {
        ...initialState,
        boolProp: true
      }

      const newState = getTestReducer('setState')(undefined, {type: 'simpleAction'})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for complex action', () => {
      const newNumber = 555
      const newString = 'New Fancy Value'
      const expectedState = {
        ...initialState,
        numberProp: newNumber,
        objectProp: {
          stringProp: newString
        }
      }

      const newState = getTestReducer('setState')(undefined, {type: 'complexAction', newNumber, newString})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for complex action with state parameter', () => {
      const newString = 'New Great Value'
      const expectedState = {
        ...initialState,
        objectProp: {
          ...initialState.objectProp,
          newStringProp: newString
        }
      }

      const newState = getTestReducer('setState')(undefined, {type: 'complexActionWithState', newString})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for replace state action', () => {
      const newNumber = 555
      const newString = 'New Amazing Value'
      const expectedState = {
        stringProp: newString,
        numberProp: newNumber
      }

      const newState = getTestReducer('setState')(undefined, {type: 'replaceStateAction', newNumber, newString})
      expect(newState).toEqual(expectedState)
    })
  })

  describe('replaceState mode', () => {
    it('Should return correct state for simple action', () => {
      const expectedState = {
        boolProp: true
      }

      const newState = getTestReducer('replaceState')(undefined, {type: 'simpleAction'})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for complex action', () => {
      const newNumber = 555
      const newString = 'New Pretty Value'
      const expectedState = {
        numberProp: newNumber,
        objectProp: {
          stringProp: newString
        }
      }

      const newState = getTestReducer('replaceState')(undefined, {type: 'complexAction', newNumber, newString})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for set state action', () => {
      const newBool = true
      const newNull = {a: 5}
      const expectedState = {
        ...initialState,
        boolProp: newBool,
        nullProp: newNull
      }

      const newState = getTestReducer('replaceState')(undefined, {type: 'setStateAction', newBool, newNull})
      expect(newState).toEqual(expectedState)
    })

    it('Should return correct state for complex action with state parameter', () => {
      const newString = 'New Great Value'
      const expectedState = {
        objectProp: {
          ...initialState.objectProp,
          newStringProp: newString
        }
      }

      const newState = getTestReducer('replaceState')(undefined, {type: 'complexActionWithState', newString})
      expect(newState).toEqual(expectedState)
    })
  })
})
