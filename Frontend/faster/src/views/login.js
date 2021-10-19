import SelectDropdown  from "../components/selectrole";
export default function LoginPage() {
    return (
        <div class="w-screen h-screen flex items-center justify-center border-4  bg-gray-100">
            <div class="text-center bg-blue-200 mx-auto space-y-6 w-1/3 h-3/6 p-9 rounded-2xl shadow-2xl">
                <h1 class="m-3 text-5xl">Welcome</h1>
                <h2>Select your Role</h2>
                <SelectDropdown/>
            </div>
        </div>
    )
}