import React from "react";
import {connect} from "react-redux";

import * as inputType from "../../inputTypes";
import styles from "../Form/InputForm.module.css";

const article = (props) => {
    console.log(props.fieldset)
    if (!!!props.fieldset) return (<div/>)
    return (
        <div>
            {
                props.fieldset.map((field, index) => {
                    switch (field.inputType) {
                        case inputType.text:
                            return (
                                <p key={index} style={{display: "inline"}}>{field.text}</p>
                            )
                        case inputType.link:
                            return (
                                <a key={index} target="_blank"
                                   style={{display: "inline"}}
                                   href={field.url}>
                                    {field.text}
                                </a>
                            )
                        case inputType.image:
                            return (
                                <div key={index}>
                                    image
                                </div>
                            )
                        case inputType.header:
                            return (
                                <h3 key={index}>
                                    {field.text}
                                </h3>
                            )
                        case inputType.mainHeader:
                            return (
                                <h2 key={index}>{field.text}</h2>
                            )
                        case inputType.gap:
                            return <br key={index}/>
                        default:
                            return (
                                <div key={index}>
                                    def
                                </div>
                            )
                    }
                }
            )
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        fieldset: state.constructor.fields
    };
};

export default connect(mapStateToProps)(article)
