/* eslint-disable @typescript-eslint/no-unused-vars */
// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, type ACLObj, type AppAbility } from 'src/configs/acl'
import { useAuth } from 'src/hooks/useAuth'

// ** Pages
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/views/layouts/BlankLayout'
import { AbilityContext } from '../acl/Can'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props
  const auth = useAuth()
  const router = useRouter()

  let ability: AppAbility
  const permissionUser = auth.user?.role.permissions ?? []

  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }

  if (guestGuard || router.route === '/500' || router.route === '/404' || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      return children
    }
  }

  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard
