import { React, useEffect, useRef } from "react";
import { FeedbackForm } from "@/features/feedback-form";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from './Daily.module.scss';
import { AccordionDaily } from "@/widgets/accordion-daily";

gsap.registerPlugin(ScrollTrigger);

const Daily = () => {
    const ref = useRef([]);
    ref.current = [];

    useEffect(() => {
        ref.current.forEach((el) => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.2, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            })
        })
    }, [])

    const addtoRefs = (el) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    }

    return(
        <div className={`container-fluid ${styles.dailyContainer}`}>
            <section className={`row justify-content-center align-items-center ${styles.dailyMain} py-5`}>
                <div className="col-12 col-lg-8 text-center mb-4">
                    <h4 className={`text-white fw-bold mb-3 ${styles.heading}`} ref={addtoRefs}>
                        Режим <span className={styles.outlined}>работы</span>
                    </h4>
                    <p className={`lead text-light ${styles.description}`} ref={addtoRefs}>
                        Мы работаем для вас <span className="text-warning">без выходных</span> 7 дней в неделю.
                    </p>
                </div>
                
                <div className="col-12 col-lg-10">
                   <AccordionDaily />
                </div>
            </section>
            
            <section className={`row justify-content-center py-5 ${styles.feedbackSection}`}>
                <div className="col-12 col-lg-10 col-xl-8">
                    <FeedbackForm />
                </div>
            </section>
        </div>
    )
}

export default Daily;