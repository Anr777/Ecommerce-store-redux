import { NavLink } from "react-router-dom";
import { GrMenu } from "react-icons/gr";
import { BsCart3, BsMoonFill, BsSun, BsSunFill } from "react-icons/bs";
import { NavLinks } from '.';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


const themes = {
  fantasy: 'fantasy',
  night: 'night',
}

const getThemeFromLocalStorage = () => {
  return localStorage.getItem('theme') || themes.fantasy;
}

function Navbar() {
  //! REDUX
  const { numItemsInCart } = useSelector( state => state.cart );

  //! STATE
  const [ theme, setTheme ] = useState( getThemeFromLocalStorage );
  console.log(numItemsInCart)

  //! FUNCIOENS Y METODOS
  const handleTheme = () => {
    const { fantasy, night } = themes;
    const newTheme = theme === fantasy ? night : fantasy;
    setTheme( newTheme );
  }
  
  useEffect( () => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <nav className="bg-base-200">
      <div className="navbar align-element">
        <div className="navbar-start">
          {/**TITLE */ }
          <NavLink to={ '/' } className={ 'hidden lg:flex btn btn-primary text-3xl items-center tracking-tighter font-black' }>
            SP
          </NavLink>
          {/**DROPDOWN */ }
          <div className="dropdown">
            <label tabIndex={ 0 }
              className="btn btn-ghost lg:hidden"
            >
              <GrMenu className="h-6 w-6" />
            </label>
            {/** EL CONTENIDO DEL MENU DESPLEGABLE */ }
            <ul tabIndex={ 0 } className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52">
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className="navbar-end">
          {/**THEME SETUP */ }
          <label className="swap swap-rotate">
            <input type="checkbox" onChange={ handleTheme } />
            {/**sun icon*/ }
            <BsSunFill className="swap-on h-4 w-4" />
            {/**moon icon*/ }
            <BsMoonFill className="swap-off h-4 w-4" />
          </label>
          {/**CART LINK */ }
          <NavLink to='/cart' className='btn btn-ghost btn-circle btn-md ml-4'>
            <div className="indicator">
              <BsCart3 className='h-6 w-6' />
              <span className="badge badge-sm badge-primary indicator-item">
                { numItemsInCart }
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
