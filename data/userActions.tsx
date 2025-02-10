import { TUserAction } from "@/types/userActions";
import { Search, User, ShoppingCart } from "lucide-react"

export const actionsData: TUserAction = [
  {
    id: 1,
    icon: <Search />,
    label: "Search",
    modalContent: <div>Search Modal Content</div>,
  },
  {
    id: 2,
    icon: <User />,
    label: "Profile",
    modalContent: <div>Profile Modal Content</div>,
  },
  {
    id: 3,
    icon: <ShoppingCart />,
    label: "Cart",
    modalContent: <div>Cart Modal Content</div>,
  },
];
