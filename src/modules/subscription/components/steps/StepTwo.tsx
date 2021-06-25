import React, { Dispatch, SetStateAction } from "react"
// @ts-ignore
import CreditCardInput from 'react-credit-card-input';
import { CloudSize, SubscriptionPlan } from "../../types";
import CardHeader from "../CardHeader";
import PlanData from "../PlanData";


type Props = {
    cardNumber: string;
    setCardNumber: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cardExpirationDate: string;
    setCardExpirationDate: (event: React.ChangeEvent<HTMLInputElement>) => void;
    cardSecurityCode: string;
    setCardSecurityCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setStep: (step: number) => void,
    activePlan: SubscriptionPlan,
    cloudSize: CloudSize,
    upFrontPayment: boolean,
}


const StepTwo: React.FC<Props> = ({ cloudSize,activePlan,upFrontPayment,cardNumber, setCardNumber, setStep, cardExpirationDate, setCardExpirationDate, cardSecurityCode, setCardSecurityCode }) => {
    return (
        <div>
            <CardHeader />

            <div className="fields my-10">
                <CreditCardInput
                    cardNumberInputProps={{ value: cardNumber, onChange: setCardNumber }}
                    cardExpiryInputProps={{ value: cardExpirationDate, onChange: setCardExpirationDate }}
                    cardCVCInputProps={{ value: cardSecurityCode, onChange: setCardSecurityCode }}

                    fieldClassName="input"
                />
                {cardExpirationDate === ""
                    || cardNumber === ""
                    || cardSecurityCode === "" ? <p className="text-xs text-red-500">All three fields are required</p> : null}
            </div>

            <PlanData upFrontPayment={upFrontPayment} activePlan={activePlan} cloudSize={cloudSize} />


            <div className="flex justify-between">
                <button className="btn btn-primary-outline px-16 mr-5" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary px-16" onClick={() => setStep(3)} disabled={
                    cardExpirationDate === ""
                    || cardNumber === ""
                    || cardSecurityCode === ""
                }>Next</button>
            </div>
        </div>
    )
}

export default StepTwo;