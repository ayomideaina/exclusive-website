"use client";

import { useRef, useEffect, useState } from "react";
import { User, Settings, Package, XCircle, Star, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toggle from "../Toggle";
import AppModal from "../AppModal";
import useAuth from "@/hooks/useAuth";
import withAuth from "@/hocs/withAuth";

const menuItems = [
  { label: "Manage My Account", icon: Settings, href: "/account" },
  { label: "My Order", icon: Package, href: "/orders" },
  { label: "My Cancellations", icon: XCircle, href: "/cancellations" },
  { label: "My Reviews", icon: Star, href: "/reviews" },
];

function AccountDropdown() {
  const { logOut } = useAuth();
  const router = useRouter();

  return (
    <Toggle
      render={(open, toggle) => (
        <DropdownBody open={open} toggle={toggle} logOut={logOut} router={router} />
      )}
    />
  );
}

function DropdownBody({ open, toggle, logOut, router }) {
  const containerRef = useRef(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (open && containerRef.current && !containerRef.current.contains(e.target)) {
        toggle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, toggle]);

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await logOut();
    setShowLogoutModal(false);
    toggle();
    router.push("/");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={toggle}
        aria-label="Account menu"
        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center"
      >
        <User className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-52 bg-white rounded shadow-dropdown border border-border-light py-2 z-20">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              onClick={toggle}
              className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:text-primary"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogoutClick}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:text-primary"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      )}

      <AppModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log out?"
        actions={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 text-sm rounded border border-border text-text-primary hover:border-primary hover:text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={confirmLogout}
              className="px-4 py-2 text-sm rounded bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Log Out
            </button>
          </>
        }
      >
        Are you sure you want to log out of your account?
      </AppModal>
    </div>
  );
}

export default withAuth(AccountDropdown, { fallback: null });
