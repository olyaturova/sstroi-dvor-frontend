import { React, useEffect, useRef } from "react";
import { AllCategories } from "@/features/category-filter";
import { gsap } from "gsap"; 
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Products } from "../../widgets/products-grid/Products";

gsap.registerPlugin(ScrollTrigger);

const Shop = () => {
    const ref = useRef([]);
    ref.current = [];

    useEffect(() => {
        ref.current.forEach((el) => {
            gsap.fromTo(el, { y: 50, opacity: 0 }, {
                y: 0, opacity: 1, duration: 0.7, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=70",
                    toggleActions: "play none none reverse"
                }
            })
        })
    }, [])


    return(
        <div className="container-fluid">
            <section className="row">
                <div className="col-12 mb-4">
                    <div className="card shadow-sm border-0">
                            <AllCategories />
                    </div>
                </div>
            
                   <Products />
    
            </section>
        </div>
    )
}

export default Shop;