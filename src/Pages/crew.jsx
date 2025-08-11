import { useState, useEffect,useRef } from 'react';
export default function Crew() {

    const [crewData, setCrewData] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [isFading, setIsFading] = useState(false);
    const timeoutRef = useRef(null);
    const [isImageLoaded,setIsImageLoaded] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data.json`)
            .then(res => res.json())
            .then(data => {
                setCrewData(data.crew)
                setSelectedMember(data.crew[0]);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
    }, [])

    function renderCrewMember(event) {
        const crewMember = event.currentTarget.dataset.name;
        const member = crewData.find(person => person.name == crewMember);

        if(!member || selectedMember?.name == member.name)return;
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current);
        }

        setIsFading(true);

       timeoutRef.current =  setTimeout(() => {
            setSelectedMember(member);
            setIsFading(false);
            setIsImageLoaded(false);
            timeoutRef.current = null;
        }, 300)

    }

    return (
        <main className='flex flex-col gap-22 xl:gap-16'>
            <section className="flex justify-center md:justify-start md:pl-8 lg:pl-0 lg:w-full lg:max-w-[70rem]      lg:block lg:mx-auto  ">
                <h1 className="font-medium text-white text-preset-8 md:text-xl lg:text-2xl lg:tracking-widest uppercase">
                    <span className="font-bold text-[#555660] mr-6">02</span>
                    Meet your crew
                </h1>
            </section>

            {
                selectedMember ?
                    <section className={`flex flex-col lg:items-stretch lg:flex-row gap-8 lg:gap-8 lg:w-full lg:max-w-[70rem]   items-center lg:mx-auto lg:h-auto  lg:min-h-[27rem] lg:max-h-[27rem] xl:pb-8 xl:max-h-[30rem] `}>
                        <div className=' space-y-10 lg:space-y-0 lg:flex lg:flex-col lg:justify-center gap-18  lg:max-h-[27rem]  lg:my-auto  '>

                            {/* beginning of name and bio */}
                            <div className={`  space-y-10 px-4 lg:px-0 ${isFading ? "opacity-0" : "opacity-100"} `}>
                                <h2 className='text-white text-center lg:text-start uppercase text-preset-6'>
                                    <span className='block text-xl text-[#8e8f94] lg:tracking-widest lg:text-2xl lg:mb-4'>
                                        {selectedMember.role}
                                    </span>
                                    <span className='text-3xl lg:tracking-widest lg:text-4xl'>
                                        {selectedMember.name}
                                    </span>
                                </h2>

                                <p className='text-white text-center lg:text-start max-w-[31rem] mx-auto lg:mx-0  min-h-[9.375rem]'>
                                    {selectedMember.bio}
                                </p>
                            </div>
                            {/* end of name and bio  */}

                            {/* beginning of our crew swap buttons */}
                            <div className='flex justify-center lg:justify-start lg:items-center gap-4 lg:gap-12 min-h-8   ' >
                                {
                                    crewData.map((member) => (
                                        <button
                                            key={member.name}
                                            className={`crewBtns ${selectedMember?.name == member.name ? "active" : ""}`}
                                            data-name={member.name}
                                            onClick={renderCrewMember}
                                        >

                                        </button>
                                    ))
                                }
                            </div>
                            {/* end of our crew swap buttons */}

                        </div>

                        {/* beginning of image container */}
                        <div className={`  max-w-[70%]   mx-auto  crew-pic  lg:max-w-[20rem] lg:mx-0 xl:min-w-[25rem]  xl:max-w-[25rem]  overflow-hidden ${isFading || !isImageLoaded ? "opacity-0" : "opacity-100"}`}>
                            <picture>
                                <source srcSet={selectedMember.images.webp} type='image/webp' />
                                <img className='block max-w-full h-auto' src={selectedMember.images.png} alt={selectedMember.name} onLoad={()=> setIsImageLoaded(true)} />
                            </picture>
                        </div>
                        {/* end of image container  */}
                    </section> : ""
            }
        </main>
    )
}