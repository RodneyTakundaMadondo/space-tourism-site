import { useEffect, useState, useRef } from "react"
export default function Technology() {

    const [techData, setTechData] = useState([]);

    const [chosenTechInfo, setChosenTechInfo] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const timeoutRef = useRef(null);


    //data fetch 
    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}data.json`)
            .then(res => res.json())
            .then(data => {
                setTechData(data.technology); //getting data specifically tech data
                setChosenTechInfo(data.technology[0]);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error, "Error initializing")
                setIsLoading(true);
            });
    }, [])

    function changeContext(event) {
        const btn = event.currentTarget.dataset.name;
        const chosenInfo = techData.find((techInfo) => techInfo.name === btn);

        if (!chosenInfo || chosenTechInfo?.name == chosenInfo.name) return;
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        setIsFading(true);

        timeoutRef.current = setTimeout(() => {
            setChosenTechInfo(chosenInfo);
            setIsFading(false);
            setIsImageLoaded(false);
            timeoutRef.current = null;
        }, 300)
    }


    return (
        <>

            <main>
                {isLoading ?
                    <div className="flex justify-center " role="status">
                        <svg aria-hidden="true" className="inline w-44 h-44 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>

                    </div>
                    :
                    <>
                        <section className=" mb-22 flex justify-center md:justify-start md:pl-8 lg:pl-4 lg:justify-normal  lg:max-w-[70rem] lg:mx-auto  ">
                            <h1 className="font-normal text-white text-preset-8 md:text-xl lg:text-3xl lg:tracking-widest"><span className="font-bold text-[#555660] mr-6">03</span> SPACE LAUNCH 101</h1>
                        </section>

                        <section className="flex flex-col gap-16 lg:flex-row-reverse lg:pl-8 xl:pl-0 xl:justify-center lg:gap-8 lg:pb-16 xl:pb-22">

                            {/* main image container */}
                            {
                                chosenTechInfo ?
                                    <div className={`xl:ml-auto ${isFading || !isImageLoaded ? "opacity-0" : "opacity-100"}`}>
                                        <picture>
                                            <source media="(min-width:1024px)" srcSet={chosenTechInfo.images.portrait} />
                                            <img className=" block w-full h-full object-cover" src={chosenTechInfo.images.landscape} alt={chosenTechInfo.name} onLoad={() => { setIsImageLoaded(true) }} />
                                        </picture>
                                    </div> : ""
                            }
                            {/* main image container ends here */}
                            
                            {/* button and information container  */}
                            <div className="flex flex-col gap-16 mb-16 xl:ml-auto  lg:flex-row lg:gap-8 items-center  lg:my-auto lg:items-stretch">

                                {/* our buttons */}
                                <div className="flex justify-center gap-4 lg:flex-col">
                                    {
                                        techData.map((data, index) => (
                                            <button
                                                key={data.name}
                                                className={` h-12 w-12 lg:h-20 lg:w-20 rounded-full font-medium text-xl text-preset-4 flex items-center justify-center techBtns border-solid border-1 border-white text-white ${chosenTechInfo?.name === data.name? "active": ""}`}
                                                onClick={changeContext}
                                                data-name={data.name}
                                            >
                                                {index + 1}
                                            </button>
                                        ))
                                    }
                                </div>
                                {/* buttons end here */}

                                {/* tech information starts here */}
                                {
                                    chosenTechInfo ?
                                        <div className={`${isFading ? "opacity-0" : "opacity-100"} px-4 lg:px-0 `}>
                                            <h2 className="text-center lg:text-start uppercase text-preset-4 mb-8 ">
                                                <span className="block  text-[#8b8a91] text-xl sm:text-xl mb-4 lg:text-3xl">the terminology...</span>
                                                <span className="text-white text-2xl sm:text-3xl tracking-wider lg:text-4xl">{chosenTechInfo.name}</span>
                                            </h2>

                                            <p className="text-[var(--clr-blue-300)] text-preset-7  text-center max-w-[23.8rem] sm:max-w-[34.3rem] mx-auto lg:text-start lg:max-w-[29.76rem]">
                                                {chosenTechInfo.description}
                                            </p>
                                        </div> : ""
                                }
                                {/* tech information ends here */}
                            </div>
                        </section>
                    </>
                }
            </main>
        </>
    )
}      