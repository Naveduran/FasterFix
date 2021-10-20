import BackButton from "../components/backbtn";
import ProductDetails from "../components/product";
import HistoryTable from "../components/table";
import { Link } from "react-router-dom";
export default function SellerView(){
    return(
        <div>
            <div class="w-screen h-1/2 pr-6 pt-6 flex justify-end"> 
                <Link to="/">
                    <BackButton/>       
                </Link>
            </div>
            <h1 class="mt-9">Detailed View</h1>
            <div class="flex justify-center mx-auto gap-x-20 mt-12">
                <ProductDetails/>
                <HistoryTable/>
            </div>
        </div>        
    );
};