import { View, Text, StyleSheet } from 'react-native';

export default function SignUp(){
    return(
        <View style = {styles.container}>
            <Text>Pagina Cadastro</Text>
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