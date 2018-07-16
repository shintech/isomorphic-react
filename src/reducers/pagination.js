import C from '../store/constants'

const pagination = (state = {}, action) => {
  switch (action.type) {
    case C.CHANGE_PAGE:
      if (action.meta) {
        return {
          pageCount: action.meta.pageCount,
          pageSize: action.meta.pageSize,
          currentPage: action.page
        }
      } else {
        return state
      }

    default:
      return state
  }
}

export default pagination
