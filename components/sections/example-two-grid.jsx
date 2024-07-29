import React from 'react'

export default function ExampleTwoGrid() {
  return (
    <div className="relative bg-[#001E11] text-white w-full">
      <div className="mx-auto max-w-[1140px] px-6 py-20 lg:py-32 lg:px-8 relative grid lg:grid-cols-2 gap-12 -mb-12">
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold tracking-tighter">Why Plant Trees?</h2>
            <p className="text-lg mt-4 tracking-tight text-neutral-300">Trees are vital. As the biggest plants on the planet, they give us oxygen, store carbon, stabilise the soil and give life to the world’s wildlife. They also provide us with the materials for tools and shelter.</p>
            <p className="text-lg mt-4 tracking-tight text-neutral-300">Not only are trees essential for life, but as the longest living species on earth, they give us a link between the past, present and future. It’s critical that woodlands, rainforests and trees in urban settings, such as parks, are preserved and sustainably managed across the world.</p>
            <p className="text-lg mt-4 tracking-tight text-neutral-300">Play your part in helping to save the planet by planting trees or donating today.</p>
          </div>
          
        </div>

        <div className='relative'>
          <div className="lg:absolute top-0 left-0 w-full h-full z-0">
            <TreeChart className="lg:absolute z-10 lg:ml-12" />
            <TreeChart className="absolute translate-x-12 translate-y-2 rotate-6 hidden lg:block " />
          </div>
        </div>
      </div>
    </div>
  )
}
