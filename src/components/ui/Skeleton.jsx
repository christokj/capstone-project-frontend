import React from 'react'

function Skeleton() {
  return (
    <>  {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="flex w-52 flex-col gap-4 mx-auto my-2">
            <div className="skeleton h-40 w-full"></div>
            <div className="skeleton h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    ))}
    </>
  )
}

export default Skeleton