import React from 'react'

function Matches() {
  return (
    <section id="matches" class="w-9/12 mx-auto">
   
    <ul class="list-none mx-auto mt-10 flex flex-col sm:flex-row items-center gap-12">
        <li class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border border-solid rounded-md border-orange-500 hover:border-blue-500 hover:cursor-pointer">
            <h3 class="text-2xl text-center mt-2 text-orange-500"><a href='#'>TOURNAMENTS</a></h3> 
        </li>
        <li class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer">
            <h3 class="text-2xl text-center mt-2 text-orange-500 dark:text-white"><a href='#'>SCRIMS</a></h3> 
        </li>
        </ul>
        <ul class="list-none pb-32 mx-auto mt-10 flex flex-col sm:flex-row items-center gap-8">
        <li class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer">
            <h3 class="text-2xl text-center mt-2 text-orange-500 dark:text-white"><a href='#'>DAILY MATCH</a></h3> 
        </li>
        <li class="w-1/3 h-80 justify-center sm:w-5/6  flex flex-col items-center border rounded-md border-solid border-orange-500 hover:border-blue-500 hover:cursor-pointer">
            <h3 class="text-2xl text-center mt-2 text-orange-500 dark:text-white"><a href='#'>OPEN ROOMS</a></h3> 
        </li>
    </ul>
</section>
  )
}

export default Matches