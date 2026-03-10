import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const NavDropdown = ({ title, items }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-base font-semibold text-suxnix-body bg-transparent">
            {title}
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <div className="p-2 w-44">
              <ul className="flex flex-col text-base font-semibold">
                {items.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="p-2 transition hover:text-suxnix-primary"
                  >
                    <li>{item.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavDropdown;
