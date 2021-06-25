import React, { useRef } from "react"
import { CloudSize, SubscriptionPlan } from "../../types";
import CardHeader from "../CardHeader";
var validator = require("email-validator");

type Props = {
    setStep: (step: number) => void,
    activePlan: SubscriptionPlan,
    cloudSize: CloudSize,
    setEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
    email: string;
    updateAcceptTerms: (accept: boolean) => void;
    acceptTerms: boolean;
}

const StepThree: React.FC<Props> = ({ setStep, cloudSize, activePlan, setEmail, email, updateAcceptTerms, acceptTerms }) => {
    const termsRef = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        updateAcceptTerms(termsRef.current!.checked)
    }

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
                <h3 className="card-title">${activePlan.price_usd_per_gb}/<span className="text-xs">gb</span></h3>
                <h3 className="card-subtitle">{cloudSize.value} GB</h3>
                <h3 className="card-subtitle">{activePlan.duration_months} Months</h3>
                <h3 className="card-subtitle">${activePlan.price_usd_per_gb * cloudSize.value}</h3>
            </div>
            <div className="my-5">
                <input value={email} onChange={setEmail} className="input-field mt-5 w-full" type="text" placeholder="testuser@test.com" />
                {email === "" ? <p className="text-xs text-red-500">This field is required</p> : null}
                {!validator.validate(email) && email !== "" ? <p className="text-xs text-red-500">Please enter a valid email</p> : null}
            </div>

            <div className="my-5">
                <div className="flex justify-between">
                    <p>I accept the terms and conditions that apply</p>
                    <input ref={termsRef} type="checkbox" defaultChecked={acceptTerms} onChange={handleChange} />
                </div>
                {!acceptTerms ? <p className="text-xs text-red-500">This field is required</p> : null}
            </div>
            <div className="flex justify-between">
                <button className="btn btn-primary-outline px-16 mr-5" onClick={() => setStep(2)}>Back</button>
                <button className="btn btn-primary px-16" onClick={() => setStep(3)} disabled={
                    !acceptTerms
                    || email === ""
                }>Confirm</button>
            </div>
        </div>
    )
}

export default StepThree;