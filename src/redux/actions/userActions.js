import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
//import { google } from "../../firebase/firebaseConfig";

import { userTypes } from "../types/userTypes";

export const actionRegisterAsync = ({ email, password, name, avatar, phoneNumber }) => {
  return (dispatch) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        console.log(user);
        const { accessToken } = user.auth.currentUser;
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: avatar,
          phoneNumber
        });
        dispatch(
          actionRegisterSync({
            email,
            name,
            accessToken,
            photoURL: avatar,
            phoneNumber,
            error: false,
          })
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionRegisterSync({ error: true, errorMessage }));
      });
  };
};
const actionRegisterSync = (user) => {
  return {
    type: userTypes.USER_REGISTER,
    payload: { ...user },
  };
};

export const actionLoginAsync = ({ email, password }) => {
  return (dispatch) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const { displayName, accessToken, photoURL, phoneNumber } = user.auth.currentUser
        dispatch(actionLoginSync({
          email, name: displayName,
          accessToken,
          avatar: photoURL,
          phoneNumber,
          error: false
        }))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionLoginSync({
          email,
          error: true,
          errorMessage
        }))
      })

  }
}

export const loginProviderAsync = (provider) => {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user)
        const { displayName, accessToken, photoURL, phoneNumber } = user.auth.currentUser
        dispatch(actionLoginSync({
          email: user.email, 
          name: displayName,
          accessToken,
          avatar: photoURL,
          phoneNumber,
          error: false
        }))
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        dispatch(actionLoginSync({
          error: true,
          errorMessage
        }))
      })
  }
}

export const actionLoginSync = (user) => {
  return {
    type: userTypes.USER_LOGIN,
    payload: { ...user }
  }
}

export const actionLogoutAsync = () => {
  return (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(actionLogoutSync())
      })
      .catch((error) => {
        console.log(error);
      })
  }
}
const actionLogoutSync = () => {
  return {
    type: userTypes.USER_LOGOUT
  }

}