const createReducer = ({initialState, actions, options}) => {
  const {mode = 'replaceState'} = options || {}
  return ((state = initialState, action) => {
    const identifiedAction = actions[action.type]
    if (identifiedAction) {
      const stateTransformation =
        ((typeof identifiedAction === 'function') && identifiedAction)
          || identifiedAction.setState
          || identifiedAction.replaceState
      const mergeState =
        identifiedAction.setState
          || ((mode === 'setState') && !identifiedAction.replaceState)
      return mergeState ? {...state, ...stateTransformation({state, action})} : stateTransformation({state, action})
    }
    return state
  })
}

export {createReducer}
