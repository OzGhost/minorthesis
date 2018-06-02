import React from 'react'
import Querier from './Querier'

class EmptyQuerier extends Querier {
  getView = () => (<span className="w3-text-orange">Empty Querier!</span>)
  
  performQuery = () => {
    console.log('cout << Empty query triggered!')
  }
}

export default new EmptyQuerier
