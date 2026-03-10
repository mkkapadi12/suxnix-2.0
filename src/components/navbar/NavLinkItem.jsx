import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

const NavLinkItem = ({ title, path }) => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="lg:gap-x-5.5">
        <NavigationMenuItem>
          <NavigationMenuLink
            asChild
            className={`${navigationMenuTriggerStyle()} font-semibold text-suxnix-body text-base/6`}
          >
            <Link className="bg-transparent" to={path}>
              {title}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavLinkItem;
