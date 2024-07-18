import React, { Component } from 'react';
import { NavMenu } from '../components/NavMenu';
import { Container } from 'reactstrap';
import '../assets/css/DefaultLayout.css'; // Ensure you have a CSS file for styling
import Footer from '../components/Footer';
import Devider from '../components/Devider';

export default class DefaultLayout extends Component {
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
                    {this.props.children}
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
