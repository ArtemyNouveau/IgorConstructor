import React from "react";

import styles from './RemoveButton.module.css';

const removeButton = (props) => {
    return (
        <span {...props} className={styles.Cross}/>
    )
}

export default removeButton
