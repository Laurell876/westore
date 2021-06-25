import React from "react"
import { SubscriptionPlan } from "../../types";

type Props = {
    plans: Array<SubscriptionPlan>
    callback: any,
    activePlan: SubscriptionPlan
}

const StepOne: React.FC<Props> = ({ plans, callback, activePlan }) => {

    const cardClassList = "card text-center cursor-pointer mx-5";

    return (
        <div>
            <h1 className="card-title text-center">we<span className="highlighted-text">store</span></h1>
            <p className="card-subtitle text-center max-w-xs mb-16 mx-auto">Please choose a plan that works for you and your team</p>
            <div className="cards flex justify-between">
                {
                    plans.map(plan => (
                        <div key={plan.duration_months}
                            className={`${plan.duration_months === activePlan.duration_months ? cardClassList + ' active' : cardClassList}`}
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
                    ))
                }
            </div>
        </div>
    )
}

export default StepOne;