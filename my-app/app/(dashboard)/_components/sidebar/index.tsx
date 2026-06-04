import React from 'react'
import { NewButton } from './new-button'
import { OrgList } from './list'
function SideBar() {
  return (
     <aside>
      <OrgList/>
      <NewButton/>
     </aside>
  )
}

export default SideBar