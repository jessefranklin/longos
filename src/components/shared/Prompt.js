import React from 'react';
import { Panel } from 'react-bootstrap';
export const PromptUpdate = ({type,message}) => {
    return (
      <div>
        <Panel bsStyle={type}>
          <Panel.Heading>
            <Panel.Title componentClass="h3">{message}</Panel.Title>
          </Panel.Heading>
        </Panel>
      </div>
    );
  };
  