import React, { useState, useEffect } from "react"
import "../styles/subscription.css"
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import { SubscriptionPlan } from "../types";
import { basePlan } from "../state";

const subscriptionPlansEndpoint = "https://cloud-storage-prices-moberries.herokuapp.com/prices"

const SubscriptionCard = () => {
    const [step, setStep] = useState<number>(1);
    const [plans, setPlans] = useState<Array<SubscriptionPlan>>([]);
    const [activePlan, setActivePlan] = useState<SubscriptionPlan>(basePlan);

    useEffect(() => {
        fetch(subscriptionPlansEndpoint).then(data => {
            data.json().then(jsonData => {
                setPlans(jsonData.subscription_plans)
            })
        })
    }, []);

    const selectPlan = (plan:SubscriptionPlan) => {
        setActivePlan(plan);
    }

    return (
        <div className="backdrop">
            <div className="card">
                {step === 1
                    ? <StepOne plans={plans} callback={selectPlan} activePlan={activePlan} />
                    : step === 1 ? <StepTwo /> : <StepThree />}
            </div>
        </div>
    )
}

export default SubscriptionCard;