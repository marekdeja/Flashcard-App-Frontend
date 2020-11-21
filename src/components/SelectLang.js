import React from 'react';
import styles from './SelectLang.module.scss'

export const SelectLang = ({ list, setLanguage }) => {

    const printOptions = () => {
        return list.map((item, index) => {
            return <React.Fragment key={index}>
                {/* dodac klase do option i sprobowac tam ostylowac */}
                <option value={item.key} className={styles.customOption}>{item.simple_label}</option>
            </React.Fragment>
        }
        )
    }

    const onChange = (e) => {
        setLanguage(e.target.value)
    }

    return (
        <>
            <select className={styles.customSelect} name="languages" id="languages" onChange={(e) => onChange(e)} defaultValue="">
                <option value="" >Select language</option>
                {printOptions()}
            </select>
        </>
    )
}
