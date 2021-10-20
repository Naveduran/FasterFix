import SummitButton from '../components/summit';
import Notesdetail from '../components/notes';
import BackButton from '../components/backbtn';
import MyDroopDown from '../components/mydropdown';
import HistoryTable from '../components/table';
import { Link } from 'react-router-dom';

export default function AccountantView() {
  return (
    <div>
      <div class="w-screen h-1/2 pr-6 pt-6 flex justify-end">
        <Link to="/"><BackButton/></Link>
      </div>
      <div class="m-9">
        <h1>Voucher/Money Back</h1>
      </div>
      <div class="flex justify-center mx-auto gap-x-20">
        <div class="border-2 w-96 h-96 shadow-lg bg-blue-100 p-5 ">
          <div >
            <h3>Case</h3>
            <h3>Product</h3>
            <p>Name: Toy car</p>
            <p>Reference: 12345</p>
          </div>
        </div> 
        <div >
          <HistoryTable/>
        </div>
      </div>
      <div class="flex justify-center mt-10 gap-x-10">
        <MyDroopDown/>
        <Notesdetail/>
        <SummitButton/>
      </div>
      </div> 
  );
};