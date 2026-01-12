
import { useEffect, useState } from 'react'
import useFormValidation from '../Hooks/useFormValidation'
import useMailSubmission from '../Hooks/useMailSubmission'

export default function BasicForm() {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [contact, setContact] = useState('')
    const [userName, setUserName] = useState('')
    const [success, setSuccess] = useState('')
    const [mailError, setMailError] = useState('')
    const [errorCount, setErrorCount] = useState(0)
    const [mailFail, setMailFail] = useState(false)
    const [isButtonVisible, setIsButtonVisible] = useState(true)

    const [captchaQuestion, setCaptchaQuestion] = useState('')
    const [captchaId, setCaptchaId] = useState('')
    const [captchaAnswer, setCaptchaAnswer] = useState('')
    const [isCaptchaLoading, setIsCaptchaLoading] = useState(false)
    const [captchaLoadError, setCaptchaLoadError] = useState('')
    const [website, setWebsite] = useState('')

    const SupportEmail = import.meta.env.VITE_SUPPORT_EMAIL
    const EmailUrl = import.meta.env.VITE_EMAIL_URL + "/sendContactMail"

    const isFormValid = useFormValidation({ userName, subject, message, contact })

    const { sendMail, isSubmitting } = useMailSubmission({
        subject,
        message,
        contact,
        userName,
        captchaId,
        captchaAnswer,
        website,
        setSuccess,
        setMailError,
        setErrorCount,
        setMailFail,
        setIsButtonVisible,
        setSubject,
        setMessage,
        setContact,
        setUserName,
        setCaptchaAnswer,
    });

    useEffect(() => {
        const fetchCaptcha = async () => {
            try {
                setIsCaptchaLoading(true)
                setCaptchaLoadError('')

                const apiBase = import.meta.env.VITE_EMAIL_URL || ''
                const response = await fetch(`${apiBase}/captcha`)
                console.log(response)
                if (!response.ok) {
                    throw new Error('Failed to load captcha')
                }

                const data = await response.json()
                setCaptchaId(data.id)
                setCaptchaQuestion(data.question)
                setCaptchaAnswer('')
            } catch (err) {
                console.error('Error loading captcha:', err)
                setCaptchaLoadError('Unable to load spam protection. Please try again.')
            } finally {
                setIsCaptchaLoading(false);
            }
        };

        fetchCaptcha();
    }, [])


    return(
        <div className="contact_container">
            <form onSubmit={sendMail}>
                <h2>Send us a Message</h2>
                <div className="entry_area">
                    <input
                        name="userName"
                        type="text"
                        id="userName"
                        required
                        minLength={3}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder=""
                    />
                    <label htmlFor="userName" className="label_line">
                        Name:
                    </label>
                </div>
                <div className="entry_area">
                    <input
                        name="contact"
                        type="email"
                        id="contact"
                        required
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder=""
                    />
                    <label htmlFor="contact" className="label_line">
                        Email:
                    </label>
                </div>
                <div className="entry_area">
                    <input
                        name="title"
                        type="text"
                        id="title"
                        required
                        minLength={3}
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder=""
                    />
                    <label htmlFor="title" className="label_line">
                        Subject:
                    </label>
                </div>
                <div className="entry_area">
                    <textarea
                        name="description"
                        id="description"
                        required
                        minLength={5}
                        cols={10}
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder=""
                    />
                    <label htmlFor="description" className="label_line">
                        Message:
                    </label>
                </div>
                <input
                    type="text"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    autoComplete="off"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                />
                <div className="entry_area captcha">
                    <label className="label_line" htmlFor="captchaAnswer">
                        {isCaptchaLoading
                            ? 'Loading spam protection...'
                            : captchaQuestion || 'Spam protection'}
                    </label>
                    <input
                        name="captchaAnswer"
                        type="text"
                        id="captchaAnswer"
                        required
                        value={captchaAnswer}
                        onChange={(e) => setCaptchaAnswer(e.target.value)}
                        placeholder=""
                        disabled={isCaptchaLoading || !captchaId}
                    />
                    {captchaLoadError && (
                        <p className="captcha_error">{captchaLoadError}</p>
                    )}
                </div>
                {isSubmitting ? (
                    <div className="form_button_box">
                        {!mailError && !mailFail && !success ? (
                            <img src="" alt="Spinner Icon" className="spinner"/>
                        ) : (
                            <>&nbsp;</>
                        )}
                    </div>
                ) : null}
                {!isSubmitting && (
                    <div className="form_button_box">
                        <button hidden={!isButtonVisible} type="submit" disabled={!isFormValid}>
                            SUBMIT
                        </button>
                    </div>
                )}
                <div>
                    {mailError && !mailFail && (
                        <div className="mailer_messages">
                            <h3>{mailError}</h3>
                            <p>Please try again</p>
                        </div>
                    )}
                    {mailFail && (
                        <div className="mailer_messages failure">
                            <h3>We are experiencing technical problems</h3>
                            <p>Please contact us directly at -</p>
                            <a
                                href={`mailto:${SupportEmail}?subject=Customer%20Contact%20Support&body=Hello,%0A%0AI%20would%20like%20to%20inquire%20about`}
                            >
                                <b>{SupportEmail}</b>
                            </a>
                        </div>
                    )}
                    {success && (
                        <div className="mailer_messages success">
                            <h2>{success}</h2>
                            <p>Redirecting you home...</p>
                            <p>
                                Click <Link to="/">HERE</Link> if you are not redirected
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}