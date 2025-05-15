import { useEffect, useRef, useState } from "react";
export default function Destination() {

    const [celestialBodyData, setCelestialBodyData] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isFading, setIsFading] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const timeoutRef = useRef(null);
    


    useEffect(() => { // we set this up to fetch data from the json file to simulate api consumption
        fetch(`${import.meta.env.BASE_URL}data.json`)
            .then(res => res.json())
            .then(data => {
                setCelestialBodyData(data.destinations); //here we grab the data from the json file but spefically data about the destinations because we do not need everything
                setSelectedDestination(data.destinations[0]); // this is to make sure that the app lands on moon everytime we arrive at destination page 
                setIsLoading(false); // this is for determininng whether to show the loading wheel or not depending on whether
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            })

    }, [])


    function renderCelestialBodyInfo(event) {
        const buttonName = event.currentTarget.dataset.name;
        const selectedBody = celestialBodyData.find(body => body.name == buttonName);

        // 🔒 Prevent rerender if it's already selected
        if (!selectedBody || selectedDestination?.name === selectedBody.name) {
            return;
        }

        // Clear previous timeout if one exists
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Trigger fade out
        setIsFading(true);

        // After fade out is done (300ms), change text and fade back in
        timeoutRef.current = setTimeout(() => {
            setSelectedDestination(selectedBody);
            setIsImageLoaded(false); // reset so we wait for image again
            setIsFading(false);
            timeoutRef.current = null; // clear ref after it runs
        }, 300);
    }


    return (
        <>
            <main className="space-y-10 lg:space-y-12">
                {
                    isLoading ?
                        <div className="flex justify-center " role="status">
                            <svg aria-hidden="true" className="inline w-44 h-44 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                            </svg>
                            
                        </div>
                        :
                        <>
                            <section className="flex justify-center md:justify-start md:pl-8 lg:pl-4 lg:justify-normal  lg:max-w-[70rem] lg:mx-auto  ">
                                <h1 className="font-medium text-white text-preset-8 md:text-xl lg:text-3xl lg:tracking-widest"><span className="font-bold text-[#555660] mr-6">01</span> PICK YOUR DESTINATION</h1>
                            </section>

                            <section className="lg:flex space-y-10  lg:space-y-0 lg:justify-center lg:gap-24 lg:max-w-[70rem] lg:mx-auto">
                                {/* celestial body image */}
                                {selectedDestination ?
                                    <div className={`max-w-[150px] mx-auto transition-opacity duration-300 ${isFading || !isImageLoaded ? 'opacity-0' : 'opacity-100'} md:max-w-[300px] lg:mx-0 lg:flex lg:items-center lg:max-w-none`}  >

                                        <picture className="">
                                            <source srcSet={selectedDestination.images.webp} type="image/webp" />
                                            <img className=" mt-auto" src={selectedDestination.images.png} alt={selectedDestination.name} onLoad={() => setIsImageLoaded(true)} />
                                        </picture>

                                    </div>
                                    :
                                    ""}
                                {/* end of celestial body image */}
                                <div className="flex flex-col lg:gap-6">

                                    {/* celestial body buttons */}
                                    <div className="text-[var(--clr-blue-300)] max-w-[250px] w-full mx-auto  text-preset-5 font-light flex justify-between flex-wrap lg:w-auto  lg:mx-0 lg:max-w-[18.75rem] ">
                                        { 
                                            celestialBodyData.map((body) => (
                                                <button
                                                    key={body.name}
                                                    className={`uppercase lg:text-[1.125rem] hover:cursor-pointer celestial-body-btns ${selectedDestination?.name === body.name ? "active":""}`}
                                                    onClick={renderCelestialBodyInfo}
                                                    data-name={body.name}
                                                >
                                                    {body.name}
                                                </button>
                                            ))
                                        }
                                    </div>
                                    {/* end of celestial body buttons */}

                                    {selectedDestination ?
                                        <div className={`text-white text-center lg:text-start max-w-[280px] md:max-w-[400px]  lg:max-w-[500px] mx-auto space-y-8 transition-opacity duration-300 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
                                            <h2 className="uppercase text-5xl md:text-7xl lg:text-8xl text-preset-1 my-8">{selectedDestination.name}</h2>
                                            <p className="destination-info pb-8  text-[0.8rem] lg:text-xl leading-6 text-preset-9 text-[var(--clr-blue-300)]">{selectedDestination.description}</p>
                                            <div className="space-y-6 md:flex md:max-w-[] justify-between lg:max-w-[18.75rem] lg:pt-8">
                                                <div className="">
                                                    <span className="block text-sm text-[var(--clr-blue-300)] text-preset-7 lg:mb-4">AVG. DISTANCE</span>
                                                    <span className="text-3xl lg:text-2xl text-preset-1 uppercase">{selectedDestination.distance}</span>
                                                </div>
                                                <div className="">
                                                    <span className="block text-sm text-[var(--clr-blue-300)] text-preset-7 lg:mb-4">EST. TRAVEL TIME</span>
                                                    <span className="text-3xl lg:text-2xl text-preset-1 uppercase">{selectedDestination.travel}</span>
                                                </div>
                                            </div>
                                        </div> : ""}

                                </div>

                            </section>
                        </>
                }


            </main>
        </>
    )
}