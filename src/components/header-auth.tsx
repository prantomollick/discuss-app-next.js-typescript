"use client";
import * as actions from "@/actions";

import {
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  Button,
  NavbarItem
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

function HeaderAuth() {
  const { data, status } = useSession();

  let authContent: React.ReactNode;

  if (status === "loading") {
    authContent = null;
  } else if (data?.user) {
    authContent = (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={data?.user.image || ""}>User Image</Avatar>
        </PopoverTrigger>
        <PopoverContent>
          <div className="p-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return authContent;
}

export default HeaderAuth;
