import { AppState } from "react-native";
import { createClient } from "@supabase/supabase-js";
import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SUPABASE_URL, SUPABASE_APIKEY } from "@env";

const supabase = createClient(SUPABASE_URL, SUPABASE_APIKEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export const signUpWithEmail = async (username, email, password) => {
  console.log("🚀 ~ signUpWithEmail ~ username:", username);
  try {
    const newAccount = await supabase.auth.signUp({ email, password });

    if (!newAccount) throw Error;
    const { data } = await signInWithEmail(email, password);

    // No esta funcionando el update
    const updateUser = await supabase
      .from("users")
      .update({
        username: username,
      })
      .eq("id", data.user.id);
    return updateUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signInWithEmail = async (email, password) => {
  try {
    const session = await supabase.auth.signInWithPassword({ email, password });
    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: currentAccount } = await supabase.auth.getUser();
    if (!currentAccount) throw Error;

    const { data: currentUser, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", currentAccount.user.id)
      .single();

    if (error) {
      console.log("Error fetching user data:", error);
      throw error;
    }

    return currentUser;
  } catch (error) {
    console.log(error);
  }
};
