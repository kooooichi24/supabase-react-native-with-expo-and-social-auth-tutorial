import { supabase } from "@/lib/supabase";
import * as AppleAuthentication from "expo-apple-authentication";
import { Platform, StyleSheet } from "react-native";

async function onAppleButtonPress() {
  console.log("onAppleButtonPress");
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  console.log("credential", credential);

  const credentialState = await AppleAuthentication.getCredentialStateAsync(
    credential.user
  );

  console.log("credentialState", credentialState);

  if (
    credentialState ===
      AppleAuthentication.AppleAuthenticationCredentialState.AUTHORIZED &&
    credential.identityToken &&
    credential.authorizationCode
  ) {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "apple",
      token: credential.identityToken,
      access_token: credential.authorizationCode,
    });

    if (error) {
      console.error("Error signing in with Apple:", error);
    }

    if (data) {
      console.log("Signed in with Apple:", data);
    }
  }
}

export default function AppleSignInButton() {
  if (Platform.OS !== "ios") {
    return <></>;
  }

  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      cornerRadius={5}
      style={styles.button}
      onPress={() => onAppleButtonPress()}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 45,
  },
});
