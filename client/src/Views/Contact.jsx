
import ContactForm from '../Components/Contact/ContactForm'
import ContactHeader from '../Components/Contact/ContactHeader'
import SiteHero from '../Components/ReusableComponents/HeroComponent/HeroBar'

export default function Contact() {

    return(
        <main>
            <SiteHero Title01="Contact Us" />
            <ContactHeader />
            <ContactForm />
        </main>
    )
}