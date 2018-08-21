import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import toc from '../server/toc.html';

export const TOC = ({showTerms, handleClose}) => {
    return(
        <div>
            <Modal show={showTerms}>
                <div className="">
                    <div dangerouslySetInnerHTML={ {__html: toc} } />
                </div>
                <Modal.Footer>
                    Add agree to terms
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}