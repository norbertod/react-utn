import { ActionTypes } from "redux-devtools-instrument";
import { auth, db } from "../firebase/firebase";

interface State {
  user: Object;
  isAuth: boolean;
  error: string;
}
//constantes
const dataInicial = {
  user: {},
  isAuth: false,
  error: null,
};

//types
const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
const GET_LOGOUT_SUCCESS = "GET_LOGOUT_SUCCESS";
const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
const GET_ERRORS = "GET_ERRORS";
//adsñlkfjadlskjfa
// reducer
// Reducer
export default function heroeReducer(state = dataInicial, action: any) {
  switch (action.type) {
    case GET_LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, isAuth: action.payload.isAuth };
    case GET_LOGOUT_SUCCESS:
      return { ...state, isAuth: false, error: null };
    case GET_REGISTER_SUCCESS:
      return { ...state, user: action.payload, isAuth: true };
    case GET_ERRORS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// actions
export const obtenerLogin = (email:string, pass:string) => async (dispatch: any) => {

        try {
            const res = await auth.signInWithEmailAndPassword(email, pass)
            console.log(res.user)

            dispatch({
                type: GET_LOGIN_SUCCESS,
                payload: {
                    user: res.user,
                    isAuth:true
                }
              });

        } catch (error:any) {
            console.log(error)
            dispatch({
                type: GET_ERRORS,
                payload: error
              });
            if(error.code === 'auth/invalid-email'){
                //setError('Email no válido')
            }
            if(error.code === 'auth/user-not-found'){
                //setError('Email no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                //setError('Contraseña incorrecta')
            }
        }
    }



export const obtenerLogout = () => async (dispatch: any) => {
  dispatch({
    type: GET_LOGOUT_SUCCESS,
  });
};

export const registrarUsuario =
  (email: string, pass: string) => async (dispatch: any) => {
    try {
      const res: string | any = await auth.createUserWithEmailAndPassword(
        email.trim(),
        pass.trim()
      );
      console.log(res.user);
      await db.collection("usuarios").doc(res.user.email).set({
        email: res.user.email,
        uid: res.user.uid,
      });
      await db.collection(res.user.uid).add({
        name: "Tarea de ejemplo",
        fecha: Date.now(),
      });

      dispatch({
        type: GET_REGISTER_SUCCESS,
        payload: {
          email: res.user.email,
          uid: res.user.uid,
        },
      });
    } catch (error: string | any) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        // setError('Email no válido')
        console.log("Email no válido");
        dispatch({
            type: GET_ERRORS,
            payload: 'Email no válido'
          });
      }
      if (error.code === "auth/email-already-in-use") {
        // setError('Email ya utilizado')
        console.log("Email ya utilizado");
        dispatch({
            type: GET_ERRORS,
            payload: 'Email ya utilizado'
          });
      }
    }
  };
