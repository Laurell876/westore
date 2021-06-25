import React from "react"
import { CloudSize, SubscriptionPlan } from "../../types";
import CardHeader from "../CardHeader";

type Props = {
    setStep: (step: number) => void,
    activePlan: SubscriptionPlan,
    cloudSize: CloudSize
}

const StepThree: React.FC<Props> = ({ setStep, cloudSize, activePlan }) => {
    return (
        <div>
            <CardHeader />
            <div className="card my-10 text-center">
                <h3 className="card-title ml-3 mb-5">
                    <span className="highlighted-text">
                        {activePlan.duration_months === 3 ? 'Basic ' : activePlan.duration_months === 6 ? 'Startup ' : 'Enterprise '}
                    </span>
                    Plan
                </h3>
                <h3 className="card-title">$2.5/<span className="text-xs">gb</span></h3>
                <h3 className="card-subtitle">{cloudSize.value} GB</h3>
                <h3 className="card-subtitle">3 Months</h3>
                <h3 className="card-subtitle">$500</h3>
            </div>
            <div className="flex justify-between">
                <button className="btn btn-primary-outline px-16 mr-5" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary px-16" onClick={() => setStep(3)} >Confirm</button>
            </div>
        </div>
    )
}

export default StepThree;