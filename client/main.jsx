'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';
import * as D3 from "d3";
D3.json("http://localhost:3001/client/researchData.json", (error, data) => {
    render(<div>

    <Index items={data} />
    </div>,
 document.getElementById('js-main'));
         
});

