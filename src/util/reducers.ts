const reducer = (state: any, action: any) => {
  // console.log('action:', action)
  switch (action.type) {
    case 'selectPeriod': {
      const { payload } = action
      return { ...state, ...payload }
    }
    case 'selectSource': {
      const { payload } = action
      return { ...state, ...payload }
    }
    case 'selectYear': {
      const { payload } = action
      return { ...state, ...payload }
    }
    case 'selectMonth': {
      const { payload } = action
      return { ...state, ...payload }
    }
    case 'filter': {
      const { payload } = action
      return { ...state, ...payload }
    }
    default:
      throw new Error()
  }
}

export default reducer
