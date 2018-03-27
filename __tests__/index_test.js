/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'

import App from '../pages/index.js'


jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    translate: () => Component => props => <Component t={(key) => key} {...props} />, // eslint-disable-line react/display-name
}));


describe('With Enzyme', () => {
    it('index page', () => {
        const app = mount(<App />)

        expect(app.find('p').text()).toEqual('welcome')
    })
})
