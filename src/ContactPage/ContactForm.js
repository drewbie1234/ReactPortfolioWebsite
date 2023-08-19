import React, { useState } from 'react';
import styles from './ContactPage.module.css';


function ContactForm(){
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
      });
    
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };
    
    const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // You can perform further actions with the form data, like sending it to a server.
    };
    
    return (
    
    <div className={styles.div1}>
        <div className={styles.div2}>
        <h1>Send a message</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <fieldset className={styles.contactInformation}>
                <legend>Contact Information</legend>
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" />
                <br/>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" />
                <br/>
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" />
                <br/>
            </fieldset>
            <br/>
            <fieldset className={styles.contactInformation}>
                <legend>Message</legend>
                <br/>
                <textarea name="message" className={styles.textarea}></textarea>
            <br/>
            </fieldset>
            <br/>
            <fieldset className={styles.contactInformation}>
                <legend>Upload a file</legend>
                <br/>
            <input className={styles.upload} type="file" name="file" accept=".pdf,.doc,.docx" />
                <br/>
            </fieldset>
            <br/>
            <button type="submit">Submit</button>
            <br/>
        </form>
    </div>
    </div>
    );
}

export default ContactForm 