import NavDropdown from './NavDropdown';
import NavLinkItem from './NavLinkItem';
import { NAV_ITEMS } from './nav.config';

const DesktopNav = () => {
  return (
    <div className="hidden lg:gap-x-2.5 xl:gap-x-5.5 lg:flex">
      {NAV_ITEMS.map((item, index) =>
        item.type === 'dropdown' ? (
          <NavDropdown key={index} title={item.title} items={item.items} />
        ) : (
          <NavLinkItem key={index} title={item.title} path={item.path} />
        ),
      )}
    </div>
  );
};

export default DesktopNav;
