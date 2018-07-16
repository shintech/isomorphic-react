import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchDevices } from '../actions'

const Pagination = ({ ownType, currentPage, pageCount, pageSize, changePage, fetchDevices, fetchUsers }) => {
  // let fetcher = (ownType === 'devices') ? fetchDevices : fetchUsers
  return (
    <div className='pagination'>
      {(pageCount > 0)
        ? <ul>
          {(currentPage > 1) ? <li><button className='button' onClick={e => {
            e.preventDefault()
            fetchDevices(currentPage - 1)
          }}>Previous Page</button></li>
            : <div className='hidden' />
          }
          <li className='button'>{currentPage}</li>
          {(currentPage < pageCount) ? <li><button className='button' onClick={e => {
            e.preventDefault()
            fetchDevices(currentPage + 1)
          }}>Next Page</button></li>
            : <div className='hidden' />
          }
        </ul>
        : <div className='hidden' />}
    </div>
  )
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  pageCount: PropTypes.number
}

export default connect(
  (state, props) => ({
    ownType: props.type,
    pageCount: state.pagination.pageCount,
    pageSize: state.pagination.pageSize,
    currentPage: state.pagination.currentPage
  }),

  dispatch => ({
    fetchDevices: (page) => {
      dispatch(fetchDevices(page))
    }
  })
)(Pagination)
