import Link from "next/link";

import { ThemeToggler } from "./ThemeToggler";
import { SignedIn, UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
              PDFQueryA!
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-4 ml-6">
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      userButtonTrigger:
                        "focus:shadow-none focus-visible:ring-2 focus-visible:ring-ring rounded-full hover:ring-2 hover:ring-border transition-all",
                    },
                  }}
                />
              </SignedIn>

              <ThemeToggler />
            </div>
          </div>
          {/* Mobile Screen  */}
          <div className="md:hidden flex items-center gap-4">
            <div className="flex flex-col gap-6">
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonTrigger:
                          "h-12 w-12 focus:ring-2 focus:ring-ring",
                      },
                    }}
                  />
                </div>
              </SignedIn>
            </div>
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  );
};
