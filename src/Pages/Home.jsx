/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom"
export default function Home() {
    return (
       
         <main className='  space-y-20 lg:flex lg:space-y-0 lg:max-w-[70rem] py-20 lg:mx-auto   home main-content'>
            <section className='w-[min(100%-2rem,21.4375rem)] mx-auto lg:mx-0 md:w-auto text-center space-y-8 lg:text-start  '>
                <h1 className='uppercase text-center lg:text-start flex flex-col gap-8 '>
                    <span className='text-preset-5 text-[var(--clr-blue-300)] block text-sm min-[320px]:text-lg lg:text-3xl'>So you want to travel to</span>
                    <span className='text-white text-preset-1 text-5xl min-[320px]:text-8xl lg:text-[9rem]'>space</span>
                </h1>

                <p className='text-preset-9 text-[var(--clr-blue-300)] text-sm min-[320px]:text-lg md:max-w-[37rem] lg:max-w-[34rem] md:mx-auto '>
                    Let's face it; if you want to go to space, you might
                    as well genuinely go to outer space and not hover
                    kind of on the edge of it. Well sit back, and relax
                    because we'll give you a truly out of this world experience;
                </p>

            </section>
            <section className='flex justify-center lg:items-center ml-auto'>
                <Link
                    to="/destination"
                    className='explore-btn flex items-center justify-center text-preset-4 uppercase text-lg sm:text-xl md:text-2xl lg:text-4xl'
                >
                    Explore
                </Link>
            </section>
        </main>



    )
}