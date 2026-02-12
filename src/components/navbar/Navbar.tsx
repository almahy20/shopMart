"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, ShoppingCart, TextAlignJustify, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { cartContext } from "@/provider/cart-provider";
import { Spinner } from "../ui/spinner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Navbar() {
  const { data: session, status } = useSession();
  const { noOfCartItems, isLoding, noOfWishlist, isLoding2 } =
    useContext(cartContext);

  console.log(status);
  function signupall() {
    signOut({ callbackUrl: "/login" });
  }
  return (
    <>
      <nav className="bg-white border-b border-gray-200 p-4 fixed w-full z-30 top-0 left-0 right-0">
        <div className="flex justify-between items-center max-w-5xl mx-auto">
          <Link href={"/"}>
            <div className="nav-logo">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
                <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-lg">
                  S
                </div>
                shopMart
              </h1>
            </div>
          </Link>

          <div className="nav-link hidden sm:block">
            <ul className="flex items-center justify-end gap-1">
              <li>
                <Link
                  href={"/categories"}
                  className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href={"/products"}
                  className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  products
                </Link>
              </li>
              <li>
                <Link
                  href={"/brands"}
                  className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                >
                  brands
                </Link>
              </li>
            </ul>
          </div>
          <div className="icon flex items-center gap-2">
            <div className="nav-avatar">
              <DropdownMenu>
                <div className="flex items-center gap-2">
                  <div className=" sm:flex hidden  items-center gap-2 bg-gray-100 pl-3 pr-1 py-1 rounded-full">
                    <span className="text-sm font-medium text-gray-700">
                      {session?.user?.name}
                    </span>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white border border-gray-200"
                      >
                        <User className="h-4 w-4 text-gray-600" />
                      </Button>
                    </DropdownMenuTrigger>
                  </div>

                  <Link href={"/cart"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full relative hover:bg-gray-100"
                    >
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {isLoding ? (
                          <Spinner className="h-2.5 w-2.5" />
                        ) : (
                          noOfCartItems
                        )}
                      </span>
                      <ShoppingCart className="h-5 w-5 text-gray-600" />
                    </Button>
                  </Link>

                  <Link href={"/wishlist"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 rounded-full relative hover:bg-gray-100"
                    >
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {isLoding2 ? (
                          <Spinner className="h-2.5 w-2.5" />
                        ) : (
                          noOfWishlist
                        )}
                      </span>
                      <Heart className="h-5 w-5 text-gray-600" />
                    </Button>
                  </Link>
                </div>

                <DropdownMenuContent align="end" className="w-40 ">
                  {session ? (
                    <>
                      <Link href={"/myaccount"}>
                        <DropdownMenuItem className="text-sm">
                          My Account
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/myOrdar"}>
                        <DropdownMenuItem className="text-sm">
                          ordare
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <Link href={"/"}>
                        <DropdownMenuItem
                          onClick={signupall}
                          className="text-sm text-red-600"
                        >
                          Log out
                        </DropdownMenuItem>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link href={"/register"}>
                        <DropdownMenuItem className="text-sm">
                          sign up
                        </DropdownMenuItem>
                      </Link>
                      <Link href={"/login"}>
                        <DropdownMenuItem className="text-sm">
                          login
                        </DropdownMenuItem>
                      </Link>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="Drawer sm:hidden block ">
              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <Button variant="outline">
                    <TextAlignJustify />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle className="text-lg font-bold">
                      <div className=" flex justify-end  items-center gap-2 bg-gray-200 pl-3 pr-1 py-1 rounded-full w-full ">
                        <span className="text-sm font-medium text-gray-700">
                          {session?.user?.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full bg-white border border-gray-200"
                        >
                          <User className="h-4 w-4 text-gray-600" />
                        </Button>
                      </div>
                    </DrawerTitle>
                  </DrawerHeader>
                  <hr />
                  <div className="space-y-3 mt-5 mx-3">
                    <Button variant="outline" className="w-full bg-gray-200  ">
                      <Link
                        href={"/categories"}
                        className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Categories
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-gray-200  ">
                      <Link
                        href={"/products"}
                        className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        products
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full bg-gray-200  ">
                      <Link
                        href={"/brands"}
                        className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        brands
                      </Link>
                    </Button>
                  </div>
                  <DrawerFooter>
                    {session ? (
                      <>
                        <Link href={"/Logout"}>
                          <Button
                            onClick={signupall}
                            className="text-sm bg-red-600 w-full"
                          >
                            Log out
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link href={"/register"}>
                          <Button className="text-sm w-full">sign up</Button>
                        </Link>
                        <Link href={"/login"}>
                          <Button className="text-sm w-full">login</Button>
                        </Link>
                      </>
                    )}
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
