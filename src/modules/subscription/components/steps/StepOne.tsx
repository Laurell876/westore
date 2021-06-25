import React, { useRef } from "react"
import { CloudSize, SubscriptionPlan } from "../../types";
import SubscriptionPlanCard from "../SubscriptionPlanCard"
import Select from 'react-select'
import Loader from "../../../externals/components/Loader"
import CardHeader from "../CardHeader";

type Props = {
    plans: Array<SubscriptionPlan>
    callback: (plan: SubscriptionPlan) => void,
    activePlan: SubscriptionPlan,
    cloudSize: CloudSize,
    selectSize: (size: CloudSize | null) => void,
    upFrontPayment: boolean,
    setUpFront: (upfront: boolean) => void,
    setStep: (step: number) => void,
    loading: boolean
}

const dropdownOptions: Array<CloudSize> = [
    { value: 5, label: '5 GB' },
    { value: 10, label: '10 GB' },
    { value: 50, label: '50 GB' },
]


const StepOne: React.FC<Props> = ({ plans, callback, activePlan, cloudSize, selectSize, upFrontPayment, setUpFront, setStep, loading }) => {
    const upfrontRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        setUpFront(upfrontRef.current!.checked)
    }

    return (
        <div>
            <CardHeader />
            <p className="card-subtitle text-center max-w-xs mx-auto">Please choose a plan that works for you and your team</p>
            {
                !loading ?
                    <>
                        <div className="cards flex flex-col md:flex-row justify-between">
                            {
                                plans.map(plan => (
                                    <SubscriptionPlanCard key={plan.duration_months} plan={plan} activePlan={activePlan} callback={callback} />
                                ))
                            }
                        </div>
                        <div className="flex items-center mt-10">
                            <p className="paragraph w-full">Amount of gigabytes in a cloud</p>
                            <div className="w-full">

                                <Select defaultValue={cloudSize}
                                    options={dropdownOptions} onChange={selectSize} />
                            </div>
                        </div>
                        <div className="flex items-center my-10">
                            <p className="paragraph w-full">Upfront Payment</p>
                            <input ref={upfrontRef} type="checkbox" defaultChecked={upFrontPayment} onChange={handleChange} />
                        </div>
                        <div className="flex justify-center">
                            <button className="btn btn-primary-outline px-16" onClick={() => setStep(2)}>Next</button>
                        </div>
                    </>
                    :
                    <Loader />
            }

        </div>
    )
}

export default StepOne;