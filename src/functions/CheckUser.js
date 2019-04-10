// import { AsyncStorage } from "react-native";
// import axios from "axios";

// const ACCESS_TOKEN = "access_token";

// export default async function() {
//   try {
//     let token = await AsyncStorage.getItem(ACCESS_TOKEN);
//     console.log("Function Running", token);
//     axios
//       .post("http://198.245.53.50:5000/api/users/check", {
//         token: token
//       })
//       .then(response => {
//         console.log("Authenticated:", response.data.authenticated);
//         let authenticated = response.data.authenticated;
//         this.props.navigation.navigate(authenticated ? "" : "Login");
//       });
//   } catch (error) {
//     console.log("Cannot get token");
//   }
// }
