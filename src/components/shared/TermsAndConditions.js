import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import toc from '../../server/toc.html';

export const TOC = ({showTerms, handleClose, handleCloseAccept}) => {
    return(
        <div>
            <Modal show={showTerms}>
                <div className="toc">
                    <div dangerouslySetInnerHTML={ {__html: toc} } />
                </div>

                <Modal.Footer>
                    <Button className="btn-primary btn-left btn-green" onClick={handleCloseAccept}>Accept Terms</Button>
                    <Button className="btn-primary btn-right" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}