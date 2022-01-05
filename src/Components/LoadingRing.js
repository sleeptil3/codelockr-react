import React from "react"
import ellipse from "../assets/ellipse-load.png"
import ellipse2 from "../assets/ellipse-load@2x.png"
import ellipse3 from "../assets/ellipse-load@3x.png"

export default function LoadingRing({ className }) {
	return (
		<div className={`h-screen w-screen flex justify-center items-center ${className}`}>
			<img
				className="animate-spin"
				src={ellipse}
				srcSet={`${ellipse2} 2x, ${ellipse3} 3x`}
				alt=""
			/>
		</div>
	)
}
