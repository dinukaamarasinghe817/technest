import React, { useState } from 'react'
import authservice from '../../services/authService';


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        console.log("called");
        try {
          await authservice.signup(firstname, lastname, email, password);
          console.log('Logged in successfully:');
          window.location.href = '/login';
        } catch (err) {
          setError('Login failed. Please try again.');
        }
    };
    return (
        <>
        <section class="">
            <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create your account
                        </h1>
                            <div>
                                <label for="firstname" class="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Firstname</label>
                                <input 
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                                type="text" name="firstname" id="firstname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required=""/>
                            </div>
                            <div>
                                <label for="lastname" class="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Lastname</label>
                                <input 
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                type="text" name="lastname" id="lastname" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required=""/>
                            </div>
                            <div>
                                <label for="email" class="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label for="password" class="block mb-2 text-start text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <button 
                            onClick={handleSignUp}
                            class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign Up</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Have an account already? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default SignUp