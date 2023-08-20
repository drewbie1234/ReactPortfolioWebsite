import React from 'react'
import ContactForm from './ContactForm'
import styles from './ContactPage.module.css'

const ContactPage = () => {
    return(
        <>
        <h1 className={styles.Title}>Contact</h1>
        <ContactForm />
        </>
    )
}

export default ContactPage