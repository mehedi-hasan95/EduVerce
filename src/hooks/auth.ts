import { OAuthStrategy } from "@clerk/types";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useState } from "react";
export const useGoogleAuth = () => {
  const { signIn, isLoaded: LoadedSingIn } = useSignIn();
  const { signUp, isLoaded: LoadedSingUp } = useSignUp();
  const [loading, setLoading] = useState<boolean>(false);

  const signInWith = (strategy: OAuthStrategy) => {
    try {
      if (!LoadedSingIn) return null;
      setLoading(true);
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const signUpWith = (strategy: OAuthStrategy) => {
    try {
      if (!LoadedSingUp) return null;
      setLoading(true);
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/complete",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return { signInWith, signUpWith, loading };
};
