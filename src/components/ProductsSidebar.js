import React from 'react';
import { Link } from 'react-scroll'
 

class ProductsSidebar extends React.Component {
    render() {
        const categories = this.props.categories
        return (
            <div>
                <h3>Order Options</h3>
                {Object.keys(categories).map(function(key, index) {
                    const refKey = key.replace(/\s+/g, '').toLowerCase();
                    return <ul key={index}>
                        <li>
                            <Link activeClass="active" to={refKey} spy={true} smooth={true} offset={-120} duration={400}>
                                {key}
                            </Link>
                        </li>
                    </ul>;
                })}
            </div>
        );
    }
}

export default ProductsSidebar;