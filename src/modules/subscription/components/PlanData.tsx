import React from "react";
import { CloudSize, SubscriptionPlan } from "../types";

type Props = {
    activePlan: SubscriptionPlan,
    cloudSize: CloudSize,
    upFrontPayment: boolean
}


const PlanData: React.FC<Props> = ({ activePlan, cloudSize, upFrontPayment }) => {
    return (
        <div className="my-8 plan-data">
            <div className="flex justify-between">
                <p>Current Selected Subscription: </p>
                <div>
                    <p>Months: {activePlan.duration_months}, Price Per GB: {activePlan.price_usd_per_gb}</p>
                </div>
            </div>
            <div className="flex justify-between">
                <p>Final Price:</p>
                <p>${upFrontPayment ? (activePlan.price_usd_per_gb * cloudSize.value) * 0.9 : activePlan.price_usd_per_gb * cloudSize.value}</p>
            </div>
        </div>
    )
}

export default PlanData;