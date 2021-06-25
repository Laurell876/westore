import React,{useEffect, useState} from "react"
import { SubscriptionPlan } from "../types"

type Props = {
    plan: SubscriptionPlan,
    activePlan: SubscriptionPlan,
    callback: (plan: SubscriptionPlan) => void,
}
const SubscriptionPlanCard: React.FC<Props> = ({ plan, activePlan, callback }) => {
    const [classes, setClasses] = useState<string>("card text-center cursor-pointer")
    
    useEffect(()=>{
        if(plan.duration_months === 6) setClasses("card text-center cursor-pointer mx-5");
    },[])

    return (
        <div key={plan.duration_months}
            className={`${plan.duration_months === activePlan.duration_months ? classes + ' active' : classes}`}
            onClick={
                () => callback(plan)
            }
        >
            <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>

                <h3 className="card-title ml-3">{plan.duration_months === 3 ? 'Basic' : plan.duration_months === 6 ? 'Startup' : 'Enterprise'}</h3>
            </div>
            <h3 className="card-title">{plan.duration_months} months</h3>
            <p>${plan.price_usd_per_gb}/<span className="small-text">GB</span></p>
            <div className="circle mx-auto mt-10"></div>
        </div>
    )
}

export default SubscriptionPlanCard;