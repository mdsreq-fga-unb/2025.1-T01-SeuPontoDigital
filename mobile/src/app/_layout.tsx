import { Stack } from 'expo-router'

export default function MainLayout(){
  return(
    <Stack>
      <Stack.Screen
        name="index"
        options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen
        name="(auth)/firstTime/page"
        options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen
        name="(panel)/profile/page"
        options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen
        name="(panel)/employer/page"
        options={{headerShown: false}}
      ></Stack.Screen>

      <Stack.Screen
        name="(auth)/forgotpass/page"
        options={{headerShown: false}}
      ></Stack.Screen>
    </Stack>
  )
}