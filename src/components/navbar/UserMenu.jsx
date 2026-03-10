import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '@/Store/features/auth/auth.slice';

const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // If NOT logged in
  if (!user) {
    return (
      <Link to="/login">
        <Button className="p-5 text-white transition bg-suxnix-primary rounded-full cursor-pointer hover:bg-suxnix-primary/90">
          Login
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="w-13 h-13 cursor-pointer">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-suxnix-secondary text-white text-xl">
            {user?.firstName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link to="/profile" className="flex gap-2 cursor-pointer">
            <User size={16} />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex gap-2 cursor-pointer">
            <Settings size={16} />
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => dispatch(logout())}
          className="flex gap-2 cursor-pointer text-red-500"
        >
          <LogOut size={16} />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
