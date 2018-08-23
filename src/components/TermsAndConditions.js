import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import toc from '../server/toc.html';

export const TOC = ({showTerms, handleClose}) => {
    return(
        <div>
            <Modal show={showTerms}>
                <div className="toc">
                    <div dangerouslySetInnerHTML={ {__html: toc} } />
                </div>

                <Modal.Footer>
                    <Button className="btn-add" onClick={handleClose}>Accept Terms</Button>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}