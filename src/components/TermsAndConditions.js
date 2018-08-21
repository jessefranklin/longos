import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import toc from '../server/toc.html';

export const TOC = ({showTerms}) => {
    return(
        <div>
            <Modal show={showTerms}>
                <div className="">
                    <div dangerouslySetInnerHTML={ {__html: toc} } />
                </div>
            </Modal>
        </div>
    )
}