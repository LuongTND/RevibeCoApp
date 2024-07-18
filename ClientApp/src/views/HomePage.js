import React, { Component } from 'react'
import { Home } from '../components/Home'
import '../assets/css/HomePage.css'
import HeroComponent from '../components/HeroComponent'
import Acrording from '../components/Acrording'
import WhyChoose from '../components/WhyChoose'
import GridProduct from '../components/ProductClient/GridProduct'
export default class HomePage extends Component {
  render() {
    return (
      <div>
        <div>
          <HeroComponent
            imageUrl={"https://cdn.eva.vn/upload/3-2022/images/2022-08-12/image24-1660292012-373-width2048height1696.jpg"}
            title="Tiêu đề"
            subtitle="Phụ đề"

          />
        
          <div className='my-5'>
            <WhyChoose />
          </div>
          <GridProduct />
          <Acrording />
          
        </div>
      </div>
    )
  }
}
