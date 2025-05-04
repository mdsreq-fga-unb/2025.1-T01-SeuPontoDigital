import { View, Text, StyleSheet } from 'react-native';

export default function ForgotPass(){
    return(
        <View style = {styles.container}>
            <Text>Esqueceu a senha</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

});