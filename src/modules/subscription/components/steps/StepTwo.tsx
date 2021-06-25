import React, { Dispatch, SetStateAction } from "react"


type Props = {
    cardNumber: number | undefined;
    setCardNumber: Dispatch<SetStateAction<number | undefined>>;
    cardExpirationDate: Date;
    setCardExpirationDate: Dispatch<SetStateAction<Date>>;
    cardSecurityCode: number | undefined;
    setCardSecurityCode: Dispatch<SetStateAction<number | undefined>>;
    setStep: (step: number) => void,
}


const StepTwo: React.FC<Props> = ({ cardNumber, setCardNumber,setStep }) => {
    return (
        <div>
            <div className="flex justify-center">
                <h1 className="card-title text-center mr-2">we<span className="highlighted-text">store</span></h1>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-database"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>
                </div>
            </div>
            <p className="card-subtitle text-center max-w-xs mx-auto">Please choose a plan that works for you and your team</p>

            <div className="flex justify-between">
                <button className="btn btn-primary-outline px-16 mr-5" onClick={() => setStep(1)}>Back</button>
                <button className="btn btn-primary px-16" onClick={() => setStep(3)}>Next</button>
            </div>
        </div>
    )
}

export default StepTwo;