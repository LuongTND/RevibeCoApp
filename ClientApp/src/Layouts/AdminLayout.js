import React, { Component } from 'react';
import { NavMenu } from '../components/NavMenu';
import { Container } from 'reactstrap';
import '../assets/css/DefaultLayout.css'; // Ensure you have a CSS file for styling
import Footer from '../components/Footer';
import Devider from '../components/Devider';
import Sidebar from '../components/SideBar'
import SideBar from '../components/SideBar';
export default class AdminLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScrollToTop: false,
    };
  }

  render() {
    const childComponentName = this.props.children.type.displayName || this.props.children.type.name || 'Component';
    return (
      <div>
        <Container fluid tag="main">
          {childComponentName !== 'HomePage' && <div className='section-top'><Devider title={childComponentName} /></div>}
          <NavMenu />
          <div className='row'>
              <div className='col-md-2'>
                <SideBar />
              </div>
              <div className='col-md-10'>
                {this.props.children}
              </div>
          </div>
        </Container>
        {this.state.showScrollToTop && (
          <button className="scroll-to-top" onClick={this.scrollToTop}>
            <i class="bi bi-arrow-up-circle-fill"></i>
          </button>
        )}
        <div className='container-fluid'><Footer /></div>
      </div>
    );
  }
}
