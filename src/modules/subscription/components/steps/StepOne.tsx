import React from "react"
import { SubscriptionPlan } from "../../types";
import SubscriptionPlanCard from "../SubscriptionPlanCard"

type Props = {
    plans: Array<SubscriptionPlan>
    callback: (plan: SubscriptionPlan) => void,
    activePlan: SubscriptionPlan
}

const StepOne: React.FC<Props> = ({ plans, callback, activePlan }) => {
    return (
        <div>
            <div className="flex justify-center">

                <h1 className="card-title text-center mr-2">we<span className="highlighted-text">store</span></h1>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                </div>
            </div>
            <p className="card-subtitle text-center max-w-xs mb-16 mx-auto">Please choose a plan that works for you and your team</p>
            <div className="cards flex justify-between mb-10">
                {
                    plans.map(plan => (
                        <SubscriptionPlanCard plan={plan} activePlan={activePlan} callback={callback} />
                    ))
                }
            </div>
            <p className="paragraph">Amount of gigabytes in a cloud</p>
        </div>
    )
}

export default StepOne;