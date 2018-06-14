import React from 'react'
import Querier from './Querier'
import { showTargetDetail, queryFieldChange, openModifier,
          updateAccount } from '../actions'
import { host, USER_DETAIL_LABELS, ACCOUNT_CODE } from '../common/Constants'
import ModifiableItem from '../components/ModifiableItem'
import RequestPacker from '../common/RequestPacker'
import Cacher from '../common/Cacher'

class UserQuerier extends Querier {
  getView = (_, queryData) => {
    if (Cacher.getRole() !== 1)
      return
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
              onModify={event => this.triggerModifier(event, user)}
            />
          )
        }
      </ul>
    )
  }

  loadUsers = () => {
    fetch(
      host + '/account',
      { headers: RequestPacker.buildHeader() }
    )
      .then(res => res.json())
      .then(users => this.dispatch(queryFieldChange('users', users)))
  }

  itemSelecting = (event, user) => {
    this.dispatch(showTargetDetail(event, user, USER_DETAIL_LABELS))
  }
  
  isAutoLoad = () => true

  triggerModifier = (event, account) => {
    this.dispatch(openModifier(event, ACCOUNT_CODE, account, updatedInfo => {
      this.dispatch(updateAccount(Object.assign({}, account, updatedInfo)))
    }))
  }
}

export default new UserQuerier


