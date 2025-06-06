import { LuSettings2 } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Settings() {
  return (
    <div className="bg-zinc-950 hover:bg-zinc-900 hover:scale-105 rounded-full ring-2 ring-white/50 hover:ring-white transition-all duration-200 w-12 h-12 flex justify-center items-center absolute bottom-4 right-4">
      <LuSettings2 className="w-5 h-5" />
    </div>
  );
}
