import React from 'react'
import classes from '../OrgHome.module.css'
import Org from '../OrgHome.module.css'
import Footer from '../Footer/Footer';
import { UserSlotListDetails } from '../Constant';



function UserSlotList() {
  return (
    <div className={Org.Orgbackground}>
      <div className={classes.gradient}>
        <div className={classes.MainOrgList}>

          <div className={classes.mainslot}>
            {UserSlotListDetails.map((item) => {
              return (
                <div className={classes.slotbox} >
                  <img src='../src/assets/UnlockIcon.png' />
                  <span className={classes.span}> {item.content}</span>
                </div>

              )
            })}

          </div>
        </div>
      </div>





      <Footer />
    </div>
  )
}

export default UserSlotList