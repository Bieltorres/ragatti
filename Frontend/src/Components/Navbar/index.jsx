import s from './style.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
library.add(fas);

export const Navbar = ({
  visibleNav,
  handleToggleNavbar,
  btnOffNavbar,
  links,
  optionsList,
  menuItems,
  options,
  menuItem,
  svgMenu,
  contentNavbarHidden,
  headerNavbarHidden,
  active,
  threeDots
}) => {
  const [loading, setLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const isNavbarVisible = useSelector((state) => state.navbar.isNavbarVisible);
  const prevPathnameRef = useRef(location.pathname);
  const dataUser = useSelector((state) => state.user.name);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const dropdownMapping = {
    clientes: '/clientes',
    campanhas: '/campanhas',
    kanban: '/pipeline',
    publicos: '/publicos',
    inicio: '/dashboard',
  };

  useEffect(() => {
    if (openDropdown && prevPathnameRef.current !== location.pathname) {
      const baseRoute = dropdownMapping[openDropdown];
      if (!location.pathname.startsWith(baseRoute)) {
        setOpenDropdown(null);
      }
    }
    prevPathnameRef.current = location.pathname;
  }, [location.pathname, openDropdown]);


  return (
    <div className={`${s.navbar} ${visibleNav}`}>
      <div className={`${s.headerNavbar} ${headerNavbarHidden}`}>
        <div className={s.contentLogo}>
          {isNavbarVisible ? (
            <img src={'https://rigatti.clinicarigatti.com.br/wp-content/uploads/2025/02/RIGATTI-assinatura-principal-dourado.png.webp'} alt="logo" className={s.logoFull} />
          ) :
            (
              <img src={'https://rigatti.clinicarigatti.com.br/wp-content/uploads/2025/02/RIGATTI-simbolo-bege-150x150.png'} alt="logo" className={s.logoMini} />
            )}
        </div>

        <button className={`${btnOffNavbar} ${s.btnShowDropdown} ${!isNavbarVisible ? s.navbarClosed : ''}`} onClick={handleToggleNavbar}>
          <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 527.42 527.42" className={s.toggleIcon}>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M4.925,271.773l263.77,216.474c6.591,5.288,9.593,3.137,6.707-4.807l-69.104-206.862 c-2.889-7.94-2.861-20.809,0.061-28.736l68.982-203.849c2.923-7.929-0.082-10.104-6.707-4.859L4.987,252.704 C-1.638,257.948-1.666,266.489,4.925,271.773z"></path>
                  <path d="M255.845,271.773l263.77,216.474c6.591,5.288,9.593,3.137,6.707-4.807l-69.104-206.862 c-2.889-7.94-2.861-20.809,0.061-28.736l68.981-203.849c2.923-7.929-0.082-10.104-6.707-4.859l-263.647,213.57 C249.282,257.948,249.254,266.489,255.845,271.773z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>

      <section className={`${s.contentNavbar} ${contentNavbarHidden}`}>
        <div className={s.teste}>

          <div className={optionsList}>
            <span className={menuItems}>
              <div className={options}>
                <NavLink
                  to={'/horarios-disponiveis'}
                  className={({ isActive }) => (isActive ? `${links} ${active}` : links)}
                >
                  <div>
                    <FontAwesomeIcon icon="fa-solid fa-clock" className={svgMenu} />
                    <span className={menuItem}>Horários disponíveis</span>
                  </div>
                </NavLink>
              </div>
            </span>
          </div>

            <div className={optionsList}>
              <span className={menuItems}>
                <div className={`${options}`}>
                  <NavLink
                    to={'/agendamentos'}
                    className={({ isActive }) => (isActive ? `${links} ${active}` : links)}
                  >
                    <div>
                      <FontAwesomeIcon icon="fa-solid fa-users" className={svgMenu} />
                      <span className={menuItem}>Novo Agendamento</span>
                    </div>
                  </NavLink>
                </div>
              </span>
            </div>
          
        </div>

        <div className={` ${s.configUser}`}>
          <span className={menuItems}>
            <div className={`${options}`}>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? `${links} ${active}` : links)}
              >
                {({ isActive }) => (
                  <div className={s.userContainer}>
                    <FontAwesomeIcon icon="fa-solid fa-circle-user" className={`${svgMenu} ${s.userIcon}`} />
                    {isNavbarVisible && (
                      <div className={s.userInfo}>
                        <span className={s.userName}>{dataUser}</span>
                      </div>
                    )}
                    <span className={`${s.threeDots} ${threeDots} ${isActive ? s.iconActivate : ''}`}>
                      <FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />
                    </span>
                  </div>
                )}
              </NavLink>
            </div>
          </span>

          <div className={`${options} ${s.logoutContent}`}>
            <NavLink
              to="/login"
              onClick={handleLogout}
              className={links}
            >
              <div>
                <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" className={svgMenu} />
                <span className={menuItem}>Sair</span>
              </div>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};
