import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { mergeCart } from '../redux/slices/cartSlice'; // ensure this exists
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SignIn from '../assets/signin.jpg';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ guestId, user })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate(redirect))
      .catch((error) => console.error("Login failed:", error));
  };

  return (
    <div className='flex'>
      <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-5 md:p-10'>
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-5 rounded-lg border shadow-sm">
          <div className='flex justify-center mb-5'>
            <h2 className='text-2xl font text-[#431861] medium'>Aikam</h2>
          </div>
          <h2 className='text-2xl font-bold text-center mb-3'>Hey there!</h2>
          <p className='text-center mb-6'>Enter your email and password to login.</p>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Enter your email address'
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Enter your password'
            />
          </div>
          <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>
            Sign In
          </button>
          <p className='mt-6 text-center text-sm'>
            Don't have an account?{" "}
            <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={SignIn} alt="Login to Account" className='h-full w-full object-cover' />
        </div>
      </div>
    </div>
  );
}
