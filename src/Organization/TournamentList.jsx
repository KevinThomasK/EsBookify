import React from 'react'
import { useNavigate } from 'react-router';
import classes from '../OrgHome.module.css'
import { TournamentListDetails } from '../Constant';
function TournamentList() {

    const navigate = useNavigate();

    return (
        <section id="matches" class=" mx-auto">

            <ul class="list-none mx-auto mt-10 flex flex-row flex-wrap  justify-center gap-10 ">
                {TournamentListDetails.map((item) => {
                    
                    return <li className={classes.listbox} onClick={() => { navigate("      ") }}>
                        <div className= {classes.dateandtime}>
                                {item.dateAndTime}
                            </div>
                        <img className={classes.ListLogo} src={item.image} />
                        <h3 class="text-2xl text-center mt-2 text-orange-500" >
                            <div>
                                {item.title}
                            </div>
                        </h3>
                        <div className={classes.listboxContent}>
                            
                           

                                <div  className={classes.price}>
                                    
                                    {item.price}
                                    
                                </div>
                                <div className={classes.edittext} > {item.Edit} </div>
                          
                            <div class=" text-center mt-2 text-orange-500">
                                {item.Delete}
                            </div>
                        </div>
                    </li>
                })}


            </ul>
            
           
        </section>
    )
}

export default TournamentList