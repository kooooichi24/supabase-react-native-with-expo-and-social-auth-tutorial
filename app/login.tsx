import { Stack } from "expo-router";
import { Link } from "expo-router/build/link/Link";
import { StyleSheet } from "react-native";

import AppleSignInButton from '@/components/social-auth-buttons/apple/apple-sign-in-button';
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Login" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">Login</ThemedText>
        <AppleSignInButton />
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Try to navigate to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
