import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import s from './style.module.scss';
import { Navbar } from "../../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleNavbar } from "../../Redux/slices/navnarSlice";

export const Container = () => {
  const [showNavBar, setShowNavBar] = useState(true);

  const isNavbarVisible = useSelector((state) => state.navbar.isNavbarVisible);
  const dispatch = useDispatch();

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const currentPath = window.location.pathname;
  useEffect(() => {
    if (currentPath === '/chatlive') {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [currentPath]);

  return (
    <>
      {showNavBar && (
        <Navbar
          threeDots={s.threeDots}
          visible={isNavbarVisible ? "" : s.hidden}
          handleToggleNavbar={handleToggleNavbar}
          visibleNav={isNavbarVisible ? "" : `${s.hidden} ${s.hiddenNav}`}
          hidenLogo={isNavbarVisible ? "" : s.minLogo}
          logo={s.logo}
          btnOffNavbar={s.btnOffNavbar}
          linksOptions={s.linksOptions}
          offNavbarImg={s.offNavbarImg}
          menuTitle={s.menuTitle}
          contentNavbarHidden={s.contentNavbarHidden}
          headerNavbarHidden={s.headerNavbarHidden}
          links={s.links}
          optionsList={s.optionsList}
          menuItems={s.menuItems}
          options={s.options}
          listMenu={s.listMenu}
          menuItem={s.menuItem}
          svgMenu={s.svgMenu}
          active={s.active}
          razao_social_hidden={s.razao_social_hidden}
          activeOptions={s.activeOptions}
          dropdownMenu={s.dropdownMenu}
        />
      )}

      <div className={`${isNavbarVisible ? s.contentRight : s.contentHidden}`}>
        <div className={s.content} style={{padding: currentPath === "/chat" ? 0 : "5rem 2rem 2rem 2rem"}}>
          <Outlet />
        </div>
      </div>
    </>
  );
};
