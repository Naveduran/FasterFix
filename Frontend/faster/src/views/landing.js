import { Link } from "react-router-dom"
export default function LandingPage(){
    return(
        <div class="w-screen h-screen p-2">
            <div class=" flex justify-end pt-2 pr-2">
                <Link to="/login">
                <button 
                    class="font-bold text-lg flex justify-end bg-loginButton active:bg-colorBu py-1 px-4"
                    >Login
                </button>
                </Link>
            </div>
            <div class="flex flex-col space-y-3 items-center">
                    <h1>
                        FASTER FIX
                    </h1>
                <div class="text-justify space-y-3 pt-9">
                    
                    <h2>
                        Warranties Manager System
                    </h2>
                    <p class="">
                        The PYMES tend to assign client service responsibilities centralized on only one person that receives requests from everyone. 
                    </p>
                    <p>
                        It creates a bottleneck that can generate bad reputation and legal penalty fees. 
                    </p>
                    <p>
                        Let's change that!
                    </p>
                    <div class="flex pl-5 space-x-5 pt-10">
                        <div class="w-72 ">
                            <ul class="list-disc space-y-2.5">
                            <li>Acknowledge the role of every part of the company in the process</li>
                            <li>Notify automatically the next agent when a case is needing its review</li>
                            <li>Give relevant information to take action.</li>
                            </ul>
                        </div>
                        <div class="w-30"/>
                    </div>
                </div>
                <div class="mt-5">
                    <Link to="/register">
                        <button 
                            class="font-bold text-lg flex justify-end bg-loginButton active:bg-colorBu py-1 px-4"
                            >Start Now
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}