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
            <h1 className="card-title text-center">we<span className="highlighted-text">store</span></h1>
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