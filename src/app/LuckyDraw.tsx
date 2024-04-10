'use client'

import { RefObject, SyntheticEvent, useRef } from 'react'

export default function LuckyDraw() {
  const rouletteRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // data from server
  const ROUTLETTE_DATA = ['100', 'XX', '200', '400', 'XX', '300', '500', 'XX']
  //   const DEFAULT_TEXT_ZERO = 'X'
  const BASE_ROTATE_DEG = 1800 // 7200 / 360 = 20 complete turns

  function play(e: SyntheticEvent) {
    e.preventDefault()

    const expectedResultIndex = ROUTLETTE_DATA.indexOf(String(inputRef.current?.value))

    const selectedIdx = expectedResultIndex === -1 ? Math.floor(Math.random() * ROUTLETTE_DATA.length - 1) : expectedResultIndex
    // 360 / ROUTLETTE_DATA.length / 2 = 22.5
    const additionalDeg = 22.5 * (2 * (1 - selectedIdx) + 1)
    const totalDeg = BASE_ROTATE_DEG + additionalDeg
    const animationKeyframes = [{ transform: 'rotate(0deg)' }, { transform: `rotate(${totalDeg}deg)` }]
    const roulette = rouletteRef.current as unknown as HTMLDivElement
    roulette.animate(animationKeyframes, {
      fill: 'forwards',
      duration: 7000,
      easing: 'ease-in-out',
    })
  }

  return (
    <main className="flex align-middle mt-3">
      <form onSubmit={play}>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="group relative">
            <label htmlFor="expected-result" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Expected result
            </label>
            <div className="group flex relative">
              <input
                ref={inputRef}
                type="text"
                id="expected-result"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="100, 400, etc"
              />

              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute right-0 
    -translate-x-1 translate-y-full opacity-0 m-4 mx-auto"
              >
                Blank to get a random result
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Play
          </button>
        </div>
      </form>

      <div className="roulette-container">
        <div className="arrow"></div>
        <div className="roulette" ref={rouletteRef}>
          {ROUTLETTE_DATA.map((value, index) => (
            <div key={index} className={`fill fill_${index + 1}`}>
              <div className="content">{value}</div>
            </div>
          ))}

          {ROUTLETTE_DATA.map((_, index) => (
            <div key={index} className={`line line_${index}`}></div>
          ))}
        </div>
      </div>
    </main>
  )
}