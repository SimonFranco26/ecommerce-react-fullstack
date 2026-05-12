import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { subscribeToAuthChanges } from '../../../firebase/auth';
import useCartStore from '../../../store/cartStore';
export default function NavBar() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);
  const getTotalItems = useCartStore(state => state.getTotalItems);
  useEffect(() => {
    /*
      // BACKUP: OLD LOCALSTORAGE METHOD
      // const user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      // setLoggedInUser(user);
    */
    const unsubscribe = subscribeToAuthChanges((currentUser) => {
      setLoggedInUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const isActive = (path) => location.pathname === path;

  /*
    // BACKUP: OLD LOCALSTORAGE METHOD
    // const handleLogout = () => {
    //   localStorage.removeItem('loggedInUser');
    //   setLoggedInUser(null);
    //   navigate('/login');
    // };
  */

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              MyStore
            </span>
          </Link>

          {/* Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            <li>
              <Link
                to="/gallery"
                className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/gallery')
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                Gallery
              </Link>
            </li>
            {loggedInUser ? (
              <li>
                <Link
                  to="/profile"
                  className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                    isActive('/profile')
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  Profile
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/login')
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className={`text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                      isActive('/register')
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                    }`}
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/cart"
                className={`relative flex items-center gap-1 text-base font-medium transition-all duration-300 pb-2 border-b-2 ${
                  isActive('/cart')
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </Link>
            </li>
          </ul>

          {/* Mobile Menu Button (opcional para futuro) */}
          <button className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
