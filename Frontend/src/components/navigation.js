import { useState } from "react";
import HistoryTable from "./table";
export default function NavBar(){
    const[toggleState, setToggleState] = useState(1);

        const toggleTab = (index) => {
            setToggleState(index);
        }
    const[toggleState1, setToggleState1] = useState(1);

        const toggleTab1 = (index) => {
            setToggleState1(index);
        }
    const[toggleState2, setToggleState2] = useState(1);

        const toggleTab2 = (index) => {
            setToggleState2(index);
        }

    return(
        <div>
            <div class="flex min-w-full justify-center items-center flex-col">
                <div class="flex ">
                    <div 
                    class={toggleState === 1 ? "bg-gray-400 text-white h-auto p-2  w-34" : "w-34 h-auto p-2 text-black bg-gray-200"}
                    onClick={() => toggleTab(1)}>In my Hand
                    </div>
                    <div 
                    class={toggleState === 2 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200"}
                    onClick={() => toggleTab(2)}>
                        All the cases
                    </div>     
                </div>

                <div class={toggleState === 1 ? "flex" : "hidden" }>
                    <div 
                        class={toggleState1 === 1 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200" }
                        onClick={() => toggleTab1(1)}>
                            New Case                
                    </div>

                    <div 
                        class={toggleState1 === 2 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200" }
                        onClick={() => toggleTab1(2)}>
                            Active                 
                    </div>

                    <div 
                        class={toggleState1 === 3 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200" }
                        onClick={() => toggleTab1(3)}>
                            Finished                 
                    </div>
                </div>
                <div class={toggleState === 2 ? "flex" : "hidden" }>
                    <div 
                        class={toggleState2 === 1 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200" }
                        onClick={() => toggleTab2(1)}>
                            Active                
                    </div>

                    <div 
                        class={toggleState2 === 2 ? "bg-gray-400 text-white h-auto p-2  w-auto" : "w-auto h-auto p-2 text-black bg-gray-200" }
                        onClick={() => toggleTab2(2)}>
                            Finished                
                    </div>
                </div>
            </div>
            
                <div class={toggleState1 === 2 && toggleState === 1 ?  "w-auto h-auto mt-10" : "hidden" }>
                    <HistoryTable/>              
                </div>

                <div class={toggleState1 === 2 && toggleState === 2 ?  "w-20 h-10 bg-blue-600" : "hidden" }>
                                       
                </div>
                
            </div>
        
    )
}