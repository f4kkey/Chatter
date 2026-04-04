import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimateContainer from '../components/BorderAnimateContainer'
import { MessageCircleIcon, LockIcon, MailIcon, UserCircle2Icon, LoaderIcon } from 'lucide-react'
import { Link } from 'react-router'

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" })
    const { login, isLoggingIn } = useAuthStore()
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
    };

    return (
        <div className="relative w-full max-w-md flex items-center justify-center p-4 bg-slate-900">
            <BorderAnimateContainer>
                <div className=' w-full flex flex-col p-8 flex justify-center max-w-md'>
                    <div className="text-center mb-8">
                        <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                        <h1 className='text-4xl font-bold text-slate-400 mb-2'>Chatter</h1>
                        <h2 className='text-2xl font-bold text-slate-200 mb-2'>Login your account</h2>

                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div>
                            <label className='auth-input-label'>Email </label>
                            <div className='relative'>
                                <MailIcon className='auth-input-icon' />
                                <input type="text"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className='input'
                                    placeholder='johndoe@gmail.com'
                                />
                            </div>
                        </div>

                        <div>
                            <label className='auth-input-label'>Password </label>
                            <div className='relative'>
                                <LockIcon className='auth-input-icon' />
                                <input type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className='input'
                                    placeholder='Enter your password'
                                />
                            </div>
                        </div>
                        <button className='auth-btn' type='submit' disabled={isLoggingIn}>
                            {
                                isLoggingIn ? (
                                    <LoaderIcon className='w-full h-5 animate-spin text center' />
                                ) : (
                                    "Log in"
                                )
                            }
                        </button>
                    </form>

                    <div className='mt-6 text-center'>
                        <Link to="/register" className='auth-link'>
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </div>
            </BorderAnimateContainer>
        </div >
    )
}

export default LoginPage