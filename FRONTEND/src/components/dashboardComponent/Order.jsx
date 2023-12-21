import OrderWait from "./OrderWaiting"
import OrderProcessing from "./OrderProcessing"
import OrderProcessed from "./OrderProcessed"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"


const Order = () => {
   const {navOnOrderMain} = useContext(AuthContext)
    return ( 
        <div className="order">
             {navOnOrderMain?.isWhatOrder === "OrderWait" && <OrderWait /> || navOnOrderMain?.isWhatOrder === "OrderProcessing" && <OrderProcessing /> || navOnOrderMain?.isWhatOrder === "OrderProcessed" && <OrderProcessed /> } 
        </div>
     );
}
 
export default Order;