import BackButton from '../components/backbtn';
import { Link } from 'react-router-dom';
export default function Register() {
    return (
        <div>
            <div class="header  border-2 h-14">
                <Link to="/">
                    <BackButton/>
                </Link>
            </div>
        </div>
    );
};