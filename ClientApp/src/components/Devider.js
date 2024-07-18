import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Divider extends Component {
    render() {
        const { title, subtitle, content } = this.props;

        return (
            <div className='section'>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="sec-title text-center mb-5">
                            {subtitle && <p className="sec-sub-title mb-3">{subtitle}</p>}
                            <h2 className="h2-title">{title}</h2>
                            <div className="sec-title-shape mb-4">
                                <img src="/img/title-shape.svg" alt='' />
                            </div>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Divider.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    content: PropTypes.string.isRequired
};

export default Divider;
