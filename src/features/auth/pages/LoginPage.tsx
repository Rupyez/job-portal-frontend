import LoginForm from "../components/LoginForm";


export default function LoginPage(){
    return(
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm sm:p-10">
                <div className="mb-8 text-center">
                    <span className="text-2xl font-bold text-blue-600">JobPortal</span>
                </div>

                <LoginForm/>
            </div>
        </main>
    )
}