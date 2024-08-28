import React, { useEffect, ComponentType } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";

interface WithSessionProps {
  // You can define any specific props that your wrapped component requires here
}

const authenticationVerification = <P extends WithSessionProps>(Component: ComponentType<P>) => {
  const WithSession = (props: P) => {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/");
      }
    }, [router, status]);

    if (status === "loading") {
      return <Loader />;
    }

    if (status === "authenticated") {
      // Pass the props to the wrapped component
      return <Component {...props} />;
    }

    // In case of unauthenticated, this will never be rendered due to the redirect
    return null;
  };

  return WithSession;
};

export default authenticationVerification;
