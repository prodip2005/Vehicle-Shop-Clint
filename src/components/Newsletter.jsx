import React from 'react';

const Newsletter = () => {
    return (
        <section className=" to-white/5 border rounded-2xl shadow-2xl p-10 mt-16 text-center">

          
            <h2 className="text-4xl font-bold italic bg-linear-to-r from-blue-500 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] mb-4">
                Subscribe Our Vehicles Store
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
                Get the latest updates, vehicle news, and exclusive offers delivered straight to your inbox!
            </p>

          
            <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
                <input  type="email" placeholder='Enter Email' className='p-3 border rounded-3xl' />
                <button
                    type="submit"
                    className="w-full btn sm:w-auto bg-linear-to-r from-blue-500 to-fuchsia-500 text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition"
                >
                    Subscribe
                </button>
            </form>


            
            <p className="text-white/50 text-sm mt-6">
                We respect your privacy — unsubscribe anytime.
            </p>
        </section>
    );
};

export default Newsletter;
