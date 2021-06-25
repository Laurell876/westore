import React from "react"
import { CloudSize, SubscriptionPlan } from "../../types";
import SubscriptionPlanCard from "../SubscriptionPlanCard"
import Select from 'react-select'

type Props = {
    plans: Array<SubscriptionPlan>
    callback: (plan: SubscriptionPlan) => void,
    activePlan: SubscriptionPlan,
    cloudSize:CloudSize,
    selectSize: (size: CloudSize) => void
}

const dropdownOptions: Array<CloudSize> = [
    { value: 5, label: '5 GB' },
    { value: 10, label: '10 GB' },
    { value: 50, label: '50 GB' },
]


const StepOne: React.FC<Props> = ({ plans, callback, activePlan, cloudSize, selectSize }) => {
    return (
        <div>
            <div className="flex justify-center">

                <h1 className="card-title text-center mr-2">we<span className="highlighted-text">store</span></h1>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                </div>
            </div>
            <p className="card-subtitle text-center max-w-xs mx-auto">Please choose a plan that works for you and your team</p>
            <div className="cards flex justify-between my-16">
                {
                    plans.map(plan => (
                        <SubscriptionPlanCard plan={plan} activePlan={activePlan} callback={callback} />
                    ))
                }
            </div>
            <div className="flex items-center">
                <p className="paragraph w-full">Amount of gigabytes in a cloud</p>
                <div className="w-full">

                    <Select defaultValue={cloudSize}
                        options={dropdownOptions} onChange={selectSize}  />
                </div>
            </div>
        </div>
    )
}

export default StepOne;