import multiguard from 'vue-router-multiguard';
import authentication_handler from "@/api/authentication_handler"
import router from '@/router/index';

// Check if user is authenticated
const Auth = async function(to, from, next) {
  const auth_handler = new authentication_handler()
  const is_auth = await auth_handler.is_auth(true);

  if (is_auth) {
    return next();
  }

  router.push("login");
}

export default Auth;
