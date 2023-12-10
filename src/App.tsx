import {
   add,
   eachDayOfInterval,
   endOfMonth,
   format,
   isToday,
   parse,
   startOfToday,
} from 'date-fns'
import clsx from 'clsx'
import { useState } from 'react'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const NUM_OF_DAYS_DISPLAYED = 42
function App() {
   let today = startOfToday()

   let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
   let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

   function previousMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
   }

   function nextMonth() {
      let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
   }

   const lastDayOfMonth = endOfMonth(firstDayCurrentMonth)

   const daysInMonth = eachDayOfInterval({
      start: firstDayCurrentMonth,
      end: lastDayOfMonth,
   })

   const startingDayIndex = firstDayCurrentMonth.getDay()
   return (
      <div className="min-h-screen bg-zinc-800 text-white">
         <div className="container mx-auto">
            <div className="text-center py-12">
               <h2 className="text-3xl font-bold">
                  {format(firstDayCurrentMonth, 'MMMM yyyy')}
               </h2>
               <div className="flex justify-center mt-4">
                  <button
                     className="bg-zinc-600 px-4 py-2 rounded-md mr-2"
                     onClick={previousMonth}
                  >
                     Prev
                  </button>
                  <button
                     className="bg-zinc-600 px-4 py-2 rounded-md"
                     onClick={nextMonth}
                  >
                     Next
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-7 gap-2 font-semibold">
               {WEEKDAYS.map((day) => (
                  <div key={day} className="text-center">
                     {day}
                  </div>
               ))}
               {
                  Array.from({ length: startingDayIndex }).map((_, index) => (
                     <div key={index} className="text-center p-2 text-zinc-500">
                        {index + 1 + daysInMonth.length - startingDayIndex}
                     </div>
                  ))
               }
               {daysInMonth.map((day, index) => (
                  <div
                     key={index}
                     className={clsx('text-center p-2', {
                        'bg-zinc-600 rounded-md': isToday(day),
                     })}
                  >
                     {format(day, 'd')}
                  </div>
               ))}
               {Array.from({
                  length:
                     NUM_OF_DAYS_DISPLAYED -
                     daysInMonth.length -
                     startingDayIndex,
               })
                  .map((_, index) => index + 1)
                  .map((day) => (
                     <div key={day} className="text-center p-2 text-zinc-500">
                        {day}
                     </div>
                  ))}
            </div>
         </div>
      </div>
   )
}

export default App
