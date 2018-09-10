import React from 'react';
import { Link } from 'react-scroll'
 

class ProductsSidebar extends React.Component {
    render() {
        const { categories, listCakeCategories} = this.props;
        return (
            <div>
                <ul>
                    {Object.keys(categories).map(function(key, index) {
                        const refKey = key.replace(/\s+/g, '').toLowerCase();
                        return <li key={index}>
                                <Link activeClass="active" to={refKey} spy={true} smooth={true} offset={-120} duration={400}>
                                    {key}
                                </Link>
                            </li>
                    })}
                    {Object.keys(listCakeCategories).map(function(key, index) {
                        const refKey = key.replace(/\s+/g, '').toLowerCase();
                        return <li key={index}>
                                <Link activeClass="active" to={refKey} spy={true} smooth={true} offset={-120} duration={400}>
                                    {key}
                                </Link>
                            </li>
                    })}
                </ul>
            </div>
        );
    }
}

export default ProductsSidebar;