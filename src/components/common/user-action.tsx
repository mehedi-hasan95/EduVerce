import { onGetUserDetails } from "@/actions/auth";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ArrowRightFromLine } from "lucide-react";

export const UserAction = async () => {
  const user = await onGetUserDetails();
  return (
    <>
      {user?.status === 200 ? (
        <SignOutButton>
          <Avatar>
            <AvatarImage
              src={user.image ? user.image : "https://github.com/shadcn.png"}
              alt="user"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SignOutButton>
      ) : (
        <Link
          href="/sign-in"
          className="bg-themeGray border-themeGray bg-clip-padding backdrop--blur__safari backdrop-filter backdrop-blur-2xl bg-opacity-60 rounded-xl px-4 py-1 flex items-center gap-2"
        >
          Sign In
          <ArrowRightFromLine className="h-4 w-4" />
        </Link>
      )}
    </>
  );
};
