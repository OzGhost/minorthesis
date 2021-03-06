import EmptyQuerier from '../queriers/EmptyQuerier'
import PlanQuerier from '../queriers/PlanQuerier'
import CertificateQuerier from '../queriers/CertificateQuerier'
import GovernmentDocumentQuerier from '../queriers/GovernmentDocumentQuerier'
import PlanUserQuerier from '../queriers/PlanUserQuerier'
import UserQuerier from '../queriers/UserQuerier'

class QuerierFactory {
  buildFor = queryType => {
    switch (queryType) {
      case 'plan':
        return PlanQuerier
      case 'certi':
        return CertificateQuerier
      case 'govdoc':
        return GovernmentDocumentQuerier
      case 'puser':
        return PlanUserQuerier
      case 'user':
        return UserQuerier
      default:
        return EmptyQuerier
    }
  }
}

export default new QuerierFactory

