import React from 'react';
import style from "../css/style.css";

const Faq = () => {
  return (
    <div>
     <section classNameName="faq-main">
     <div className="container">
            <h3 className="text-center fw-bold" id="faq">FAQ'S</h3>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <b>How do I set prices for my email offerings?</b>
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>You have full control over pricing.</strong> Consider factors such as the value of your content, your target audience, and industry standards when setting prices. You can adjust prices as needed to optimize your earning potential.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <b>What types of emails can I sell on your platform?</b>
                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>You can sell a wide range of </strong>personalized emails, including newsletters, exclusive content, tutorials, advice, behind-the-scenes insights, and more. The key is to offer valuable and engaging content that resonates with your audience.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <b>Is there a limit to the number of emails I can sell?</b>
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>There's no limit to the</strong> number of email offerings you can list on our platform. Whether you have one email offering or multiple, you can tailor your profile to meet your audience's needs and interests.
                        </div>
                    </div>
                </div>


                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingfour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                            <b>How do I get paid for my email sales?</b>
                        </button>
                    </h2>
                    <div id="collapsefour" className="accordion-collapse collapse" aria-labelledby="headingfour"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>You'll receive payments securely </strong> through our trusted payment gateways. Payments are processed promptly, and you can track your earnings through your account dashboard.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingfive">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsefive" aria-expanded="false" aria-controls="collapsefive">
                            <b>Can I offer subscriptions or one-time purchases for my emails?</b>
                        </button>
                    </h2>
                    <div id="collapsefive" className="accordion-collapse collapse" aria-labelledby="headingfive"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>Yes, you have the option to offer</strong> both subscription-based and one-time purchase options for your email offerings. Choose the pricing model that best suits your content and audience preferences.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingsix">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapsesix" aria-expanded="false" aria-controls="collapsesix">
                            <b>Is there a minimum or maximum subscription duration?</b>
                        </button>
                    </h2>
                    <div id="collapsesix" className="accordion-collapse collapse" aria-labelledby="headingsix"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>Yes, you have the option to offer</strong> both subscription-based and one-time purchase options for your email offerings. Choose the pricing model that best suits your content and audience preferences.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingseven">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseseven" aria-expanded="false" aria-controls="collapseseven">
                            <b>How do I promote my email offerings and attract subscribers?</b>
                        </button>
                    </h2>
                    <div id="collapseseven" className="accordion-collapse collapse" aria-labelledby="headingseven"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong className='faq'>Utilize your existing online presence,</strong> social media channels, email list, and website to promote your email offerings. Share compelling content, testimonials, and special promotions to attract subscribers and encourage sign-ups.
                        </div>
                    </div>
                </div>  
            </div>
            </div>
    </section>
    </div>
  )
}

export default Faq;
