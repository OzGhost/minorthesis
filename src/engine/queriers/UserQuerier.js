import React from 'react'
import Querier from './Querier'
import { host, showTargetDetail, queryFieldChange } from '../actions'
import { USER_DETAIL_LABELS } from '../common/Constants'

class UserQuerier extends Querier {
  getView = (_, queryData) => {
    if (!queryData.users) {
      this.loadUsers()
      return ''
    }

    const users = queryData.users || []
    return (
      <ul className="w3-ul w3-hoverable">
        {
          users.map(user =>
            <li
              key={user.id}
              onClick={event => this.itemSelecting(event, user)}
            >
              {user.username + ' (' +user.hoten+ ')'}
            </li>
          )
        }
      </ul>
    )
  }

  loadUsers = () => {
    fetch(host + '/account')
      .then(res => res.json())
      .then(users => this.dispatch(queryFieldChange('users', users)))
  }

  itemSelecting = (event, user) => {
    this.dispatch(showTargetDetail(event, user, USER_DETAIL_LABELS))
  }
  
  isAutoLoad = () => true
}

export default new UserQuerier


