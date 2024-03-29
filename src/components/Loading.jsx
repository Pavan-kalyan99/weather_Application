//it is Loading Spinner from 'react-loader-spinner'
import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div class="flex justify-center items-center">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
      />
  </div>
  )
}

export default Loading
