import { setLogin } from "../controladores/login-controler.js";
import { Router } from "../controladores/router.js";


export function App(){
    setLogin();
    Router();
    
}