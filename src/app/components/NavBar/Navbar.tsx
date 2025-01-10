// /app/components/NavBar/Navbar.tsx

'use client';

import React, { useContext, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';
import { FaUserCircle, FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import { MdLogout, MdInfo, } from 'react-icons/md';
import './navbar.scss';
import Image from 'next/image';
import icoAdd from '../../public/svg/ico-add.svg'
import logo from '@/app/public/images/shopidrone.png';
import { useCart } from '@/app/context/CartContext';

const Navbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const handleCategoryClick = (category: string) => {
    router.push(`/fullList?category=${category.toLowerCase()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/fullList?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="wrapper -large -padded">
          <div className="navbar-content">
            <Link href="/" className="navbar-logo">
              <Image src={logo} alt="ShopiDrone Logo" width={150} height={40} />
            </Link>
            
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                  <FaSearch />
                </button>
              </form>
            </div>

            <div className="navbar-right">
              <Link href={user ? "/sell" : "/auth"} className="post-button">
                <Image src={icoAdd} alt={''} className={'ico'}/>
                Déposer une annonce
              </Link>
              {typeof user?.email === 'string' ? (
                <div className="profile-container" ref={dropdownRef}>
                  <button className="account-button" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <FaUserCircle size={20} />
                    {user.email}
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      <button className="dropdown-item" onClick={() => router.push('/dashboard')}>
                        <FaUser size={20} /> Dashboard
                      </button>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <MdLogout size={20} /> Déconnexion
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/auth" className="account-button">
                  <FaUserCircle size={20} />
                  Compte
                </Link>
              )}
              <Link href="/cart" className="cart-icon">
                <FaShoppingCart size={24} />
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="navbar-categories">
        <div className="wrapper -large -padded">
          <div className="categories-list">
            <button onClick={() => handleCategoryClick('Drone')} className="category-item">Drone</button>
            <button onClick={() => handleCategoryClick('Batterie')} className="category-item">Batterie</button>
            <button onClick={() => handleCategoryClick('Helices')} className="category-item">Hélices</button>
            <button onClick={() => handleCategoryClick('Camera')} className="category-item">Camera</button>
            <button onClick={() => handleCategoryClick('Telecommande')} className="category-item">Télécommande</button>
            <button onClick={() => handleCategoryClick('Electronique')} className="category-item">Électronique</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
