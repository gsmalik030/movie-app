import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

const Image = ({src, className}) => {
  return (
    <LazyLoadImage
        src={src}
        alt='image'
        className={className || ''}
        effect='blur'
     />
  )
}

export default Image
