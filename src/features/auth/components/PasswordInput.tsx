import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";



interface PasswordInputProps{
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
}

export default function PasswordInput({value, onChange, placeholder='Enter your password', name ='password'}:PasswordInputProps){
    const [showPassword, setShowPassword] = useState(false);
    return(
        <div className="relative">
            <input type={showPassword ? 'text': 'password'}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />

            <button
             type="button"
             onClick={() => setShowPassword((previous) => !previous)}
             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
             aria-label={showPassword ? 'Hide password' : 'Show password'}
            >{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
        </div>
    )
}