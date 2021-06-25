import React, { useState, useEffect } from "react"
import "../styles/subscription.css"
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { CloudSize, SubscriptionPlan } from "../types";
import { baseCloudSize, basePlan } from "../state";

const subscriptionPlansEndpoint = "https://cloud-storage-prices-moberries.herokuapp.com/prices"

const SubscriptionCard = () => {
    const [step, setStep] = useState<number>(1);
    const [plans, setPlans] = useState<Array<SubscriptionPlan>>([]);
    const [activePlan, setActivePlan] = useState<SubscriptionPlan>(basePlan);
    const [cloudSize, setCloudSize] = useState<CloudSize>(baseCloudSize);
    const [upFrontPayment, setUpFrontPayment] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch(subscriptionPlansEndpoint).then(data => {
            data.json().then(jsonData => {
                setPlans(jsonData.subscription_plans);
                setLoading(false);
            })
        })
    }, []);

    const selectPlan = (plan:SubscriptionPlan) => {
        setActivePlan(plan);
    }

    const selectSize = (size: CloudSize | null) => {
        if(size) setCloudSize(size);
    }

    const setUpFront = (upfront: boolean) => {
        setUpFrontPayment(upfront);
    }

    return (
        <div className="backdrop">
            <div className="sub-card card">
                {step === 1
                    ? <StepOne 
                    plans={plans} 
                    callback={selectPlan} 
                    activePlan={activePlan} 
                    cloudSize={cloudSize} 
                    selectSize={selectSize} 
                    upFrontPayment={upFrontPayment}
                    setUpFront={setUpFront}
                    setStep={setStep}
                    loading={loading}
                    />
                    : step === 1 ? <StepTwo /> : <StepThree />}
            </div>
        </div>
    )
}

export default SubscriptionCard;