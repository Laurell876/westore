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

    // STEP THREE
    const [email, setEmail] = useState<string>("");
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

    const confirmPlan = () => {
        setLoading(true);
        const endpoint = "https://httpbin.org/post";
        fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                email,
                activePlan,
                cloudSize,
                upFrontPayment,
                cardNumber,
                cardSecurityCode,
                setCardExpirationDate,
                acceptTerms,
                total: upFrontPayment ? (activePlan.price_usd_per_gb * cloudSize.value) * 0.9 : activePlan.price_usd_per_gb * cloudSize.value
            })
        }).then(data => {
            setLoading(false);
            data.json().then(jsonData => {
                setPlans(jsonData.subscription_plans);
            })
        })
    }

    // STEP ONE FUNCTIONS
    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = () => {
        fetch(subscriptionPlansEndpoint).then(data => {
            data.json().then(jsonData => {
                setPlans(jsonData.subscription_plans);
                setLoading(false);
            })
        })
    }

    const selectPlan = (plan: SubscriptionPlan) => {
        setActivePlan(plan);
    }

    const selectSize = (size: CloudSize | null) => {
        if (size) setCloudSize(size);
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

    // STEP THREE FUNCTIONS
    const updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const updateAcceptTerms = (accept: boolean) => {
        setAcceptTerms(accept);
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
                        loadPlans={loadPlans}
                    />
                    : step === 2 ?
                        <StepTwo
                            activePlan={activePlan}
                            cloudSize={cloudSize}
                            upFrontPayment={upFrontPayment}

                            cardNumber={cardNumber}
                            setCardNumber={updateCardNumber}
                            cardExpirationDate={cardExpirationDate}
                            setCardExpirationDate={updateCardExpirationDate}
                            cardSecurityCode={cardSecurityCode}
                            setCardSecurityCode={updateCardSecurityCode}
                            setStep={setStep}

                        /> : <StepThree
                            setStep={setStep}
                            activePlan={activePlan}
                            cloudSize={cloudSize}
                            setEmail={updateEmail}
                            email={email}
                            updateAcceptTerms={updateAcceptTerms}
                            acceptTerms={acceptTerms}
                            confirmPlan={confirmPlan}
                            loading={loading}
                            upFrontPayment={upFrontPayment}

                        />}
            </div>
        </div>
    )
}

export default SubscriptionCard;