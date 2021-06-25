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

    // STEP ONE
    const [plans, setPlans] = useState<Array<SubscriptionPlan>>([]);
    const [activePlan, setActivePlan] = useState<SubscriptionPlan>(basePlan);
    const [cloudSize, setCloudSize] = useState<CloudSize>(baseCloudSize);
    const [upFrontPayment, setUpFrontPayment] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // STEP TWO
    const [cardNumber, setCardNumber] = useState<string>("");
    const [cardExpirationDate, setCardExpirationDate] = useState<string>("");
    const [cardSecurityCode, setCardSecurityCode] = useState<string>("");

    // STEP ONE FUNCTIONS
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

    // STEP TWO FUNCTIONS
    const updateCardNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardNumber(event.target.value)
    }
    
    const updateCardExpirationDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardExpirationDate(event.target.value);
    }
    
    const updateCardSecurityCode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCardSecurityCode(event.target.value);
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
                    : step === 2 ? 
                    <StepTwo 
                    cardNumber={cardNumber} 
                    setCardNumber={updateCardNumber}
                    cardExpirationDate={cardExpirationDate}
                    setCardExpirationDate={updateCardExpirationDate}
                    cardSecurityCode={cardSecurityCode}
                    setCardSecurityCode={updateCardSecurityCode}
                    setStep={setStep}

                    /> : <StepThree />}
            </div>
        </div>
    )
}

export default SubscriptionCard;