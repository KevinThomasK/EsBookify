import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUser = () => {
  const [userIsLoading, setUserIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cancelSubscription = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
      setUserIsLoading(false);
    });

    return cancelSubscription;
  }, []);

  return { user, userIsLoading };
};
