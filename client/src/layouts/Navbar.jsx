import { useState, useEffect } from "react";
import {
  ShoppingCart,
  User,
  Menu,
  X,
  Package,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Mock state — replace with your real auth/cart context
const useStore = () => ({
  cartCount: 3,
  isLoggedIn: false,
  user: null,
});

export default function Navbar() {
  const { cartCount, isLoggedIn, user } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Products", href: "/products", icon: Package },
    { label: "Collections", href: "/collections", icon: Sparkles },
    { label: "Deals", href: "/deals", badge: "Hot" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-zinc-100"
          : "bg-white border-b border-zinc-100",
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ── */}
          <a href="/" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
              <span className="text-white font-black text-sm tracking-tight">
                S
              </span>
            </div>
            <span className="text-xl font-black tracking-tight text-zinc-900 hidden sm:block">
              SHOP<span className="text-zinc-400 font-light">store</span>
            </span>
          </a>

          {/* ── Desktop Nav Links ── */}
          {/* <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href, badge }) => (
              <li key={label}>
                <a
                  href={href}
                  className="relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-150"
                >
                  {label}
                  {badge && (
                    <Badge className="bg-rose-500 hover:bg-rose-500 text-white text-[10px] px-1.5 py-0 h-4 leading-none">
                      {badge}
                    </Badge>
                  )}
                </a>
              </li>
            ))}
          </ul> */}

          {/* ── Desktop Right Actions ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search */}
            {/* <Button
              variant="ghost"
              size="icon"
              className="text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button> */}

            {/* Cart */}
            <a href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg"
                aria-label="Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>
            </a>

            {/* Auth */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg px-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                    <span className="hidden lg:block">
                      {user?.name ?? "Account"}
                    </span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 rounded-xl shadow-lg border-zinc-100"
                >
                  <DropdownMenuItem className="cursor-pointer rounded-lg text-sm">
                    My Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-lg text-sm">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer rounded-lg text-sm">
                    Wishlist
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer rounded-lg text-sm text-rose-500 focus:text-rose-600">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <a href="/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-lg"
                  >
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button
                    size="sm"
                    className="bg-zinc-900 hover:bg-zinc-700 text-white text-sm font-medium rounded-lg px-4 transition-colors"
                  >
                    Register
                  </Button>
                </a>
              </div>
            )}
          </div>

          {/* ── Mobile Right Actions ── */}
          <div className="flex md:hidden items-center gap-1">
            {/* Cart */}
            <a href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-zinc-500 hover:text-zinc-900 rounded-lg"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-zinc-900 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Button>
            </a>

            {/* Mobile Menu Sheet */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-zinc-600 hover:text-zinc-900 rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[360px] p-0">
                <div className="flex flex-col h-full">
                  {/* Sheet Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100">
                    <a
                      href="/"
                      className="flex items-center gap-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center">
                        <span className="text-white font-black text-xs">S</span>
                      </div>
                      <span className="font-black text-zinc-900 tracking-tight">
                        SHOP
                        <span className="text-zinc-400 font-light">store</span>
                      </span>
                    </a>
                    <SheetClose asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-lg text-zinc-400 hover:text-zinc-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </SheetClose>
                  </div>

                  {/* Nav Links */}
                  <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {/* {navLinks.map(({ label, href, badge }) => (
                      <SheetClose asChild key={label}>
                        <a
                          href={href}
                          className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                        >
                          <span>{label}</span>
                          {badge && (
                            <Badge className="bg-rose-500 hover:bg-rose-500 text-white text-[10px] px-1.5 py-0 h-4">
                              {badge}
                            </Badge>
                          )}
                        </a>
                      </SheetClose>
                    ))} */}

                    <div className="pt-1    ">
                      <SheetClose asChild>
                        <a
                          href="/cart"
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Cart</span>
                          {cartCount > 0 && (
                            <Badge className="ml-auto bg-zinc-900 hover:bg-zinc-900 text-white text-[10px] px-1.5">
                              {cartCount}
                            </Badge>
                          )}
                        </a>
                      </SheetClose>
                    </div>
                  </nav>

                  {/* Auth Footer */}
                  <div className="px-4 py-6 border-t border-zinc-100">
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50">
                          <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                            {user?.name?.[0]?.toUpperCase() ?? "U"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-zinc-900 truncate">
                              {user?.name ?? "User"}
                            </p>
                            <p className="text-xs text-zinc-400 truncate">
                              {user?.email ?? ""}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full rounded-xl text-sm font-medium border-zinc-200 text-zinc-600 hover:text-rose-600 hover:border-rose-200"
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Link to="/login">
                            <Button
                              variant="outline"
                              className="w-full rounded-xl text-sm font-medium border-zinc-200"
                            >
                              <User className="w-4 h-4 mr-2" />
                              Login
                            </Button>
                          </Link>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link to="/register">
                            <Button className="w-full bg-zinc-900 hover:bg-zinc-700 text-white rounded-xl text-sm font-medium">
                              Create Account
                            </Button>
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
