import React from 'react';

class Announcements extends React.Component {
    render() {
        return (
            <div className="visuallyhidden" aria-live="polite" aria-atomic="true">
                {this.props.message}
            </div>
        );
    }
}

export default Announcements;