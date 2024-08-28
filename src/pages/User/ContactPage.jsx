import React from 'react'
import { Facebook, Github, Instagram, Linkedin, Twitter, Whatsapp } from 'react-bootstrap-icons';
import '../../styles/ContactPage.css'
import ContactForm from '../../components/Home/ContactForm';
import SocialMedia from '../../components/Home/SocialMedia';
function ContactPage() {

    return (
        <div className='md:flex '>
            <div className='w-full mx-auto'>
                <ContactForm />
            </div>
            <div className='w-9/12 mx-auto mt-5'>
                <SocialMedia />
            </div>

        </div>
    );
}

export default ContactPage;