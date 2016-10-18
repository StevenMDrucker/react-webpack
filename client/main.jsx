'use strict';

import 'styles/main.scss';

import React from 'react';
import { render } from 'react-dom';

import Index from 'components/Index/Index';


render(<div>

    <Index items={[1,2,3,4,5]} />
    </div>,
 document.getElementById('js-main'));
