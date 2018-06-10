import React from 'react'
import Querier from './Querier'
import { showTargetDetail, queryFieldChange } from '../actions'
import { host, USER_DETAIL_LABELS } from '../common/Constants'
import ModifiableItem from '../components/ModifiableItem'

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
            <ModifiableItem
              key={user.id}
              label={user.username}
              onClick={event => this.itemSelecting(event, user)}
              onModify={() => window.alert('Modifying function was triggered!')}
            />
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


