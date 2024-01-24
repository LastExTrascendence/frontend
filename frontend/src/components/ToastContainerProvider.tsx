import { Bounce, Flip, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

export default function ToastContainerProvider() {
  return <ToastContainer
    position="top-center"
    pauseOnFocusLoss
    draggable
    pauseOnHover
    limit={3}
    theme="dark"
    transition={Bounce}
    closeOnClick
    closeButton={false}
  />
}
