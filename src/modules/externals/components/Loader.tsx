import React from "react"
import loader from "../../../images/loader.svg"


const Loader = () => {
    return (
        <div className="h-full w-full flex items-center justify-center">
            <img
                v-else
                className="h-10 inline ml-3"
                src={loader}
                alt=""
            />
        </div>
    )
}
export default Loader;